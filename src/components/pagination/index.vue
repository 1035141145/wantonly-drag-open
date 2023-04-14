<template>
    <div class="pagination">
        <el-pagination
            v-if="pageTotal > 0"
            background
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="pageTotal"
            :current-page="paginations.pageIndex"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pageTotal: Number,
    },
    data() {
        return {
            paginations: {
                pageIndex: 1, // 当前位于哪页
                pageSize: 10, // 1页显示多少条
                pageSizes: [5, 10, 15, 20], // 每页显示多少条
                layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
            },
        }
    },
    created() {},
    mounted() {},
    methods: {
    // 上下分页 pageIndex
        handleCurrentChange(page) {
            this.$emit('handleCurrentChange', page)
        },
        // 每页多少条切换 pageSize
        handleSizeChange(page_size) {
            this.$emit('handleSizeChange', page_size)
        },
    },
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
  padding: 10px 18px;
}
</style>
