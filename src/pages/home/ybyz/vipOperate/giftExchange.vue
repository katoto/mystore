<template>
    <div id="vipOperate">
        <div :class="{'disable':!selVipVal }">
            <section :class="{'hide':!isShowNextBtn}">
                <span>请输入兑奖数目(最多可兑：{{selVipVal.gameGold}} )：</span><el-input :disabled=!selVipVal readonly size="small" v-model="payNum" placeholder="请输入兑奖数目"></el-input>
                <span>游戏币，&nbsp;折合礼品价值&nbsp;{{  payNum  }}&nbsp;元宝。</span><br>
            </section>
            <span style="margin-top: 10px;display: inline-block;">备注信息：</span>
            <section id="js_section">
                <p >{{ initMsg }}</p>
            </section>
            <el-button :class="{'hide':!isShowNextBtn}" size="small" :disabled=!selVipVal type="danger" v-tap="{ methods:setPay }">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/ybyz'
    export default {
        data () {
            return {
                vipStyle: '',
                payNum: '0',
                initMsg: '暂无兑换请求',
                isShowNextBtn: false
            }
        },
        methods: {
            openInpPass () {
                this.$prompt('请输入密码!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    // 输入的值 ！！
                    if (value === '') {
                        this.$message({
                            message: '密码不能为空',
                            type: 'error',
                            duration: 1200
                        })
                        return false
                    }
                    let sendPassword = await this.$store.dispatch(aTypes.enterSelfPwd, [ value ])
                    if (sendPassword && sendPassword === true) {
                        let expiryNumber = await this.$store.dispatch(aTypes.expiry, [ this.selVipVal.id, Number(this.payNum), 1 ])
                        console.log(expiryNumber)
                        if (expiryNumber && expiryNumber.success === false) {
                            this.$message({
                                message: expiryNumber.message,
                                type: 'error',
                                duration: 1200
                            })
                            return false
                        } else {
                            this.$message({
                                message: '兑换成功',
                                type: 'success',
                                duration: 1200
                            })
                            this.isShowNextBtn = false
                            this.payNum = '0'
                            this.initMsg = '暂无兑换请求'
                        }
                    } else {
                        this.$message({
                            message: '密码有误',
                            type: 'error',
                            duration: 1200
                        })
                        return false
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消兑换',
                        duration: 1200
                    })

                    this.payNum = '1'
                    this.initMsg = '暂无兑换请求'
                })
            },
            async setPay () {
                if (!this.selVipVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                // 出现输入密码
                this.openInpPass()
            //    2.界面显示请输入管理员密码
            }
        },
        computed: {
            selVipVal () {
                return this.$store.state.ybyz.selVipVal
            }
        },
        async mounted () {
            let newExpiryNumber = await this.$store.dispatch(aTypes.getUserExpiry, [ Number(this.selVipVal.id) ])
            //     1.先查询该会员对应的兑换数量
            if (newExpiryNumber.success === false) {
                return false
            } else if (newExpiryNumber.success === true) {
                this.isShowNextBtn = true
                this.initMsg = newExpiryNumber.remark
                this.payNum = newExpiryNumber.gold
            }
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
    .el-button{
        margin-top: 15px;
    }
    #js_section{
        margin-top: 10px;
    }
    #js_section p{
        padding: 5px;
        width: 300px;
        height: 40px;
        color: #404040;
        border: 1px solid #747474;
        margin-top: 10px;
    }
    .hide{
        display: none;
    }
</style>
