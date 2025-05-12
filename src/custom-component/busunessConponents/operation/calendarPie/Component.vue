<!--
* description: 饼图
* author: qinweifeng
* createdDate: 2022-09-12
-->
<template>
    <div>
        <div :key="key" ref="mychart" style="width: 100%; height: 100%" />
    </div>
</template>

<script>
import request from '@/utils/request'
import OnEvent from '@/custom-component/common/OnEvent'
import { debounce, throttle } from '@/utils/debounce.js'

export default {
    name: 'CalendarPie',
    extends: OnEvent,
    props: {
        propValue: {
            type: Object,
            default: () => {},
        },
        request: {
            type: Object,
            default: () => {},
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            myChart: null,
            cancelRequest: null,
            // cellSize: [100, 100], // 设置日历格大小
            pieRadius: 30, // 饼图半径
            mydata: [
                [10, 2, 0, 12],
                [0, 1, 0, 23],
                [0, 2, 0, 22],
                [0, 2, 1.5, 20.5],
                [0, 3, 1.5, 19.5],
                [10, 1, 1.5, 11.5],
                [0, 2, 1.5, 20.5],
                [10, 2, 0, 12],
                [0, 1, 0, 23],
                [0, 4, 0, 20],
                [0, 2, 1.5, 20.5],
                [0, 1, 1.5, 21.5],
                [9, 2, 1.5, 11.5],
                [0, 5, 1.5, 17.5],
                [10, 1, 0, 13],
                [0, 5, 0, 19],
                [0, 1, 0, 23],
                [0, 1, 1.5, 21.5],
                [0, 5, 1.5, 17.5],
                [9, 2, 1.5, 11.5],
                [0, 1, 1.5, 21.5],
                [9, 1, 0, 14],
                [0, 1, 0, 23],
                [0, 3, 0, 21],
                [0, 1, 1.5, 21.5],
                [0, 4, 1.5, 18.5],
                [10, 2, 1.5, 10.5],
                [0, 4, 1.5, 18.5],
                [10, 1, 0, 11],
                [0, 4, 0, 20],
                [0, 12, 0, 12],
            ],
            month: '2022-05',
            nextMonth: '',
            key: 0,
        }
    },
    computed: {
        // option() {
        //     return this.propValue

        //     }
        // },
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        changeW_and_H() {
            const width = this.element.style.width
            const height = this.element.style.height
            return { width, height }
        },
        cellSize() {
            return [this.element.style.width / 7 - 10, this.element.style.height / 5.5 - 30]
        },
    },
    watch: {
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        changeW_and_H: {
            // 监听节流
            handler: debounce(function (newVal) {
                console.log('监听节流')
                // this.myChart.dispose()
                // this.setcharts()
                this.key++
            }, 500),
            deep: true,
        },
        propValue: {
            // 监听节流
            handler: throttle(function (newVal) {
                console.log('监听节流')
                // this.myChart.dispose()
                // this.setcharts()
                this.key++
            }, 500),
            deep: true,
        },
        key: {
            handler(val) {
                console.log(val)
                setTimeout(() => {
                    this.setcharts()
                }, 500)
            },
        },
    },
    created() {
        // if (this.request) {
        //     this.cancelRequest = request(this.request, this.propValue, 'data')
        // }
    },
    beforeDestroy() {
        // this.request && this.cancelRequest()
    },
    mounted() {
        const that = this
        this.myChart = this.$echarts.init(this.$refs.mychart, 'vintage')
        this.$nextTick(() => {
            that.setcharts()
        })
    },
    methods: {
        // 月份加1
        getNextMonth() {
            let currentDate = new Date(this.month) // 将日期格式转换为 Mon Apr 01 2019 08:00:00 GMT+0800 (中国标准时间)
            // 月份加1
            let nextDate = currentDate.setMonth(currentDate.getMonth() + 1) // 输出日期格式为毫秒形式1556668800000
            nextDate = new Date(nextDate)
            let nextYear = nextDate.getFullYear()
            let nextMonth = this.checkMonth(nextDate.getMonth() + 1) // 因日期中的月份表示为0-11，所以要显示正确的月份，需要 + 1
            nextDate = nextYear + '-' + nextMonth // "2019-05"
            console.log(nextDate)
            return nextDate
        },
        checkMonth(i) {
            if (i < 10) {
                i = '0' + i
            }
            return i
        },

        // 日历范围
        getVirtulData() {
            let date = +this.$echarts.number.parseDate(this.month + '-01')
            let end = +this.$echarts.number.parseDate(this.getNextMonth() + '-01')
            let dayTime = 3600 * 24 * 1000
            let data = []
            for (let time = date; time < end; time += dayTime) {
                data.push([this.$echarts.format.formatTime('yyyy-MM-dd', time), Math.floor(Math.random() * 10000)])
            }
            return data
        },
        getPieSeries(scatterData, chart) {
            let _this = this
            return this.$echarts.util.map(scatterData, (item, index) => {
                let center = chart.convertToPixel('calendar', item)
                if (index < 15) {
                    return {
                        id: index + 'pie',
                        type: 'pie',
                        center,
                        label: {
                            normal: {
                                formatter: '{c}',
                                position: 'inside',
                            },
                        },
                        radius: _this.cellSize[0] <= _this.cellSize[1] + 20 ? _this.cellSize[0] / 2 - 10 : _this.cellSize[1] / 2 - 10,
                        data: [
                            { name: '工作', value: Math.round(Math.random() * 24) },
                            { name: '娱乐', value: Math.round(Math.random() * 24) },
                            { name: '睡觉', value: Math.round(Math.random() * 24) },
                        ],
                    }
                }
            })
        },
        getPieSeriesUpdate(scatterData, chart) {
            return this.$echarts.util.map(scatterData, (item, index) => {
                let center = chart.convertToPixel('calendar', item)
                return {
                    id: index + 'pie',
                    center,
                }
            })
        },
        setcharts() {
            let _this = this
            let myChart = this.$echarts.init(this.$refs.mychart)
            let scatterData = this.getVirtulData()
            console.log(scatterData)
            let option = {
                tooltip: {},
                legend: {
                    data: ['工作', '娱乐', '睡觉'],
                    top: 5,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 500,
                    },
                },
                calendar: {
                    top: 80,
                    left: 35,
                    orient: 'vertical', // 设置坐标的方向，既可以横着也可以竖着
                    cellSize: _this.cellSize, // 设置日历格大小
                    yearLabel: {
                        show: false,
                        textStyle: {
                            fontSize: 30,
                        },
                    },
                    dayLabel: {
                        margin: 20,
                        firstDay: 1,
                        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                        show: true,
                        color: '#fff',
                        fontSize: '14',
                    },
                    monthLabel: {
                        show: false,
                    },
                    range: [this.month],
                },
                series: [
                    {
                        id: 'label',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter(params) {
                                    return _this.$echarts.format.formatTime('dd', params.value[0])
                                },
                                offset: [-_this.cellSize[0] / 2 + 10, -_this.cellSize[1] / 2 + 10],
                                // 几号字体颜色
                                textStyle: {
                                    color: 'blue',
                                    fontSize: 14,
                                },
                            },
                        },
                        data: scatterData, // 日历范围
                    },
                ],
            }
            if (!myChart.inNode) {
                // eslint-disable-next-line vars-on-top
                let _this = this
                let pieInitialized
                setTimeout(() => {
                    pieInitialized = true
                    myChart.setOption({
                        series: _this.getPieSeries(scatterData, myChart),
                    })
                }, 10)
                // myChart.onresize = function () {
                //     if (pieInitialized) {
                //         myChart.setOption({
                //             series: _this.getPieSeriesUpdate(scatterData, myChart),
                //         })
                //     }
                // }
            }
            myChart.setOption(option)
        },
    },
}
</script>

<style lang="scss" scoped>
.v-table {
    border-collapse: collapse;
    table-layout: fixed;
    word-break: break-all;
    word-wrap: break-word;

    td {
        border: 1px solid #ebeef5;
        height: 40px;
        width: 60px;
        padding: 10px;
    }

    .bold {
        font-weight: bold;
    }

    .stripe {
        background-color: #fafafa;
    }
}
</style>
