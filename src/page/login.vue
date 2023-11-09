<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="titleArea rflex">
                    <img class="logo" :src="logo" alt="admin" />
                    <span class="title"><i>低代码数据可视化</i></span>
                </div>
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="rules"
                    class="loginForm"
                >
                    <el-form-item prop="us" class="login-item">
                        <span class="loginTips"><icon-svg icon-class="iconuser" /></span>
                        <el-input
                            v-model="loginForm.us"
                            class="area"
                            type="text"
                            placeholder="邮箱"
                            @keyup.enter.native="submitForm('loginForm')"
                        />
                        <el-button
                            v-if="!isSignIn"
                            type="success"
                            class="getCode"
                            @click="sendCode('loginForm')"
                        >
                            获取验证码
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="ps" class="login-item">
                        <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
                        <el-input
                            v-model="loginForm.ps"
                            class="area"
                            type="password"
                            placeholder="密码"
                            @keyup.enter.native="submitForm('loginForm')"
                        />
                    </el-form-item>
                    <el-form-item v-if="!isSignIn" prop="code" class="login-item">
                        <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
                        <el-input
                            v-model="loginForm.code"
                            class="area"
                            type="text"
                            placeholder="验证码"
                            @keyup.enter.native="submitForm('loginForm')"
                        />
                    </el-form-item>
                    <el-form-item>
                        <div v-if="isSignIn">
                            <el-button
                                type="primary"
                                class="submit_btn"
                                @click="submitForm('loginForm', 'login')"
                            >
                                登录
                            </el-button>
                        </div>
                        <div v-else>
                            <el-button
                                type="success"
                                class="submit_btn"
                                @click="submitForm('loginForm', 'zhuce')"
                            >
                                注册
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div v-if="isSignIn">
                            <span style="color: #0000a0">没有帐号？<el-button
                                type="success"
                                @click="toggleSignType()"
                            >注册</el-button></span>
                        </div>
                        <div v-else>
                            <span style="color: #0000a0">已有帐号？<el-button
                                type="primary"
                                @click="toggleSignType()"
                            >登录</el-button></span>
                        </div>
                    </el-form-item>
                    <!-- <div class="tiparea">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">
              用户名为：admin/editor<span>(可用于切换权限)</span>
            </p>
            <p class="tip">密码为：123456</p>
          </div> -->
                    <div class="sanFangArea">
                        <p class="title">第三方账号登录</p>
                        <ul class="rflex">
                            <li @click="loginByWechat">
                                <icon-svg icon-class="iconwechat" />
                            </li>
                            <li>
                                <icon-svg icon-class="iconweibo" />
                            </li>
                            <li>
                                <icon-svg icon-class="iconGithub" />
                            </li>
                        </ul>
                    </div>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
import logoImg from '@/assets/img/logo.png'
import { login, getMailCode, reg } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
    data() {
        return {
            isSignIn: true,
            logo: logoImg,
            loginForm: {
                us: '',
                ps: '',
                code: '',
            },
            rules: {
                us: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {
                        min: 0,
                        max: 64,
                        message: '长度在 0 到 64 个字符',
                        trigger: 'blur',
                    },
                    {
                        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                        message: '请输入正确的邮箱',
                    },
                ],
                ps: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
        }
    },
    mounted() {},
    methods: {
        sendCode() {
            if (!this.loginForm.us) return
            getMailCode({ mail: this.loginForm.us })
            .then((res) => {
                console.log(res)
                if (res.code === 200) {
                    this.$message({
                        message: '验证码发送成功',
                        type: 'success',
                    })
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error',
                    })
                }
            })
            .catch((err) => {
                this.$message({
                    message: err,
                    type: 'error',
                })
            })
        },
        // 切换登录、注册
        toggleSignType() {
            this.isSignIn = !this.isSignIn
        },
        loginByWechat() {},
        showMessage(type, message) {
            this.$message({
                type,
                message,
            })
        },
        submitForm(loginForm, type) {
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    let userinfo = this.loginForm
                    window.sessionStorage.setItem('userName', this.loginForm.us)
                    if (type == 'login') {
                        login(userinfo).then((res) => {
                            let userList = res
                            window.sessionStorage.setItem('Token', userList.token)
                            this.$router.push({ path: '/' })
                            this.$store.dispatch('initLeftMenu') // 设置左边菜单始终为展开状态
                        })
                    } else {
                        reg(userinfo).then((res) => {
                            this.$message({
                                message: '注册成功',
                                type: 'success',
                            })
                            this.isSignIn = true
                        })
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/img/bg9.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
    .logo {
      width: 40px;
      margin-right: 10px;
    }
    .title {
      i {
        color: #ff6c60;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }
    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
    .getCode {
      position: absolute;
      right: 0px;
      font-size: 12px;
      z-index: 20;
      // color: #FF7C1A;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.manage_tip {
  margin-bottom: 20px;
  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.loginForm {
  .el-button--primary {
    background-color: #1e0ff0;
    border: 1px solid #1e1aff;
  }
}
.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }
  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .svg-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
