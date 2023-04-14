<template>
    <div class="chinaTabsTable">
        <el-form
            ref="form"
            :rules="form_rules"
            :model="form"
            label-width="180px"
        >
            <el-form-item label="简历照片：">
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
            <el-form-item prop="job" label="求职意向">
                <el-input v-model="form.job" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="content" label="自我评价：">
                <el-input v-model="form.content" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button
                    type="warning"
                    icon="edit"
                    size="mini"
                    @click="onSave('form')"
                >
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { get, add } from '@/api/handsomeMe'

export default {
    data() {
        return {
            imgUrl: '',
            form: {
                content: '',
                imgUrl: '',
                job: '',
                _id: '',
            },
            headers: {
                token: '',
            },
            form_rules: {
                content: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                job: [{ required: true, message: '不能为空！', trigger: 'blur' }],
            },
        }
    },
    watch: {},
    mounted() {
        let token = window.sessionStorage.getItem('Token')
        let userName = window.sessionStorage.getItem('userName')
        this.headers.token = token
        this.headers.userName = userName
        this.getMsg()
    },
    methods: {
        getMsg() {
            get().then((res) => {
                if (res.data.length > 0) {
                    this.form = res.data[0]
                    this.imgUrl = 'http://8.129.212.181:6166' + res.data[0].imgUrl
                }
            })
        },
        onSave(form) {
            if (!this.form.imgUrl) {
                this.$message({
                    message: '未上传图片',
                    type: 'ettor',
                })
                return
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    add(this.form).then((res) => {
                        this.$message({
                            message: '成功',
                            type: 'success',
                        })
                    })
                }
            })
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
            if (res.code === 200) {
                this.form.imgUrl = res.imgUrl
                this.imgUrl = URL.createObjectURL(file.raw)
            } else {
                this.$message.error(res.msg)
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/jpg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 /jpeg/jpg/gif/png 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
    },
}
</script>

<style lang="scss">
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
