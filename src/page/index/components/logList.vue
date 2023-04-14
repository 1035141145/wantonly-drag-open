<template>
    <div class="logContainer">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <a :href="github" target="_blank">
                    <icon-svg icon-class="iconGithub" />
                </a>
                <span>最新100条访问日志：</span>
                <i
                    class="el-icon-refresh"
                    style="font-size: 25px; margin-left: 30px"
                    @click="shauxin"
                ></i>
                <!-- <el-button type="primary">登录</el-button> -->
            </div>
            <div class="logArea el-scrollbar">
                <div v-for="(item, index) in logsData" :key="index" class="item">
                    <p class="timeArea">
                        <span class="title time">{{ item.us }}</span>
                        <span class="title time" style="color:red">({{ item.remarks }})</span>
                        <span class="title time">于({{ item.time }})登录</span>
                        <span v-if="item.ip" class="title time">(ip:{{ item.ip }})</span>
                    </p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getLog, LoginLog } from '@/api/user'
import { github } from '@/utils/env'

export default {
    name: 'LogList',
    data() {
        return {
            logsData: [],
            github,
            total: 0,
            todayTotal: 0,
        }
    },
    mounted() {
        this.getUserList()
    },
    methods: {
        getUserList() {
            LoginLog({ pageNo: 1, pageSize: 100 }).then((res) => {
                this.logsData = res.data
                this.total = res.total
                this.todayTotal = res.todayTotal
                window.sessionStorage.setItem('total', this.total)
                window.sessionStorage.setItem('todayTotal', this.todayTotal)
            })
        },
        shauxin() {
            this.getUserList()
        },
    },
}
</script>

<style lang="scss" scoped>
.logContainer {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  // height: 470px;
  max-height: 570px;
  overflow: hidden;
  border-radius: 6px;
  .logArea {
    overflow: auto;
    height: 570px;
  }
  .item {
    .title {
      font-size: 13px;
    }
    .time {
      color: #87de75;
    }
    .logContent {
      .logUl {
        padding-left: 30px;
        li {
          font-size: 12px;
          list-style: disc;
          line-height: 20px;
        }
      }
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
