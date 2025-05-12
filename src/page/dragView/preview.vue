<template>
    <div
        :key="key"
        class="bg"
        :style="{
            background: canvasStyleData.url ? `url(${canvasStyleData.url})` : canvasStyleData.backgroundColor,
            'background-size': canvasStyleData.url ? '100% 100%' : '',
            'background-repeat': canvasStyleData.url ? 'no-repeat' : '',
        }"
    >
        <div ref="container" class="canvas-container" :style="{ width: width, height: height }">
            <div
                class="canvas"
                :style="{
                    ...getCanvasStyle(canvasStyleData),
                }"
            >
                <ComponentWrapper v-for="(item, index) in copyData" :key="index" :config="item" />
            </div>
        </div>
    </div>
</template>

<script>
import { getStyle, getCanvasStyle } from '@/utils/style'
import { mapState } from 'vuex'
import ComponentWrapper from '@/components/Editor/ComponentWrapper'
import { changeStyleWithScale } from '@/utils/translate'
import { toPng } from 'html-to-image'
import { deepCopy, pageScale } from '@/utils/utils'
import { debounce } from '@/utils/debounce.js'

export default {
    components: { ComponentWrapper },
    props: {
        isScreenshot: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            url: '/image/xingkong.png',
            copyData: [],
            componentData: [],
            canvasStyleData: [],
            width: 1920,
            height: 1080,
            key: 0,
        }
    },
    // computed: mapState(['componentData', 'canvasStyleData']),
    created() {
        this.componentData = JSON.parse(localStorage.getItem('canvasData'))
        this.canvasStyleData = JSON.parse(localStorage.getItem('canvasStyle'))
        // this.$set(this, 'copyData', deepCopy(this.componentData))
        window.addEventListener('resize', this.resizeCanvas)
    },
    mounted() {
        this.$nextTick(() => {
            this.handleScaleChange()
        })
        window.addEventListener('resize', this.resizeCanvas())
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeCanvas())
    },
    methods: {
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,
        close() {
            this.$emit('close')
        },

        htmlToImage() {
            toPng(this.$refs.container.querySelector('.canvas'))
                .then((dataUrl) => {
                    const a = document.createElement('a')
                    a.setAttribute('download', 'screenshot')
                    a.href = dataUrl
                    a.click()
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error)
                })
                .finally(this.close)
        },
        resizeCanvas() {
            const width = document.documentElement.clientWidth
            const height = document.documentElement.clientHeight
            console.log(width, height)
            this.width = width
            this.height = height
            this.handleScaleChange()
        },
        handleScaleChange() {
            const componentData = deepCopy(this.componentData)
            let width_p = this.canvasStyleData.width / this.width
            let height_p = this.canvasStyleData.height / this.height
            // console.log(this.width, this.height)
            componentData.forEach((component) => {
                const left = component.style.left
                const top = component.style.top
                const height = component.style.height
                const width = component.style.width
                component.style.left = left / width_p
                component.style.top = top / height_p
                component.style.height = height / height_p
                component.style.width = width / width_p
            })
            // this.$store.commit('setComponentData', componentData)
            // this.$set(this, 'copyData', deepCopy(componentData))
            this.copyData = componentData
            this.key++
        },
    },
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    position: relative;

    .canvas-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .canvas {
            // background: #fff;
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    }
}
</style>
