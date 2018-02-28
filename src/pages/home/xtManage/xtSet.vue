<template>
    <section id="xtSet" v-if="!!loginInfoConfig">
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
            <template v-if="SQWarning">
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
            </template>
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
            <el-button size="small" style="margin-left: 28px" v-tap="{ methods:setXTInit,params: loginInfoConfig ,showTips:true }">重置</el-button>
        </section>
    </section>
    <div v-else>
         登陆msg error 无返回loginInfo
    </div>
</template>

<script>
    import { actionTypes, mutationTypes } from '~store/xtManager'
    export default {
        data () {
            return {
                openUserChat: 0,
                checkPay: 0,
                checkDJ: 1,
                SQWarning: 1,
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
                OpenChat: true,
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
            loginInfoConfig (loginInfoConfig) {
                this.setXTInit({ params: loginInfoConfig })
            }
        },
        methods: {
            setXTInit ({ params, showTips }) {
                let loginInfoConfig = params
                if (loginInfoConfig) {
                    if (loginInfoConfig.authorize) {
                        this.SQWarning = true
                    } else {
                        this.SQWarning = false
                    }
                    if (loginInfoConfig.chat) {
                        this.OpenChat = true
                    } else {
                        this.OpenChat = false
                    }
                    if (loginInfoConfig.registVerify) {
                        this.openVIP = true
                    } else {
                        this.openVIP = false
                    }
                    if (loginInfoConfig.userCheck) {
                        this.openUserChat = true
                    } else {
                        this.openUserChat = false
                    }

                    if (loginInfoConfig.moneyOverrun) {
                        this.xtbreakVal = loginInfoConfig.moneyOverrun
                    }
                    if (loginInfoConfig.notActive) {
                        try {
                            this.xtFreeVal = loginInfoConfig.notActive
                        } catch (e) {
                            console.error('notActive error at 366')
                        }
                    }
                    if (loginInfoConfig.expiryCheckMoney) {
                        this.checkDJ = loginInfoConfig.expiryCheckMoney
                    }
                    if (loginInfoConfig.payCheckMoney) {
                        this.checkPay = loginInfoConfig.payCheckMoney
                    }
                    if (loginInfoConfig.promoterSumMoney) {
                        try {
                            this.xttgdjVal = loginInfoConfig.promoterSumMoney
                        } catch (e) {
                            console.error('promoterSumMoney error at 387')
                        }
                    }
                    if (loginInfoConfig.sumExpiryMoney) {
                        try {
                            this.xtRdjVal = loginInfoConfig.sumExpiryMoney
                        } catch (e) {
                            console.error('sumExpiryMoney error at 387')
                        }
                    }
                    if (loginInfoConfig.sumPayMoney) {
                        try {
                            this.xtRczVal = loginInfoConfig.sumPayMoney
                        } catch (e) {
                            console.error('sumPayMoney error at 387')
                        }
                    }
                    if (loginInfoConfig.userSumMoney) {
                        try {
                            this.xthydjVal = loginInfoConfig.userSumMoney
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
                let newUpxtSetMsg
                this.openVIP = this.openVIP ? 1 : 0
                this.SQWarning = this.SQWarning ? 1 : 0
                this.OpenChat = this.OpenChat ? 1 : 0
                this.openUserChat = this.openUserChat ? 1 : 0
                if (this.loginInfoConfig) {
                    let copyLoginConfig = this.loginInfoConfig
                    newUpxtSetMsg = [{
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
                        // none
                        'baodanPwd': copyLoginConfig.baodanPwd,
                        'baodanStatus': copyLoginConfig.baodanStatus,
                        'content': copyLoginConfig.content,
                        'expiry': copyLoginConfig.expiry,
                        'gameStatus': copyLoginConfig.gameStatus,
                        'id': copyLoginConfig.id,
                        'interactPassword': copyLoginConfig.interactPassword,
                        'lackBaodanStatus': copyLoginConfig.lackBaodanStatus,
                        'leaseCheck': copyLoginConfig.leaseCheck,
                        'openBulletGame': copyLoginConfig.openBulletGame,
                        'openCardGame': copyLoginConfig.openCardGame,
                        'openFishGame': copyLoginConfig.openFishGame,
                        'openJoyGame': copyLoginConfig.openJoyGame,
                        'openLackGame': copyLoginConfig.openLackGame,
                        'openLuckGame': copyLoginConfig.openLuckGame,
                        'openMermaidGame': copyLoginConfig.openMermaidGame,
                        'openThousandFishGame': copyLoginConfig.openThousandFishGame,
                        'openWaterGame': copyLoginConfig.openWaterGame,
                        'operationDate': copyLoginConfig.operationDate,
                        'operationStatus': copyLoginConfig.operationStatus,
                        'operationStopDate': copyLoginConfig.operationStopDate,
                        'payScale': copyLoginConfig.payScale,
                        'promoterPayScale': copyLoginConfig.promoterPayScale,
                        'switchType': copyLoginConfig.switchType,
                        'tempPromoterSumMoney': copyLoginConfig.tempPromoterSumMoney,
                        'tempSumExpiryMoney': copyLoginConfig.tempSumExpiryMoney,
                        'tempSumPayMoney': copyLoginConfig.tempSumPayMoney,
                        'tempUserSumMoney': copyLoginConfig.tempUserSumMoney,
                        'weihuTime': copyLoginConfig.weihuTime
                    }]
                } else {
                    this.$message({
                        message: 'loginInfo data error ',
                        type: 'error',
                        duration: 1200
                    })
                }
                let result = await this.$store.dispatch(actionTypes.upxtSetMsg, newUpxtSetMsg)
                console.log('=====upxtSetMsg======')
                console.log(result)

                // 需要再一次 更新用户信息 !!!!!
                if (result && result.success === true) {
                    this.$message({
                        message: '更新成功',
                        type: 'success',
                        duration: 1200
                    })
                    newUpxtSetMsg[0].registVerify = !!this.openVIP
                    newUpxtSetMsg[0].authorize = !!this.SQWarning
                    newUpxtSetMsg[0].chat = !!this.OpenChat
                    newUpxtSetMsg[0].userCheck = !!this.openUserChat
                    this.$store.dispatch(actionTypes.upLocalMsg, newUpxtSetMsg[0])
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
        mounted () {
            if (this.loginInfoConfig) {
                this.setXTInit({ params: this.loginInfoConfig })
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
