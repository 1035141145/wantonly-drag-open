<template>
    <div :class="{ 'attr-container': theme == 'light', 'attr-container-dark': theme == 'dark' }">
        <p class="title">画布设置</p>
        <el-form style="padding: 20px">
            <el-form-item v-for="(key, index) in Object.keys(options)" :key="index" :label="options[key]">
                <el-color-picker v-if="isIncludesColor(key)" v-model="canvasStyleData[key]" :predefine="predefineColors" show-alpha @change="changeColor"></el-color-picker>
                <el-input-number v-else-if="key == 'opacity'" v-model.number="canvasStyleData[key]" :step="0.1" :max="1" :min="0" />
                <el-select v-else-if="key == 'url'" v-model.number="canvasStyleData[key]" placeholder="请选择" @change="changeurl">
                    <el-option v-for="item in themeList" :key="item.key" :label="item.label" :value="item.key"> </el-option>
                </el-select>
                <el-input v-else v-model.number="canvasStyleData[key]" type="number" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            options: {
                // color: '颜色',
                url: '主题',
                backgroundColor: '背景色',
                opacity: '不透明度',
                // fontSize: '字体大小',
            },
            themeList: [
                { label: '梦幻星空', key: '/image/xingkong.png' },
                { label: '蓝色妖姬', key: '/image/lanse.png' },
            ],
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
        ...mapState(['canvasStyleData']),
        theme() {
            return this.$store.state.theme
        },
    },
    methods: {
        isIncludesColor(str) {
            return str.toLowerCase().includes('color')
        },
        changeurl() {
            this.canvasStyleData.backgroundColor = ''
        },
        changeColor() {
            this.canvasStyleData.url = ''
            console.log(this.canvasStyleData)
        },
    },
}
</script>

<style lang="scss">
.attr-container {
    .title {
        text-align: center;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dcdfe6;
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }
}
.attr-container-dark {
    .title {
        text-align: center;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid rgba(100, 96, 96, 0.678);
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    }
}
</style>
