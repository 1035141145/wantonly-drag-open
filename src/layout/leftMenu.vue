<template>
    <div class="menu_left cflex" :style="{ width: sidebar.width + 'px' }">
        <div class="menu_page_top rflex" :style="{ background: menuObj.bgColor }">
            <img
                :class="['logo', { closeLogo: !sidebar.opened }]"
                :src="logo"
                alt="admin"
            />
            <span
                v-show="sidebar.opened"
                :style="{ color: menuObj.textColor }"
                class="title"
            >简历管理后台</span>
        </div>
        <div class="menu_page_bottom is-scroll-left" :style="{ background: menuObj.bgColor }">
            <el-menu
                mode="vertical"
                theme="dark"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{ width: sidebar.width + 'px' }"
            >
                <template v-for="(item, index) in menuList">
                    <!--表示 有一级菜单-->
                    <router-link
                        v-if="item.children.length <= 0"
                        :key="index"
                        :to="'/' + item.path"
                    >
                        <el-menu-item class="dropItem" :index="'/' + item.path">
                            <span v-if="item.name" slot="title">{{ item.name }}</span>
                        </el-menu-item>
                    </router-link>

                    <!--表示 有二级或者多级菜单 -->
                    <el-submenu
                        v-if="item.children.length > 0"
                        :key="index"
                        :index="item.path"
                    >
                        <template slot="title">
                            <span v-if="item.name" slot="title">{{ item.name }}</span>
                        </template>
                        <!--直接定位到子路由上，子路由也可以实现导航功能-->
                        <router-link
                            v-for="(citem, cindex) in item.children"
                            :key="cindex"
                            :to="getIindex(citem, item, cindex)"
                        >
                            <el-menu-item :index="getIindex(citem, item, cindex)">
                                <span slot="title"> {{ citem.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusList } from '@/api/menu'
import * as mUtils from '@/utils/mUtils'
import logoImg from '@/assets/img/logo.png'

export default {
    name: 'LeftMenu',
    data() {
        return {
            menuObj: {
                bgColor: 'rgb(3, 10, 43)',
                textColor: '#fff',
                activeTextColor: '#ff6428',
            },
            logo: logoImg,
            permission_routers: [
                {
                    path: '',
                    redirect: '/index/index',
                    hidden: true,
                },
                {
                    path: '/login',
                    name: 'login',
                    hidden: true,
                },
                {
                    path: '/404',
                    hidden: true,
                },
                {
                    path: '/401',
                    hidden: true,
                },
                {
                    path: '/index',
                    name: 'index',
                    meta: {
                        title: '首页',
                        icon: 'icondashboard',
                    },
                    noDropdown: true,
                    children: [
                        {
                            path: 'index',
                            meta: {
                                title: '首页',
                                icon: 'icondashboard',
                                routerType: 'leftmenu',
                            },
                        },
                    ],
                },
                {
                    path: '/userManager',
                    name: 'userManage',
                    meta: {
                        title: '用户管理',
                        icon: 'iconuser',
                    },
                    noDropdown: false,
                    children: [
                        {
                            path: 'userList',
                            name: 'userList',
                            meta: {
                                title: '用户管理',
                                icon: 'iconuser',
                                routerType: 'leftmenu',
                            },
                        },
                        {
                            path: 'roleList',
                            name: 'roleList',
                            meta: {
                                title: '角色管理',
                                icon: 'iconuser',
                                routerType: 'leftmenu',
                            },
                        },
                        {
                            path: 'accessList',
                            name: 'accessList',
                            meta: {
                                title: '权限管理',
                                icon: 'iconuser',
                                routerType: 'leftmenu',
                            },
                        },
                    ],
                },
                {
                    path: '/fundManage',
                    name: 'fundManage',
                    meta: {
                        title: '资金管理',
                        icon: 'iconpay3',
                    },
                    children: [
                        {
                            path: 'fundList',
                            name: 'fundList',
                            meta: {
                                title: '资金流水',
                                routerType: 'leftmenu',
                            },
                        },
                        {
                            path: 'chinaTabsList',
                            name: 'chinaTabsList',
                            meta: {
                                title: '区域投资',
                                routerType: 'leftmenu',
                            },
                        },
                    ],
                },
                {
                    path: '/fundData',
                    name: 'fundData',
                    meta: {
                        title: '资金数据',
                        icon: 'iconecharts',
                    },
                    redirect: '/fundData/fundPosition',
                    children: [
                        {
                            path: 'fundPosition',
                            name: 'fundPosition',
                            meta: {
                                title: '投资分布',
                            },
                        },
                        {
                            path: 'typePosition',
                            name: 'typePosition',
                            meta: {
                                title: '项目分布',
                            },
                        },
                        {
                            path: 'incomePayPosition',
                            name: 'incomePayPosition',
                            meta: {
                                title: '收支统计',
                            },
                        },
                    ],
                },
                {
                    path: '/error',
                    name: 'errorPage',
                    meta: {
                        title: '错误页面',
                        icon: 'iconError',
                    },
                    children: [
                        {
                            path: '401',
                            name: 'page401',
                            meta: {
                                title: '401',
                                noCache: true,
                            },
                        },
                        {
                            path: '404',
                            name: 'page404',
                            meta: {
                                title: '404',
                                noCache: true,
                            },
                        },
                    ],
                },
                {
                    path: '*',
                    redirect: '/404',
                    hidden: true,
                },
            ],
            menuList: [],
        }
    },
    computed: {
        ...mapGetters(['isCollapse', 'sidebar', 'key']),
    // color: window.localStorage.getItem("color"),
    },
    watch: {
        key() {
            let thiscolor = window.localStorage.getItem('color')
            if (thiscolor) {
                this.menuObj.bgColor = thiscolor
                if (thiscolor == '#fff') {
                    this.menuObj.textColor = 'rgb(10, 10, 10)'
                } else {
                    this.menuObj.textColor = '#fff'
                }
            }
        },
    },
    created() {
        this.getMenusList()
        let thiscolor = window.localStorage.getItem('color')
        if (thiscolor) {
            this.menuObj.bgColor = thiscolor
            if (thiscolor == '#fff') {
                this.menuObj.textColor = 'rgb(10, 10, 10)'
            } else {
                this.menuObj.textColor = '#fff'
            }
        }
    },
    mounted() {},
    methods: {
        getIindex(citem, item, cindex) {
            return '/' + item.path + '/' + citem.path
        },
        getMenusList() {
            getMenusList().then((res) => {
                this.menuList = res.data
                console.log(res.data)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@left-bgColor: #ff6c60;; // 左侧菜单背景颜色;
@icon-link: #ff6c60;
.menu_left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.menu_page_top {
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  box-sizing: border-box;
  // background: @left-bgColor !important;
  box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);
  .logo {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    display: inline-block;
  }
  .closeLogo {
    width: 30px;
    height: 30px;
  }
  .title {
    font-size: 22px;
    i {
      color: #fff;
    }
  }
}
.menu_page_bottom {
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  margin-top: 3px;
  z-index: 10;
  // background: @left-bgColor !important;
  box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
}
</style>
