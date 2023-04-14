<template>
    <header
        id="header_container"
        class="head-nav rflex"
        :style="{ width: headNavWidth + 'px', background: color }"
    >
        <div class="userinfo">
            <el-menu
                :background-color="color"
                text-color="#0920f1"
                class="el-menu-demo"
                mode="horizontal"
            >
                <!-- <el-submenu index="1" popper-class="langItem">
          <template slot="title">
            <img :src="langLogo" class="langAvatar" alt="" />
          </template>
          <el-menu-item index="1-1" @click="changeLocale('zh')">
            <img :src="chinaImg" class="langAvatar" alt="" />
            <span class="intro">中文</span>
          </el-menu-item>
          <el-menu-item index="1-2" @click="changeLocale('en')">
            <img :src="americaImg" class="langAvatar" alt="" />
            <span class="intro">EngList</span>
          </el-menu-item>
        </el-submenu> -->

                <el-submenu index="2" popper-class="infoItem">
                    <template slot="title">
                        <div class="welcome">
                            <span
                                class="name"
                                style="color: #0920f1"
                            >你好！</span>
                            <span class="name avatarname"> {{ userName }}</span>
                        </div>
                        <i class="el-icon-loading" style="font-size:25px;font-weigth:900"></i>
                        <!-- <img :src="logoImg" class="avatar" alt="" /> -->
                    </template>
                    <el-menu-item index="2-3" @click="logout('logout')">
                        注销
                    </el-menu-item>
                    <el-menu-item
                        index="2-3"
                        @click="changeColor()"
                    >
                        切换主题
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { setToken, getToken, removeToken } from '@/utils/auth'
import logoImg from '@/assets/img/logo.png'
import chinaImg from '@/assets/img/china.svg'
import americaImg from '@/assets/img/america.svg'

export default {
    name: 'HeadNav',
    components: {},
    data() {
        return {
            userName: '管理员',
            logo: logoImg,
            langLogo: getToken('langLogo') || americaImg,
            chinaImg,
            americaImg,
            menu: {
                userBgcolor: '#f0f2f5',
            },
            color: 'rgb(3, 10, 43)',
        }
    },
    computed: {
        ...mapGetters(['name', 'avatar', 'sidebar']),
        headNavWidth() {
            return document.body.clientWidth - this.sidebar.width
        },
    },
    created() {
        let thiscolor = window.localStorage.getItem('color')
        if (thiscolor) {
            this.color = thiscolor
        }
        this.userName = window.sessionStorage.getItem('userName')
    },
    mounted() {},
    methods: {
        logout() {
            window.sessionStorage.setItem('Token', '')
            window.location.reload()
        },
        changeColor() {
            let thiscolor = window.localStorage.getItem('color')
            if (thiscolor == '#fff') {
                this.color = 'rgb(3, 10, 43)'
            } else {
                this.color = '#fff'
            }
            window.localStorage.setItem('color', this.color)
            this.$store.commit('Set_Key', this.color)
        },
        // 切换语言
        changeLocale(type) {
            setToken('lang', type)
            this.$i18n.locale = type
            if (type === 'en') {
                this.langLogo = this.americaImg
            } else {
                this.langLogo = this.chinaImg
            }
            setToken('langLogo', this.langLogo)
        },
    },
}
</script>

<style scoped lang='scss'>
.right-nav {
  display: flex;
  width: calc(100% - 180px);
  padding-right: 15px;
  flex-direction: column-reverse;
}
.head-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 29;
  transition: width 0.2s;
  height: 60px;
  box-sizing: border-box;
  // background: rgb(3, 10, 43) !important;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo-right {
  width: 320px;
  padding: 0 10px;
  margin-right: 0px;
}
.userinfo {
  position: absolute;
  line-height: 60px;
  text-align: right;
  // background: rgb(45, 76, 212) !important;
  right: 10px;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.langAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .avatarname {
    color: #0920f1;
    font-weight: bolder;
    font-size: 16px;
  }
}

.username {
  cursor: pointer;
  margin-right: 5px;
}
.border {
  border: 1px solid;
}
.notify-row {
  line-height: 60px;
  flex: 1;
  ul {
    display: flex;
    justify-content: space-around;
  }
}

ul.top-menu > li {
  position: relative;
}
</style>