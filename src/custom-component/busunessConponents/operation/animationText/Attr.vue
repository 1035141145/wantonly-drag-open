<template>
    <div class="attr-list v-talbe-attr">
        <CommonAttr></CommonAttr>
        <el-form class="more-form" label-position="left" label-width="100px">
            <el-form-item label="内容:">
                <el-input v-model="propValue.graphic.elements[0].style.text" />
            </el-form-item>
            <el-form-item label="字体:">
                <el-input-number v-model="propValue.graphic.elements[0].style.fontSize" :step="1" :min="0" />
            </el-form-item>
            <el-form-item label="初始颜色:">
                <el-color-picker v-model="propValue.graphic.elements[0].style.stroke" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
            <!-- <el-form-item label="一阶段颜色:">
                <el-color-picker v-model="propValue.graphic.elements[0].keyframeAnimation.keyframes[0].style.fill" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="二阶段颜色:">
                <el-color-picker v-model="propValue.graphic.elements[0].keyframeAnimation.keyframes[1].style.fill" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item> -->
            <el-form-item label="最终颜色:">
                <el-color-picker v-model="propValue.graphic.elements[0].keyframeAnimation.keyframes[2].style.fill" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="动画持续时间:">
                <el-input-number v-model="propValue.graphic.elements[0].keyframeAnimation.duration" :step="1" :min="0" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr'

export default {
    name: 'AnimationTextAttr',
    components: { CommonAttr },
    data() {
        return {
            roseType: false,
            formatter: false,
            // 预定义颜色
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577',
            ],
        }
    },
    computed: {
        propValue() {
            return this.$store.state.curComponent.propValue
        },
    },
    methods: {
        // changeroseType(val) {
        //     if (val) {
        //         this.propValue.series[0].roseType = 'angle'
        //     } else {
        //         this.propValue.series[0].roseType = ''
        //     }
        // },
        // changeformatter(val) {
        //     if (val) {
        //         this.propValue.series[0].label.formatter = '{d}%'
        //     } else {
        //         this.propValue.series[0].label.formatter = false
        //     }
        // },
    },
}
</script>
<style lang="scss" scoped>
.more-form {
    ::v-deep(.el-form-item) {
        margin-bottom: 0 !important;
        padding: 5px 0;
        .el-form-item__content {
            display: flex;
            flex-direction: row-reverse;
        }
    }
}
</style>
