<template>
    <section id="xtSet" v-if="loginInfo">
        <!-- 数据之后要处理对应一下 -->
        <template>
            <el-checkbox v-model="openUserChat">用户检查</el-checkbox></br>
            <p>
                <span>充值检测数目 : </span>&nbsp;
                <el-input v-model="checkPay" placeholder="请输入数目"></el-input>&nbsp;
                <span> 元宝，(单次充值超过此数目时触发)</span>
            </p>
            <p>
                <span>兑奖检测数目 : </span>&nbsp;
                <el-input  v-model="checkDJ" placeholder="请输入数目"></el-input>&nbsp;
                <span> 元宝，(单次兑奖超过此数目时触发)</span>
            </p>
        </template>
        <p>平板租借检查：默认开启，不可设置</p>
        <hr>
        <section>
            <el-checkbox v-model="SQWarning">授权警告</el-checkbox></br>
            <el-row :gutter="20">
                <el-col :span="9"><div class="grid-content bg-purple">
                    <p>日累计充值数目(元宝):</p>
                    <el-select class="xtSetSel" v-model="xtRczVal" placeholder="请选择">
                        <el-option
                            v-for="item in xtRcz"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div></el-col>
                <el-col :span="9"><div class="grid-content bg-purple">
                    <p>日累计兑奖数目(元宝):</p>
                    <el-select class="xtSetSel" v-model="xtRdjVal" placeholder="请选择">
                        <el-option
                            v-for="item in xtRdj"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="9"><div class="grid-content bg-purple">
                    <p>单个会员日兑奖数目(元宝):</p>
                    <el-select class="xtSetSel" v-model="xthydjVal" placeholder="请选择">
                        <el-option
                            v-for="item in xthydj"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div></el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple">
                        <p>单个推广员日兑奖数目(元宝)</p>
                        <el-select class="xtSetSel" v-model="xttgdjVal" placeholder="请选择">
                            <el-option
                                v-for="item in xttgdj"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </section>
        <hr>
        <el-checkbox v-model="OpenChat">聊天开启</el-checkbox>
        <hr>
        <section>
            <p class="xtSetP">自动冻结设置（未活跃时间过长）：</p>
            <el-select class="xtSetSel" v-model="xtFreeVal" placeholder="请选择">
                <el-option
                    v-for="item in xtfreeze"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </section>
        <hr>
        <section>
            <p class="xtSetP">爆机设置（元宝）（总额超限）：</p>
            <el-select class="xtSetSel" v-model="xtbreakVal" placeholder="请选择">
                <el-option
                    v-for="item in xtbreak"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </section>
        <section>
            <el-checkbox v-model="openVIP">会员注册验证开启</el-checkbox>
        </section>
        <section style="margin-top: 20px">
            <el-button size="small" type="primary" v-tap="{ methods: upxtSetMsg  }">更新</el-button>
            <el-button size="small" style="margin-left: 28px" v-tap="{ methods:setXTInit,params: loginInfo ,showTips:true }">重置</el-button>
        </section>
    </section>
    <div v-else>
         登陆msg error 无返回loginInfo
    </div>
</template>

