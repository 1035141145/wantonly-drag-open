<template>
    <div :class="{ toolbar: theme == 'light', 'toolbar-dark': theme == 'dark' }" :style="{ background: theme == 'light' ? '#fff' : 'rgba(78, 72, 72, 1)' }">
        <div>
            <el-button type="text" icon="el-icon-s-home" @click="backHome">主页</el-button>
            <el-button type="text" icon="el-icon-caret-left" @click="undo">撤消</el-button>
            <el-button type="text" icon="el-icon-caret-right" @click="redo">重做</el-button>
            <label for="input" type="text" class="insert" :style="{ background: theme == 'light' ? '#fff' : 'rgba(78, 72, 72, 1)' }">
                <i class="el-icon-upload"></i> 插入图片
                <input id="input" type="file" hidden @change="handleFileChange" />
            </label>

            <el-button type="text" icon="el-icon-s-platform" @click="preview(false)">预览</el-button>
            <el-button type="text" icon="el-icon-folder-checked" @click="save">保存</el-button>
            <el-button type="text" icon="el-icon-error" @click="clearCanvas">清空画布</el-button>
            <el-button type="text" icon="el-icon-s-help" :disabled="!areaData.components.length" @click="compose">组合</el-button>
            <el-button type="text" icon="el-icon-pie-chart" :disabled="!curComponent || curComponent.isLock || curComponent.component != 'Group'" @click="decompose"> 拆分 </el-button>

            <el-button type="text" icon="el-icon-lock" :disabled="!curComponent || curComponent.isLock" @click="lock"> 锁定 </el-button>
            <el-button type="text" icon="el-icon-unlock" :disabled="!curComponent || !curComponent.isLock" @click="unlock"> 解锁 </el-button>
            <el-button type="text" icon="el-icon-camera-solid" @click="preview(true)"> 截图 </el-button>
            <el-button type="text" icon="el-icon-full-screen" @click="fullScreen">全屏</el-button>

            <el-dropdown style="margin-left: 10px" trigger="click" class="ratio" @command="handleCommand">
                <!-- <span class="iconfont icon-agora_chaoqing-gaofenbianshuai" style="font-size: 14px" /> -->
                <span class="el-dropdown-link">分辨率<i class="el-icon-arrow-down el-icon--right" /> </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in piexls" :key="index" :command="index">{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="canvas-config">
                <!-- <span>分辨率</span> -->
                <input ref="fenbianlv" v-model="canvasStyleData.width" :disabled="disabled" />
                <span>*</span>
                <input v-model="canvasStyleData.height" :disabled="disabled" />
            </div>
            <el-button style="margin-left: 10px" type="text" icon="el-icon-s-tools" @click="setting">设置</el-button>

            <!-- 
            <div class="canvas-config">
                <span>比例</span>
                <input v-model="scale" @input="handleScaleChange" /> %
            </div> -->
        </div>
        <div>
            <span class="iconfont theme-icon" :class="{ 'icon-taiyang': theme == 'light', 'icon-yueliang': theme == 'dark' }" @click="changeTheme"></span>
        </div>

        <!-- 预览 -->
        <Preview v-if="isShowPreview" :is-screenshot="isScreenshot" @close="handlePreviewChange" />
    </div>
</template>

<script>
import generateID from '@/utils/generateID'
import toast from '@/utils/toast'
import { mapState } from 'vuex'
import Preview from '@/components/Editor/Preview'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import eventBus from '@/utils/eventBus'
import { deepCopy, $ } from '@/utils/utils'
import { divide, multiply } from 'mathjs'
import { debounce, throttle } from '@/utils/debounce.js'

