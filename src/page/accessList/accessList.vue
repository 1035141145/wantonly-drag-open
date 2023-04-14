<template>
    <div class="fillcontain">
        <div class="contain">
            <search-item @showDialog="showDialog" @searchList="getUserList" />
            <div class="table_container">
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    row-key="id"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                    style="width: 100%"
                >
                    <el-table-column property="name" label="栏目名称" align="left" />
                    <el-table-column property="path" label="路径" align="center" />
                    <el-table-column property="sort" label="排序" align="center" />
                    <el-table-column property="mark" label="菜单描述" align="center" />
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
                                @click="onEdit(scope.row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="danger"
                                icon="delete"
                                size="mini"
                                @click="onDelete(scope.row, scope.$index)"
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
                <addDialog
                    v-if="addDialog.show"
                    :is-show="addDialog.show"
                    :title="addDialog.title"
                    :table-data="tableData"
                    :dialog-row="addDialog.dialogRow"
                    @getFundList="getUserList"
                    @closeDialog="hideDialog"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { permitsList, permitsDel } from '@/api/access'
import SearchItem from './components/searchItem'
import AddDialog from './components/addDialog'
import Pagination from '@/components/pagination'

export default {
    components: {
        SearchItem,
        AddDialog,
        Pagination,
    },
    data() {
        return {
            tableData: [],
            isShow: false,
            loading: true,
            pageTotal: 0,
            // 需要给分页组件传的信息
            paginations: {
                total: 0, // 总数
                pageIndex: 1, // 当前位于哪页
                pageSize: 20, // 1页显示多少条
                pageSizes: [5, 10, 15, 20], // 每页显示多少条
                layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
            },
            addDialog: {
                show: false,
                title: '新增',
                dialogRow: {},
            },
            searchData: {
                pageNo: 1,
                pageSize: 20,
                key: '',
            },
        }
    },
    created() {},
    mounted() {
        this.getUserList()
    },
    methods: {
        getUserList(data) {
            console.log(data)
            if (data) {
                console.log(data.us)
                this.searchData.key = data.us
            }
            const para = { ...this.searchData }
            permitsList(para).then((res) => {
                this.loading = false
                this.pageTotal = res.total
                this.tableData = res.data
            })
        },
        // 每页多少条切换
        handleSizeChange(pageSize) {
            this.searchData.pageSize = pageSize
            this.getUserList()
        },
        // 上下分页
        handleCurrentChange(page) {
            this.searchData.pageNo = page
            this.getUserList()
        },
        // 显示弹框
        showDialog(val) {
            this.$store.commit('SET_DIALOG_TITLE', val)
            this.addDialog.show = true
        },
        hideDialog() {
            this.addDialog.show = false
        },
        // 编辑操作方法
        onEdit(row) {
            this.addDialog.dialogRow = { ...row }
            this.showDialog()
        },
        // 删除数据
        onDelete(row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning',
            })
            .then(() => {
                const para = { _id: row._id }
                permitsDel(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.getUserList()
                })
            })
            .catch(() => {})
        },
    },
}
</script>

<style lang="scss" scoped>
.fillcontain {
  padding-bottom: 0;
}
.contain {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
}
</style>
