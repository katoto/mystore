<template>
    <div>
        <header class="clearfix">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="height: 36px">
                    <el-button size="small" :disabled="!currvvipList" type="primary">详情</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">封号</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">解禁</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">删号</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">扣除游戏币</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">游戏币赠送</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">游戏币赠送</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">修改等级</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">身份信息查询与修改</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">重置密码</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" disabled>删除异常</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary">口令修改</el-button>
                </div>
                <el-form-item label="禁言：">
                    <el-radio-group :disabled="!currvvipList" v-model="form.resource">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="20分钟禁言"></el-radio>
                        <el-radio label="6小时禁言"></el-radio>
                        <el-radio label="一天禁言"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <span class="xtSpan">用户账号：</span>
                <el-select class="checkID xtSel" size="small" v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
                <el-select class="checkID xtSel" size="small" v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
                <el-input size="small" class="xtInp" v-model="input" placeholder="请输入内容"></el-input>
                <el-button style="margin-left: 18px" size="small" type="primary">查找</el-button>
                <el-button style="margin-left: 18px" size="small" type="warning" v-tap="{methods: initSearch}">重置</el-button>
            </el-form>
        </header>

        <section style="margin-bottom: 50px">
            <section class="bottomSel">
                <el-table
                    ref="singleTable"
                    :data="vvipList"
                    highlight-current-row
                    height="300"
                    size="small"
                    border
                    @cell-click="emailListClick"
                    style="width: 100%">
                    <el-table-column
                        prop="username"
                        label="账号"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        label="昵称"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="账目状态">
                    </el-table-column>
                    <el-table-column
                        prop="gameGold"
                        label="游戏币">
                    </el-table-column>
                    <el-table-column
                        prop="lottery"
                        label="彩票数">
                    </el-table-column>
                    <el-table-column
                        prop="promoterName"
                        label="所属推广员">
                    </el-table-column>
                    <el-table-column
                        prop="level"
                        label="等级">
                    </el-table-column>
                    <el-table-column
                        prop="shutupStatus"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="loginDate"
                        label="最近登录">
                    </el-table-column>
                    <el-table-column
                        prop="subUserCount"
                        label="子账号">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        @current-change="clickPage"
                        background
                        size="small"
                        :page-size="pageSize"
                        :current-page.sync="pageNumber"
                        layout="prev, pager, next,jumper"
                        :total="totalCount">
                    </el-pagination>
                </div>
                <p>会员携带（币）：{{ AllGold }} </p>
                <p>彩票数：{{ AllNumber }} </p>
            </section>
        </section>
        <el-dialog
            title="会员详情"
            :visible.sync="centerDialogVisible"
            width="75%"
            center>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>账号：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>冻结状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>昵称：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>爆机状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>性别：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>游戏币数目(不含保险柜内游戏币)：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>推广员：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>体验币数目：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>身份证号：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>是否租借平板：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>会员等级：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>禁言状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>注册时间：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>最近登录时间：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/htyz'
    export default {
        data () {
            return {
                input: '',
                centerDialogVisible: false,
                form: {
                    name: '',
                    desc: ''
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
                value: '10万',
                vvipList: [{
                    answer: '-1',
                    bindingName: '',
                    borrow: 0,
                    boxGameGold: 0,
                    boxLottery: 0,
                    card: '-1',
                    currentGameScore: 0,
                    displayStatus: 3,
                    expeGold: 0,
                    expeScore: 0,
                    expiryNum: 0,
                    gameGold: 6167,
                    gameScore: 0,
                    id: 3,
                    lastDeskId: 2,
                    lastGame: 4,
                    level: 1,
                    levelScore: 174.55626,
                    loginDate: '2017-11-25 14:52:50',
                    lottery: 0,
                    name: '',
                    nickname: 'q q q',
                    overflow: 0,
                    password: 'c51cd8e64b0aeb778364765013df9ebe',
                    payMoney: 0,
                    phone: '-',
                    photoId: 1,
                    promoterId: 0,
                    promoterName: '99999',
                    question: '',
                    registDate: '2017-11-24 21:00:36',
                    safeBox: 0,
                    security: 0,
                    sex: '男',
                    shareClearingTime: '',
                    shutupStatus: 1,
                    specialMark: 1,
                    status: 0,
                    subUserCount: 0,
                    type: 0,
                    username: '000000',
                    warningStatus: 0
                }],

                totalCount: 0,
                pageNumber: 1,
                pageSize: 12,

                AllGold: 0,
                AllNumber: 0,

                currvvipList: null
            }
        },
        watch: {},
        methods: {
            initSearch (showTips = true) {
                if (showTips) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
                // 去除 表格选中
                this.$refs.singleTable.setCurrentRow('')
                this.currvvipList = null
            },
            emailListClick (val) {
                // 列表点击
                console.log(val)
                // 处理一些可显示
                this.currvvipList = val
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            async clickPage (size) {
                // 分页  请求数据 ，更新数据
                let result = null
                result = await this.$store.dispatch(aTypes.getUserManage, [0, {'list': [],
                    'order': '',
                    'orderBy': '',
                    'pageCount': 0,
                    'pageNumber': size,
                    'pageSize': 12,
                    'totalCount': 0 } ])
                console.log(result)
                console.log('vvipGL 下一页')
                if (result) {
                    if (result.pager && result.pager.list) {
                        this.vvipList = result.pager.list
                        this.vvipList.forEach((item) => {
                            if (item.shutupStatus === 0) {
                                item.shutupStatus = '正常'
                            } else {
                                item.shutupStatus = '禁言'
                            }
                            if (item.status === 0) {
                                item.status = '正常'
                            } else {
                                item.status = '异常'
                            }
                        })
                    }
                    if (result.gold) {
                        this.AllGold = result.gold
                    }
                    if (result.number) {
                        this.AllNumber = result.number
                    }
                    // 处理页码
                    this.totalCount = result.pager.totalCount
                    this.pageNumber = result.pager.pageNumber
                    this.pageSize = result.pager.pageSize
                }
            }
        },
        computed: {},
        async mounted () {
            let result = await this.$store.dispatch(aTypes.getUserManage)
            console.log(result)
            console.log('会员高级管理列表')
            if (result) {
                if (result.pager && result.pager.list) {
                    this.vvipList = result.pager.list
                    this.vvipList.forEach((item) => {
                        if (item.shutupStatus === 0) {
                            item.shutupStatus = '正常'
                        } else {
                            item.shutupStatus = '禁言'
                        }
                        if (item.status === 0) {
                            item.status = '正常'
                        } else {
                            item.status = '异常'
                        }
                    })
                }
                if (result.gold) {
                    this.AllGold = result.gold
                }
                if (result.number) {
                    this.AllNumber = result.number
                }
                // 处理页码
                this.totalCount = result.pager.totalCount
                this.pageNumber = result.pager.pageNumber
                this.pageSize = result.pager.pageSize
            }
        }
    }
</script>
<style scoped>
    .el-pagination{
        text-align: center;
        margin: 25px 0;
    }
    .bottomSel p{
        margin-top: 5px;
        line-height: 26px;
    }
    header{
        margin-bottom: 20px;
    }
    header .xtPicker{
        margin-bottom: 16px;
        max-width: 280px ;
        float: left;
    }
    header .xtSpan{
        float: left;
        line-height: 32px;
        margin-left: 10px;
    }
    header .xtSel{
        max-width: 100px ;
        float: left;
        margin-left: 10px;
    }
    header .xtInp{
        max-width: 120px ;
        float: left;
        margin-left: 10px;
    }
    header button{
        float: left;
    }

    .checkID{
        max-width: 120px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }

    .el-row{
        padding: 1px 0;
    }
</style>
