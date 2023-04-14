<template>
    <el-dialog
        :visible.sync="isVisible"
        :title="addFundDialog.title"
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
                <el-form-item prop="type" label="技能类型:">
                    <el-input v-model="form.type" type="text" />
                </el-form-item>
                <el-form-item prop="percent" label="掌握百分比:">
                    <el-input v-model="form.percent" />
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
import { addSkill, updateSkill } from '@/api/resume'

export default {
    name: 'AddFundDialogs',
    props: {
        isShow: Boolean,
        dialogRow: Object,
    },
    data() {
        return {
            areaData: [],
            isVisible: this.isShow,
            form: {
                type: null,
                percent: null,
            },
            // 详情弹框信息
            dialog: {
                width: '400px',
                formLabelWidth: '120px',
            },
            form_rules: {
                type: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                percent: [{ required: true, message: '不能为空！', trigger: 'blur' }],
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
        } else {
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
                    let formData = this[form]
                    const para = { ...formData }
                    para.us = window.sessionStorage.getItem('userName')
                    console.log(para)
                    // edit
                    if (this.addFundDialog.type === 'edit') {
                        updateSkill(para).then((res) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getList')
                        })
                    } else {
                        // add
                        addSkill(para).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getList')
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
