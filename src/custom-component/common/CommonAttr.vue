<template>
    <div class="v-common-attr">
        <el-collapse v-model="activeName" accordion @change="onChange">
            <el-collapse-item title="通用样式" name="style">
                <el-form class="more-form" label-position="left" label-width="100px">
                    <el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
                        <el-color-picker v-if="isIncludesColor(key)" v-model="curComponent.style[key]" :predefine="predefineColors" show-alpha> </el-color-picker>
                        <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
                            <el-option v-for="item in optionMap[key]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <!-- 以下三个是边框和装饰组件调颜色专用  -->
                        <el-color-picker v-else-if="key == 'otherColorLeft'" v-model="curComponent.style[key]" show-alpha :predefine="predefineColors" />
                        <el-color-picker v-else-if="key == 'otherColorRigth'" v-model="curComponent.style[key]" show-alpha :predefine="predefineColors" />
                        <el-color-picker v-else-if="key == 'otherBgColor'" v-model="curComponent.style[key]" show-alpha :predefine="predefineColors" />
                        <el-switch v-else-if="key == 'reverse'" v-model="curComponent.style[key]" active-text="顺时针" inactive-text="逆时针"> </el-switch>
                        <el-input-number v-else-if="key == 'fontWeight'" v-model.number="curComponent.style[key]" :step="100" :max="900" :min="100" />
                        <el-input-number v-else-if="key == 'opacity'" v-model.number="curComponent.style[key]" :step="0.1" :max="1" :min="0" />
                        <el-input-number v-else-if="key == 'dur'" v-model.number="curComponent.style[key]" :step="1" :min="1" />
                        <el-input v-else-if="key == 'borderTitle'" v-model="curComponent.style[key]" />
                        <el-input-number v-else-if="key == 'left'" v-model.number="curComponent.style[key]" type="number" :min="0" :max="canvasStyleData.width - curComponent.style.width" />
                        <el-input-number v-else-if="key == 'top'" v-model.number="curComponent.style[key]" type="number" :min="0" :max="canvasStyleData.height - curComponent.style.height" />
                        <el-input-number v-else-if="key == 'width'" v-model.number="curComponent.style[key]" type="number" :min="0" :max="canvasStyleData.width - curComponent.style.left" />
                        <el-input-number v-else-if="key == 'height'" v-model.number="curComponent.style[key]" type="number" :min="0" :max="canvasStyleData.height - curComponent.style.top" />
                        <el-input-number v-else v-model.number="curComponent.style[key]" type="number" />
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <Request v-if="curComponent.request"></Request>
            <Linkage v-if="curComponent.linkage"></Linkage>
        </el-collapse>
    </div>
</template>

<script>
import { styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from '@/utils/attr'
import Request from './Request'
import Linkage from './Linkage'

export default {
    components: { Request, Linkage },
    data() {
        return {
            optionMap,
            styleData,
            textAlignOptions,
            borderStyleOptions,
            verticalAlignOptions,
            selectKey,
            activeName: 'style',
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
        styleKeys() {
            if (this.curComponent) {
                const curComponentStyleKeys = Object.keys(this.curComponent.style)
                return this.styleData.filter((item) => curComponentStyleKeys.includes(item.key))
            }

            return []
        },
        curComponent() {
            return this.$store.state.curComponent
        },
        canvasStyleData() {
            return this.$store.state.canvasStyleData
        },
    },
    created() {
        // this.activeName = this.curComponent.collapseName
        this.activeName = 'style'
    },
    methods: {
        onChange() {
            this.curComponent.collapseName = this.activeName
        },

        isIncludesColor(str) {
            return str.toLowerCase().includes('color')
        },
    },
}
</script>

<style lang="scss" scoped>
.v-common-attr {
    .el-input-group__prepend {
        padding: 0 10px;
    }
}
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
