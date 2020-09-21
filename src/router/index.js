import Vue from "vue";
import Router from "vue-router";
import config from "../ppSwallow/config";

// 静态路由
import Layout from "../views/layout";

Vue.use(Router);

export const constantRoutes = [
    {
        path: "/",
        component: () => import("../views/login/index"),
        hidden: true
    },

    {
        path: "/404",
        component: () => import("../views/404"),
        hidden: true

    },
    {
        path: '/message',
        component: Layout,
        // redirect: '/message',
        children: [
            {
                path: '/',
                component: () => import('../views/message/index'),
                name: 'Message',
                meta: { title: 'Message', icon: 'message', affix: true }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
    new Router({
        // mode: 'history', //后端支持可开
        mode: config.routerMode,
        routes: constantRoutes
    });
const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
