import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as filters from "./common/filters"; // 全局过滤器
import * as hdwlStore from "./utils/auth";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import ElementUi from "element-ui";
import "./lib/css/element-variables.scss";

import "./lib/css/base.scss";
import "./icons"; // icon

Vue.use(ElementUi, { size: "medium" });

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import "./role";
import "./common/directives";

Vue.prototype.$ppyStore = hdwlStore;

Vue.config.productionTip = false;
// 注册全局实用程序过滤器（register global utility common）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

