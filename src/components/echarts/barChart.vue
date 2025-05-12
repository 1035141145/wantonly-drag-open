<template>
    <div :id="id" class="orderArea orderbarArea" />
</template>

<script>
import echartsTheme from './theme/westeros.json'
import { countMonthly, regMonthly } from '@/api/user'

export default {
    name: 'BarChat',
    data() {
        return {
            id: 'barChart',
            myChart: null,
            x_List: [],
            Visits: [],
            Downloads: [],
        }
    },
    watch: {},
    mounted() {
        this.getcountMonthly()
    },
    beforeDestroy() {
        if (!this.myChart) {
            return
        }
        this.myChart.dispose()
        this.myChart = null
    },
    methods: {
        getcountMonthly() {
            countMonthly({}).then((res) => {
                const thisData = res.data
                thisData.forEach((item) => {
                    const x = item._id.year + '年' + item._id.month + '月'
                    this.x_List.push(x)
                    const y = item.count
                    this.Visits.push(y)
                    this.getregMonthly()
                })
            })
        },
        getregMonthly() {
            regMonthly({}).then((res) => {
                const thisData = res.data
                thisData.forEach((item) => {
                    const x = item._id.year + '年' + item._id.month + '月'
                    const y = item.count
                    this.x_List.forEach((element, index) => {
                        if (element == x) {
                            this.Downloads[index] = y
                        }
                    })
                })
                this.loadChart()
            })
        },
        loadChart() {
            this.$nextTick(() => {
                this.$echarts.registerTheme('westeros', echartsTheme)
                this.myChart = this.$echarts.init(document.getElementById(this.id), 'westeros')
                this.myChart.setOption(this.initOption())
            })
        },
        initOption() {
            const option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['访问量', '注册量'],
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.x_List,
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '访问量',
                        type: 'bar',
                        data: this.Visits,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' },
                            ],
                        },
                    },
                    {
                        name: '注册量',
                        type: 'bar',
                        data: this.Downloads,
                        markPoint: {
                            data: [
                                { name: '最高', value: 182.2, xAxis: 7, yAxis: 183 },
                                { name: '最低', value: 2.3, xAxis: 11, yAxis: 3 },
                            ],
                        },
                    },
                ],
            }
            return option
        },
    },
}
</script>

<style lang="scss"></style>
