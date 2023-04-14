<template>
    <div class="fillcontain">
        <div class="contain">
            <search-item @showDialog="showDialog" @searchList="getUserList" />
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
                    <el-table-column property="us" label="用户名" align="center" />
                    <el-table-column property="roleId" label="权限角色" align="center">
                        <template slot-scope="scode">
                            <div v-for="(item, index) in rolesList" :key="index">
                                <span v-if="scode.row.roleId == item.roleId">{{
                                    item.roleName
                                }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column property="us" label="邮箱地址" align="center" /> -->
                    <el-table-column property="sex" label="性别" align="center">
                        <template slot-scope="scode">
                            <span>{{ scode.row.sex == 1 ? "男" : "女" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="state" label="状态" align="center">
                        <template slot-scope="scode">
                            <el-switch
                                v-model="scode.row.state"
                                active-text="启用"
                                inactive-text="禁用"
                                @change="changeState($event, scode.row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column property="remarks" label="备注" align="center" />
                    <el-table-column property="ip" label="IP地址" align="center" />
                    <el-table-column property="time" label="注册时间" align="center" />
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
                                分配角色
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
                <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
                    <el-form>
                        <el-form-item label="角色" label-width="200px">
                            <el-select v-model="roleId" placeholder="选择角色">
                                <el-option
                                    v-for="(item, index) in rolesList"
                                    :key="index"
                                    :label="item.roleName"
                                    :value="item.roleId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"> 取 消 </el-button>
                        <el-button type="primary" @click="primaryUpdata"> 确 定 </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserList, updateRole, del, updateState } from '@/api/user'
import { rolesPage } from '@/api/role'
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
            // eslint-disable-next-line vue/no-reserved-keys
            _id: null,
            roleId: null,
            rolesList: [],
        }
    },
    created() {},
    mounted() {
        this.getUserList()
        this.getrolesPage()
    },
    methods: {
    // 获取角色下拉框
        getrolesPage() {
            rolesPage({
                pageNo: 1,
                pageSize: 100,
                key: '',
            }).then((res) => {
                this.rolesList = res.data
            })
        },
        // 改变状态
        changeState(val, val2) {
            console.log(val, val2)
            const para = {
                _id: val2._id,
                state: val,
            }
            updateState(para).then((res) => {
                this.$message({
                    message: '用户' + val2.us + '状态更改成功',
                    type: 'success',
                })
                this.getUserList()
            })
        },
        // 查询
        getUserList(data) {
            console.log(data)
            if (data) {
                console.log(data.us)
                this.searchData.key = data.us
            }
            const para = { ...this.searchData }
            getUserList(para).then((res) => {
                this.loading = false
                this.pageTotal = res.total
                this.tableData = res.data
            })
        },
        // 分配角色
        assignAuthority(data) {
            this._id = data._id
            this.roleId = data.roleId
            this.dialogFormVisible = true
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
                del(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.getUserList()
                })
            })
            .catch(() => {})
        },
        // 分配角色
        primaryUpdata() {
            const para = {
                _id: this._id,
                roleId: this.roleId,
            }
            updateRole(para).then((res) => {
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
