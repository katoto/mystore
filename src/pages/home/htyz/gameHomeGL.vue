<template>
    <div style="height: 770px" class="l-flex-row">
        <div class="l-flex-1 l-flex-column">
            <div class=" l-relative" style="height: 300px">
                <div class="l-full" style="padding: 10px">
                    <div style="padding-bottom: 10px;border-bottom: 1px solid #ddd">
                        <h4 style="margin-bottom: 10px">新建公告：</h4>
                        <div style="margin: 10px">
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
                                <el-select class="" size="small" v-model="form.time" placeholder="请选择时间">
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
                                维护公告内容:
                                <el-input size="small" v-model="form.content" style="width: 50%"></el-input>
                            </div>


                        </div>


                        <el-button style="margin-left: 45px" size="small" type="primary" @click="updateDTStatus()">
                            更新大厅状态
                        </el-button>
                    </div>
                    <el-select class="" size="small" v-model="desk" placeholder="请选择查询类型">
                        <el-option
                            v-for="item in desks"
                            :key="item.getDesk"
                            :label="item.label"
                            :value="item.getDesk">
                        </el-option>


                    </el-select>
                </div>
            </div>
            <el-dialog
                title="新增桌"
                width="500"
                :visible="newDesk.visible"
                :before-close="handleClose">
                <table>
                    <tr>
                        <td width="22%" align="center">所属房间：</td>
                        <td width="28%">
                            <el-select class="" size="small" v-model="newDesk.time">
                                <el-option
                                    label="欢乐竞技厅"
                                    value="0"/>
                                <el-option
                                    label="新手练习厅"
                                    value="1"/>
                            </el-select>
                        </td>
                        <td width="22%" align="center">动物几率：</td>
                        <td width="28%">
                            <el-select class="" size="small" v-model="newDesk.time1">
                                <el-option
                                    label="难"
                                    value="0"/>
                                <el-option
                                    label="中"
                                    value="1"/>
                                <el-option
                                    label="易"
                                    value="2"/>
                                <el-option v-for="item in [90, 91,92, 93,94,95, 96,97,98,99]"
                                    :label="item"
                                    :value="item"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="center">桌名：</td>
                        <td width="30%"><el-input v-model="userName" placeholder="请输入内容"></el-input></td>
                        <td width="20%" align="center">庄闲和几率：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time1">
                                <el-option
                                    label="难"
                                    value="0"/>
                                <el-option
                                    label="中"
                                    value="1"/>
                                <el-option
                                    label="易"
                                    value="2"/>
                                <el-option v-for="item in [90, 91,92, 93,94,95, 96,97,98,99]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="center">自动提出挂机玩家：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time3">
                                <el-option
                                    label="否"
                                    value="0"/>
                                <el-option
                                    label="1m"
                                    value="1"/>
                                <el-option
                                    label="3m"
                                    value="3"/>
                                <el-option
                                    label="10m"
                                    value="10"/>
                            </el-select>


                        </td>
                        <td width="20%" align="center">抽/放水类型：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time4">
                                <el-option
                                    label="抽水"
                                    value="0"/>
                                <el-option
                                    label="放水"
                                    value="1"/>
                            </el-select>
                            <el-slider v-model="newDesk.time18" max="999" show-input></el-slider>
                        </td>
                    </tr>


                    <tr>
                        <td width="20%" align="center">最小携带（游戏币）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time6">
                                <el-option v-for="item in [1, 50,100, 200,300,400, 500,1000,5000]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">场地类型：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time7">
                                <el-option
                                           label="大型场地"
                                           value="0"/>
                                <el-option
                                    label="中型场地"
                                    value="1"/>
                                <el-option
                                    label="小型场地"
                                    value="2"/>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td width="20%" align="center">动物最大押注（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time8">
                                <el-option v-for="item in [50,100, 150, 200,250,300,400, 500,600, 700, 800, 900,1000,1500]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">一币分值（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time7">
                                <el-option v-for="item in [1,2, 5, 10,50,1000]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td width="20%" align="center">动物最小押注（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time8">
                                <el-option v-for="item in [1,5, 10, 50, 100, 200,500]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">押注时间：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time9">
                                <el-option v-for="item in [10,15, 20, 25,30,35]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td width="20%" align="center">庄闲最大押注（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time10">
                                <el-option v-for="item in [1,5, 10, 50, 100, 200,500]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">赔率表类型：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time11">
                                <el-option
                                           label="46倍组合"
                                           value="46"/>
                                <el-option
                                    label="68倍组合"
                                    value="68"/>
                                <el-option
                                    label="78倍组合"
                                    value="78"/>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td width="20%" align="center">和最大押注（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time12">
                                <el-option v-for="item in [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,1500, 2000, 2500]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">赔率表模式：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time13">
                                <el-option
                                    label="固定"
                                    value="0"/>
                                <el-option
                                    label="打乱"
                                    value="1"/>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td width="20%" align="center">庄闲和最小押注（游戏分值）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time14">
                                <el-option v-for="item in [0, 1, 5, 10, 20, 50, 100, 200, 500, 1000]"
                                           :label="item"
                                           :value="item"/>
                            </el-select>

                        </td>
                        <td width="20%" align="center">上分设置（游戏币）：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time15">
                                <el-option v-for="item in [10, 50, 100, 500, 1000]"
                                       :label="item"
                                       :value="item"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="center">桌状态：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time16">
                                <el-option
                                    label="开放"
                                    value="0"/>
                                <el-option
                                    label="锁定"
                                    value="1"/>
                            </el-select>
                        </td>
                    </tr>
                </table>
                <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="newDesk.visible = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="doAddUser()">确 定</el-button>
                     </span>
            </el-dialog>

            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">

                    <p style="border-top: 1px solid #eee;padding: 7px 0">【新手练习厅】已开启1桌，还可以开启0桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启1桌，还可以开启0桌 </p>
                    <header style="padding: 8px 0;border-top: 1px solid #ddd">
                        <el-button size="small" type="primary" @click="updateDesk">刷新</el-button>
                        <el-button style="margin-left: 18px" size="small" @click="newDesk.visible = true" type="primary">新增桌</el-button>
                        <el-button style="margin-left: 18px" size="small">参数设置</el-button>
                        <el-button style="margin-left: 18px" size="small" type="danger">删除桌</el-button>
                        <el-button style="margin-left: 18px" size="small" type="primary">桌排序</el-button>
                    </header>
                    <section style="margin-bottom: 10px">
                        <el-table
                            :data="deskList"
                            height="300"
                            size="small"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="桌ID"
                                width="220">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="桌名"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="roomId"
                                label="所属房间">
                            </el-table-column>
                            <el-table-column
                                prop="onlineNumber"
                                label="在线人数">
                            </el-table-column>
                            <el-table-column
                                prop="state"
                                label="桌状态">
                            </el-table-column>
                        </el-table>
                    </section>

                </div>
            </div>
        </div>
        <div class="l-flex-1 l-flex-column">
            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">
                    <section style="padding-top: 20px;border-top: 1px solid #ddd;">
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
                                height="260"
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

                </div>
            </div>
            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">
                    <section style="border-top: 1px solid #ddd;padding-top: 15px">
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
                                height="250"
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
            </div>
        </div>
    </div>



