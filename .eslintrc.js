module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: [
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "@vue/prettier"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // console.log()
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // debug
        "no-unused-vars": "warn", //定义了但未使用得变量，warn警告
        "no-empty": "warn",
        "no-undef": "error",
        'no-irregular-whitespace':"warn",
        'vue/no-side-effects-in-computed-properties':"off",
        camelcase: 1, //强制驼峰命名
        "prettier/prettier": [
            "off",
            {
                printWidth:150,
                singleQuote: false, //使用单引号
                semi: true, //末尾分号
                tabWidth: 4, //缩进
                trailingComma: "none", //尾随逗号   eg：[a,b,c,d,] d后的逗号
                bracketSpacing: true, //用空格隔开括号与内容  true: { foo: bar }   false: {foo: bar}
                insertPragma: false //再格式化得文件头部加@format得注释
            }
        ]
    },
    plugins: ["vue"],
    parserOptions: {
        parser: "babel-eslint"
    }
};
