import store from "../../store/index";

const { body } = document;
const WIDTH = 760;
const RATIO = 3;

export default {
    beforeMount() {
        window.addEventListener("resize", this.resizeHandler);
    },
    mounted() {
        const isMobile = this.isMobile();
        if (isMobile) {
            store.dispatch("toggleDevice", "mobile");
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - RATIO < WIDTH;
        },
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile();
                store.dispatch("toggleDevice", isMobile ? "mobile" : "desktop");
            }
        }
    }
};
