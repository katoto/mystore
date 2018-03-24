<template>
    <div id="xtLog">
        <header class="clearfix">
            <el-input style="float: left" size="small" v-model="onlineSearchInp" placeholder="请输入查询用户名"></el-input>
            <el-button style="float: left;margin-left: 20px" size="small" v-tap="{ methods:onlineSearch }" type="primary">查找</el-button>
            <el-button style="float: left;margin-left: 20px" size="small" v-tap="{ methods:onlineReset }" type="danger">重置</el-button>
            <h2 style="float: right;margin-right: 30px">总金额：{{ totalMoney }}</h2>
        </header>
        <section>
            <el-table
                :data="xtLogList"
                height="450"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="充值金额">
                </el-table-column>
                <el-table-column
                    prop="realReceive"
                    label="实际金额">
                </el-table-column>
                <el-table-column
                    prop="pay_method"
                    label="支付方式">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="时间">
                </el-table-column>
                <el-table-column
                    prop="promoter"
                    label="所属推广员">
                </el-table-column>
                <el-table-column
                    prop="order_no"
                    label="订单编号">
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
    import { aTypes } from '~store/onlinePay.js'
    export default {
        data () {
            return {
                onlineSearchInp: '',
                totalMoney: 0,

                xtLogList: [
                    {
                        username: 'qwerty', // 用户名
                        amount: '100', // 充值金额
                        realReceive: '100', // 实际金额
                        time: 'fadsfdsd', // 时间
                        order_no: '111111', // 订单编号
                        id: 67 //  用户id，确认充值时会用到，表格里不需要显示
                    }]

            }
        },
        methods: {
            async onlineReset () {
                let getManageList = await this.$store.dispatch(aTypes.getOnlinePayList)
                if (getManageList && getManageList.length >= 0) {
                    this.totalMoney = 0
                    this.xtLogList = getManageList
                    this.xtLogList.forEach((val, index) => {
                        if (val && val.amount) {
                            this.totalMoney += Number(val.amount)
                        }
                    })
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                } else {
                    console.error('getManageList error at onlinePay')
                }
            },
            async onlineSearch (data) {
                if (this.onlineSearchInp === '') {
                    let getManageList = await this.$store.dispatch(aTypes.getOnlinePayList)
                    if (getManageList && getManageList.length >= 0) {
                        this.totalMoney = 0
                        this.xtLogList = getManageList
                        this.xtLogList.forEach((val, index) => {
                            if (val && val.amount) {
                                this.totalMoney += Number(val.amount)
                            }
                        })
                        this.$message({
                            message: '查询成功',
                            type: 'success',
                            duration: 1200
                        })
                    } else {
                        console.error('getManageList error at onlinePay')
                    }
                    return false
                }
                let websockData = await this.$store.dispatch(aTypes.onlineSearch, this.onlineSearchInp)
                if (websockData && websockData.length >= 0) {
                    this.$message({
                        message: '查询成功',
                        type: 'success',
                        duration: 1200
                    })

                    this.xtLogList = websockData
                    this.totalMoney = 0
                    this.xtLogList.forEach((val, index) => {
                        if (val && val.amount) {
                            this.totalMoney += Number(val.amount)
                        }
                    })
                } else {
                    this.$message({
                        message: '查询失败',
                        type: 'success',
                        duration: 1200
                    })
                }
            },
            async confirmWebSock (data) {
                if (this.loginInfoConfig) {
                    let websockData = await this.$store.dispatch(aTypes.confirmWebSock, [ Number(data.id), Number(data.amount) / (Number(this.loginInfoConfig.payScale) / 100) ])
                    console.log(websockData)
                    console.log('==================')
                    console.log('====123======')
                    if (websockData && websockData.success === true) {
                        let againPay = await this.$store.dispatch(aTypes.confirmOrder, data.order_no)
                        console.log(againPay)
                        console.log('**********')

                        if (againPay && againPay.result === 'success') {
                            this.$message({
                                message: '确认充值成功',
                                type: 'success',
                                duration: 1200
                            })

                            let getManageList = await this.$store.dispatch(aTypes.getOnlinePayList)
                            if (getManageList && getManageList.length >= 0) {
                                this.xtLogList = getManageList
                            } else {
                                console.error('getManageList error at onlinePay')
                            }
                        } else {
                            this.$message({
                                message: '确认充值失败',
                                type: 'success',
                                duration: 1200
                            })
                        }
                    }
                }
            }
        },
        computed: {
            loginInfoConfig () {
                if (this.$store.state.user.loginInfo) {
                    return this.$store.state.user.loginInfo.config
                }
                return false
            }
        },
        async mounted () {
            let getManageList = await this.$store.dispatch(aTypes.getOnlinePayList)
            if (getManageList && getManageList.length >= 0) {
                this.totalMoney = 0
                this.xtLogList = getManageList
                this.xtLogList.forEach((val, index) => {
                    if (val && val.amount) {
                        this.totalMoney += Number(val.amount)
                    }
                })
            } else {
                console.error('getManageList error at onlinePay')
            }
        }
    }
</script>
<style scoped>
    .el-input{
        width:210px;
    }
    header{
        margin-bottom: 16px;
    }
    header .xtPicker{
        margin-bottom: 16px;
        max-width: 280px ;
        float: left;
    }
    header button{
        float: left;
    }
    .checkID{
        width: 80%;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    @media (max-width: 768px) {
        header button{
            margin-left:15px;
        }
        header .xtPicker{
            max-width:100%;
        }
        header .xtSpan{
            margin-left:0;
        }
        header button{
            margin:10px 0 0 0 !important;
        }
    }
</style>
