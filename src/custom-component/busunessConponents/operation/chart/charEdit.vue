<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">图表设置</el-button>
        <el-dialog v-dialogDrag title="图表设置" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
            <div class="edit-char">
                <el-divider></el-divider>
                <el-switch v-model="chartData.direction" active-text="竖向" inactive-text="横向"> </el-switch>
                <dataHandle :name="'坐标轴'" :handle-data="chartData.x" @handleDate="handleDate"></dataHandle>
                <el-divider></el-divider>
            </div>
            <div class="add-btn">
                <el-popover v-model="visible" placement="right" width="400" trigger="click">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item prop="name" label="图表名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="type" label="图表类型">
                            <el-select v-model="form.type" style="width: 100%" placeholder="请选择图表类型">
                                <el-option label="柱形图" value="bar"></el-option>
                                <el-option label="折线图" value="line"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="addTab(editableTabsValue)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="primary" size="mini" icon="el-icon-plus">添加图表</el-button>
                </el-popover>
            </div>
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in chartData.editableTabs" :key="index" style="min-height: 300px" :label="item.name" :name="item.index">
                    <dataHandle :name="'图表值'" :type="item.type" :handle-data="item.data" :index="index" @handleDate="handleDate"></dataHandle>
                    <h4 style="color: #409eff">图表样式</h4>
                    <div>
                        <div class="charStyleList">
                            <div class="styleitem">
                                <div class="childInput">
                                    <span>颜色:</span>
                                    <el-color-picker v-model="item.itemStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                                </div>
                            </div>
                            <div v-if="item.type == 'bar'" class="styleitem">
                                <div class="childInput">
                                    <span>宽度:</span>
                                    <el-input-number v-model="item.barWidth" :step="1" :min="0" />
                                </div>
                            </div>
                            <div class="styleitem">
                                <div class="childInput">
                                    <span>间隔:</span>
                                    <el-input-number v-model="item.barGap" :step="1" :min="0" />
                                </div>
                            </div>
                            <div v-if="item.type == 'bar'" class="styleitem">
                                <div class="childInput">
                                    <span>圆角:</span>
                                    <el-checkbox v-model="checked2" @change="changeinterval2"></el-checkbox>
                                </div>
                            </div>
                            <div class="styleitem">
                                <div class="childInput">
                                    <span>markPoint:</span>
                                    <el-input v-model="markPoint" type="textarea" :rows="2" placeholder="markPoint拓展编码" @change="markPointChange"> </el-input>
                                    <el-tooltip effect="dark" content="格式如：[{ type: 'max', name: 'Max' },{ type: 'min', name: 'Min' },]" placement="top-end">
                                        <i style="color: chocolate" class="el-icon-warning"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                            <div class="styleitem">
                                <div class="childInput">
                                    <span>markLine:</span>
                                    <el-input v-model="markLine" type="textarea" :rows="2" placeholder="markLine拓展编码" @change="markLineChange"> </el-input>
                                    <el-tooltip effect="dark" content="格式如： [{ type: 'average', name: 'Avg' }]" placement="top-end">
                                        <i style="color: chocolate" class="el-icon-warning"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                        <el-divider></el-divider>
                    </div>
                    <h4 style="color: #409eff">图表公共样式</h4>
                    <div class="charStyleList">
                        <div class="styleitem">
                            <div class="childInput">
                                <span>背景颜色:</span>
                                <el-color-picker v-model="chartStyle.backgroundColor" :predefine="predefineColors" show-alpha></el-color-picker>
                                <!-- <el-input v-model="chartStyle.backgroundColor" placeholder="请输入内容" prefix-icon="el-icon-search"> </el-input> -->
                            </div>
                            <div class="childInput">
                                <span>标题:</span>
                                <el-input v-model="chartStyle.title.text" placeholder="请输入标题"> </el-input>
                            </div>
                            <div class="childInput">
                                <span>标题上边距:</span>
                                <el-input-number v-model="chartStyle.title.top" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>标题左边距:</span>
                                <el-input-number v-model="chartStyle.title.left" :step="1" :min="0" />
                            </div>

                            <div class="childInput">
                                <span>标题字体:</span>
                                <el-input-number v-model="chartStyle.title.textStyle.fontSize" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>标题字体粗细:</span>
                                <el-input-number v-model="chartStyle.title.textStyle.fontWeight" :step="100" :min="100" :max="900" />
                            </div>
                            <div class="childInput">
                                <span>标题颜色:</span>
                                <el-color-picker v-model="chartStyle.title.textStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>图例上边距:</span>
                                <el-input-number v-model="chartStyle.legend.top" :step="1" :min="0" />
                            </div>
                        </div>
                        <div class="styleitem">
                            <div class="childInput">
                                <span>图例字体:</span>
                                <el-input-number v-model="chartStyle.legend.textStyle.fontSize" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>图例字体粗细:</span>
                                <el-input-number v-model="chartStyle.legend.textStyle.fontWeight" :step="100" :min="100" :max="900" />
                            </div>
                            <div class="childInput">
                                <span>图例标题颜色:</span>
                                <el-color-picker v-model="chartStyle.legend.textStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>容器上边距:</span>
                                <el-input-number v-model="chartStyle.grid.top" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>容器右边距:</span>
                                <el-input-number v-model="chartStyle.grid.right" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>容器下边距:</span>
                                <el-input-number v-model="chartStyle.grid.bottom" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>容器左边距:</span>
                                <el-input-number v-model="chartStyle.grid.left" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>指示器内容:</span>
                                <el-select v-model="chartStyle.tooltip.trigger">
                                    <el-option label="仅悬浮" value="axis"></el-option>
                                    <el-option label="折线" value="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="styleitem">
                            <div class="childInput">
                                <span>指示器类型:</span>
                                <el-select v-model="chartStyle.tooltip.axisPointer.type">
                                    <el-option label="直线" value="line"></el-option>
                                    <el-option label="十字准星" value="cross"></el-option>
                                    <el-option label="阴影" value="shadow"></el-option>
                                </el-select>
                            </div>
                            <div class="childInput">
                                <span>指示器颜色:</span>
                                <el-color-picker v-model="chartStyle.tooltip.axisPointer.crossStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>X轴颜色:</span>
                                <el-color-picker v-model="chartStyle.xAxis.axisLine.lineStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>X轴字体颜色:</span>
                                <el-color-picker v-model="chartStyle.xAxis.axisLabel.textStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>X轴字体大小:</span>
                                <el-input-number v-model="chartStyle.xAxis.axisLabel.textStyle.fontSize" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>Y轴颜色:</span>
                                <el-color-picker v-model="chartStyle.yAxis.axisLine.lineStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>Y轴字体颜色:</span>
                                <el-color-picker v-model="chartStyle.yAxis.axisLabel.textStyle.color" :predefine="predefineColors" show-alpha></el-color-picker>
                            </div>
                            <div class="childInput">
                                <span>Y轴字体大小:</span>
                                <el-input-number v-model="chartStyle.yAxis.axisLabel.textStyle.fontSize" :step="1" :min="0" />
                            </div>
                        </div>
                        <div class="styleitem">
                            <div class="childInput">
                                <span>显示Y轴分割线:</span>
                                <el-switch v-model="chartStyle.yAxis.splitLine.show" active-text="显示" inactive-text="隐藏"> </el-switch>
                            </div>
                            <div class="childInput">
                                <span>Y轴分割线类型:</span>
                                <el-select v-model="chartStyle.yAxis.splitLine.lineStyle.type" :disabled="!chartStyle.yAxis.splitLine.show">
                                    <el-option label="实线" value="solid"></el-option>
                                    <el-option label="虚线" value="dashed"></el-option>
                                    <el-option label="点状线" value="dotted"></el-option>
                                </el-select>
                            </div>
                            <!-- <div class="childInput">
                                <span>Y轴分割线刻度:</span>
                                <el-input-number v-if="!checked" v-model="chartStyle.yAxis.interval" :step="1" :min="1" />
                                <el-input v-else v-model="chartStyle.yAxis.interval" disabled />
                                <el-checkbox v-model="checked" style="margin-left: 10px" @change="changeinterval">自动</el-checkbox>
                            </div> -->
                            <div class="childInput">
                                <span>Y轴最小值:</span>
                                <el-input-number v-model="chartStyle.yAxis.min" :step="1" :min="0" />
                            </div>
                            <div class="childInput">
                                <span>Y轴最大值:</span>
                                <el-input-number v-if="!checked" v-model="chartStyle.yAxis.max" :step="1" :min="0" />
                                <el-input v-else v-model="chartStyle.yAxis.max" disabled />
                                <el-checkbox v-model="checked" style="margin-left: 10px" @change="changeinterval"> 轴上最大值 </el-checkbox>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import dataHandle from './dataHandle.vue'

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
    components: { dataHandle },
    data() {
        return {
            dialogVisible: false,
            editableTabsValue: '1',
            tabIndex: 1,
            form: {
                name: '',
                type: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入图表名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
                ],
                type: [{ required: true, message: '请选择图表类型', trigger: 'change' }],
            },
            visible: false,
            checked: false,
            checked2: false, // 圆角
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
            markPoint: '',
            markLine: '',
        }
    },
    computed: {
        chartData() {
            return this.$store.state.curComponent.propValue.data
        },
        chartStyle() {
            return this.$store.state.curComponent.propValue.style
        },
    },
    mounted() {
        // console.log(this.chartData, 'ssss')
        if (this.chartStyle.max == 'dataMax') {
            this.checked = true
        }
    },
    methods: {
        handleClose(done) {
            done()
        },
        addTab(targetName) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.visible = false
                    let newTabName = ++this.tabIndex + ''
                    let num = this.chartData.x.length
                    let arr = this.randArray(num, 1, 99) // 1 到99的随机数
                    this.chartData.editableTabs.push({
                        name: this.form.name,
                        index: newTabName,
                        type: this.form.type,
                        itemStyle: {
                            color: '',
                        },
                        barGap: 0,
                        barWidth: 0,
                        data: arr,
                        request: {
                            method: 'GET',
                            data: [],
                            url: '',
                            series: false, // 是否定时发送请求
                            time: 1000, // 定时更新时间
                            paramType: '', // string object array
                            requestCount: 0, // 请求次数限制，0 为无限
                        },
                        cancelRequest: null,
                        markPoint: {
                            data: [],
                        },
                        markLine: {
                            data: [],
                        },
                    })

                    let legendArr = []
                    for (let index = 0; index < this.chartData.editableTabs.length; index++) {
                        const element = this.chartData.editableTabs[index]
                        legendArr.push(element)
                    }
                    this.chartStyle.legend.data = legendArr
                    this.editableTabsValue = newTabName
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        removeTab(targetName) {
            let tabs = this.chartData.editableTabs
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.index === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.index
                        }
                    }
                })
            }
            this.editableTabsValue = activeName
            this.chartData.editableTabs = tabs.filter((tab) => tab.index !== targetName)
        },
        randArray(len, min, max) {
            return Array.from({ length: len }, (v) => Math.floor(Math.random() * (max - min)) + min)
        },
        handleDate(val1, val2) {
            // console.log(val1, val2)
            if (val2 == '坐标轴') {
                this.chartData.x = val1
            }
            if (val2 == '图表值') {
                this.chartData.editableTabs[this.tabIndex - 1].data = val1
            }
        },
        changeinterval(val) {
            if (val) {
                this.chartStyle.yAxis.max = 'dataMax'
            }
        },
        changeinterval2(val) {
            if (val) {
                this.chartData.editableTabs[this.tabIndex - 1].itemStyle.barBorderRadius = this.chartData.direction ? [10, 10, 0, 0] : [0, 10, 10, 0]
            } else {
                this.chartData.editableTabs[this.tabIndex - 1].itemStyle.barBorderRadius = [0, 0, 0, 0]
            }
        },
        markPointChange(val) {
            if (val) {
                try {
                    // eslint-disable-next-line no-eval
                    let arr = eval('(' + val + ')')
                    if (Array.isArray(arr)) {
                        this.chartData.editableTabs[this.tabIndex - 1].markPoint.data = arr
                    } else {
                        this.markPoint = ''
                        this.$message({
                            message: '无效markPoint',
                            type: 'error',
                        })
                    }
                    console.log(arr)
                } catch {
                    this.markPoint = ''
                    this.$message({
                        message: '无效markPoint',
                        type: 'error',
                    })
                }
            }
        },
        markLineChange(val) {
            if (val) {
                try {
                    // eslint-disable-next-line no-eval
                    let arr = eval('(' + val + ')')
                    if (Array.isArray(arr)) {
                        this.chartData.editableTabs[this.tabIndex - 1].markLine.data = arr
                    } else {
                        this.markLine = ''
                        this.$message({
                            message: '无效markLine',
                            type: 'error',
                        })
                    }
                    console.log(arr)
                } catch {
                    this.markLine = ''
                    this.$message({
                        message: '无效markLine',
                        type: 'error',
                    })
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog__body) {
    padding: 5px !important;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    color: #fff;
    background-color: rgba(78, 72, 72, 1);
}
::v-deep(.el-dialog__header) {
    padding: 5px 20px;
    background-color: rgba(78, 72, 72, 1);
    color: #fff;
}
::v-deep(.el-dialog__title) {
    color: #fff;
}
::v-deep(.el-tabs__item) {
    height: 30px;
    line-height: 30px;
}

.el-divider--horizontal {
    margin: 5px 0;
}
.add-btn {
    display: flex;
    padding: 5px;
}
.edit-char {
    overflow: auto;
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
                height: 40px;
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

.charStyleList {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px;
    // height: 200px;
    .styleitem {
        width: calc(25% - 20px);
        // padding: 5px;
        display: flex;
        // align-items: center;
        flex-direction: column;
        margin-left: 20px;
        .childInput {
            display: flex;
            align-items: center;
            margin-top: 5px;
            span {
                margin-right: 10px;
                min-width: 100px;
                text-align: right;
            }
        }
    }
}
</style>