export default {
    components: { Preview },
    data() {
        return {
            isShowPreview: false,
            needToChange: ['top', 'left', 'width', 'height', 'fontSize'],
            scale: '100%',
            timer: null,
            isScreenshot: false,
            piexls: [
                { label: '本设备', width: window.screen.width * window.devicePixelRatio, height: window.screen.height * window.devicePixelRatio },
                { label: '4K', width: 3840, height: 2160, value: '3840X2160' },
                { label: '2k', width: 2048, height: 1080, value: '2048X1080' },
                { label: '1080P', width: 1920, height: 1080, value: '1920X1080' },
                { label: '720P', width: 1366, height: 768, value: '1366X768' },
                { label: 'iPhoneXR', width: 414, height: 896, value: '414X896' },
                { label: 'iPhoneSE', width: 375, height: 667, value: '375X667' },
                { label: 'iPhone12Pro', width: 390, height: 884, value: '390X884' },
                { label: 'GalaxyS8+', width: 360, height: 740, value: '360X740' },
                { label: 'GalaxyS20Ultra+', width: 412, height: 915, value: 'X' },
                { label: 'iPadAir', width: 820, height: 1180, value: '820X1180' },
                { label: 'iPadMini', width: 768, height: 1024, value: '768X1024' },
                { label: 'SurfacePro7', width: 912, height: 1368, value: '912X1368' },
                { label: 'NestHub', width: 1024, height: 600, value: '1024X600' },
                { label: 'NestMax', width: 1028, height: 800, value: '1028X800' },
                { label: '自定义' },
            ],
            disabled: true, // 是否自定义分辨率
        }
    },
    computed: {
        ...mapState(['componentData', 'canvasStyleData', 'areaData', 'curComponent', 'curComponentIndex']),
        theme() {
            return this.$store.state.theme
        },
    },
    watch: {
        // 计算组件宽高，便于只监听宽高，不然监听一整个style会造成卡顿
        // changeW_and_H: {
        //     // 监听节流
        //     handler: throttle(function (newVal) {
        //         console.log('监听节流')
        //         this.setcharts()
        //     }, 500),
        //     deep: true,
        // },
    },
    created() {
        eventBus.$on('preview', this.preview)
        eventBus.$on('save', this.save)
        eventBus.$on('clearCanvas', this.clearCanvas)
        this.scale = this.canvasStyleData.scale
    },
    mounted() {
        this.canvasStyleData.width = window.screen.width * window.devicePixelRatio
        this.canvasStyleData.height = window.screen.height * window.devicePixelRatio
    },
    methods: {
        format(value) {
            return multiply(value, divide(parseFloat(this.scale), 100))
        },

        getOriginStyle(value) {
            return divide(value, divide(parseFloat(this.canvasStyleData.scale), 100))
        },

        handleScaleChange() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // 画布比例设一个最小值，不能为 0
                // eslint-disable-next-line no-bitwise
                this.scale = ~~this.scale || 1
                const componentData = deepCopy(this.componentData)
                componentData.forEach((component) => {
                    Object.keys(component.style).forEach((key) => {
                        if (this.needToChange.includes(key)) {
                            if (key === 'fontSize' && component.style[key] === '') return

                            // 根据原来的比例获取样式原来的尺寸
                            // 再用原来的尺寸 * 现在的比例得出新的尺寸
                            component.style[key] = this.format(this.getOriginStyle(component.style[key]))
                        }
                    })
                })

                this.$store.commit('setComponentData', componentData)
                // 更新画布数组后，需要重新设置当前组件，否则在改变比例后，直接拖动圆点改变组件大小不会生效 https://github.com/woai3c/visual-drag-demo/issues/74
                this.$store.commit('setCurComponent', { component: componentData[this.curComponentIndex], index: this.curComponentIndex })
                this.$store.commit('setCanvasStyle', {
                    ...this.canvasStyleData,
                    scale: this.scale,
                })
            }, 1000)
        },

        lock() {
            this.$store.commit('lock')
        },

        unlock() {
            this.$store.commit('unlock')
        },

        compose() {
            this.$store.commit('compose')
            this.$store.commit('recordSnapshot')
        },

        decompose() {
            this.$store.commit('decompose')
            this.$store.commit('recordSnapshot')
        },

        undo() {
            this.$store.commit('undo')
        },

        redo() {
            this.$store.commit('redo')
        },

        setting() {
            this.$store.state.curComponent = null
        },

        handleFileChange(e) {
            const file = e.target.files[0]
            if (!file.type.includes('image')) {
                toast('只能插入图片')
                return
            }

            const reader = new FileReader()
            reader.onload = (res) => {
                const fileResult = res.target.result
                const img = new Image()
                img.onload = () => {
                    this.$store.commit('addComponent', {
                        component: {
                            ...commonAttr,
                            id: generateID(),
                            component: 'Picture',
                            label: '图片',
                            icon: '',
                            propValue: {
                                url: fileResult,
                                flip: {
                                    horizontal: false,
                                    vertical: false,
                                },
                            },
                            style: {
                                ...commonStyle,
                                top: 0,
                                left: 0,
                                width: img.width,
                                height: img.height,
                            },
                        },
                    })

                    this.$store.commit('recordSnapshot')

                    // 修复重复上传同一文件，@change 不触发的问题
                    $('#input').setAttribute('type', 'text')
                    $('#input').setAttribute('type', 'file')
                }

                img.src = fileResult
            }

            reader.readAsDataURL(file)
        },

        preview(isScreenshot) {
            // this.isScreenshot = isScreenshot
            // this.isShowPreview = true
            // this.$store.commit('setEditMode', 'preview')
            // this.$router.push({ name: 'preview', params: { setid: 111222 } })
            localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))

            const { href } = this.$router.resolve({
                // 组件路径，不需要引入该组件，只需要在路由创建该组件的路径
                name: 'preview',
                // query 参数，可以使用 this.$route.query.id 获取参数
                params: {
                    id: 96,
                },
            })
            window.open(href, '_blank') // 打开新的窗口
        },

        save() {
            localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
            this.$message.success('保存成功')
        },

        clearCanvas() {
            this.$store.commit('setCurComponent', { component: null, index: null })
            this.$store.commit('setComponentData', [])
            this.$store.commit('recordSnapshot')
        },

        handlePreviewChange() {
            this.isShowPreview = false
            this.$store.commit('setEditMode', 'edit')
        },

        // 全屏
        fullScreen() {
            const el = document.querySelector('.full_Screen')
            if (document.fullscreenEnabled && el) {
                el.requestFullscreen()
            }
        },
        // 选择分辨率
        handleCommand(index) {
            if (this.piexls[index].label == '自定义') {
                this.disabled = false
                this.$refs.fenbianlv.focus()
            } else {
                this.componentDataChange(this.piexls[index].width, this.piexls[index].height)
                this.canvasStyleData.width = this.piexls[index].width
                this.canvasStyleData.height = this.piexls[index].height
            }
            console.log(this.canvasStyleData)
        },
        // 切换分辨率后从新计算组件组件样式
        componentDataChange(piexls_width, piexls_height) {
            const componentData = deepCopy(this.componentData)
            let width_p = this.canvasStyleData.width / piexls_width
            let height_p = this.canvasStyleData.height / piexls_height
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
            this.$store.commit('setComponentData', componentData)
        },
        backHome() {
            localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
            this.$message.success('已为您保存当前数据到缓存')
            setTimeout(() => {
                this.$router.push({ path: '/index/index' })
            }, 1000)
        },

        changeTheme() {
            if (this.theme === 'light') {
                this.$store.state.theme = 'dark'
            } else {
                this.$store.state.theme = 'light'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    white-space: nowrap;
    overflow-x: auto;
    border-bottom: 1px solid #dcdfe6;
    .el-button--text {
        color: #303133;
    }
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
        color: rgba(161, 159, 159, 0.925) !important;
    }
    .canvas-config {
        display: inline-block;
        color: #303133;
        font-size: 14px;
        input {
            width: 50px;
            margin-left: 4px;
            font-size: 12px;
            outline: none;
            padding: 0 5px;
            border: 1px solid rgb(87, 81, 81);
            color: rgba(100, 96, 96, 0.678);
            // background-color: rgba(221, 221, 221, 0);
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        // border: 1px solid #dcdfe6;
        color: #303133;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 3px;
        // margin-left: 10px;

        // &:active {
        //     color: #3a8ee6;
        //     border-color: #3a8ee6;
        //     outline: 0;
        // }

        // &:hover {
        //     background-color: #ecf5ff;
        //     color: #3a8ee6;
        // }
    }
    .el-button--text {
        // color: #000;
        font-size: 14px;
    }
    .el-dropdown {
        color: rgb(22, 21, 21);
        font-size: 14px;
    }
    .theme-icon {
        color: rgb(218, 221, 10);
        font-size: 26px;
    }
}
.toolbar-dark {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    color: #000;
    border-bottom: 1px solid rgba(100, 96, 96, 0.678);
    .el-button--text {
        color: #ddd;
    }
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
        color: rgba(161, 159, 159, 0.925) !important;
    }
    .canvas-config {
        display: inline-block;
        color: #ddd;
        font-size: 14px;
        input {
            width: 50px;
            margin-left: 4px;
            font-size: 12px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #fff;
            background-color: rgba(221, 221, 221, 0);
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        // border: 1px solid #dcdfe6;
        color: #ddd;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 3px;
        // margin-left: 10px;

        // &:active {
        //     color: #3a8ee6;
        //     border-color: #3a8ee6;
        //     outline: 0;
        // }

        // &:hover {
        //     background-color: #ecf5ff;
        //     color: #3a8ee6;
        // }
    }
    .el-button--text {
        // color: #000;
        font-size: 14px;
    }
    .el-dropdown {
        color: #ddd;
        font-size: 14px;
    }
    .theme-icon {
        color: rgb(31, 143, 218);
        font-size: 18px;
    }
}
.fenbianlv {
    display: flex;
    align-items: center;
}
</style>
