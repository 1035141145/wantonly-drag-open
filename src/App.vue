<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
@import "@/styles/variables";
@import "@/styles/element-ui";
@import "@/styles/common";
@import "@/styles/scrollBar";
#app {
    font-family:
        "Helvetica Neue",
        Helvetica,
        Arial,
        "PingFang SC",
        "Hiragino Sans GB",
        "Heiti SC",
        "Microsoft YaHei",
        "WenQuanYi Micro Hei",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
