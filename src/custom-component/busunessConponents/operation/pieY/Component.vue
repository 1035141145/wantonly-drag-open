<!--
* description: 饼图
* author: qinweifeng
* createdDate: 2022-09-12
-->
<template>
    <div>
        <div ref="mychart" style="width: 100%; height: 100%" />
    </div>
</template>

<script>
import request from '@/utils/request'
import OnEvent from '@/custom-component/common/OnEvent'
import { debounce, throttle } from '@/utils/debounce.js'

export default {
    name: 'PieY',
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
        }
    },
    computed: {
        option() {
            return this.propValue
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
                // console.log('监听节流')
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
        // that.timener = setInterval(() => {
        //     that.setcharts()
        // }, 10000)
        window.addEventListener('resize', this.resize())
    },
    methods: {
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
