<template>
    <div class="edit-table">
        <h4 style="color: blue; margin-bottom: 10px">数据</h4>
        <table @dblclick="onDblclick">
            <tbody>
                <tr style="color: blue">
                    <th>name</th>
                    <th>value/color</th>
                </tr>
                <tr v-for="(item, row) in tableData" :key="row">
                    <td :class="{ selected: curTd === row }" @click="onClick(row, 'name')">
                        <el-input v-if="canEdit && curTd === row && col === 'name'" v-model="tableData[row].name" v-focus @blur="onBlur"></el-input>
                        <span v-else>{{ item.name }}</span>
                    </td>
                    <td :class="{ selected: curTd === row }" @click="onClick(row, 'value')">
                        <div class="valueTd">
                            <el-input v-if="canEdit && curTd === row && col === 'value'" v-model="tableData[row].value" v-focus @blur="onBlur"></el-input>
                            <span v-else>{{ item.value }}</span>
                            <el-color-picker v-model="colorArray[row]" :predefine="predefineColors" show-alpha></el-color-picker>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <el-button type="primary" size="mini" @click="addRow">添加</el-button>
            <el-button type="danger" size="mini" @click="deleteRow">删除</el-button>
        </div>
        <el-collapse accordion>
            <el-collapse-item title="接口获取数据(预览生效)" name="request" class="request-container">
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="请求地址">
                        <el-input v-model.trim="request.url" @blur="validateURL"> </el-input>
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
</template>

<script>
import { urlRE, getURL, requestWarpper } from '@/utils/partRequest'
import { debounce, throttle } from '@/utils/debounce.js'

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
    data() {
        return {
            curProperty: '',
            curTd: '',
            canEdit: false,
            col: '',
            preCurTd: '', // 失焦时 curTd 值为空，这时删除会读不到值，因此用这个变量来代替，用于删除行列
            // 预定义颜色
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577',
            ],
            methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
            dataOptions: ['object', 'array', 'string'],
        }
    },
    computed: {
        tableData() {
            return this.$store.state.curComponent.propValue.series[0].data
        },
        colorArray() {
            return this.$store.state.curComponent.propValue.series[0].color
        },
        request() {
            return this.$store.state.curComponent.propValue.request
        },
    },
    watch: {
        'request.url': {
            // 监听节流
            handler(newVal) {
                console.log('监听节流')
                if (newVal) {
                    this.$nextTick(() => {
                        requestWarpper(this.request).then((res) => {
                            if (JSON.parse(res).data) {
                                console.log(JSON.parse(res).data)
                                this.$store.state.curComponent.propValue.series[0].data = JSON.parse(res).data
                            }
                        })
                    })
                }
            },
            deep: true,
        },
    },
    methods: {
        onDblclick() {
            this.canEdit = true
        },

        onClick(row, col) {
            this.col = col
            this.curTd = row
            this.preCurTd = this.curTd
            console.log(this.curTd, row, this.canEdit)
        },

        onBlur() {
            this.canEdit = false
            this.curTd = ''
        },

        deleteRow() {
            if (!this.preCurTd) {
                this.$message.error('请先选择要删除的行')
                return
            }

            const row = this.preCurTd
            this.tableData.splice(row, 1)
            this.colorArray.splice(row, 1)
        },

        addRow() {
            this.tableData.push({ value: '', name: '' })
            this.colorArray.push('')
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
.edit-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-bottom: 8px;

    & > div {
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    table {
        border-collapse: collapse;
        word-break: break-all;
        word-wrap: break-word;
        text-align: center;
        font-size: 12px;
        width: 95%;

        td {
            border: 1px solid #ebeef5;
            height: 40px;
            width: 50%;
            min-width: 90px;
            // max-width: 80px;
            padding: 0 10px;
            input {
                width: 100%;
            }
            .valueTd {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }

    .selected {
        background: #ecf5ff;
        color: #409eff;
    }
}
</style>
