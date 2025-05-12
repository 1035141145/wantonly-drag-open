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
        component: 'Decoration1',
        propValue: '',
        label: '装饰1',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 200,
            height: 50,
            otherColorLeft: '',
            otherColorRigth: '',
        },
    },
    {
        component: 'Decoration2',
        propValue: '',
        label: '装饰2',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 200,
            height: 5,
            color: '',
            dur: 5, // 单次动画时长(秒)
        },
    },
    {
        component: 'Decoration3',
        propValue: '',
        label: '装饰3',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 250,
            height: 30,
            otherColorLeft: '',
            otherColorRigth: '',
        },
    },
    {
        component: 'Decoration4',
        propValue: '',
        label: '装饰4',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 5,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
            dur: 3, // 单次动画时长(秒)
        },
    },
    {
        component: 'Decoration5',
        propValue: '',
        label: '装饰5',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 500,
            height: 40,
            otherColorLeft: '',
            otherColorRigth: '',
            dur: 1.2, // 单次动画时长(秒)
        },
    },
    {
        component: 'Decoration6',
        propValue: '',
        label: '装饰6',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 300,
            height: 30,
            color: '',
        },
    },
    {
        component: 'Decoration7',
        propValue: '',
        label: '装饰7',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 150,
            height: 30,
            color: '#fff',
            fontSize: '14',
            fontWeight: 500,
            otherColorLeft: '',
            otherColorRigth: '',
            borderTitle: 'Decoration',
        },
    },
    {
        component: 'Decoration8',
        propValue: '',
        label: '装饰8',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 300,
            height: 50,
            otherColorLeft: '',
            otherColorRigth: '',
            reverse: false,
        },
    },
    {
        component: 'Decoration9',
        propValue: '',
        label: '装饰9',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 150,
            height: 150,
            otherColorLeft: '',
            otherColorRigth: '',
            dur: 3,
        },
    },
    {
        component: 'Decoration10',
        propValue: '',
        label: '装饰10',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 500,
            height: 5,
            otherColorLeft: '',
            otherColorRigth: '',
        },
    },
    {
        component: 'Decoration11',
        propValue: '',
        label: '装饰11',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 200,
            height: 60,
            color: '#fff',
            fontSize: '14',
            fontWeight: 500,
            otherColorLeft: '',
            otherColorRigth: '',
            borderTitle: 'Decoration',
        },
    },
    {
        component: 'Decoration12',
        propValue: '',
        label: '装饰12',
        icon: 'zhuangshi',
        elementicon: '',
        style: {
            width: 200,
            height: 200,
            otherColorLeft: '',
            otherColorRigth: '',
        },
    },
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list
