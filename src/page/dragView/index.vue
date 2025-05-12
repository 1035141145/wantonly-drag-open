<template>
    <div :class="{ home: theme == 'light', 'home-dark': theme == 'dark' }" :style="{ background: theme == 'light' ? '#fff' : 'rgba(78, 72, 72, 1)' }">
        <Toolbar />
        <main>
            <!-- 左侧组件列表 -->
            <section class="left" :style="{ width: leftwidth, background: theme == 'light' ? '#fff' : 'rgba(78, 72, 72, 1)' }">
                <el-tooltip class="item" effect="light" :content="fold ? '展开' : '收起 '" placement="right">
                    <i :class="fold ? 'el-icon-arrow-right' : 'el-icon-arrow-left '" class="fold" @click="fold = !fold"></i>
                </el-tooltip>
                <ComponentList :style="{ visibility: fold ? 'hidden' : '' }" />
                <RealTimeComponentList :style="{ visibility: fold ? 'hidden' : '' }" />
            </section>
            <!-- 中间画布 -->
            <section class="center full_Screen" :style="{ 'margin-left': leftwidth, 'margin-right': rightwidth }">
                <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown" @mouseup="deselectCurComponent">
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right" :style="{ width: rightwidth, background: theme == 'light' ? '#fff' : 'rgba(78, 72, 72, 1)' }">
                <el-tooltip class="item" effect="light" :content="fold2 ? '展开' : '收起 '" placement="left">
                    <i :class="!fold2 ? 'el-icon-arrow-right' : 'el-icon-arrow-left '" class="fold" @click="fold2 = !fold2"></i>
                </el-tooltip>
                <el-tabs v-if="curComponent" v-model="activeName" :style="{ visibility: fold2 ? 'hidden' : '' }">
                    <el-tab-pane label="属性" name="attr">
                        <component :is="curComponent.component + 'Attr'" />
                    </el-tab-pane>
                    <el-tab-pane label="动画" name="animation" style="padding-top: 20px">
                        <AnimationList />
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events" style="padding-top: 20px">
                        <EventList />
                    </el-tab-pane>
                </el-tabs>
                <CanvasAttr v-else :style="{ visibility: fold2 ? 'hidden' : '' }"></CanvasAttr>
            </section>
        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import CanvasAttr from '@/components/CanvasAttr'

export default {
    components: { Editor, ComponentList, AnimationList, EventList, Toolbar, RealTimeComponentList, CanvasAttr },
    data() {
        return {
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            fold: false,
            fold2: false,
        }
    },
    computed: {
        ...mapState(['componentData', 'curComponent', 'isClickComponent', 'canvasStyleData', 'editor']),
        leftwidth() {
            return this.fold ? '0px' : '200px'
        },
        rightwidth() {
            return this.fold2 ? '0px' : '280px'
        },
        theme() {
            return this.$store.state.theme
        },
    },
    created() {
        this.restore()
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        restore() {
            // 用保存的数据恢复画布
            if (localStorage.getItem('canvasData')) {
                this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
            }

            if (localStorage.getItem('canvasStyle')) {
                this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            }
        },

        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                // const component = deepCopy(componentList[index])
                const component = deepCopy(JSON.parse(e.dataTransfer.getData('id')))
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()
                this.$store.commit('addComponent', { component })
                this.$store.commit('recordSnapshot')
            }
        },

        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown(e) {
            e.stopPropagation()
            this.$store.commit('setClickComponentStatus', false)
            this.$store.commit('setInEditorStatus', true)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                this.$store.commit('setCurComponent', { component: null, index: null })
            }

            // 0 左击 1 滚轮 2 右击
            if (e.button != 2) {
                this.$store.commit('hideContextMenu')
            }
        },
    },
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: rgba(100, 96, 96, 0.678);

    main {
        height: calc(100% - 35px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;

            & > div {
                overflow: auto;

                &:first-child {
                    border-bottom: 1px solid rgb(102, 97, 97);
                }
            }
            .item {
                position: absolute;
                right: -20px;
                top: 50%;
                transform: translate(0 -50%);
            }
        }

        .right {
            position: absolute;
            height: 100%;
            width: 288px;
            right: 0;
            top: 0;
            .is-active {
                color: rgb(20, 160, 224) !important;
                font-size: 14px;
                font-weight: 500;
            }
            .el-select {
                width: 100%;
            }
            .item {
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translate(0 -50%);
            }
        }

        .center {
            margin-left: 200px;
            margin-right: 288px;
            background: #fff;
            height: 100%;
            overflow: auto;
            // padding: 20px;
            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }

    .global-attr {
        padding: 10px;
    }
    .fold {
        font-size: 20px;
        margin: 5px 0;
        color: #fff;
        z-index: 10;
    }
}
.home-dark {
    height: 100vh;
    background: rgba(100, 96, 96, 0.678);

    main {
        height: calc(100% - 35px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;

            & > div {
                overflow: auto;

                &:first-child {
                    border-bottom: 1px solid #ddd;
                }
            }
            .item {
                position: absolute;
                right: -20px;
                top: 50%;
                transform: translate(0 -50%);
            }
        }

        .right {
            position: absolute;
            height: 100%;
            width: 288px;
            right: 0;
            top: 0;
            .is-active {
                color: #fff !important;
                font-size: 14px;
                font-weight: 500;
            }
            .el-tabs__item:hover {
                color: #fff !important;
            }
            .el-tabs__item {
                color: rgba(255, 255, 255, 0.596);
                font-size: 15px;
                font-weight: 600;
            }
            .el-tabs__nav-wrap::after {
                background-color: rgba(100, 96, 96, 0.678);
            }
            .el-tabs__active-bar {
                color: #fff !important;
                background-color: #fff !important;
            }
            .el-select {
                width: 100%;
            }
            .item {
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translate(0 -50%);
            }
        }

        .center {
            margin-left: 200px;
            margin-right: 288px;
            background: rgba(100, 96, 96, 0.678);
            height: 100%;
            overflow: auto;
            // padding: 20px;
            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }

    .global-attr {
        padding: 10px;
    }
    .fold {
        font-size: 20px;
        margin: 5px 0;
        color: #fff;
        z-index: 10;
    }
}
</style>
