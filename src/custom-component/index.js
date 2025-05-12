import Vue from 'vue'
// 对custom-component目录下的所有.vue组件进行全局注册
const componentsContext = require.context('.', true, /\.vue$/)
componentsContext.keys().forEach((component) => {
    // eslint-disable-next-line no-unused-expressions
    undefined
    const componentConfig = componentsContext(component)
    // 如果组件是export default 则使用default
    const ctrl = componentConfig.default || componentConfig
    // 注册组件名称
    if (ctrl.name) {
        Vue.component(ctrl.name, ctrl)
    }
})

// const components = [
//     'CircleShape',
//     'Picture',
//     'VText',
//     'VButton',
//     'Group',
//     'RectShape',
//     'LineShape',
//     'VTable',
// ]

// components.forEach(key => {
//     Vue.component(key, () => import(`@/custom-component/${key}/Component`))
//     Vue.component(key + 'Attr', () => import(`@/custom-component/${key}/Attr`))
// })

// const svgs = [
//     'SVGStar',
//     'SVGTriangle',
// ]

// svgs.forEach(key => {
//     Vue.component(key, () => import(`@/custom-component/svgs/${key}/Component`))
//     Vue.component(key + 'Attr', () => import(`@/custom-component/svgs/${key}/Attr`))
// })