</template>

<script>
    import {aTypes, mTypes} from '~store/htyz'
    export default {
        data () {
            return {
                newDesk: {
                    visible: false,
                    "animalDiff":1,
                    "autoKick":10,
                    "beilvModel":1,
                    "beilvType":0,
                    "betTime":30,
                    "exchange":50,
                    "id":0,
                    "maxBet":500,
                    "max_h":1000,
                    "max_zx":1000,
                    "minBet":50,
                    "minGold":1,
                    "min_zxh":50,
                    "name":"新增桌名",
                    "onceExchangeValue":100,
                    "onlineNumber":0,
                    "orderBy":0,
                    "roomId":2,
                    "siteType":1,
                    "state":1,
                    "sumDeFen":0,
                    "sumYaFen":0,
                    "sumZhxDeFen":0,
                    "sumZhxYaFen":0,
                    "waterType":0,
                    "waterValue":0,
                    "zxhDiff":1
                },
                form: {
                    hlabel: '0',
                    flabel: '1',
                    time: 1,
                    timeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    content: ''
                },
                desk: 'deskService/getDeskList',
                deskList: null,
                desks: [
                    {
                        label: '幸运六师',
                        getDesk: 'deskService/getDeskList',
                        addDesk: 'deskService/addDesk'
                    },
                    {
                        label: '摇钱树',
                        getDesk: 'deskService/getFishDeskList',
                        addDesk: 'deskService/addFishDesk'
                    },
                    {
                        label: '单挑',
                        getDesk: 'deskService/getCardDeskList',
                        addDesk: 'deskService/addCardDesk'
                    },
                    {
                        label: '万炮捕鱼',
                        getDesk: 'deskService/getBulletFishDeskList',
                        addDesk: 'deskService/addBulletFishDesk'
                    },
                    {
                        label: '美人鱼',
                        getDesk: 'deskService/getMermaidDeskList',
                        addDesk: 'deskService/addMermaidDesk'
                    },
                    {
                        label: '缺一门',
                        getDesk: 'deskService/getLackDeskList',
                        addDesk: 'deskService/addLackDesk'
                    },
                    {
                        label: '欢乐牛牛',
                        getDesk: 'deskService/getJoyDeskList',
                        addDesk: 'deskService/addJoyDesk'
                    },
                    {
                        label: '水浒传',
                        getDesk: 'waterDeskService/getWaterDeskList',
                        addDesk: 'deskService/addWaterDesk'
                    },
                    {
                        label: '千炮捕鱼',
                        getDesk: 'deskService/getThousandFishDeskList',
                        addDesk: 'deskService/addThousandFishDesk'
                    }

                ],
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
        watch: {
            async desk (desk) {
                this.updateDesk()
            }
        },
        methods: {
            onSubmit () {
                console.log('submit!')
            },
            async updateDesk () {
                this.deskList = await this.$store.dispatch(aTypes.getDeskList, this.desk)
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
                    this.$store.dispatch(aTypes.updateDTStatus, {
                        statusIndex: 1,
                        content: this.form.content,
                        time: this.form.time
                    })
                }
            },
            clickPage (size) {
                // 分页
                console.log(size)
            }
        },
        computed: {},
        mounted () {
            this.updateDesk()
        }
    }
</script>
<style scoped>
    .el-pagination {
        text-align: center;
        margin: 25px 0;
    }

    .gameHomeSel {
        padding: 10px 0;
    }

    .dailyPicker {
        margin-bottom: 10px;
        float: left;
    }

</style>
