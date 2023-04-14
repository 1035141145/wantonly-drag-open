import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '@/layout' // 页面整体布局
import { fullLayout } from '@/layout/fullLayout' // 页面整体布局

process.env.NODE_ENV === 'development' ? Vue.use(Router) : null

const router = new Router({
    mode: 'hash', // 默认为'hash'模式
    routes: [
        {
            path: '',
            component: Layout,
            redirect: '/index/index',
            hidden: true,
        },
        { path: '/login', name: 'login', component: () => import('@/page/login'), hidden: true },
        { path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
        { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
        {
            path: '/index',
            name: 'index',
            component: Layout,
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
                    component: () => import('@/page/index/index'),
                },
            ],
        },
        {
            path: '/userManager',
            name: 'userManage',
            component: Layout,
            meta: {
                title: '用户与权限管理',
                icon: 'iconuser',
            },
            noDropdown: true,
            children: [
                {
                    path: 'userList',
                    meta: {
                        title: '用户管理',
                        icon: 'iconuser',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/userList/userList'),
                },
                {
                    path: 'accessList',
                    meta: {
                        title: '权限栏目列表',
                        icon: 'iconuser',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/accessList/accessList'),
                },
                {
                    path: 'roleList',
                    meta: {
                        title: '角色管理',
                        icon: 'iconuser',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/roleList/roleList'),
                },
            ],
        },
        {
            path: '/resumeManage',
            name: 'resumeManage',
            meta: {
                title: '简历管理',
                icon: 'iconpay3',
            },
            component: Layout,
            children: [
                {
                    path: 'skillList',
                    name: 'skillList',
                    meta: {
                        title: '个人技能管理',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/resume/skillList/skillList'),
                },
                {
                    path: 'projectShow',
                    name: 'projectShow',
                    meta: {
                        title: '项目展示',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/resume/projectShow/projectShow'),
                },
                {
                    path: 'resumeHome',
                    name: 'resumeHome',
                    meta: {
                        title: '简历主页管理',
                        routerType: 'leftmenu',
                    },
                    component: () => import('@/page/resume/resumeHome/resumeHome'),
                },
            ],
        },
        {
            path: '/error',
            component: Layout,
            name: 'errorPage',
            meta: {
                title: '错误页面',
                icon: 'iconError',
            },
            children: [
                {
                    path: '401',
                    name: 'page401',
                    component: () => import('@/page/errorPage/401'),
                    meta: {
                        title: '401',
                        noCache: true,
                    },
                },
                {
                    path: '404',
                    name: 'page404',
                    component: () => import('@/page/errorPage/404'),
                    meta: {
                        title: '404',
                        noCache: true,
                    },
                },
            ],
        },
        {
            path: '/log',
            component: Layout,
            name: 'errorPage',
            meta: {
                title: '日志列表',
                icon: 'iconError',
            },
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('@/page/log/log'),
                    meta: {
                        title: '日志',
                    },
                },
            ],
        },
        {
            path: '/dragHome',
            component: fullLayout,
            name: 'dragHome',
            meta: {
                title: '自定义看板',
                icon: 'iconError',
            },
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('@/page/dragView/index'),
                    meta: {
                        title: '自定义看板',
                    },
                },
            ],
        },
        { path: '*', redirect: '/404', hidden: true },
    ],
})

router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem('Token')
    console.log('xxxxxxxxxxxxxxxx', to)
    // next();
    if (!token && to.name != 'login') {
        next({ name: 'login' })
    } else {
        next()
    }
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    undefined
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
export default router
// 	//注册路由
// export default new Router({
// 	mode:'history', // 默认为'hash'模式
// 	base: '/permission/', // 添加跟目录,对应服务器部署子目录
// 	routes: router
// })
