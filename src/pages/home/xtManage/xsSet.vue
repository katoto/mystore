<template>
    <div id="xsSetBox">
        <section id="xsSet">
            <div class="list fl pd">
                <h2>所有会员充值比例设置：</h2>
                <p >1游戏币 =</p><el-input v-model="payScale" placeholder="请输入"></el-input> <p>元宝</p>
            </div>
            <div class="list fl pd">
                <h2>直属推广员充值比例设置：</h2>
                <p>1游戏币 =</p><el-input v-model="promoterPayScale" placeholder="请输入"></el-input> <p>元宝</p>
            </div>
            <div class="list pd">
                <el-checkbox v-model="expiry">开启远程充值兑奖申请</el-checkbox>
                <template v-if="expiry">
                    <p>申请有效时限设置</p>
                    <el-select v-model="expiryVal" placeholder="请选择">
                        <el-option
                            v-for="item in expiryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <div class="list">
                <el-checkbox v-model="switchType">开启交接班功能</el-checkbox>
                <div v-if="switchType">
                    <el-radio-group v-model="switchTypeVal">
                        <el-radio :label="0">不分更</el-radio>
                        <el-radio :label="1">分AB两更</el-radio>
                        <el-radio :label="2">分ABC三更</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="list">
                <el-checkbox v-model="interactPassword">开启交互式密码输入</el-checkbox>
            </div>
            <div class="list" style="display: none">
                <el-checkbox v-model="isShop">开启商城、彩票城</el-checkbox>
            </div>
            <div class="btnBox" style="margin-top: 20px">
                <el-button size="small" type="primary" v-tap="{ methods: upxtSetMsg  }">更新</el-button>
                <el-button size="small" style="margin-left: 28px" v-tap="{ methods:setXTInit,params: loginInfoConfig ,showTips:true }">重置</el-button>
            </div>
        </section>
    </div>
</template>

<script>
    import { actionTypes, mutationTypes } from '~store/xtManager'

    import { aTypes, mTypes } from '~store/user'

    export default {
        data () {
            return {
                switchType: false,
                switchTypeVal: 0,

                expiry: null,
                expiryVal: '10',
                expiryOptions: [
                    {value: '10', label: '10分钟'},
                    {value: '30', label: '30分钟'},
                    {value: '120', label: '2小时'},
                    {value: '360', label: '6小时'},
                    {value: '720', label: '12小时'},
                    {value: '1440', label: '24小时'}
                ],

                xsSet: '',
                payScale: '',
                promoterPayScale: '',
                isDjsq: true,
                sjsz: '',

                jjb: '',
                interactPassword: false,
                isShop: false
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
                    if (loginInfoConfig.switchType !== -1) {
                        this.switchTypeVal = loginInfoConfig.switchType
                        this.switchType = true
                        console.log(loginInfoConfig.switchTypeVal)
                        console.log('====switchTypeVal====')
                    } else {
                        this.switchType = false
                    }
                    if (loginInfoConfig.expiry !== 0) {
                        if (Number(loginInfoConfig.expiry) <= 60) {
                            this.expiryVal = loginInfoConfig.expiry + '分钟'
                        } else if (loginInfoConfig.expiry == 120) {
                            this.expiryVal = '2小时'
                        } else if (loginInfoConfig.expiry == 360) {
                            this.expiryVal = '6小时'
                        } else if (loginInfoConfig.expiry == 720) {
                            this.expiryVal = '12小时'
                        } else if (loginInfoConfig.expiry == 1440) {
                            this.expiryVal = '24小时'
                        } else {
                            this.expiryVal = loginInfoConfig.expiry + '分钟'
                        }

                        this.expiry = true
                        console.log(this.expiryVal)
                        console.log('====expiryVal====')
                    } else {
                        this.expiry = false
                    }
                    if (loginInfoConfig.interactPassword === -1) {
                        this.interactPassword = false
                    } else if (loginInfoConfig.interactPassword === 1) {
                        this.interactPassword = true
                    }
                    if (loginInfoConfig.payScale) {
                        try {
                            this.payScale = Number(loginInfoConfig.payScale) / 100
                        } catch (e) {
                            console.error('userSumMoney error at 387')
                        }
                    }
                    if (loginInfoConfig.promoterPayScale) {
                        try {
                            this.promoterPayScale = Number(loginInfoConfig.promoterPayScale) / 100
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
                let newUpxtSetMsg
                let newInteractPassword = null
                let newSwitchType = null
                let newExpiry = null

                if (this.switchType) {
                    if (this.switchTypeVal !== undefined) {
                        newSwitchType = this.switchTypeVal
                    }
                } else {
                    newSwitchType = -1
                }
                if (this.expiry) {
                    if (this.expiryVal !== undefined) {
                        console.log('===this.expiryVal===')
                        console.log(this.expiryVal)
                        if (this.expiryVal.indexOf('分钟') > -1) {
                            newExpiry = Number(this.expiryVal.replace('分钟', ''))
                        } else if (this.expiryVal == '2小时') {
                            newExpiry = 120
                        } else if (this.expiryVal == '6小时') {
                            newExpiry = 360
                        } else if (this.expiryVal == '12小时') {
                            newExpiry = 720
                        } else if (this.expiryVal == '24小时') {
                            newExpiry = 1440
                        } else {
                            newExpiry = Number(this.expiryVal.replace('分钟', ''))
                        }
                    }
                } else {
                    newExpiry = 0
                }
                if (this.interactPassword) {
                    newInteractPassword = 1
                } else {
                    newInteractPassword = -1
                }

                if (this.loginInfoConfig) {
                    let copyLoginConfig = this.loginInfoConfig
                    newUpxtSetMsg = [{

                        'payScale': Number(this.payScale) * 100,
                        'promoterPayScale': Number(this.promoterPayScale) * 100,
                        'switchType': newSwitchType,
                        'expiry': newExpiry,
                        'interactPassword': newInteractPassword,

                        'authorize': copyLoginConfig.authorize,
                        'chat': copyLoginConfig.chat,
                        'moneyOverrun': copyLoginConfig.moneyOverrun,
                        'notActive': copyLoginConfig.notActive,
                        'expiryCheckMoney': copyLoginConfig.expiryCheckMoney,
                        'payCheckMoney': copyLoginConfig.payCheckMoney,
                        'promoterSumMoney': copyLoginConfig.promoterSumMoney,
                        'registVerify': copyLoginConfig.registVerify,
                        'sumExpiryMoney': copyLoginConfig.sumExpiryMoney,
                        'sumPayMoney': copyLoginConfig.sumPayMoney,
                        'userCheck': copyLoginConfig.userCheck,
                        'userSumMoney': copyLoginConfig.userSumMoney,
                        // none
                        'baodanPwd': copyLoginConfig.baodanPwd,
                        'baodanStatus': copyLoginConfig.baodanStatus,
                        'content': copyLoginConfig.content,
                        'gameStatus': copyLoginConfig.gameStatus,
                        'id': copyLoginConfig.id,
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

                let result = await this.$store.dispatch(actionTypes.updateSales, [ Number(this.payScale) + '', Number(this.promoterPayScale) + '', newSwitchType, newInteractPassword, newExpiry ])
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
    @media (max-width: 768px) {
        .el-radio+.el-radio{
            margin-left:20px;
        }
        [class*=el-col-] {
            width:100%;
        }
    }
</style>
