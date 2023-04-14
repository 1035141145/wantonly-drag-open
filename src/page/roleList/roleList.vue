<template>
    <div class="fillcontain">
        <div class="contain">
            <search-item
                @showDialog="showDialog"
                @searchList="getUserList"
            />
            <div class="table_container">
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    style="width: 100%"
                >
                    <el-table-column label="序号" width="60" align="center">
                        <template slot-scope="scope">
                            <span>{{
                                scope.$index +
                                    (paginations.pageIndex - 1) * paginations.pageSize +
                                    1
                            }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column property="roleName" label="角色名称" align="center" />
                    <el-table-column property="roleDesc" label="角色描述" align="center" />
                    <el-table-column
                        prop="operation"
                        align="center"
                        label="操作"
                        width="280"
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
                            <el-button
                                type="danger"
                                icon="delete"
                                size="mini"
                                @click="assignAuthority(scope.row)"
                            >
                                分配权限
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
                    :dialog-row="addDialog.dialogRow"
                    @getFundList="getUserList"
                    @closeDialog="hideDialog"
                />
                <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="权限点" label-width="200px">
                            <el-tree
                                :key="key"
                                ref="tree"
                                :data="menutree"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                :props="defaultProps"
                                :default-checked-keys="checkedData"
                                @check="handleCheckChange"
                            />
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">
                            取 消
                        </el-button>
                        <el-button type="primary" @click="primaryUpdata">
                            确 定
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { rolesPage, rolesDel, rolesSetPermits } from '@/api/role'
import { permitsList } from '@/api/access'
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
            dialogFormVisible: false,
            form: {
                name: '',
            },
            menutree: [],
            defaultProps: {
                children: 'children',
                label: 'name',
            },
            checkedData: [5],
            checkeSendData: [],
            roleId: null,
            key: 1,
        }
    },
    created() {},
    mounted() {
        this.getUserList()
    },
    methods: {
        handleCheckChange(nodeObj, SelectedObj) {
            // console.log(this.checkedData);
            this.checkeSendData = SelectedObj.checkedKeys
            console.log(this.checkeSendData)
        },
        // 分配权限
        assignAuthority(data) {
            this.checkedData = []
            if (data.authIds) {
                this.checkedData = data.authIds.split(',')
            }     
            this.roleId = data.roleId
            this.key++
            this.dialogFormVisible = true
        },
        getUserList(data) {
            console.log(data)
            if (data) {
                console.log(data.us)
                this.searchData.key = data.us
            }
            const para = { ...this.searchData }
            rolesPage(para).then((res) => {
                this.loading = false
                this.pageTotal = res.total
                this.tableData = res.data
            })
            // 获取节点
            permitsList(para).then((res) => {
                this.menutree = res.data
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
                rolesDel(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.getUserList()
                })
            })
            .catch(() => {})
        },
        primaryUpdata() {
            const para = {
                authIds: this.checkeSendData.join(','),
                roleId: this.roleId,
            }
            rolesSetPermits(para).then((res) => {
                this.$message({
                    message: '分配成功',
                    type: 'success',
                })
                this.getUserList()
                this.dialogFormVisible = false
            })
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
