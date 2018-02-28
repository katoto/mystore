<template>
    <div>
        <div :class="{'disable':!selTgyVal }">
            <span>请输入充值数目：</span><el-input :disabled=!selTgyVal size="small" v-model="payNum" placeholder="请输入充值数目"></el-input>
            <span>&nbsp;共&nbsp;{{ payNumNow }}&nbsp;游戏币！</span>&nbsp;&nbsp;
            <el-button size="small" :disabled=!selTgyVal type="danger" v-tap="{ methods:setPay }">确认充值</el-button>
        </div>
    </div>
</template>

<script>
    import { actionTypes, mutationTypes } from '~store/tgyManager'
    export default {
        data () {
            return {
                payNum: '',
                payNumNow: 0
            }
        },
        watch: {
            payNum (val) {
                if (this.loginInfoConfig && this.loginInfoConfig.promoterPayScale) {
                    this.payNumNow = Number(val) / (Number(this.loginInfoConfig.promoterPayScale) / 100)
                }
            }
        },
        methods: {
            async setPay () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }

                if (Math.round(Number(this.payNum)) !== Number(this.payNum)) {
                    this.$message({
                        message: '请充值整数游戏币',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }

                let promoter = await this.$store.dispatch(actionTypes.promoterPay, [ Number(this.selTgyVal.id), Number(this.payNum), 0])
                console.log('充值数目Msg')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '充值成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.payNum = 0

                    this.$store.commit(mutationTypes.updataSetPromoter, new Date().getTime())
                } else {
                    this.$message({
                        message: promoter.message,
                        type: 'error',
                        duration: 1200
                    })
                }
            }
        },
        computed: {
            selTgyVal () {
                return this.$store.state.tgyManager.selTgyVal
            },
            loginInfoConfig () {
                if (this.$store.state.user.loginInfo) {
                    return this.$store.state.user.loginInfo.config
                }
                return false
            }
        },
        mounted () {
        }
    }
</script>
<style scoped>
    .el-input{
        width: 150px;
    }
    .disable span{
        color: #ccc;
    }

</style>
