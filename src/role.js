import router from "./router";
import store from "./store/index";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { getToken } from "./utils/auth"; // 验权

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge
const hasPermission = (roles, permissionRoles) => {
    if (roles.indexOf("admin") >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
};

// const whiteList = ["/login"]; //不重定向的页面
let autoToTop = true;
// register global progress.
// router.beforeEach((to, from, next) => {
// NProgress.start(); // 开启Progress

// autoToTop = to.path !== "/eReader";
// if (whiteList.indexOf(to.path) !== -1 || getToken()) {
//     next();
//     NProgress.done();
// } else {
//     next("./login");
// NProgress.done();
// }
// });

router.afterEach(() => {
    NProgress.done(); // 结束Progress
    if (autoToTop) {
        window.scroll(0, 0);
    }
});
