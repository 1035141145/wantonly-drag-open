<template>
    <div class="chinaTabsTable">
        <div class="rigth">
            <el-button
                type="primary"
                size="mini"
                icon="view"
                @click="add()"
            >
                添加
            </el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%; margin-top: 15px"
            align="center"
        >
            <el-table-column
                prop="ID"
                label="序号"
                align="center"
                width="80"
            >
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="项目名" align="center">
            </el-table-column>
            <el-table-column prop="content" label="项目内容" align="center">
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form
                ref="form"
                :model="form"
                label-width="30"
                :rules="form_rules"
                style="margin: 10px; width: auto"
            >
                <el-form-item prop="name" label="项目名:">
                    <el-input v-model="form.name" type="text" />
                </el-form-item>
                <el-form-item prop="content" label="项目内容:">
                    <el-input v-model="form.content" type="textarea" :rows="3" />
                </el-form-item>
                <el-form-item prop="sort" label="排序:">
                    <el-input-number
                        v-model="form.sort"
                        :min="1"
                        label="排序"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"> 取 消 </el-button>
                <el-button type="primary" @click="onSubmit('form')"> 确 定 </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getList, add, update, remove } from '@/api/projectExperience'

export default {
    data() {
        return {
            tableData: [{ type: '姓名', content: '覃伟锋', sort: 1 }],
            tableHeight: 0,
            dialogFormVisible: false,
            data: {},
            title: '',
            form: {
                name: '',
                content: '',
                sort: null,
            },
            type: '',
            form_rules: {
                content: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                name: [{ required: true, message: '不能为空！', trigger: 'blur' }],
            },
        }
    },
    watch: {},
    mounted() {
        this.getList()
    },
    methods: {
    // 查询
        getList(data) {
            getList().then((res) => {
                this.tableData = res.data
            })
        },
        onEdit(data) {
            this.dialogFormVisible = true
            this.type = 'edit'
            this.form = data
        },
        onDelete() {},
        // 新增
        add(data) {
            this.dialogFormVisible = true
            this.type = 'add'
            this.form = {
                name: '',
                content: '',
                sort: null,
            }
        },
        Updata() {
            this.dialogFormVisible = false
        },
        // 表单提交
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 表单数据验证完成之后，提交数据;
                    let formData = this.form
                    const para = { ...formData }
                    console.log(para)
                    // edit
                    if (this.type === 'edit') {
                        update(para).then((res) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                            })
                            this.dialogFormVisible = false
                            this.getList()
                        })
                    } else {
                        // add
                        add(para).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                            })
                            this.dialogFormVisible = false
                            this.getList()
                        })
                    }
                }
            })
        },
        // 删除数据
        onDelete(row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning',
            })
            .then(() => {
                const para = { _id: row._id }
                remove(para).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    this.getList()
                })
            })
            .catch(() => {})
        },
    },
}
</script>

<style lang="scss">
.rigth {
  // display: flex;
  // flex-direction: column-reverse;
}
</style>
