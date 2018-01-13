<template>
    <div id="xsSetBox">
        <section id="xsSet">
            <div class="list fl pd">
                <h2>所有会员充值比例设置：</h2>
                <p >1游戏币 =</p><el-input v-model="xsAll" placeholder="请输入"></el-input> <p>元宝</p>
            </div>
            <div class="list fl pd">
                <h2>直属推广员充值比例设置：</h2>
                <p>1游戏币 =</p><el-input v-model="xsZs" placeholder="请输入"></el-input> <p>元宝</p>
            </div>
            <div class="list pd">
                <el-checkbox v-model="isDjsq">开启远程充值兑奖申请</el-checkbox>
                <template v-if="isDjsq">
                    <p>申请有效时限设置</p>
                    <el-select v-model="sjsz" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <div class="list">
                <el-checkbox v-model="isJjbgn">开启交接班功能</el-checkbox>
                <div v-if="isJjbgn">
                    <el-radio-group v-model="jjb">
                        <el-radio :label="3">不分更</el-radio>
                        <el-radio :label="6">分AB两更</el-radio>
                        <el-radio :label="9">分ABC三更</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="list">
                <el-checkbox v-model="isJhs">开启交互式密码输入</el-checkbox>
            </div>
            <div class="list" style="display: none">
                <el-checkbox v-model="isShop">开启商城、彩票城</el-checkbox>
            </div>
            <div class="btnBox" style="margin-top: 20px">
                <el-button size="small" type="primary">更新</el-button>
                <el-button size="small" style="margin-left: 28px">重置</el-button>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                xsSet: '',
                xsAll: '',
                xsZs: '',
                isDjsq: true,
                sjsz: '',
                isJjbgn: false,
                jjb: '',
                isJhs: false,
                isShop: false,
                options: [
                    {value: '10min', label: '10分钟'},
                    {value: '30min', label: '30分钟'}
                ]
            }
        },
        watch: {},
        methods: {
            setXTInit ({ params, showTips }) {
                let loginInfo = params
                if (loginInfo && loginInfo.config) {
                    if (loginInfo.config.authorize && loginInfo.config.authorize === 1) {
                        this.SQWarning = 1
                    }
                    if (loginInfo.config.chat && loginInfo.config.chat === 1) {
                        this.OpenChat = 1
                    }
                    if (loginInfo.config.registVerify && loginInfo.config.registVerify === 1) {
                        this.openVIP = 1
                    }
                    if (loginInfo.config.userCheck && loginInfo.config.userCheck === 1) {
                        this.openUserChat = 1
                    }

                    if (loginInfo.config.moneyOverrun) {
                        this.xtbreakVal = loginInfo.config.moneyOverrun
                    }
                    if (loginInfo.config.notActive) {
                        try {
                            this.xtFreeVal = loginInfo.config.notActive
                        } catch (e) {
                            console.error('notActive error at 366')
                        }
                    }
                    if (loginInfo.config.expiryCheckMoney) {
                        this.checkDJ = loginInfo.config.expiryCheckMoney
                    }
                    if (loginInfo.config.payCheckMoney) {
                        this.checkPay = loginInfo.config.payCheckMoney
                    }
                    if (loginInfo.config.promoterSumMoney) {
                        try {
                            this.xttgdjVal = loginInfo.config.promoterSumMoney
                        } catch (e) {
                            console.error('promoterSumMoney error at 387')
                        }
                    }
                    if (loginInfo.config.sumExpiryMoney) {
                        try {
                            this.xtRdjVal = loginInfo.config.sumExpiryMoney
                        } catch (e) {
                            console.error('sumExpiryMoney error at 387')
                        }
                    }

                    if (loginInfo.config.sumPayMoney) {
                        try {
                            this.xtRczVal = loginInfo.config.sumPayMoney
                        } catch (e) {
                            console.error('sumPayMoney error at 387')
                        }
                    }
                    if (loginInfo.config.userSumMoney) {
                        try {
                            this.xthydjVal = loginInfo.config.userSumMoney
                        } catch (e) {
                            console.error('userSumMoney error at 387')
                        }
                    }
                }
                if (showTips) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
            }
        },
        computed: {
            loginInfo () {
                return this.$store.state.user.loginInfo
            }
        },
        mounted () {
            if (this.loginInfo) {
                this.setXTInit({ params: this.loginInfo })
            } else {
                // 重新取config 数据
                this.$router.push('/login')
            }
        }
    }
</script>
<style scoped>
    #xsSetBox{
        padding-left: 20px;
        padding-bottom: 100px;
    }
    p,div,h2{
        margin:0;
        padding:0;
        font-size: 14px;
    }
    #xsSet .list{
        width:100%;
        border-bottom:1px solid #ccc;
        line-height:40px;
        color: #303133;
        overflow: hidden;
    }
    #xsSet .list.fl p, #xsSet .list.fl div{
        float: left;
    }
    #xsSet .list.pd{
        padding-bottom:20px;
    }
    #xsSet h2,#xsSet .el-radio{
        font-size: 16px;
        font-weight:bold;
    }
    #xsSet .el-input{
        width:auto;
        margin:0 10px;
    }
    .btnBox{
        margin-top:20px;
    }
</style>
