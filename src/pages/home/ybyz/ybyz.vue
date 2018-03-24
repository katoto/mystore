<template>
    <div style="position: relative">
        <p class="tipsStyle red">当前可处理的订单数：充值申请0个，兑奖申请0个</p>
        <el-tabs v-model="activeNameTop" type="card" @tab-click="handleClick">
            <el-tab-pane label="会员操作" name="vipOperate"></el-tab-pane>
            <!--<el-tab-pane label="平板租借记录查询" name="rentSearch" disabled></el-tab-pane>-->
            <!--  暂时不用  -->
        </el-tabs>
        <template>
            <div id="vipOperate">
                <section style="padding-bottom: 10px;border-bottom: 1px solid #000;">
                    <header class="clearfix">
                        <span class="xtSpan">查找：</span>
                        <el-select class="checkID xtSel" size="small" v-model="vipStyle" placeholder="请选择">
                            <el-option
                                v-for="item in vipStyleOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" >
                            </el-option>
                        </el-select>
                        <el-select class="checkID xtSel" :disabled="isOption" size="small" v-model="vipUserName" placeholder="请选择">
                            <el-option
                                v-for="item in vipUserNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" >
                            </el-option>
                        </el-select>
                        <el-input size="small" class="xtInp" v-model="vipSearch" placeholder="请输入内容"></el-input>
                        <el-button size="small" type="primary" v-tap="{ methods:ybyzSearchFn }">查询</el-button>
                        <el-button size="small" type="warning" v-tap="{ methods:initSearch }">重置</el-button>
                        <el-button size="small" v-tap="{ methods:beforeAddUserFn }" type="danger" disabled >特殊直属会员录入</el-button>
                    </header>
                    <section>
                        <el-table
                            ref="singleTable"
                            :data="vipUserList"
                            highlight-current-row
                            height="250"
                            size="small"
                            border
                            @cell-click="vipListClick"
                            style="width: 100%">
                            <el-table-column
                                prop="username"
                                label="账号"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="nickname"
                                label="昵称"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="level"
                                label="等级"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                prop="warningStatus"
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
                                prop="payMoney"
                                label="申请充值数目(元宝)">
                            </el-table-column>
                            <el-table-column
                                prop="expiryNum"
                                label="申请兑奖数目(元宝)">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="联系方式">
                            </el-table-column>
                            <el-table-column
                                prop="registDate"
                                label="注册时间">
                            </el-table-column>
                            <el-table-column
                                prop="loginDate"
                                label="最近登录">
                            </el-table-column>
                            <el-table-column
                                prop="subUserCount"
                                label="子账号"
                                width="60">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                background
                                :current-page.sync="pageNumber"
                                :page-size="pageSize"
                                size="small"
                                layout="prev, pager, next,jumper"
                                :total="totalCount" >
                            </el-pagination>
                        </div>
                    </section>
                </section>
                <!--  特殊直属会员  弹窗  -->
                <el-dialog
                    title="特殊直属会员录入"
                    :visible.sync="addUserVisible"
                    width="35%">
                    <span>请输入录入账号：</span><el-input v-model="addUserVal1" ></el-input>
                    <span>再次输入录入账号：</span><el-input v-model="addUserVal2" ></el-input>
                    <span>联系方式：</span><el-input v-model="addUserVal3" ></el-input>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:addUserFn }"  >确 定</el-button>
          </span>
                </el-dialog>

                <el-tabs disabled id="vipOperate" v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane :disabled=!selVipVal label="会员充值" name="vipOperate"></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="礼品兑换" name="giftExchange" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="充值查询" name="rechargeSearch" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="兑奖查询" name="DJSearch" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="赠送查询" name="giveSearch" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="扣除查询" name="delSearch" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="游玩记录" name="playList" ></el-tab-pane>
                    <el-tab-pane :disabled=!selVipVal label="会员登录IP记录" name="vipLoginList" ></el-tab-pane>
                    <!-- 暂时不用 -->
                    <!--<el-tab-pane label="平板租借" name="flatRent" ></el-tab-pane>-->
                    <!--<el-tab-pane label="平板归还" name="rentReturn" ></el-tab-pane>-->
                    <!--<el-tab-pane label="租借记录" name="rentList" ></el-tab-pane>-->
                    <!--<el-tab-pane label="币票兑换记录" name="BPList" ></el-tab-pane>-->
                    <!--<el-tab-pane label="绑定账号记录" name="bindingList" ></el-tab-pane>-->
                    <!--<el-tab-pane label="物品赠收记录" name="giveGoodsList" ></el-tab-pane>-->
                    <!--<el-tab-pane label="每周营收" name="weeklyList" disabled></el-tab-pane>-->
                </el-tabs>

            </div>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/ybyz'

