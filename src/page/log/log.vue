<template>
    <div class="fillcontain">
        <div class="contain">
            <search-item @searchList="getUserList" />
            <div class="table_container">
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    style="width: 100%"
                >
                    <el-table-column
                        property="user"
                        width="150"
                        label="用户名"
                        align="center"
                    />
                    <el-table-column property="log" label="日志" align="center" />
                    <el-table-column
                        property="time"
                        width="150"
                        label="时间"
                        align="center"
                    />
                </el-table>
                <pagination
                    :page-total="pageTotal"
                    @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getLog } from '@/api/user'
import SearchItem from './components/searchItem'
import Pagination from '@/components/pagination'

export default {
    components: {
        SearchItem,
        Pagination,
    },
    data() {
        return {
            tableData: [],
            isShow: false,
            loading: true,
            pageTotal: 0,
            searchData: {
                pageNo: 1,
                pageSize: 10,
                key: '',
                start: '2021-12-14',
                end: '2021-12-16',
            },
            dialogFormVisible: false,
        }
    },
    created() {},
    mounted() {
        this.getUserList()
    },
    methods: {
    // 查询
        getUserList(data) {
            console.log(data)
            if (data) {
                console.log(data.us)
                this.searchData.key = data.us
                this.searchData.start = data.value[0]
                this.searchData.end = data.value[1]
            }
            const para = { ...this.searchData }
            getLog(para).then((res) => {
                this.loading = false
                this.pageTotal = res.total
                this.tableData = res.data
            })
        },
        // 每页多少条切换
        handleSizeChange(pageSize) {
            this.searchData.pageSize = pageSize
            this.getUserList()
        },
        // 上下分页
        handleCurrentChange(page) {
            this.searchData.pageNo = page
            this.getUserList()
        },
    },
}
</script>

<style lang="scss" scoped>
.fillcontain {
  padding-bottom: 0;
}
.contain {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
}
</style>
