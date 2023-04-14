<template>
    <div class="layout_style">
        <!-- 每个页面都通过layout进去，该文件为每个页面的最外层dom，方便添加公共样式以及组件，如下，添加了滚动条 -->
        <!-- <el-scrollbar class="scrollbar_style" style="height: 100%"> -->
        <router-view></router-view>
        <!-- </el-scrollbar> -->
    </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.layout_style {
    position: relative;
    height: 100%;
    background: #ffffff;
    width: 100%;
    // .scrollbar_style {
    //     .el-scrollbar__wrap {
    //         overflow-x: hidden;
    //     }
    //     .el-scrollbar__bar {
    //         padding-left: 5px;
    //     }
    // }
    .el-scrollbar__bar.is-horizontal {
        height: 8px;
    }
    .el-scrollbar__bar.is-vertical {
        width: 8px;
    }
    .el-scrollbar__bar.is-horizontal > div,
    .el-scrollbar__bar.is-vertical > div {
        background: #c3c3c3;
    }
}
</style>
