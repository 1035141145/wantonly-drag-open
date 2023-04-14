<template>
    <div class="search_container searchArea">
        <el-form
            ref="search_data"
            :inline="true"
            :model="search_data"
            :rules="rules"
            class="demo-form-inline search-form"
        >
            <el-form-item label="">
                <el-input
                    v-model="search_data.us"
                    placeholder="用户名"
                    @keyup.enter.native="onScreeoutMoney('search_data')"
                />
            </el-form-item>
            <el-form-item label="">
                <div class="block">
                    <el-date-picker
                        v-model="search_data.value"
                        style="width: 300px"
                        type="daterange"
                        align="right"
                        :clearable="false"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="mini"
                    icon="search"
                    @click="onScreeoutMoney('search_data')"
                >
                    筛选
                </el-button>
            </el-form-item>

            <el-form-item class="btnRight">
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button> -->
                <!-- <el-button type="success" size ="mini" icon="view">导出Elcel</el-button> -->
                <!-- <el-button type="primary" size="mini" icon="view" @click="onAddMoney()">
          添加
        </el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SearchItem',
    data() {
        return {
            search_data: {
                us: '',
                value: [new Date().getTime() - 3600 * 1000 * 24 * 1, new Date()],
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        },
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        },
                    },
                ],
            },
            value: [new Date(), new Date().getTime() - 3600 * 1000 * 24 * 1],
        }
    },
    computed: {
        ...mapGetters(['searchBtnDisabled']),
    },
    created() {},
    methods: {
        onScreeoutMoney(searchForm) {
            this.$refs[searchForm].validate((valid) => {
                if (valid) {
                    this.$store.commit('SET_SEARCH', this.search_data)
                    this.$emit('searchList', this.search_data)
                }
            })
        },
        onAddMoney() {
            this.$emit('showDialog', 'add')
        },
        onBatchDelMoney() {
            this.$emit('onBatchDelMoney')
        },
    },
}
</script>

<style lang="scss" scoped>
.search_container {
  margin-bottom: 20px;
}
.btnRight {
  float: right;
  margin-right: 0px !important;
}
.searchArea {
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  padding: 18px 18px 0;
}
</style>
