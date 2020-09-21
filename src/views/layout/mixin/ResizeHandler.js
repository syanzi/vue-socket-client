import store from "@/store";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
    beforeMount() {
        window.addEventListener("resize", this.$_resizeHandler);
    },
    mounted() {
        const isMobile = this.$_isMobile();
        if (isMobile) {
            store.dispatch("app/toggleDevice", "mobile");
            store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
    },
    methods: {
        // use $_ for mixins properties
        // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
        // eslint-disable-next-line camelcase
        $_isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - 1 < WIDTH;
        },
        // eslint-disable-next-line camelcase
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile();
                store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

                if (isMobile) {
                    store.dispatch("app/closeSideBar", { withoutAnimation: true });
                }
            }
        }
    }
};
