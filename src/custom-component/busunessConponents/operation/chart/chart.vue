<!--
* description: 柱形图
* author: qinweifeng
* createdDate: 2022-09-01
-->
<template>
    <div>
        <div ref="mychart" style="width: 100%; height: 100%" />
    </div>
</template>

<script>
import { debounce, throttle } from '@/utils/debounce.js'
import request from '@/utils/request'
import OnEvent from '@/custom-component/common/OnEvent'

export default {
    name: 'Chart', // 商品化直行率组件
    extends: OnEvent,
    props: {
        propValue: {
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
            key: 0,
            timener: null,
            chartData: this.propValue.data,
            chartStyle: this.propValue.style,
        }
    },
    computed: {
        option() {
            return {
                tooltip: this.chartStyle.tooltip,
                title: this.chartStyle.title,
                grid: this.chartStyle.grid,
                // 图例
                legend: this.chartStyle.legend,
                backgroundColor: this.chartStyle.backgroundColor,
                toolbox: {
                    show: false,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                calculable: true,
                xAxis: this.chartData.direction
                    ? [
                          {
                              type: 'category',
                              // prettier-ignore
                              data: this.chartData.x,
                              axisTick: this.chartStyle.xAxis.axisTick,
                              axisLine: this.chartStyle.xAxis.axisLine,
                              axisLabel: this.chartStyle.xAxis.axisLabel,
                          },
                      ]
                    : this.chartStyle.yAxis,
                yAxis: !this.chartData.direction
                    ? [
                          {
                              type: 'category',
                              // prettier-ignore
                              data: this.chartData.x,
                              axisTick: this.chartStyle.xAxis.axisTick,
                              axisLine: this.chartStyle.xAxis.axisLine,
                              axisLabel: this.chartStyle.xAxis.axisLabel,
                          },
                      ]
                    : this.chartStyle.yAxis,
                // 系列
                series: this.chartData.editableTabs,
                // series: [
                //     {
                //         name: '数据1',
                //         type: 'bar',
                //         data: this.chartData.y1,
                //         markPoint: {
                //             data: [
                //                 { type: 'max', name: 'Max' },
                //                 { type: 'min', name: 'Min' },
                //             ]
                //         },
                //         markLine: {
                //             data: [{ type: 'average', name: 'Avg' }],
                //         },
                //     },
                //     {
                //         name: '数据2',
                //         type: 'bar',
                //         data: this.chartData.y2,
                //         markPoint: {
                //             data: [
                //                 { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                //                 { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
                //             ],
                //         },
                //         markLine: {
                //             data: [{ type: 'average', name: 'Avg' }],
                //         },
                //     },
                // ],
            }
        },
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        changeW_and_H() {
            const width = this.element.style.width
            const height = this.element.style.height
            return { width, height }
        },
    },
    watch: {
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        changeW_and_H: {
            // 监听节流
            handler: throttle(function (newVal) {
                console.log('监听节流')
                this.setcharts()
            }, 500),
            deep: true,
        },
        propValue: {
            // 监听节流
            handler: throttle(function (newVal) {
                console.log('监听节流')
                this.setcharts()
            }, 500),
            deep: true,
        },
        // 'propValue.data.request.ifCheck': {
        //     // 监听节流
        //     handler(newVal) {
        //         this.propValue.data.cancelRequest = request(this.propValue.data.request, this.element.propValue.data, 'x', 'array')
        //     },
        //     deep: true,
        // },
    },
    created() {
        // 注意，修改时接口属性时不会发数据，在预览时才会发
        // 如果要在修改接口属性的同时发请求，需要 watch 一下 request 的属性
        if (this.propValue.data.request) {
            // 第二个参数是要修改数据的父对象，第三个参数是修改数据的 key，第四个数据修改数据的类型
            this.propValue.data.cancelRequest = request(this.propValue.data.request, this.element.propValue.data, 'x', 'array')
        }
        for (let i = 0; i < this.propValue.data.editableTabs.length; i++) {
            const item = this.propValue.data.editableTabs[i]
            item.cancelRequest = request(item.request, item, 'data', 'array')
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize())
        // 组件销毁时取消请求
        this.propValue.data.cancelRequest && this.cancelRequest()
        for (let i = 0; i < this.propValue.data.editableTabs.length; i++) {
            const item = this.propValue.data.editableTabs[i]
            item.cancelRequest = null
        }
    },
    mounted() {
        const that = this
        this.myChart = this.$echarts.init(this.$refs.mychart, 'vintage')
        this.$nextTick(() => {
            that.setcharts()
        })
        // that.timener = setInterval(() => {
        //     that.setcharts()
        // }, 10000)
        window.addEventListener('resize', this.resize())
    },
    methods: {
        // 获取数据
        setcharts() {
            this.myChart.setOption(this.option, true)
            this.resize()
            // this.myChart.clear()
        },
        resize() {
            this.myChart.resize()
        },
    },
}
</script>

<style lang="scss" scoped></style>