export default {
        data () {
            return {
                activeNameTop: 'vipOperate',

                vipStyle: 0,
                vipStyleOptions: [
                    { id: 0, name: '直属会员' },
                    { id: 1, name: '非直属会员' },
                    { id: 2, name: '游客' },
                    { id: 3, name: '特殊直属会员' }
                ],
                vipUserName: 0,
                vipUserNameOptions: [
                    { id: 0, name: '会员账号' }
                ],
                vipSearch: '',
                activeName: 'vipOperate',
                vipUserList: [{
                    username: '0',
                    nickname: 'q',
                    level: 1,
                    gameGold: 3954,
                    lottery: 0,
                    promoterName: 'admin',
                    payMoney: 0,
                    expiryNum: 0,
                    status: 0,
                    phone: '-',
                    registDate: '2017-11-24 21:00:36',
                    loginDate: '2017-11-25',
                    subUserCount: 0,
                    warningStatus: 0
                }],
                totalCount: 0,
                pageNumber: 1,
                pageSize: 0,

                addUserVisible: false,
                addUserVal1: '',
                addUserVal2: '',
                addUserVal3: '',

                isOption: false
            }
        },
        methods: {
            async ybyzSearchFn () {
                if (this.vipSearch === '') {
                    this.getUserListFn(this.vipStyle)
                } else {
                    let searchUser = await this.$store.dispatch(aTypes.searchUser, [ this.vipSearch.toString(), Number(this.vipUserName), Number(this.vipStyle) ])

                    if (searchUser) {
                        if (searchUser.results) {
                            this.vipUserList = searchUser.results
                            this.vipUserList.forEach((item) => {
                                if (item.status === 0) {
                                    item.status = '正常'
                                } else {
                                    item.status = '禁用'
                                }
                                if (item.warningStatus === 0) {
                                    item.warningStatus = '正常'
                                } else {
                                    item.warningStatus = '异常：存' + item.warningStatus + '币的不明数额'
                                }
                                if (item.level !== undefined) {
                                    item.level = item.level + '级推广员'
                                }
                            })
                        }
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1200
                        })
                    }
                }
            },
            handleClickTop (tab, event) {
                if (this.activeNameTop) {
                    switch (this.activeNameTop) {
                    case 'vipOperate':
                        this.$router.push('/home/ybyz/vipOperate')
                        break
                    case 'rentSearch':
                        this.$router.push('/home/ybyz/rentSearch')
                        break
                    }
                }
            },

            beforeAddUserFn () {
                this.addUserVisible = true
            },
            async addUserFn () {
                // 特殊直属会员录入
            //                this.addUserVal1
            //                this.addUserVal2
            //                this.addUserVal3
            //                let getVipUserList = await this.$store.dispatch(aTypes.getVipUserList)
            //                console.log(getVipUserList)
            },
            async handleCurrentChange (size) {
                // 分页事件  第一位
                this.vipSearch = ''
                this.getUserListFn(this.vipStyle, size)
            },
            vipListClick (val) {
                // 列表点击
                this.$store.commit(mTypes.setSelVipVal, val)
                // 处理一些可显示
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            initSearch (showTips = true) {
                // 重置 选中状态
                this.tgySearch = ''
                if (showTips) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
                // 去除 表格选中
                this.$refs.singleTable.setCurrentRow('')
                this.$store.commit(mTypes.setSelVipVal, null)
                this.vipSearch = ''

                this.getUserListFn(this.vipStyle)
            },
            handleClick (tab, event) {
                /*  路由 跳转  */
                if (this.activeName) {
                    switch (this.activeName) {
                    case 'vipOperate':
                        this.$router.push('/home/ybyz/vipOperate')
                        break
                    case 'giftExchange':
                        this.$router.push('/home/ybyz/giftExchange')
                        break
                    case 'flatRent':
                        this.$router.push('/home/ybyz/flatRent')
                        break
                    case 'rentReturn':
                        this.$router.push('/home/ybyz/rentReturn')
                        break
                    case 'rechargeSearch':
                        this.$router.push('/home/ybyz/rechargeSearch')
                        break
                    case 'DJSearch':
                        this.$router.push('/home/ybyz/DJSearch')
                        break
                    case 'giveSearch':
                        this.$router.push('/home/ybyz/giveSearch')
                        break
                    case 'delSearch':
                        this.$router.push('/home/ybyz/delSearch')
                        break
                    case 'rentList':
                        this.$router.push('/home/ybyz/rentList')
                        break
                    case 'playList':
                        this.$router.push('/home/ybyz/playList')
                        break
                    case 'vipLoginList':
                        this.$router.push('/home/ybyz/vipLoginList')
                        break
                    case 'BPList':
                        this.$router.push('/home/ybyz/BPList')
                        break
                    case 'bindingList':
                        this.$router.push('/home/ybyz/bindingList')
                        break
                    case 'giveGoodsList':
                        this.$router.push('/home/ybyz/giveGoodsList')
                        break
                    case 'weeklyList':
                        this.$router.push('/home/ybyz/weeklyList')
                        break
                    }
                }
            },

            async getUserListFn (currid = 0, pageNum = 1) {
                let getVipUserList = await this.$store.dispatch(aTypes.getVipUserList, [currid, {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': Number(pageNum), 'pageSize': 8, 'totalCount': 0}])
                if (getVipUserList) {
                    if (getVipUserList.pager && getVipUserList.pager.list) {
                        this.vipUserList = getVipUserList.pager.list
                        this.vipUserList.forEach((item) => {
                            if (item.status === 0) {
                                item.status = '正常'
                            } else {
                                item.status = '禁用'
                            }
                            if (item.warningStatus === 0) {
                                item.warningStatus = '正常'
                            } else {
                                item.warningStatus = '异常：存' + item.warningStatus + '币的不明数额'
                            }
                            if (item.level !== undefined) {
                                item.level = item.level + '级推广员'
                            }
                        })
                        // 处理页码
                        this.totalCount = getVipUserList.pager.totalCount
                        this.pageNumber = getVipUserList.pager.pageNumber
                        this.pageSize = getVipUserList.pager.pageSize

                        this.$message({
                            message: '已更新',
                            type: 'success',
                            duration: 1200
                        })
                    }
                }
            }
        },
        computed: {
            selVipVal () {
                return this.$store.state.ybyz.selVipVal
            },
            updataybyzSearchFn () {
                return this.$store.state.ybyz.updataybyzSearchFn
            }
        },
        watch: {
            updataybyzSearchFn () {
                this.ybyzSearchFn()
                this.initSearch(false)
            },
            selVipVal (val) {
                this.$router.push('/home/ybyz/vipOperate')
                this.activeName = 'vipOperate'
            },
            vipStyle (val) {
                if (val !== undefined || val !== null) {
                    if (Number(val) === 2) {
                        this.isOption = true
                    } else {
                        this.isOption = false
                    }
                }
                this.vipSearch = ''
                this.getUserListFn(this.vipStyle)
            }
        },
        async mounted () {
            // 默认第一页。
            this.getUserListFn()
    }
    }
</script>
<style scoped>
    .tipsStyle{
        position: absolute;
        top: 0;
        right: 0;
    }
    .red{
        color: red;
    }
    #vipOperate header{
        padding-bottom: 10px;
    }
    #vipOperate header .el-button{
        margin-left: 10px;
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
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        .tipsStyle{
            top: 20px;
            font-size:8px;
        }
        #vipOperate header .el-button,header .xtInp{
            margin-top: 10px;
        }
        #vipOperate{
            font-size:12px;
        }
    }
</style>
