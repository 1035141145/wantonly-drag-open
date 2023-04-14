<template>
    <div class="search_container searchArea">
        <el-form
            ref="search_data"
            :inline="true"
            :model="search_data"
            :rules="rules"
            class="demo-form-inline search-form"
        >
            <el-form-item label="">
                <el-input
                    v-model="search_data.key"
                    placeholder="技能类型"
                    @keyup.enter.native="onScreeout('search_data')"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="mini"
                    icon="search"
                    @click="onScreeout('search_data')"
                >
                    筛选
                </el-button>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button
                    type="primary"
                    size="mini"
                    icon="view"
                    @click="onAddMoney()"
                >
                    添加
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SearchItem',
    data() {
        return {
            search_data: {
                key: '',
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            },
        }
    },
    computed: {
        ...mapGetters(['searchBtnDisabled']),
    },
    created() {},
    methods: {
        onScreeout(searchForm) {
            this.$refs[searchForm].validate((valid) => {
                if (valid) {
                    this.$store.commit('SET_SEARCH', this.search_data)
                    this.$emit('searchList')
                }
            })
        },
        onAddMoney() {
            this.$emit('showDialog', 'add')
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
