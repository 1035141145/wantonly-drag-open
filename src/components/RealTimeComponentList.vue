<template>
    <div :class="{ 'real-time-component-list': theme == 'light', 'real-time-component-list-dark': theme == 'dark' }">
        <el-divider>
            <span v-if="theme == 'dark'" style="color: #fff">图层</span>
            <span v-else>图层</span>
        </el-divider>
        <div v-for="(item, index) in componentData" :key="index" class="list" :class="{ actived: transformIndex(index) === curComponentIndex }" @click="onClick(transformIndex(index))">
            <span style="color: rgb(20, 86, 217)" class="iconfont" :class="'icon-' + getComponent(index).icon"></span>
            <span>{{ getComponent(index).label }}</span>
            <div class="icon-container">
                <span style="color: rgb(20, 86, 217)" class="iconfont icon-shangyi" @click="upComponent(transformIndex(index))"></span>
                <span style="color: rgb(20, 86, 217)" class="iconfont icon-xiayi" @click="downComponent(transformIndex(index))"></span>
                <span style="color: red" class="iconfont icon-shanchu" @click="deleteComponent(transformIndex(index))"></span>
            </div>
        </div>
        <el-empty v-if="componentData.length <= 0" description="暂无拖拽组件" :image-size="60"></el-empty>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['componentData', 'curComponent', 'curComponentIndex']),
        theme() {
            return this.$store.state.theme
        },
    },
    methods: {
        getComponent(index) {
            return this.componentData[this.componentData.length - 1 - index]
        },

        transformIndex(index) {
            return this.componentData.length - 1 - index
        },

        onClick(index) {
            this.setCurComponent(index)
        },

        deleteComponent() {
            setTimeout(() => {
                this.$store.commit('deleteComponent')
                this.$store.commit('recordSnapshot')
            })
        },

        upComponent() {
            setTimeout(() => {
                this.$store.commit('upComponent')
                this.$store.commit('recordSnapshot')
            })
        },

        downComponent() {
            setTimeout(() => {
                this.$store.commit('downComponent')
                this.$store.commit('recordSnapshot')
            })
        },

        setCurComponent(index) {
            this.$store.commit('setCurComponent', { component: this.componentData[index], index })
        },
    },
}
</script>

<style lang="scss" scoped>
.real-time-component-list {
    height: 35%;

    .list {
        height: 30px;
        cursor: grab;
        text-align: center;
        color: #333;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 10px;
        position: relative;
        user-select: none;

        &:active {
            cursor: grabbing;
        }

        &:hover {
            background-color: rgba(200, 200, 200, 0.2);

            .icon-container {
                display: block;
            }
        }

        .iconfont {
            margin-right: 4px;
            font-size: 16px;
        }

        .icon-wenben,
        .icon-tupian {
            font-size: 14px;
        }

        .icon-container {
            position: absolute;
            right: 10px;
            display: none;

            .iconfont {
                cursor: pointer;
            }
        }
    }

    .actived {
        background: #ecf5ff;
        color: #409eff;
    }
    .el-divider--horizontal {
        margin: 12px 5px;
    }
}
.real-time-component-list-dark {
    height: 35%;

    .list {
        height: 30px;
        cursor: grab;
        text-align: center;
        color: #ddd;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 10px;
        position: relative;
        user-select: none;

        &:active {
            cursor: grabbing;
        }

        &:hover {
            background-color: rgb(51, 46, 46);
            color: #409eff;
            .icon-container {
                display: block;
            }
        }

        .iconfont {
            margin-right: 4px;
            font-size: 16px;
        }

        .icon-wenben,
        .icon-tupian {
            font-size: 14px;
        }

        .icon-container {
            position: absolute;
            right: 10px;
            display: none;

            .iconfont {
                cursor: pointer;
            }
        }
    }

    .actived {
        background: #ddd;
        color: #409eff;
    }
    .el-divider {
        background-color: rgba(143, 138, 138, 0.678);
    }
    .el-divider--horizontal {
        margin: 12px 5px;
    }
    .el-divider__text {
        background-color: rgba(78, 72, 72, 1);
        border: 1px solid rgba(143, 138, 138, 0.678);
    }
}
</style>
