<template>
    <div>
        <dv-border-box-2 :key="key" :color="getColor" :background-color="getBgColor" />
    </div>
</template>
<script>
import OnEvent from '@/custom-component/common/OnEvent'
import { debounce, throttle } from '@/utils/debounce.js'

export default {
    name: 'BorderBox2',
    extends: OnEvent,
    props: {
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            this_style: this.element.style,
            key: 0,
        }
    },
    computed: {
        getColor() {
            if (this.element.style.otherColorLeft || this.element.style.otherColorRigth) {
                const obj = [this.element.style.otherColorLeft, this.element.style.otherColorRigth]
                return obj
            }
            return null
        },
        getBgColor() {
            if (this.element.style.otherBgColor) {
                const str = this.element.style.otherBgColor
                return str
            }
            return 'rgba(144, 240, 144, 0)'
        },
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        changeW_and_H() {
            const width = this.element.style.width
            const height = this.element.style.height
            return { width, height }
        },
    },
    watch: {
        changeW_and_H: {
            // 监听节流
            handler: throttle(function (newVal) {
                this.key++
            }, 1000),
            deep: true,
        },
    },
    mounted() {
        // console.log(this.element.style)
    },
}
</script>

<style lang="scss" scoped></style>
