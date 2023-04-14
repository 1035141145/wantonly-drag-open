<template>
    <div class="fillcontain">
        <div ref="tabContainer" class="tabContainer">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span
                        slot="label"
                        @click="toggleTabs('eastChina')"
                    ><icon-svg icon-class="icondashboard" />基本信息</span>
                    <basic-Information></basic-Information>
                </el-tab-pane>
                <el-tab-pane>
                    <span
                        slot="label"
                        @click="toggleTabs('southChina')"
                    ><icon-svg icon-class="iconecharts" />教育工作经历</span>
                    <education-And-Work />
                </el-tab-pane>
                <el-tab-pane>
                    <span
                        slot="label"
                        @click="toggleTabs('centralChina')"
                    ><icon-svg icon-class="iconinfo" />技能掌控</span>
                    <skill-Control />
                </el-tab-pane>
                <el-tab-pane>
                    <span
                        slot="label"
                        @click="toggleTabs('northChina')"
                    ><icon-svg icon-class="iconpermission" />项目经验</span>
                    <projectExperience />
                </el-tab-pane>
                <el-tab-pane>
                    <span
                        slot="label"
                        @click="toggleTabs('northwestChina')"
                    ><icon-svg icon-class="iconuser" />自我评价</span>
                    <china-tabs-table :toggle-data="toggleData" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import chinaTabsTable from './components/chinaTabsTable'
import basicInformation from './components/basicInformation'
import educationAndWork from './components/educationAndWork'
import skillControl from './components/skillControl'
import projectExperience from './components/projectExperience'
import data from './data/chinaTabs.json'
import Pagination from '@/components/pagination'

export default {
    components: {
        chinaTabsTable,
        Pagination,
        basicInformation,
        educationAndWork,
        skillControl,
        projectExperience,
    },
    data() {
        return {
            toggleData: '',
            pageTotal: 60,
        }
    },
    mounted() {
    //  this.setTabHeight();
    //  window.onresize = () => {
    //     this.setTabHeight();
    //  }
        this.toggleTabs('eastChina')
    },
    methods: {
        setTabHeight() {
            this.$nextTick(() => {
                this.$refs.tabContainer.style.height = document.body.clientHeight - 160 + 'px'
            })
        },
        toggleTabs(item) {
            this.toggleData = item
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