<script>
    import {aTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                openUserChat: 0,
                checkPay: 0,
                checkDJ: 0,
                SQWarning: 0,
                xtRcz: [
                    {
                        label: '1万',
                        value: 10000

                    },
                    {
                        label: '2万',
                        value: 20000
                    },
                    {
                        label: '5万',
                        value: 50000
                    },
                    {
                        label: '10万',
                        value: 100000
                    },
                    {
                        label: '15万',
                        value: 150000
                    },
                    {
                        label: '20万',
                        value: 200000
                    },
                    {
                        label: '50万',
                        value: 500000
                    },
                    {
                        label: '100万',
                        value: 1000000
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xtRdj: [
                    {
                        label: '1万',
                        value: 10000

                    },
                    {
                        label: '2万',
                        value: 20000
                    },
                    {
                        label: '5万',
                        value: 50000
                    },
                    {
                        label: '10万',
                        value: 100000
                    },
                    {
                        label: '15万',
                        value: 150000
                    },
                    {
                        label: '20万',
                        value: 200000
                    },
                    {
                        label: '50万',
                        value: 500000
                    },
                    {
                        label: '100万',
                        value: 1000000
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xthydj: [
                    {
                        label: '1万',
                        value: 10000

                    },
                    {
                        label: '2万',
                        value: 20000
                    },
                    {
                        label: '5万',
                        value: 50000
                    },
                    {
                        label: '10万',
                        value: 100000
                    },
                    {
                        label: '15万',
                        value: 150000
                    },
                    {
                        label: '20万',
                        value: 200000
                    },
                    {
                        label: '50万',
                        value: 500000
                    },
                    {
                        label: '100万',
                        value: 1000000
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xttgdj: [
                    {
                        label: '1万',
                        value: 10000

                    },
                    {
                        label: '2万',
                        value: 20000
                    },
                    {
                        label: '5万',
                        value: 50000
                    },
                    {
                        label: '10万',
                        value: 100000
                    },
                    {
                        label: '15万',
                        value: 150000
                    },
                    {
                        label: '20万',
                        value: 200000
                    },
                    {
                        label: '50万',
                        value: 500000
                    },
                    {
                        label: '100万',
                        value: 1000000
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xtRczVal: 10000,
                xtRdjVal: 10000,
                xthydjVal: 10000,
                xttgdjVal: '不设上限',
                OpenChat: 0,
                xtfreeze: [
                    {
                        label: '2个月',
                        value: 60

                    },
                    {
                        label: '4个月',
                        value: 120
                    },
                    {
                        label: '6个月',
                        value: 180
                    },
                    {
                        label: '12个月',
                        value: 360
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xtFreeVal: '不设上限',
                xtbreak: [
                    {
                        label: '1万',
                        value: 10000
                    },
                    {
                        label: '2万',
                        value: 20000
                    },
                    {
                        label: '5万',
                        value: 50000
                    },
                    {
                        label: '10万',
                        value: 100000
                    },
                    {
                        label: '15万',
                        value: 150000
                    },
                    {
                        label: '20万',
                        value: 200000
                    },
                    {
                        label: '50万',
                        value: 500000
                    },
                    {
                        label: '100万',
                        value: 1000000
                    },
                    {
                        label: '不设上限',
                        value: -1
                    }
                ],
                xtbreakVal: 0,
                openVIP: 0
            }
        },
        watch: {
            loginInfo (loginInfo) {
                this.setXTInit({ params: loginInfo })
            }
        },
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
            },
            async upxtSetMsg () {
                // 更新系统设置
                console.log('=======')
                console.log(this.openVIP)
                if( this.openVIP ){
                    this.openVIP = 1
                }else{
                    this.openVIP = 0
                }
                if( this.SQWarning ){
                    this.SQWarning = 1
                }else{
                    this.SQWarning = 0
                }
                if( this.OpenChat ){
                    this.OpenChat = 1
                }else{
                    this.OpenChat = 0
                }
                if( this.openUserChat ){
                    this.openUserChat = 1
                }else{
                    this.openUserChat = 0
                }

                let result = await this.$store.dispatch(aTypes.upxtSetMsg, [{
                    'authorize': this.SQWarning,
                    'chat': this.OpenChat,
                    'moneyOverrun': this.xtbreakVal,
                    'notActive': this.xtFreeVal,
                    'expiryCheckMoney': this.checkDJ,
                    'payCheckMoney': this.checkPay,
                    'promoterSumMoney': this.xttgdjVal,
                    'registVerify': this.openVIP,
                    'sumExpiryMoney': this.xtRdjVal,
                    'sumPayMoney': this.xtRczVal,
                    'userCheck': this.openUserChat,
                    'userSumMoney': this.xthydjVal,

//                                        "authorize":0,
//                                        "chat":0,
//                                        "moneyOverrun":500000,
//                                        "notActive":120,
//                                        "expiryCheckMoney":5000,"payCheckMoney":10000,
//                                        "promoterSumMoney":150000,
//                                        "registVerify":1,
//                                        "sumExpiryMoney":50000,
//                                        "sumPayMoney":20000,
//                                        "userCheck":0,
//                                        "userSumMoney":100000,

                    // none
                    'baodanPwd': '',
                    'baodanStatus': 0,
                    'content': '',
                    'expiry': 30,
                    'gameStatus': 0,
                    'id': 0,
                    'interactPassword': 1,
                    'lackBaodanStatus': 0,
                    'leaseCheck': 1,
                    'openBulletGame': 0,
                    'openCardGame': 0,
                    'openFishGame': 0,
                    'openJoyGame': 0,
                    'openLackGame': 0,
                    'openLuckGame': 1,
                    'openMermaidGame': 0,
                    'openThousandFishGame': 0,
                    'openWaterGame': 1,
                    'operationDate': '',
                    'operationStatus': 0,
                    'operationStopDate': 0,
                    'payScale': 100,
                    'promoterPayScale': 300,
                    'switchType': 1,
                    'tempPromoterSumMoney': 0,
                    'tempSumExpiryMoney': 100000,
                    'tempSumPayMoney': 100000,
                    'tempUserSumMoney': 20000,
                    'weihuTime': -1

                }])
                console.log(result)
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
    #xtSet hr{
        margin: 13px 0;
        color: #000;
    }
    #xtSet .xtSetP{
        margin: 0 0 10px 0;
    }
    #xtSet .el-input{
        width: 22%;
    }
    #xtSet, #xtSet span ,#xtSet p{
        font-size: 14px;
        font-weight: 500;
        color: #303133;
    }
    #xtSet p{
        padding-top: 8px;
        padding-bottom: 8px;
    }
    #xtSet section{
        padding-top: 10px;
    }
    #xtSet{
        padding-left: 20px;
        padding-bottom: 100px;
    }
    #xtSet .xtSetSel{
        width: 130px;
    }

</style>
