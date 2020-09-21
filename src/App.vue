<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    name: "Layout",
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss">
#app {
    height: 100%;
    position: relative;

    .nav-classify-wrapper {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
