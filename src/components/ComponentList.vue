<template>
    <div :class="{ 'component-list': theme == 'light', 'component-list-dark': theme == 'dark' }" @dragstart="handleDragStart">
        <!-- <div
            v-for="(item, index) in componentList"
            :key="index"
            class="list"
            draggable
            :data-index="index"
        >
            <span class="iconfont" :class="'icon-' + item.icon"></span>
        </div> -->
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <i class="el-icon-s-finance titleIcon" />
                    <h3>基础模块</h3>
                </template>
                <div v-for="(item, index) in basicComponents" :id="JSON.stringify(item)" :key="index" class="list" draggable :data-index="index">
                    <div style="margin-left: 30px">
                        <span v-if="item.icon" class="iconfont titleIcon" :class="'icon-' + item.icon" />
                        <span v-if="item.elementicon" class="el-icon iconfont titleIcon" :class="item.elementicon" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="el-icon-full-screen titleIcon" />
                    <h3>边框模块</h3>
                </template>
                <div v-for="(item, index) in borderBox" :id="JSON.stringify(item)" :key="index" class="list" draggable :data-index="index">
                    <div style="margin-left: 30px">
                        <span v-if="item.icon" class="iconfont titleIcon" :class="'icon-' + item.icon" />
                        <span v-if="item.elementicon" class="el-icon iconfont titleIcon" :class="item.elementicon" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="el-icon-data-analysis titleIcon" />
                    <h3>装饰模块</h3>
                </template>
                <div v-for="(item, index) in decoration" :id="JSON.stringify(item)" :key="index" class="list" draggable :data-index="index">
                    <div style="margin-left: 30px">
                        <span v-if="item.icon" class="iconfont titleIcon" :class="'icon-' + item.icon" />
                        <span v-if="item.elementicon" class="el-icon iconfont titleIcon" :class="item.elementicon" />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <!-- <i class="el-icon-box titleIcon" /> -->
                    <span class="iconfont titleIcon" :class="'icon-shangwutubiao-'" />
                    <h3>图表模块</h3>
                </template>
                <el-collapse accordion>
                    <div v-for="(item, index) in busunessConponents.eCharts" :id="JSON.stringify(item)" :key="index" class="list" draggable :data-index="index">
                        <div style="margin-left: 30px">
                            <span v-if="item.icon" class="iconfont titleIcon" :class="'icon-' + item.icon" />
                            <span v-if="item.elementicon" class="el-icon iconfont titleIcon" :class="item.elementicon" />
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                </el-collapse>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import componentList from '@/custom-component/component-list'
import basicComponents from '@/custom-component/basicComponents/'
import busunessConponents from '@/custom-component/busunessConponents/'
import borderBox from '@/custom-component/borderBox/'
import decoration from '@/custom-component/decoration/'

export default {
    data() {
        return {
            componentList,
            basicComponents,
            borderBox,
            decoration,
            busunessConponents,
        }
    },
    computed: {
        theme() {
            return this.$store.state.theme
        },
    },
    mounted() {
        // console.log(this.basicComponents)
    },
    methods: {
        handleDragStart(e) {
            e.dataTransfer.setData('index', e.target.dataset.index)
            // 拖拽时通过id将组件数据传递  :id="JSON.stringify(item)"
            e.dataTransfer.setData('id', e.target.id)
        },
    },
}
</script>

<style lang="scss" scoped>
.component-list {
    height: 65%;
    padding: 0 10px 0 10px;
    background: #fff;
    color: #303133;
    .titleIcon {
        font-size: 16px;
        margin-top: -5px;
        margin-right: 5px;
        color: rgba(34, 113, 218, 0.856);
    }
    .list {
        width: 100%;
        height: 30px;
        border: 1px solid rgba(34, 113, 218, 0.856);
        border-radius: 3%;
        cursor: grab;
        text-align: center;
        // color: #fff;
        padding: 2px 5px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        // justify-content: center;
        // position: relative;

        &:active {
            cursor: grabbing;
        }

        .iconfont {
            margin-right: 4px;
            font-size: 16px;
            color: rgba(34, 113, 218, 0.856);
        }
        .el-icon {
            margin-right: 4px;
            font-size: 18px;
            color: rgba(34, 113, 218, 0.856);
        }

        .icon-wenben,
        .icon-biaoge {
            font-size: 16px;
        }

        .icon-tupian {
            font-size: 16px;
        }
    }
}
.component-list-dark {
    height: 65%;
    padding: 0 10px 0 10px;
    background: rgba(78, 72, 72, 1);
    color: #fff;
    .titleIcon {
        font-size: 18px;
        margin-top: -5px;
        margin-right: 5px;
        color: #fff;
    }
    .list {
        width: 100%;
        height: 30px;
        border: 1px solid rgba(122, 123, 126, 0.747);
        border-radius: 3%;
        cursor: grab;
        text-align: center;
        color: #fff;
        padding: 2px 5px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        // justify-content: center;
        // position: relative;

        &:active {
            cursor: grabbing;
        }

        .iconfont {
            margin-right: 4px;
            font-size: 18px;
            color: #fff;
        }
        .el-icon {
            margin-right: 4px;
            font-size: 20px;
            color: #fff;
        }

        .icon-wenben,
        .icon-biaoge {
            font-size: 18px;
        }

        .icon-tupian {
            font-size: 16px;
        }
    }
}
</style>
