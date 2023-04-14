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
                <el-form-item prop="name" label="项目名:">
                    <el-input v-model="form.name" type="text" />
                </el-form-item>
                <el-form-item prop="url" label="项目地址:">
                    <el-input v-model="form.url" />
                </el-form-item>
                <el-form-item prop="" label="项目截图:">
                    <el-upload
                        class="avatar-uploader"
                        action="http://8.129.212.181:6166/file/upload"
                        :headers="headers"
                        :show-file-list="false"
                        name="avatar"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
import { add, update } from '@/api/projectShow'

export default {
    name: 'AddFundDialogs',
    props: {
        isShow: Boolean,
        dialogRow: Object,
    },
    data() {
        return {
            imgUrl: '',
            headers: {
                token: '',
            },
            areaData: [],
            isVisible: this.isShow,
            form: {
                name: null,
                url: null,
                img: null,
            },
            // 详情弹框信息
            dialog: {
                width: '400px',
                formLabelWidth: '120px',
            },
            form_rules: {
                name: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                url: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                img: [{ required: true, message: '不能为空！', trigger: 'blur' }],
            },
        }
    },
    computed: {
        ...mapGetters(['addFundDialog']),
    },
    created() {},
    mounted() {
        let token = window.sessionStorage.getItem('Token')
        let userName = window.sessionStorage.getItem('userName')
        this.headers.token = token
        this.headers.userName = userName
        if (this.addFundDialog.type === 'edit') {
            this.form = this.dialogRow
            this.imgUrl = 'http://8.129.212.181:6166' + this.form.img
        } else {
            this.$nextTick(() => {
                this.$refs.form.resetFields()
            })
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res)
            if (res.code === 200) {
                this.form.img = res.imgUrl
                this.imgUrl = URL.createObjectURL(file.raw)
            } else {
                this.$message.error(res.msg)
            }
        },
        beforeAvatarUpload(file) {
            console.log(file.type) 
            const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/jpg'
            const isLt2M = file.size / 1024 / 1024 < 5

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 /jpeg/jpg/gif/png 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!')
            }
            return isJPG && isLt2M
        },
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
                        update(para).then((res) => {
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
                        add(para).then((res) => {
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
