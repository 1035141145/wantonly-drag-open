<template>
    <div class="home rflex">
        <left-menu />
        <div ref="menu_right" class="menu_right wflex el-scrollbar" :style="{left:sidebar.width+'px'}">
            <head-nav />
            <div ref="menu_content" class="menu_content">
                <bread />
                <router-view /><!--页面渲染入口-->
            </div>
            <footerNav />
            <backTop :ele="$refs.menu_right" />
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import HeadNav from './headNav.vue'
import LeftMenu from './leftMenu.vue'
import Bread from './bread.vue'
import FooterNav from './footerNav.vue'
import backTop from '@/components/backTop'

export default {
    name: 'Home',
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['sidebar']),
    },
    components: {
        HeadNav,
        LeftMenu,
        Bread,
        FooterNav,
        backTop,
    },
    watch: {

    },
    created() {
    },
    mounted() {
    },
}
</script>
<style scoped lang='scss'>
    .home{
        .menu_right{
            overflow: auto;
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            background:#F6F7FC;
            .menu_content{
                position: relative;
                margin-top:60px;
                width:100%;
                background:#f0f2f5;
            }

        }
    }
</style>
