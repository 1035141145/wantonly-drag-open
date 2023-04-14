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
            <el-table-column prop="type" label="经历类型" align="center">
            </el-table-column>
            <el-table-column prop="name" label="经历机构" align="center">
            </el-table-column>
            <el-table-column prop="time" label="经历时间" align="center">
            </el-table-column>
            <el-table-column prop="content" label="内容" align="center">
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
                <el-form-item prop="type" label="经历类型:">
                    <el-select v-model="form.type" style="width:100%" placeholder="请选择活动区域">
                        <el-option label="教育经历" value="教育经历"></el-option>
                        <el-option label="工作经历" value="工作经历"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="经历机构:">
                    <el-input v-model="form.name" type="text" />
                </el-form-item>
                <el-form-item prop="timeB" label="经历时间起:">
                    <el-date-picker
                        v-model="form.timeB"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>         
                </el-form-item>
                <el-form-item prop="" label="经历时间止:">
                    <el-date-picker
                        v-if="!checked"
                        v-model="form.timeE"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>   
                    <el-checkbox v-model="checked" style="margin-left:30px">至今</el-checkbox>     
                </el-form-item>
                <el-form-item prop="content" label="内容:">
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
import { getList, add, update, remove } from '@/api/educationAndWork'

export default {
    data() {
        return {
            tableData: [{ type: '姓名', content: '覃伟锋', sort: 1 }],
            tableHeight: 0,
            dialogFormVisible: false,
            data: {},
            title: '',
            timeB: null,
            timeE: null,
            checked: false,
            form: {
                type: '',
                content: '',
                sort: null,
                time: '',
                name: '',
                timeB: null,
                timeE: null,
            },
            type: '',
            form_rules: {
                type: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                content: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                sort: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                timeB: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                timeE: [{ required: true, message: '不能为空！', trigger: 'blur' }],
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
                type: '',
                content: '',
                sort: null,
                time: '',
                name: '',
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
                    console.log(this.form.timeB)
                    let formData = this.form
                    if (this.checked) {
                        this.form.time = this.form.timeB + '-至今'
                    } else {
                        this.form.time = this.form.timeB + '至' + this.form.timeE
                    }
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
  color:rgb(30, 29, 34)
  // display: flex;
  // flex-direction: column-reverse;
}
</style>
