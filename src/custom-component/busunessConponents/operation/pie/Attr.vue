<template>
    <div class="attr-list v-talbe-attr">
        <CommonAttr></CommonAttr>
        <EditPie></EditPie>
        <el-form class="more-form" label-position="left" label-width="100px">
            <el-form-item prop="name" label="背景颜色:">
                <el-color-picker v-model="propValue.backgroundColor" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="南丁格尔图:">
                <el-switch v-model="roseType" @change="changeroseType"></el-switch>
            </el-form-item>
            <el-form-item label="半径:">
                <el-input v-model="propValue.series[0].radius" placeholder="请输入百分比"> </el-input>
            </el-form-item>
            <el-form-item label="top:">
                <el-input v-model="propValue.series[0].top" placeholder="请输入百分比或数字"> </el-input>
            </el-form-item>
            <el-form-item label="left:">
                <el-input v-model="propValue.series[0].left" placeholder="请输入百分比或数字"> </el-input>
            </el-form-item>
            <el-form-item label="图例排列:">
                <el-select v-model="propValue.legend.orient" placeholder="请选择">
                    <el-option label="竖向" value="vertical"></el-option>
                    <el-option label="横向" value="horizontal"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图例位置:">
                <el-select v-model="propValue.legend.left" placeholder="请选择">
                    <el-option label="左" value="left"></el-option>
                    <el-option label="右" value="right"></el-option>
                    <el-option label="中" value="center"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图例字体:">
                <el-input-number v-model="propValue.legend.textStyle.fontSize" :step="1" :min="0" />
            </el-form-item>
            <el-form-item label="图例字体颜色:">
                <el-color-picker v-model="propValue.legend.textStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="显示位置:">
                <el-select v-model="propValue.series[0].label.position" placeholder="请选择">
                    <el-option label="内部显示" value="inside"></el-option>
                    <el-option label="外部显示" value="outside"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="百分比显示:">
                <el-switch v-model="formatter" @change="changeformatter"></el-switch>
            </el-form-item>
            <el-form-item label="显示字体:">
                <el-input-number v-model="propValue.series[0].label.fontSize" :step="1" :min="0" />
            </el-form-item>
            <el-form-item label="显示字体颜色:">
                <el-color-picker v-model="propValue.series[0].label.color" :predefine="predefineColors" show-alpha></el-color-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr'
import EditPie from './EditPie'

export default {
    name: 'PieAttr',
    components: { EditPie, CommonAttr },
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
        changeroseType(val) {
            if (val) {
                this.propValue.series[0].roseType = 'angle'
            } else {
                this.propValue.series[0].roseType = ''
            }
        },
        changeformatter(val) {
            if (val) {
                this.propValue.series[0].label.formatter = '{d}%'
            } else {
                this.propValue.series[0].label.formatter = false
            }
        },
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
