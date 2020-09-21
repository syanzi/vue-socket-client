/**
 * update:修改测试环境和正式环境打包配置<br/>
 * desc:vue基本配置文件<br/>
 * Date: 2018/8/24<br/>
 * Author :znq<br/>
 */
const path = require("path");
const chalk = require("chalk");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";
const baseUrl = dev ? "/" : "/";
// 存放build结果的文件夹
const outputDir = "dist";
const env = dev ? "开发环境" : "正式环境";
console.log("--------------构建  |  开始--------------------------");
console.log("----------------" + env + "--------------------------");

const externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios"
};
// CDN外链，会插入到index.html中
const cdn = {
    // 开发环境
    dev: {
        css: [],
        js: []
    },
    // 生产环境
    build: {
        css: [],
        js: [
            "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js",
            "https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js",
            "https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js",
            "https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"
        ]
    }
};

// 是否使用预渲染
const productionPrerender = false;
// 需要预渲染的路由
const prerenderRoutes = ["/"];

// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ["js", "css"];

module.exports = {
    publicPath: baseUrl, // 打包路径dev
    outputDir: outputDir,
    assetsDir: "static",
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    productionSourceMap: false,
    // css相关配置
    css: {
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        browsers: ["> 1%", "last 2 versions", "iOS>7", "Android>4"]
                    })
                ]
            }
        }
    },

    configureWebpack: config => {
        const myConfig = {};
        if (!dev) {
            // 1. 生产环境npm包转CDN
            myConfig.externals = externals;
            myConfig.plugins = [new BundleAnalyzerPlugin()];

            // 2. 使用预渲染，在仅加载html和css之后即可显示出基础的页面，提升用户体验，避免白屏
            productionPrerender &&
                myConfig.plugins.push(
                    new PrerenderSPAPlugin({
                        staticDir: path.resolve(__dirname, outputDir), // 作为express.static()中间件的路径
                        outputDir: path.resolve(__dirname, outputDir + baseUrl),
                        indexPath: path.resolve(__dirname, outputDir + baseUrl + "index.html"),
                        routes: prerenderRoutes,
                        minify: {
                            collapseBooleanAttributes: true,
                            collapseWhitespace: true,
                            decodeEntities: true,
                            keepClosingSlash: true,
                            sortAttributes: true
                        },
                        postProcess(renderedRoute) {
                            /**
                             * 懒加载模块会自动注入，无需直接通过script标签引入
                             * 而且预渲染的html注入的是modern版本的懒加载模块
                             * 这会导致在低版本浏览器出现报错，需要剔除
                             * 这并不是一个非常严谨的正则，不适用于使用了 webpackChunkName: "group-foo" 注释的懒加载
                             */
                            renderedRoute.html = renderedRoute.html.replace(
                                /<script[^<]*chunk-[a-z0-9]{8}\.[a-z0-9]{8}.js[^<]*><\/script>/g,
                                function (target) {
                                    console.log(chalk.bgRed("\n\n剔除的懒加载标签:"), chalk.magenta(target));
                                    return "";
                                }
                            );
                            return renderedRoute;
                        }
                    })
                );
            // 3. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip &&
                myConfig.plugins.push(
                    new CompressionWebpackPlugin({
                        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
                        threshold: 8192,
                        minRatio: 0.8
                    })
                );
        }
        return myConfig;
    },
    chainWebpack: config => {
        /**
         * 添加CDN参数到htmlWebpackPlugin配置中
         */
        config.plugin("html").tap(args => {
            if (dev) {
                args[0].cdn = cdn.dev;
            } else {
                args[0].cdn = cdn.build;
            }
            return args;
        });
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, { limit: 10240 }));

        // set svg-sprite-loader
        config.module
            .rule("svg")
            .exclude.add(path.resolve("src/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(path.resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            })
            .end();

        // set preserveWhitespace
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true;
                return options;
            })
            .end();
        if (!dev) {
            config
                .plugin("ScriptExtHtmlWebpackPlugin")
                .after("html")
                .use("script-ext-html-webpack-plugin", [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end();
            config.optimization.splitChunks({
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial" // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: "chunk-elementUI", // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: "chunk-commons",
                        test: path.resolve("src/components"), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk("single");
        }
    },
    parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: {
        // 第三方插件配置
    },
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8080,
        https: false,
        hotOnly: false,
        clientLogLevel: 'info',
        proxy: {
            "/api": {
                target: "http://localhost:3000/",
                changeOrigin: true,
                pathRewrite: { "^/api": "/" }
            }
        }
    }
};
