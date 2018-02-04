<template>
    <div style="height: 770px" class="l-flex-row">
        <div class="l-flex-1 l-flex-column">
            <div class=" l-relative" style="height: 150px">
                <div class="l-full" style="padding: 10px">
                    <div style="padding-bottom: 10px;border-bottom: 1px solid #ddd">
                        <h4 style="margin-bottom: 10px">新建公告：</h4>
                        <div stygile="margin: 10px">
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
                        <td width="20%" align="center">所属房间：</td>
                        <td width="30%">
                            <el-select class="" size="small" v-model="newDesk.time">
                                <el-option
                                    label="欢乐竞技厅"
                                    value="0"/>
                                <el-option
                                    label="新手练习厅"
                                    value="1"/>
                            </el-select>
                        </td>
                        <td width="20%" align="center">动物几率：</td>
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
                        <strong>总押分（游戏分值）: {{ sumYaFen_2 }}</strong>
                        <strong style="margin-left: 20px">总得分（游戏分值）: {{ sumDeFen_2 }}</strong>
                        <strong style="margin-left: 20px">总盈利（游戏分值）: {{ allGain_2 }}</strong>

                        <section style="margin: 10px 0">
                            <el-table
                                :data="userMsgList"
                                height="260"
                                size="small"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="username"
                                    label="账号">
                                </el-table-column>
                                <el-table-column
                                    prop="nickname"
                                    label="昵称">
                                </el-table-column>
                                <el-table-column
                                    prop="gameGold"
                                    label="游戏币">
                                </el-table-column>
                                <el-table-column
                                    prop="expeGold"
                                    label="体验币">
                                </el-table-column>
                                <el-table-column
                                    prop="gameScore"
                                    label="游戏分值">
                                </el-table-column>
                                <el-table-column
                                    prop="promoterName"
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
                                    v-model="xtLogTime"
                                    type="daterange"
                                    align="right"
                                    size="small"
                                    unlink-panels
                                    format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="logTimeChange"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <el-button style="margin-left: 15px;float: left" size="small" type="primary" v-tap="{methods:getWinMsgList}">查询</el-button>
                        </header>
                        <section style="margin: 10px 0">
                            <el-table
                                :data="winMsgList"
                                height="250"
                                size="small"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="datetime"
                                    label="开奖时间"
                                    width="120">
                                </el-table-column>
                                <el-table-column
                                    prop="sumYaFen"
                                    label="总押注(游戏分值)"
                                    width="80">
                                </el-table-column>
                                <el-table-column
                                    prop="sumDeFen"
                                    label="总出分(游戏分值)">
                                </el-table-column>
                                <el-table-column
                                    prop="result"
                                    label="结算结果(游戏分值)">
                                </el-table-column>
                                <el-table-column
                                    prop="betPeople"
                                    label="押注人数">
                                </el-table-column>
                                <el-table-column
                                    prop="resultStr"
                                    label="转盘结果">
                                </el-table-column>
                            </el-table>
                        </section>
                        <div class="block">
                            <el-pagination
                                @current-change="clickPage"
                                background
                                :current-page.sync="pageNumber"
                                size="small"
                                :page-size="pageSize"
                                layout="prev, pager, next,jumper"
                                :total="totalCount">
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
                        label: '幸运六狮',
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


                userMsgList:[
                  {"answer":"-1","bindingName":"","borrow":0,"boxGameGold":0
                    ,"boxLottery":0,"card":"-1"
                    ,"currentGameScore":19800,"displayStatus":0,
                    "expeGold":0,"expeScore":0,"expiryNum":0,
                    "gameGold":4600,"gameScore":0,"id":63,"lastDeskId":3,
                    "lastGame":0,"level":1,"levelScore":0
                    ,"loginDate":"2018-02-04 09:26:08","lottery":0,"name":"",
                    "nickname":"ZUK Z2121","overflow":0
                    ,"password":"e10adc3949ba59abbe56e057f20f883e",
                    "payMoney":0,"phone":"-","photoId":3
                    ,"promoterId":0,"promoterName":"admin","question":"-1",
                    "registDate":"2018-01-27 21:35:37"
                    ,"safeBox":0,"security":0,"sex":"男","shareClearingTime":"",
                    "shutupStatus":0,"specialMark":0
                    ,"status":0,"subUserCount":0,"type":1,"username":"00250000",
                    "warningStatus":0}

                    ],

                sumYaFen_2:0,
                sumDeFen_2:0,
                allGain_2:0,

                pickerOptions: {
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
                totalCount: 20,
                pageNumber: 1,
                pageSize: 8,

                xtLogTime: '',
                xtStartTime: null,
                xtEndTime: null,

                winMsgList: [{
                    animal:10,
                    awardGold:5455,
                    betPeople:1,
                    color:0,
                    datetime:"2018-02-04 09:28:57",
                    deskId:3,
                    globalType:0,
                    id:278987,
                    lightningBeilv:0,
                    luckAnimal:0,
                    luckNum:0,
                    luckType:0,
                    moreInfo:"",
                    result:200,
                    resultStr:"闲 普通绿兔子",
                    roomId:2,
                    songDengCount:0,
                    sumDeFen:0,
                    sumYaFen:200,
                    type:0,
                    zxh:2
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

            // new
            async getWinMsgList(){
                if (!this.xtStartTime || !this.xtEndTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //    修改
                let result = await this.$store.dispatch(aTypes.getDeskResult, [ 3,
                    this.xtStartTime , this.xtEndTime ,
                    { "list":[],"order":"","orderBy":"","pageCount":0, "pageNumber":1 ,"pageSize":8,"totalCount":this.totalCount }])

                if (result && result.list) {
                    let copyList = result.list
                    this.winMsgList = copyList
                    // 处理页码
                    this.totalCount = result.totalCount;
                    this.pageNumber = result.pageNumber;
                    this.pageSize = result.pageSize
                }
            },
            logTimeChange (val) {
                console.log(this.format(val[0]))
                console.log(this.format(val[1]))
                //                取到值
                this.xtStartTime = this.format(val[0])
                this.xtEndTime = this.format(val[1])
            },
            format (time, format = 'yyyy-MM-dd') {
                let t = new Date(time)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                        case 'yyyy':
                            return tf(t.getFullYear())
                        case 'MM':
                            return tf(t.getMonth() + 1)
                        case 'mm':
                            return tf(t.getMinutes())
                        case 'dd':
                            return tf(t.getDate())
                        case 'HH':
                            return tf(t.getHours())
                        case 'ss':
                            return tf(t.getSeconds())
                    }
                })
            },
            async clickPage (size) {
              console.log(1234313)
                // 分页  对应第三个表格的分页
                let result = null;

                // 修改 getDeskResult 、 修改id  对应的 方法
                if (!this.xtStartTime || !this.xtEndTime ) {
                    result = await this.$store.dispatch(aTypes.getDeskResult, [ 3,
                        this.format(new Date().getTime() - 3600 * 1000 * 24 * 2), this.format(new Date()),
                        { "list":[],"order":"","orderBy":"","pageCount":0, "pageNumber":size ,"pageSize":8,"totalCount":this.totalCount  }])
                } else {
                    result = await this.$store.dispatch(aTypes.getDeskResult, [ 3,
                        this.xtStartTime , this.xtEndTime ,
                        { "list":[],"order":"","orderBy":"","pageCount":0, "pageNumber":size ,"pageSize":8,"totalCount":this.totalCount  }])
                }
                console.log('第三个表格 分页')
                console.log(result);
                // 不知是否对应上。
                if (result && result.list) {
                    let copyList = result.list
                    this.winMsgList = copyList
                    // 处理页码
                    this.totalCount = result.totalCount;
                    this.pageNumber = result.pageNumber;
                    this.pageSize = result.pageSize;
                }
            },
        },
        computed: {},
        async mounted () {
            this.updateDesk()

            // 传入桌子id  获取第二列表的头部信息
            let getDeskData = await this.$store.dispatch(aTypes.getDeskData, [3] )
            if( getDeskData && getDeskData.sumDeFen !== undefined ){
                this.sumYaFen_2 = getDeskData.sumYaFen ;
                this.sumDeFen_2 = getDeskData.sumDeFen ;
                this.allGain_2 = Number( getDeskData.sumYaFen ) - Number( getDeskData.sumDeFen ) ;
            }

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
