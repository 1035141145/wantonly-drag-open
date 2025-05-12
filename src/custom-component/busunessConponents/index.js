// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1,
}
const requestObj = {
    method: 'GET',
    data: [],
    url: '',
    series: false, // 是否定时发送请求
    time: 1000, // 定时更新时间
    paramType: '', // string object array
    requestCount: 0, // 请求次数限制，0 为无限
    ifCheck: false, // 是否立即生效

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

// 图表
const eCharts = [
    {
        component: 'Chart',
        propValue: {
            data: {
                direction: true, // 竖向柱形图true ,横向false
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                request: JSON.parse(JSON.stringify(requestObj)),
                cancelRequest: null, // 用于组件销毁是停止自动请求
                editableTabs: [
                    {
                        name: '柱形图1',
                        index: '1',
                        type: 'bar',
                        itemStyle: {
                            color: '',
                            barBorderRadius: [0, 0, 0, 0],
                        },       
                        barGap: 0,
                        barWidth: 0,
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        request: JSON.parse(JSON.stringify(requestObj)),
                        cancelRequest: null,
                        markPoint: {
                            data: [],
                        },
                        markLine: {
                            data: [],
                        },
                    },
                ],
            },
            style: {
                // 背景颜色
                backgroundColor: '',
                // 图例
                legend: {
                    top: 10,
                    data: ['柱形图1'],
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 500,
                    },
                },
                // 标题
                title: {
                    text: '',
                    top: 20,
                    left: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 500,
                    },
                    
                },  
                // 让图表占满容器,上下左右边距
                grid: {
                    top: 80,
                    left: 60,
                    right: 60,
                    bottom: 40,
                },
                // 提示框取默认值，即鼠标移动到柱状图会显示内容
                tooltip: {
                    trigger: 'axis', // 触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效，
                        type: 'cross', // 默认为line，line直线，cross十字准星，shadow阴影
                        crossStyle: {
                            color: '#fff',
                        },
                    },
                },
                // x轴
                xAxis: {
                    type: 'category',
                    // data: [],
                    // 坐标轴刻度居中
                    axisTick: {
                        alignWithLabel: true,
                    },
                    // //x轴样式
                    axisLine: {
                        lineStyle: {
                            color: '#5390ce',
                        },
                    },
                    // // x轴的字体样式
                    axisLabel: {
                        textStyle: {
                            color: '#5390ce',
                            fontSize: 10,
                        },
                    },
                },
                // y轴
                yAxis: {
                    type: 'value',
                    // y轴分割线类型
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed', // 虚线
                            color: '#165c9e',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'red',
                        },
                    },
                    // //最大值
                    max: 'dataMax',
                    min: 10,
                    // //分割线刻度
                    // interval: 'auto',
                    // y轴的字体样式
                    axisLabel: {
                        textStyle: {
                            color: '#5390ce',
                            fontSize: '14',
                        },
                    },
                },

            },
            stripe: true,
            thBold: true,
        },
        label: '柱形/折线图',
        icon: 'shangwutubiao-',
        style: {
            width: 700,
            height: 500,           
        },
    },
    {
        component: 'Pie',
        propValue: 
        {
            request: JSON.parse(JSON.stringify(requestObj)),
            // 背景颜色
            backgroundColor: '',
            title: {
                text: '',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                },
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 500,
                },
            },
            series: [
                {                       
                    type: 'pie',
                    top: '10%',
                    left: '10%',
                    roseType: '', // 南丁格尔图
                    radius: '60%',
                    color: ['#ff0000', '#00ff00', '#0000ff', '#9FE6B8', '#FFDB5C'],
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                    ],
                    avoidLabelOverlap: false,
                    label: {
                        // echarts饼图内部显示百分比设置
                        show: true,
                        position: 'outside', // outside 外部显示  inside 内部显示
                        formatter: false,
                        color: '#ffffff', // 颜色
                        fontSize: 12, // 字体大小
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        },
        
        label: '饼图',
        icon: 'bingtu',
        style: {
            width: 400,
            height: 400,           
        },
    },
    {
        component: 'PieY',
        propValue: 
        {
            request: JSON.parse(JSON.stringify(requestObj)),
            // 背景颜色
            backgroundColor: '',
            title: {
                text: '',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                },
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 500,
                },
            },
            series: [
                {                       
                    type: 'pie',
                    top: '10%',
                    left: '10%',
                    roseType: '', // 南丁格尔图
                    radius: ['40%', '66%'],
                    color: ['#ff0000', '#00ff00', '#0000ff', '#9FE6B8', '#FFDB5C'],
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                    ],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: false,
                        color: '#ffffff', // 颜色
                        fontSize: 12, // 字体大小
                    },
                    labelLine: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold',
                        },
                    },
                },
            ],
        },
        
        label: '圆环图',
        icon: 'yuanhuantu',
        style: {
            width: 400,
            height: 400,           
        },
    },
    {
        component: 'AnimationText',
        propValue: 
        {
            // request: JSON.parse(JSON.stringify(requestObj)),
            // 背景颜色
            // backgroundColor: '',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        left: 'center',
                        top: 'center',
                        style: {
                            text: 'Apache ECharts',
                            fontSize: 40,
                            fontWeight: 'bold',
                            lineDash: [0, 200],
                            lineDashOffset: 0,
                            fill: 'transparent',
                            stroke: '#fff',
                            lineWidth: 1,
                        },
                        keyframeAnimation: {
                            duration: 3000,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.3,
                                    style: {
                                        fill: 'transparent',
                                        lineDashOffset: 200,
                                        lineDash: [200, 0],
                                    },
                                },
                                {
                                    // Stop for a while.
                                    percent: 0.2,
                                    style: {
                                        fill: 'transparent',
                                    },
                                },
                                {
                                    percent: 1,
                                    style: {
                                        fill: 'red',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        
        label: '文字动画',
        icon: '2dongtaiwenzi',
        style: {
            width: 500,
            height: 80,           
        },
    },
    {
        component: 'calendarPie',
        propValue: 
        {
            // request: JSON.parse(JSON.stringify(requestObj)),
            // 背景颜色
            // backgroundColor: '',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        left: 'center',
                        top: 'center',
                        style: {
                            text: 'Apache ECharts',
                            fontSize: 40,
                            fontWeight: 'bold',
                            lineDash: [0, 200],
                            lineDashOffset: 0,
                            fill: 'transparent',
                            stroke: '#fff',
                            lineWidth: 1,
                        },
                        keyframeAnimation: {
                            duration: 3000,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.3,
                                    style: {
                                        fill: 'transparent',
                                        lineDashOffset: 200,
                                        lineDash: [200, 0],
                                    },
                                },
                                {
                                    // Stop for a while.
                                    percent: 0.2,
                                    style: {
                                        fill: 'transparent',
                                    },
                                },
                                {
                                    percent: 1,
                                    style: {
                                        fill: 'red',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        
        label: '日历饼图',
        icon: 'rili',
        style: {
            width: 800,
            height: 700,           
        },
    },
]

// 编辑器左侧组件列表 - 品质
const list_yujing = [

    {
        component: 'CommercialStraightRate',
        label: '商品化直行率',
        // elementicon: 'el-icon-s-cooperation',
        style: {
            width: 450,
            height: 300,
            borderRadius: '',
        },
    },
]
for (let i = 0, len = eCharts.length; i < len; i++) {
    const item = eCharts[i]
    item.style = { ...commonStyle, ...item.style }
    eCharts[i] = { ...commonAttr, ...item }
}
for (let i = 0, len = list_yujing.length; i < len; i++) {
    const item = list_yujing[i]
    item.style = { ...commonStyle, ...item.style }
    list_yujing[i] = { ...commonAttr, ...item }
}
export default { eCharts, list_yujing }
