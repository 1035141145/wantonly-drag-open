<template>
    <el-dialog
        :visible.sync="isVisible"
        :title="title"
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
                <el-form-item style="width: 100%" label="父级菜单:">
                    <el-tree-select
                        ref="treeSelect"
                        v-model="values"
                        style="width: 300px"
                        :select-params="selectParams"
                        :tree-params="treeParams"
                        :show-checkbox="true"
                        @searchFun="_searchFun"
                        @node-click="_selectChange"
                    />
                </el-form-item>
                <el-form-item prop="name" label="菜单名称:">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item prop="path" label="路径:">
                    <el-input v-model="form.path" />
                </el-form-item>
                <el-form-item prop="sort" label="排序:">
                    <el-input-number
                        v-model="form.sort"
                        :min="0"
                        label="排序"
                    />
                </el-form-item>
                <el-form-item prop="mark" label="备注:">
                    <el-input v-model="form.mark" type="textarea" />
                </el-form-item>
                <el-form-item class="text_right">
                    <el-button @click="isVisible = false">
                        取 消
                    </el-button>
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
import { permitsAdd, permitsUpdate } from '@/api/access'

export default {
    name: 'AddFundDialogs',
    props: {
        isShow: Boolean,
        title: String,
        dialogRow: Object,
        tableData: Array,
    },
    data() {
        return {
            isVisible: this.isShow,
            values: '',
            level: '',
            form: {
                name: '',
                mark: '',
                path: '',
                sort: 0,
            },
            form_rules: {
                name: [{ required: true, message: '不能为空！', trigger: 'blur' }],
                path: [{ required: true, message: '不能为空！', trigger: 'blur' }],
            },
            // 详情弹框信息
            dialog: {
                width: '400px',
                formLabelWidth: '120px',
            },
            selectParams: {
                multiple: false,
                clearable: true,
                placeholder: '请选择父节点菜单',
            },
            treeParams: {
                clickParent: true,
                filterable: true,
                'check-strictly': true,
                'default-expand-all': true,
                'expand-on-click-node': false,
                data: this.tableData,
                props: {
                    children: 'children',
                    label: 'name',
                    disabled: 'disabled',
                    value: 'id',
                },
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
            this.values = this.form.fid
        } else {
            this.$nextTick(() => {
                this.$refs.form.resetFields()
            })
        }
    },
    methods: {
    // 下拉框修改
        _selectChange(val) {
            console.log(val)
            this.level = val.level
        },
        // 树过滤
        _searchFun(value) {
            console.log(value, '<--_searchFun')
            // 自行判断 是走后台查询，还是前端过滤
            // this.$refs.treeSelect.$refs.tree.filter(value);
            this.$refs.treeSelect.filterFun(value)
            // 后台查询
            // this.$refs.treeSelect.treeDataUpdateFun(treeData);
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        // 表单提交
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 表单数据验证完成之后，提交数据;

                    // edit
                    if (this.addFundDialog.type === 'edit') {
                        let formData = this.form
                        if (this.values) {
                            formData.fid = parseInt(this.values)
                            formData.level = parseInt(this.level + 1)
                        }
                        const para = { ...formData }
                        console.log(para)
                        permitsUpdate(para).then((res) => {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getFundList')
                        })
                    } else {
                        // add
                        let formData = this.form
                        if (this.values) {
                            formData.fid = parseInt(this.values)
                            formData.level = parseInt(this.level + 1)
                        } else {
                            formData.fid = 0
                            formData.level = 0
                        }
                        const para = { ...formData }
                        console.log(para)
                        permitsAdd(para).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                            })
                            this.$refs.form.resetFields()
                            this.isVisible = false
                            this.$emit('getFundList')
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
