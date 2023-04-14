<template>
    <div class="fillcontain">
        <search-item @showDialog="showDialog" @searchList="getList" />
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align="center"
            >
                <el-table-column prop="type" label="技能类型" align="center" />
                <el-table-column prop="percent" label="掌握百分比" align="center">
                    <template slot-scope="scope">
                        <span style="color: #00d053"> {{ scope.row.percent }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="创建时间"
                    align="center"
                    sortable
                >
                    <template slot-scope="scope">
                        <el-icon name="time" />
                        <span style="margin-left: 10px">{{ scope.row.time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="us"
                    label="创建人"
                    align="center"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align="center"
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="warning"
                            icon="edit"
                            size="mini"
                            @click="onEditMoney(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            icon="delete"
                            size="mini"
                            @click="onDeleteMoney(scope.row, scope.$index)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                :page-total="pageTotal"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
            />
            <addSkillDialog
                v-if="addDialog.show"
                :is-show="addDialog.show"
                :dialog-row="addDialog.dialogRow"
                @getList="getList"
                @closeDialog="hideAddFundDialog"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mutils from '@/utils/mUtils'
import SearchItem from './components/searchItem'
import AddSkillDialog from './components/addSkillDialog'
import Pagination from '@/components/pagination'
import { getSkillList, removeSkill } from '@/api/resume'

export default {
    components: {
        SearchItem,
        AddSkillDialog,
        Pagination,
    },
    data() {
        return {
            tableData: [],
            tableHeight: 0,
            loading: true,
            isShow: false, // 是否显示modal,默认为false
            addDialog: {
                show: false,
                dialogRow: {},
            },
            searchData: {
                pageNo: 1,
                pageSize: 10,
                key: '',
            },
            pageTotal: 0,
        }
    },
    computed: {
        ...mapGetters(['search']),
    },
    mounted() {
        this.getList()
    },
    methods: {
        setAddress(value) {},
        setTableHeight() {
            this.$nextTick(() => {
                this.tableHeight = document.body.clientHeight - 300
            })
        },
        // 查询
        getList() {
            const para = { ...this.searchData, ...this.search }
            getSkillList(para).then((res) => {
                this.loading = false
                this.pageTotal = res.total
                this.tableData = res.data
            })
        },
        // 显示资金弹框
        showDialog(val) {
            this.$store.commit('SET_DIALOG_TITLE', val)
            this.addDialog.show = true
        },
        hideAddFundDialog() {
            this.addDialog.show = false
        },
        // 上下分页
        handleCurrentChange(val) {
            this.searchData.pageNo = val
            this.getList()
        },
        // 每页显示多少条
        handleSizeChange(val) {
            this.searchData.pageSize = val
            this.getList()
        },
        getPay(val) {
            if (mutils.isInteger(val)) {
                return -val
            } 
            return val
        },
        // 编辑操作方法
        onEditMoney(row) {
            this.addDialog.dialogRow = { ...row }
            this.showDialog()
        },
        // 删除数据
        onDeleteMoney(row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning',
            })
            .then(() => {
                const para = { _id: row._id }
                removeSkill(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.getList()
                })
            })
            .catch(() => {})
        },
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        selectTable(val, row) {
            this.setSearchBtn(val)
        },
        setSearchBtn(val) {
            let isFlag = true
            if (val.length > 0) {
                isFlag = false
            } else {
                isFlag = true
            }
            this.$store.commit('SET_SEARCHBTN_DISABLED', isFlag)
        },
    },
}
</script>

<style lang="scss" scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}
.el-dialog--small {
  width: 600px !important;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
