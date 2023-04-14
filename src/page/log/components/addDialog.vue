<template>
    <el-dialog
        :visible.sync="isVisible"
        :title="title"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
        @close="closeDialog"
    >
        <div class="form">
            <el-form
                ref="form"
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth"
                style="margin: 10px; width: auto"
            >
                <el-form-item prop="us" label="用户名:">
                    <el-input v-model="form.us" :disabled="disabel" type="text" />
                </el-form-item>
                <el-form-item v-if="!disabel" prop="" label="密码:">
                    <el-input v-model.number="form.ps" />
                </el-form-item>

                <el-form-item prop="sex" label="性别:">
                    <!-- <el-input v-model="form.sex" /> -->
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="state" label="状态:">
                    <el-switch v-model="form.state" />
                    <!-- <el-input v-model.number="form.state"></el-input> -->
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input v-model="form.remarks" type="textarea" />
                </el-form-item>

                <el-form-item class="text_right">
                    <el-button @click="isVisible = false"> 取 消 </el-button>
                    <el-button type="primary" @click="onSubmit('form')">
                        提 交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { add, update } from '@/api/basicInformation'

export default {
    name: 'AddFundDialogs',
    props: {
        isShow: Boolean,
        title: String,
        dialogRow: Object,
    },
    data() {
        return {
            isVisible: this.isShow,
            form: {
                ps: '',
                us: '',
                sex: '',
                state: true,
                remarks: '',
            },
            disabel: false,
            form_rules: {
                ps: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                us: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                sex: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                state: [{ required: true, message: '不能为空！', trigger: 'blur' }],
            },
            // 详情弹框信息
            dialog: {
                width: '400px',
                formLabelWidth: '120px',
            },
        }
    },
    computed: {
        ...mapGetters(['addFundDialog']),
    },
    created() {},
    mounted() {
        if (this.addFundDialog.type === 'edit') {
            this.form = this.dialogRow
            this.disabel = true
        } else {
            this.disabel = false
            this.$nextTick(() => {
                this.$refs.form.resetFields()
            })
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
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
                    if (this.addFundDialog.type === 'edit') {
                        update(para).then((res) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getFundList')
                        })
                    } else {
                        // add
                        add(para).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getFundList')
                        })
                    }
                }
            })
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
