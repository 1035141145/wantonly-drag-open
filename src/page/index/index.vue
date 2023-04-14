<template>
    <section ref="data_section" class="data_section">
        <a :href="github" target="_blank">
            <el-row :gutter="10" class="row_list">
                <el-col :span="12">
                    <div class="row_left row_base">
                        <el-col :span="12">
                            <div class="pay saleBgcolor data_list rflex">
                                <div class="leftItem cflex wflex">
                                    <p class="investor">用户总数</p>
                                    <p class="number">{{ totalList.total }}<span class="perTitle">(人)</span></p>
                                </div>
                                <div class="rightItem">
                                    <icon-svg icon-class="iconfukuan" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="pay keleBgColor data_list rflex">
                                <div class="leftItem cflex wflex">
                                    <p class="investor">今日新注册人数</p>
                                    <p class="number">{{ totalList.totaltoday }}<span class="perTitle">(人)</span></p>
                                </div>
                                <div class="rightItem">
                                    <icon-svg icon-class="iconpay2" />
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="row_right row_base">
                        <el-col :span="12">
                            <div class="pay taxBgcolor data_list rflex">
                                <div class="leftItem cflex wflex">
                                    <p class="investor">今日登录次数</p>
                                    <p class="number">{{ loginTatalToday }}<span class="perTitle">(次)</span></p>
                                </div>
                                <div class="rightItem">
                                    <icon-svg icon-class="iconpay3" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="pay extenedBgcolor data_list rflex">
                                <div class="leftItem cflex wflex">
                                    <p class="investor">累计登录次数</p>
                                    <p class="number">{{ loginTatal }}<span class="perTitle">(次)</span></p>
                                </div>
                                <div class="rightItem">
                                    <icon-svg icon-class="iconpay1" />
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </a>
        <el-row :gutter="10" class="row_list order_list">
            <el-col :span="7">
                <log-list />
            </el-col>
            <el-col :span="17">
                <bar-chart type="barChart" />
            </el-col>
        </el-row>
    <!-- <el-row :gutter="10" class="row_list order_list">
      <el-col :span="7">
        <pie-chart type="ordertype" />
      </el-col>
      <el-col :span="10">
        <line-chart />
      </el-col>
      <el-col :span="7">
        <radar-chart />
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row_list">
      <el-col :span="11">
        <sales-table />
      </el-col>
      <el-col :span="7">
        <comment-list />
      </el-col>
      <el-col :span="6">
        <card-list />
      </el-col>
    </el-row> -->
    </section>
</template>

<script>
import echarts from 'echarts'
import salesTable from './components/salesTable' // 销售数据表格
import commentList from './components/commentList' // 用户评论列表
import cardList from './components/cardList' // card列表
import logList from './components/logList' // 日志列表
import barChart from '@/components/echarts/barChart' // 用户投资类型 柱状图
import pieChart from '@/components/echarts/pieChart' // 用户投资类型 饼状图
import radarChart from '@/components/echarts/radarChart' // 用户投资类型 雷达图
import lineChart from '@/components/echarts/lineChart' // 用户投资类型 折线图
import { github } from '@/utils/env'
import { usercount } from '@/api/user'

export default {
    components: {
        salesTable,
        commentList,
        cardList,
        logList,
        barChart,
        pieChart,
        radarChart,
        lineChart,
    },
    data() {
        return {
            github,
            totalList: {
                total: 0,
                totaltoday: 0,
            },
            loginTatal: 0,
            loginTatalToday: 0,           
        }
    },
    created() {},
    mounted() {
        this.getusercount()
        setTimeout(() => {
            this.loginTatal = window.sessionStorage.getItem('total')
            this.loginTatalToday = window.sessionStorage.getItem('todayTotal')
        }, 1000)
    },
    methods: {
    // 获取用户统计
        getusercount() {
            usercount({}).then((res) => {
                this.totalList = res.data
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.data_section {
  margin: 20px;
  border-radius: 2px;
  .row_list {
    margin-bottom: 20px;
    .row_base {
      padding: 10px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 6px;
      height: 120px;
    }
  }
  .order_list {
    .orderArea {
      width: 100%;
      height: 00px;
      background: #fff !important;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      padding-top: 40px;
      overflow: hidden;
    }
    .orderbarArea {
      height: 570px;
    }
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    color: #fff;
    height: 80px;
    .leftItem {
      align-items: start;
      justify-content: space-between;
      text-align: left;
    }
    .rightItem {
      width: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      .svg-icon {
        font-size: 30px;
      }
    }
    .number {
      font-size: 22px;
      font-weight: bold;
      .perTitle {
        font-size: 13px;
        margin-left: 5px;
      }
    }
  }
  .pay {
    .leftItem {
      justify-content: space-around;
    }
  }
}
</style>
