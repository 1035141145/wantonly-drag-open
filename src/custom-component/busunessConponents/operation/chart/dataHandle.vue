<template>
    <div>
        <div class="edit-char">
            <div class="button">
                <h4 v-if="type" style="color: #409eff">({{ type }}){{ name }}：</h4>
                <h4 v-else style="color: #409eff">{{ name }}：</h4>
                <el-button type="primary" size="mini" @click="addCol">添加</el-button>
                <el-button type="danger" size="mini" @click="deleteCol">删除</el-button>
            </div>
            <div class="form">
                <table class="table" @dblclick="onDblclick">
                    <tbody>
                        <tr>
                            <td v-for="(item, index) in chartData" :key="index" :class="{ selected: curTd === index }" @click="onClick(index)">
                                <el-input v-if="canEdit && curTd === index" v-model="chartData[index]" v-focus @blur="onBlur"></el-input>
                                <span v-else>{{ item }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <el-collapse accordion style="width: 400px">
                <el-collapse-item title="接口获取数据(预览生效)" name="request" class="request-container">
                    <el-form label-position="left" label-width="100px">
                        <el-form-item label="请求地址">
                            <el-input v-model.trim="request.url" @blur="validateURL">
                                <template slot="prepend"></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="请求方法">
                            <el-select v-model="request.method">
                                <el-option v-for="item in methodOptions" :key="item" :label="item" :value="item"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="请求参数">
                            <el-select v-model="request.paramType" placeholder="参数类型" @change="onChnage">
                                <el-option v-for="item in dataOptions" :key="item" :label="item" :value="item"> </el-option>
                            </el-select>
                            <div v-if="request.paramType === 'array'" class="param-container">
                                <p>数据项</p>
                                <div v-for="(item, index) in request.data" :key="index" class="div-delete">
                                    <el-input v-model="request.data[index]" placeholder="请输入参数值"></el-input>
                                    <span class="iconfont icon-shanchu" @click="deleteData(index)"></span>
                                </div>

                                <el-button @click="addArrayData">添加</el-button>
                            </div>
                            <div v-else-if="request.paramType === 'string' || request.paramType === 'object'" class="param-container">
                                <p>数据项</p>
                                <div v-for="(item, index) in request.data" :key="index" class="param-object-container">
                                    <el-input v-model="item[0]" placeholder="参数名" style="margin-right: 10px"></el-input>
                                    <el-input v-model="item[1]" placeholder="参数值"></el-input>
                                    <span class="iconfont icon-shanchu" @click="deleteData(index)"></span>
                                </div>
                                <el-button @click="addData">添加</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item label="定时触发">
                            <el-switch v-model="request.series"></el-switch>
                            <template v-if="request.series">
                                <p>触发间隔（毫秒）</p>
                                <el-input v-model="request.time" type="number"></el-input>
                                <p>触发次数（0 为无限）</p>
                                <el-input v-model="request.requestCount" type="number"></el-input>
                            </template>
                        </el-form-item>
                        <!-- <el-form-item label="立即生效">
                            <el-checkbox v-model="request.ifCheck"></el-checkbox>
                        </el-form-item> -->
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import { urlRE, getURL } from '@/utils/request'
import { index } from 'mathjs'

export default {
    directives: {
        focus: {
            // 指令的定义
            inserted(el) {
                // 聚焦元素
                el.querySelector('input').focus()
            },
        },
    },
    props: {
        handleData: { type: Array, default: () => [] },
        name: { type: String, default: () => '' },
        type: { type: String, default: () => '' },
        index: { type: Number, default: () => -1 },
    },
    data() {
        return {
            activeName: '',
            curTd: '',
            canEdit: false,
            preCurTd: '', // 失焦时 curTd 值为空，这时删除会读不到值，因此用这个变量来代替，用于删除行列
            editableTabsValue: '1',
            chartData: [],
            methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
            dataOptions: ['object', 'array', 'string'],
            // request: {
            //     method: 'GET',
            //     data: [],
            //     url: '',
            //     series: false, // 是否定时发送请求
            //     time: 1000, // 定时更新时间
            //     paramType: '', // string object array
            //     requestCount: 0, // 请求次数限制，0 为无限
            // },
        }
    },
    computed: {
        request() {
            if (this.index >= 0) {
                return this.$store.state.curComponent.propValue.data.editableTabs[this.index].request
            }
            return this.$store.state.curComponent.propValue.data.request
        },
    },
    watch: {
        chartData: {
            handler(newVal) {
                this.$emit('handleDate', this.chartData, this.name)
            },
            deep: true,
        },
    },
    mounted() {
        this.chartData = JSON.parse(JSON.stringify(this.handleData))
    },
    methods: {
        // 双击
        onDblclick() {
            this.canEdit = true
        },
        // 单击
        onClick(index) {
            this.curTd = index
            this.preCurTd = this.curTd
        },

        onBlur() {
            this.canEdit = false
            this.curTd = ''
        },
        // 添加
        addCol() {
            if (this.chartData) {
                this.chartData.push(' ')
            } else {
                this.chartData.push(' ')
            }
        },
        // 删除
        deleteCol() {
            if (!this.preCurTd) {
                this.$message.error('请先选择要删除的列')
                return
            }
            const col = this.preCurTd
            this.chartData.splice(col, 1)
        },
        addArrayData() {
            this.request.data.push('')
        },

        addData() {
            this.request.data.push(['', ''])
        },

        deleteData(index) {
            this.request.data.splice(index, 1)
        },

        onChnage() {
            if (this.request.paramType === 'array') {
                this.request.data = ['']
            } else {
                this.request.data = [['', '']]
            }
        },

        validateURL() {
            const url = this.request.url
            if ((url && /^\d+$/.test(url)) || !urlRE.test(getURL(url))) {
                this.$message.error('请输入正确的 URL')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog__body) {
    padding: 5px !important;
}
.el-divider--horizontal {
    margin: 5px 0;
}
.add-btn {
    display: flex;
    padding: 10px;
}
.edit-char {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .form {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        // margin-top: px;
        .table {
            border-collapse: collapse;
            word-break: break-all;
            word-wrap: break-word;
            text-align: center;
            font-size: 12px;
            td {
                border: 1px solid #ebeef5;
                height: 30px;
                min-width: 60px;
                max-width: 100px;
                padding: 0px;
            }
        }
    }
    .button {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
    }

    .selected {
        background: #ecf5ff;
        color: #409eff;
    }
}
.request-container {
    .param-container {
        margin-top: 10px;
        .el-button {
            margin-top: 10px;
        }

        .param-object-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;
            // padding: 0, 10px;
            .el-input {
                // width: 98px;
                margin: 0, 10px;
            }

            .el-button {
                margin: 0;
                margin-left: 8px;
            }
        }

        .div-delete {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;

            .el-button {
                margin: 0;
                margin-left: 8px;
            }
        }
    }

    .icon-shanchu {
        cursor: pointer;
        margin-left: 10px;
    }
}
::v-deep(.el-collapse-item__header) {
    color: #409eff;
}
</style>
