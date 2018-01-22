<template>
    <div style="margin-left: 15px">
        <section>
            <div style="padding-bottom: 10px;border-bottom: 1px solid #000">
                <h4 style="margin-bottom: 10px">新建公告：</h4>
                <div style="margin: 20px">
                    <el-radio-group v-model="form.hlabel">
                        <el-radio label="0">运营状态</el-radio>
                        <el-radio label="-1">维护状态</el-radio>
                    </el-radio-group>
                </div>
                <div v-if="form.hlabel === '-1'" style="margin: 20px">
                    <el-radio-group v-model="form.flabel">
                        <el-radio label="1">立刻进入</el-radio>
                        <el-radio label="2">预定时间进入</el-radio>
                    </el-radio-group>
                </div>

                <div style="margin: 20px" v-if="form.hlabel === '-1' && form.flabel === '2'">
                    <div style="margin: 20px">
                        <el-select class="" size="small"  v-model="form.time" placeholder="请选择时间">
                            <el-option
                                v-for="item in form.timeOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>&nbsp;点
                    </div>
                    <div style="margin: 20px">
                        维护公告内容: <el-input size="small" v-model="form.content" style="width: 50%"></el-input>
                    </div>


                </div>


                <el-button style="margin-left: 45px" size="small" type="primary" @click="updateDTStatus()">更新大厅状态</el-button>
            </div>
            <el-select class="" size="small" v-model="value" placeholder="请选择查询类型">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <p style="border-top: 1px solid #000;padding: 7px 0">【新手练习厅】已开启1桌，还可以开启0桌  &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启1桌，还可以开启0桌  </p>
            <header style="padding: 8px 0;border-top: 1px solid #000">
                <el-button size="small" type="primary">刷新</el-button>
                <el-button style="margin-left: 18px" size="small" disabled  type="primary">新增桌</el-button>
                <el-button style="margin-left: 18px" size="small" >参数设置</el-button>
                <el-button style="margin-left: 18px" size="small" type="danger">删除桌</el-button>
                <el-button style="margin-left: 18px" size="small" type="primary">桌排序</el-button>
            </header>
            <section style="margin-bottom: 10px">
                <el-table
                    :data="tableData3"
                    height="300"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="桌ID"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="桌名"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所属房间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="在线人数">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="桌状态">
                    </el-table-column>
                </el-table>
            </section>
        </section>
        <!-- 2 -->
        <section style="padding-top: 20px;border-top: 1px solid #000;">
            <div style="margin-bottom: 10px">
                <el-button style="" size="small" type="primary">刷新</el-button>
                <el-button style="margin-left: 18px" size="small" type="danger">清零</el-button>
            </div>
            <strong>总押分（游戏分值）</strong>
            <strong style="margin-left: 50px">总押分（游戏分值）</strong>
            <strong style="margin-left: 50px">总押分（游戏分值）</strong>

            <section style="margin: 10px 0">
                <el-table
                    :data="tableData3"
                    height="300"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="账号"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="昵称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="游戏币">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="体验币">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="游戏分值">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所属推广员">
                    </el-table-column>
                </el-table>
            </section>
        </section>
        <!-- 3 -->
        <section style="border-top: 1px solid #000;padding-top: 15px">
            <header class="clearfix">
                <div class="dailyPicker">
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        size="small"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <el-button style="margin-left: 15px;float: left" size="small" type="primary">查询</el-button>
                <el-button style="margin-left: 15px;float: left" size="small" type="primary">刷新</el-button>
            </header>
            <section style="margin: 10px 0">
                <el-table
                    :data="tableData3"
                    height="300"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="开奖时间"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="总押注"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="总出分">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="结算结果">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="押注人数">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="转盘结果">
                    </el-table-column>
                </el-table>
            </section>
            <div class="block">
                <el-pagination
                @current-change="clickPage"
                background
                size="small"
                layout="prev, pager, next"
                :total="50">
                </el-pagination>
            </div>

        </section>

    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/htyz'
    export default {
        data () {
            return {
                form: {
                    hlabel: '1',
                    flabel: '1',
                    time: 1,
                    timeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    content: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                value7: '',
                options2: [
                    {
                        value: '100万'
                    },
                    {
                        value: '1000万',
                        disabled: true
                    },
                    {
                        value: '10万'
                    },
                    {
                        value: '1万'
                    },
                    {
                        value: '1000'
                    }],
                value: '幸运六狮',
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        watch: {},
        methods: {
            onSubmit () {
                console.log('submit!')
            },
            updateDTStatus () {
                if (this.form.hlabel === '0') {
                    this.$store.dispatch(aTypes.updateDTStatus, {})
                } else if (this.form.hlabel === '-1' && this.form.flabel === '1') {
                    this.$store.dispatch(aTypes.updateDTStatus, {statusIndex: 1})
                } else if (this.form.hlabel === '-1' && this.form.flabel === '2') {
                    if (this.form.content === '') {
                        return this.$message({
                            message: '公告内容不能为空',
                            type: 'warning',
                            duration: 1200
                        })
                    }
                    this.$store.dispatch(aTypes.updateDTStatus, {statusIndex: 1, content: this.form.content, time: this.form.time})
                }
            },
            clickPage (size) {
                // 分页
                console.log(size)
            }
        },
        computed: {},
        mounted () {
        }
    }
</script>
<style scoped>
    .el-pagination{
        text-align: center;
        margin: 25px 0;
    }
    .gameHomeSel{
        padding: 10px 0;
    }
     .dailyPicker{
        margin-bottom: 10px;
        float: left;
    }

</style>
