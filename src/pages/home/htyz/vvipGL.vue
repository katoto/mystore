<template>
    <div>
        <header class="clearfix">
            <el-form ref="form" :model="form">
                <div style="overflow: hidden">
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: moreMess }">详情</el-button>
                    <el-button size="small" :disabled=showStopBtn type="primary" v-tap="{methods: lockUser }">封号</el-button>
                    <el-button size="small" :disabled=showNoStopBtn type="primary" v-tap="{methods: unlockUser }">解禁</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: deleteUser }">删号</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: beforeMinusGameGold }" >扣除游戏币</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: beforeAwardGameGold }">游戏币赠送</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: beforeChangeUserLevel }">修改等级</el-button>
                    <el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: resetPass }">重置密码</el-button>
                    <el-button size="small" :disabled="dealException" type="primary" v-tap="{methods: dealException2 }" >删除异常</el-button>

                    <!--<el-button size="small" :disabled="!currvvipList" type="primary" v-tap="{methods: minusGameGold }" disabled>身份信息查询与修改</el-button>-->
                    <!--<el-button size="small" :disabled="!currvvipList" type="primary" disabled v-tap="{methods: modifySafeBoxPwd }">口令修改</el-button>-->
                </div>
                <el-form-item label="禁言：" class="jy">
                    <el-radio-group :disabled="!currvvipList" v-model="shutupStatusVal">
                        <el-radio label="0">正常</el-radio>
                        <el-radio label="1">20分钟禁言</el-radio>
                        <el-radio label="2">6小时禁言</el-radio>
                        <el-radio label="3">一天禁言</el-radio>
                    </el-radio-group>
                </el-form-item>

                <span class="xtSpan">用户账号：</span>
                <el-select class="checkID xtSel" size="small" v-model="searchUserVal" placeholder="请选择">
                    <el-option
                        v-for="item in searchUserValOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="checkID xtSel" size="small" :disabled="isOption" v-model="searchUserStyle" placeholder="请选择">
                    <el-option
                        v-for="item in searchUserStyleOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="small" class="xtInp" v-model="searchUserInpVal" placeholder="请输入内容"></el-input>
                <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{methods: searchUser }">查找</el-button>
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
                        prop="warningStatus"
                        label="账目状态"
                        width="150"
                    >
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
                        prop="status"
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

        <el-dialog v-if="currvvipList"
            title="会员详情"
            :visible.sync="centerDialogVisible"
            width="75%"
            center>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>账号：{{ currvvipList.username }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>冻结状态：{{ currvvipList.status }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>昵称：{{ currvvipList.nickname }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>爆机状态：{{ currvvipList.overflow }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>性别：{{ currvvipList.sex }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>游戏币数目(不含保险柜内游戏币)：{{ currvvipList.gameGold }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>推广员：{{ currvvipList.promoterName }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>体验币数目：{{ currvvipList.expeGold }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>身份证号：{{ currvvipList.card }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>是否租借平板：否 </span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>会员等级：{{ currvvipList.level }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>禁言状态：{{ isShutUpName }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>注册时间：{{ currvvipList.registDate }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>最近登录时间：{{ currvvipList.loginDate }}</span>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!--  扣除 minusGameGold 金币弹窗 -->
        <el-dialog
            title="扣除游戏币"
            :visible.sync="minusGameGoldVisible"
            width="35%">
            <p style="margin-bottom: 10px" v-if="currvvipList">
                <span>当前游戏币：{{ currvvipList.currvvipList }}</span>
            </p>
            <span>扣除游戏币：</span><el-input v-model="minusGameGoldNumber" ></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="minusGameGoldVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:minusGameGold }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!--  赠送  awardGameGold 金币弹窗 -->
        <el-dialog
            title="扣除游戏币"
            :visible.sync="awardGameGoldVisible"
            width="35%">
            <p style="margin-bottom: 10px" v-if="currvvipList">
                <span>当前游戏币：{{ currvvipList.currvvipList }}</span>
            </p>
            <span>赠送游戏币：</span><el-input v-model="awardGameGoldNumber" ></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="awardGameGoldVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:awardGameGold }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!--  修改等级  -->
        <el-dialog
            title="修改等级"
            :visible.sync="levelVisible"
            width="35%">
            <p style="margin-bottom: 10px" v-if="currvvipList">
                <span>当前等级：{{ currvvipList.level }}</span>
            </p>
            <div>
                <span>修改为：</span>
                <el-select class="xtSel" size="small" v-model="levelVal" placeholder="请选择等级">
                    <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="levelVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: changeUserLevel }"  >确 定</el-button>
          </span>
        </el-dialog>


    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/htyz'
    export default {
        data () {
            return {
                searchUserInpVal: '',
                searchUserVal: '0',
                searchUserValOption: [
                    {
                        value: '0',
                        label: '直属会员'
                    },
                    {
                        value: '1',
                        label: '非直属会员'
                    },
                    {
                        value: '2',
                        label: '游客'
                    },
                    {
                        value: '3',
                        label: '所有会员'
                    }],
                searchUserStyle: '0',
                searchUserStyleOption: [
                    {
                        value: '0',
                        label: '会员账号'
                    },
                    {
                        value: '1',
                        label: '身份证号'
                    }],

                shutupStatusVal: '',

                levelVal: 1,
                levelVisible: false,
                levelOptions: [{
                    label: 'L1,新手',
                    value: 1
                },
                {
                    label: 'L2,学徒',
                    value: 2
                },
                {
                    label: 'L3,新秀',
                    value: 3
                },
                {
                    label: 'L4,新贵',
                    value: 4
                },
                {
                    label: 'L5,高手',
                    value: 5
                },
                {
                    label: 'L6,达人',
                    value: 6
                },
                {
                    label: 'L7,精英',
                    value: 7
                },
                {
                    label: 'L8,专家',
                    value: 8
                },
                {
                    label: 'L9,大师',
                    value: 9
                },
                {
                    label: 'L10,宗师',
                    value: 10
                },
                {
                    label: 'L11,盟主',
                    value: 11
                },
                {
                    label: 'L12,传奇',
                    value: 12
                },
                {
                    label: 'L13,赌王',
                    value: 13
                },
                {
                    label: 'L14,赌圣',
                    value: 14
                },
                {
                    label: 'L15,赌神',
                    value: 15
                },
                {
                    label: 'L16,至尊',
                    value: 16
                }
                ],

                input: '',
                centerDialogVisible: false,

                minusGameGoldVisible: false,
                minusGameGoldNumber: '',

                awardGameGoldVisible: false,
                awardGameGoldNumber: '',

                form: {
                    name: '',
                    desc: ''
                },

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

                currvvipList: null,
                showStopBtn: true,
                showNoStopBtn: true,

                dealException: true,

                isShutUpName: '正常',
                isOption: false
            }
        },
        watch: {
            async shutupStatusVal (val) {
                if (this.currvvipList) {
                    if (this.currvvipList.shutupStatusVal !== val) {
                        let result = await this.$store.dispatch(aTypes.shutupUser, [Number(this.currvvipList.id), Number(val)])
                        console.log(result)
                        console.log('shutupStatusVal')
                        if (result && result.success === true) {
                            // 提示有点问题。
                            switch (val) {
                            case '0':
                                this.isShutUpName = '正常'
                                break
                            case '1':
                                this.isShutUpName = '20分钟禁言'
                                break
                            case '2':
                                this.isShutUpName = '6小时禁言'
                                break
                            case '3':
                                this.isShutUpName = '一天禁言'
                                break
                            }
                            //                                this.$message({
                            //                                    message: '禁言成功',
                            //                                    type: 'success',
                            //                                    duration: 1200
                            //                                })
                            this.clickPage(1)
                        }
                    }
                }
            },
            currvvipList (val) {
                // 显示禁言状态
                this.shutupStatusVal = val.shutupStatus.toString()

                switch (val.shutupStatus.toString()) {
                case '0':
                    this.isShutUpName = '正常'
                    break
                case '1':
                    this.isShutUpName = '20分钟禁言'
                    break
                case '2':
                    this.isShutUpName = '6小时禁言'
                    break
                case '3':
                    this.isShutUpName = '一天禁言'
                    break
                }

                if (val.shutupStatus.toString() === '0') {
                    this.dealException = true
                }
                if (val.status === '冻结') {
                    this.showNoStopBtn = false
                    this.showStopBtn = true
                } else {
                    // 正常的情况。
                    this.showNoStopBtn = true
                    this.showStopBtn = false
                }
            },
            searchUserVal (val) {
                if (val !== undefined || val !== null) {
                    if (Number(val) === 2) {
                        this.isOption = true
                    } else {
                        this.isOption = false
                    }
                }
                this.searchUserInpVal = ''
                this.getUserManageFn(Number(this.searchUserVal))
            }
        },
        methods: {
            async dealException2 () {
                let result = await this.$store.dispatch(aTypes.dealException, [ Number(this.currvvipList.id)])
                console.log(result)
                console.log('解除异常')
                if (result && result.success === true) {
                    this.$message({
                        message: '解除异常成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                }
            },
            async resetPass () {
                let result = await this.$store.dispatch(aTypes.resetUserPassword, [ Number(this.currvvipList.id)])
                console.log(result)
                console.log('密码重置')
                if (result && result.success === true) {
                    this.$message({
                        message: '密码重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
            },
            async searchUser () {
                if (this.searchUserInpVal === '') {
                    this.getUserManageFn(Number(this.searchUserVal))
                } else {
                    let result = await this.$store.dispatch(aTypes.searchUser, [ this.searchUserInpVal.toString(), 0, Number(this.searchUserVal) ])
                    console.log(result)
                    console.log('查询内容')
                    if (result) {
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1200
                        })
                        if (result.results) {
                            this.vvipList = result.results
                            this.vvipList.forEach((item) => {
                                if (item.warningStatus === 0) {
                                    item.warningStatus = '正常'
                                } else {
                                    item.warningStatus = '异常:存在' + item.warningStatus + '不明数额'
                                }
                                if (item.status === 0) {
                                    console.log(item.shutupStatus.toString())
                                    console.log('=============')
                                    if (item.shutupStatus.toString() === '0') {
                                        item.status = '正常'
                                    } else {
                                        item.status = '禁言'
                                    }
                                } else {
                                    item.status = '冻结'
                                }
                            })
                        }
                    }
                }
            },
            async deleteUser () {
                let result = await this.$store.dispatch(aTypes.deleteUser, [ Number(this.currvvipList.id)])
                console.log(result)
                console.log('删号')
                if (result && result.success === true) {
                    this.$message({
                        message: '删号成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                }
            },

            beforeChangeUserLevel () {
                // 出现弹窗
                this.levelVisible = true
            },
            async changeUserLevel () {
                if (!this.levelVal) {
                    this.$message({
                        message: '请选择要修改的等级',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let result = await this.$store.dispatch(aTypes.changeUserLevel, [ Number(this.currvvipList.id), Number(this.levelVal)])
                console.log(result)
                console.log('修改等级')
                if (result && result.success === true) {
                    this.$message({
                        message: '修改等级',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                    setTimeout(() => {
                        this.levelVisible = false
                    })
                }
            },

            beforeAwardGameGold () {
                // 出现弹窗
                this.awardGameGoldVisible = true
            },
            async awardGameGold () {
                if (!this.awardGameGoldNumber) {
                    this.$message({
                        message: '请输入赠送金币',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let result = await this.$store.dispatch(aTypes.awardGameGold, [ Number(this.currvvipList.id), Number(this.awardGameGoldNumber)])
                console.log(result)
                console.log('赠送金币')
                if (result && result.success === true) {
                    this.$message({
                        message: '赠送金币',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                    setTimeout(() => {
                        this.awardGameGoldVisible = false
                    })
                }
            },

            beforeMinusGameGold () {
                // 出现弹窗
                this.minusGameGoldVisible = true
            },
            async minusGameGold () {
                if (!this.minusGameGoldNumber) {
                    this.$message({
                        message: '请输入扣除金币',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let result = await this.$store.dispatch(aTypes.minusGameGold, [ Number(this.currvvipList.id), Number(this.minusGameGoldNumber)])
                console.log(result)
                console.log('扣除金币')
                if (result && result.success === true) {
                    this.$message({
                        message: '扣除金币',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                    setTimeout(() => {
                        this.minusGameGoldVisible = false
                    })
                }
            },

            moreMess () {
                // 显示详细信息
                this.centerDialogVisible = true
            },
            async lockUser () {
                let result = await this.$store.dispatch(aTypes.lockUser, [ Number(this.currvvipList.id)])
                console.log(result)
                console.log('封号')
                if (result && result.success === true) {
                    this.$message({
                        message: '封号成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                }
            },
            async unlockUser () {
                let result = await this.$store.dispatch(aTypes.unlockUser, [ Number(this.currvvipList.id) ])
                console.log(result)
                console.log('解禁')
                if (result && result.success === true) {
                    this.$message({
                        message: '解禁成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.clickPage(1)
                    this.initSearch(false)
                }
            },
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

                this.searchUserInpVal = ''
                this.clickPage(1)
                this.showNoStopBtn = true
                this.showStopBtn = true
                this.dealException = true
            },
            emailListClick (val) {
                // 处理一些可显示
                if (val) {
                    this.currvvipList = val
                }
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            async clickPage (size) {
                this.getUserManageFn(Number(this.searchUserVal), size)
            },

            async getUserManageFn (currid = 0, pageNum = 1) {
                let result = await this.$store.dispatch(aTypes.getUserManage, [ currid, {'list': [],
                    'order': '',
                    'orderBy': '',
                    'pageCount': 0,
                    'pageNumber': Number(pageNum),
                    'pageSize': 12,
                    'totalCount': 0}])
                console.log(result)
                console.log('会员高级管理列表')
                if (result) {
                    if (result.pager && result.pager.list) {
                        this.vvipList = result.pager.list
                        this.vvipList.forEach((item) => {
                            if (item.warningStatus === 0) {
                                item.warningStatus = '正常'
                            } else {
                                item.warningStatus = '异常:存在' + item.warningStatus + '不明数额'
                            }
                            if (item.status === 0) {
                                if (item.shutupStatus.toString() === '0') {
                                    item.status = '正常'
                                } else {
                                    item.status = '禁言'
                                }
                            } else {
                                item.status = '冻结'
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

                    this.$message({
                        message: '已更新',
                        type: 'success',
                        duration: 1200
                    })
                }
            }

        },
        computed: {},
        async mounted () {
            this.getUserManageFn()
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
        max-width: 150px ;
        float: left;
        margin-left: 10px;
    }
    header button{
        float: left;
    }

    .checkID{
        max-width: 150px;
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

    @media (max-width: 768px) {
        header button{
            margin:0 10px 10px 0;
        }
        .el-button+.el-button {
            margin-left:0;
        }
        .el-radio+.el-radio {
            margin-left: 10px;
        }
        header .xtSpan,header .xtSel{
            margin:0 10px 10px 0;
        }
        header .xtInp{
            max-width: 120px;
        }
    }
</style>
