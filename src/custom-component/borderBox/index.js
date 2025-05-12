// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
    collapseName: '', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
    linkage: {
        duration: 0, // 过渡持续时间
        data: [
            // 组件联动
            {
                id: '', // 联动的组件 id
                label: '', // 联动的组件名称
                event: '', // 监听事件
                style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
            },
        ],
    },
}

// 编辑器左侧组件列表
const list = [
    {
        component: 'borderBox1',
        propValue: '',
        label: '边框1',
        icon: 'biankuang',
        style: {
            width: 300,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox2',
        propValue: '',
        label: '边框2',
        icon: 'biankuang',
        style: {
            width: 300,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox3',
        propValue: '',
        label: '边框3',
        icon: 'biankuang',
        style: {
            width: 300,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox4',
        propValue: '',
        label: '边框4',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox5',
        propValue: '',
        label: '边框5',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox6',
        propValue: '',
        label: '边框6',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox7',
        propValue: '',
        label: '边框7',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox8',
        propValue: '',
        label: '边框8',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
            reverse: false,
        },
    },
    {
        component: 'borderBox9',
        propValue: '',
        label: '边框9',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox10',
        propValue: '',
        label: '边框10',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox11',
        propValue: '',
        label: '边框11',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
            borderTitle: '边框标题',
            borderTitleWidth: 250,
        },
    },
    {
        component: 'borderBox12',
        propValue: '',
        label: '边框12',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
    {
        component: 'borderBox13',
        propValue: '',
        label: '边框13',
        icon: 'biankuang',
        style: {
            width: 500,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            otherBgColor: '',
        },
    },
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list
