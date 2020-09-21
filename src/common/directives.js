import Vue from "vue";

//全局滑动监听指令
Vue.directive("windowScroll", {
    bind(el, binding) {
        let onScroll = function(event) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //滚动的距离
            let totalHeight = document.body.scrollHeight; //内容高度，即可以滚动的最大距离
            let windowHeight = window.innerHeight || document.body.clientHeight; //window窗口高度
            ///内容高度 -window高度-滚动的距离 = 距离底部的高度 ；为0即为滑动到底部
            let scrollY = totalHeight - windowHeight - scrollTop;
            if (binding.value(scrollY, el, event)) {
                window.removeEventListener("scroll", onScroll);
            }
        };
        el.__windowScroll_ = onScroll;
        window.addEventListener("scroll", onScroll);
    },
    unbind(el) {
        window.removeEventListener("scroll", el.__windowScroll_);
    }
});

Vue.directive("scroll", {
    inserted: function(el, binding) {
        let onScroll = function(event) {
            ///内容高度 -el高度-滚动的距离 = 距离底部的高度 ；为0即为滑动到底部
            let isBottom = el.scrollHeight - el.offsetHeight - el.scrollTop;
            if (binding.value(isBottom, el, event)) {
                el.removeEventListener("scroll", onScroll);
            }
        };
        el.__scroll_ = onScroll;
        el.addEventListener("scroll", onScroll);
    },
    unbind(el) {
        el.removeEventListener("scroll", el.__scroll_);
    }
});

//全局window的点击事件
Vue.directive("windowClick", {
    inserted: function(el, binding) {
        el.onclick = function(event) {
            event.stopPropagation();
            binding.value(false, el, event);
        };
        let click = function(event) {
            if (binding.value(true, el, event)) {
                window.removeEventListener("click", click);
            }
        };
        el.__click_ = click;
        window.addEventListener("click", click);
    },
    unbind(el) {
        el.onclick = null;
        window.removeEventListener("click", el.__click_);
    }
});
