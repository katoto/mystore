<template>
    <div id="vipOperate">
        <div :class="{'disable':!selVipVal }">
            <span>请输入充值数目：</span><el-input :disabled=!selVipVal size="small" v-model="payNum" placeholder="请输入充值数目"></el-input>
            <span>元宝，&nbsp;共&nbsp;{{  payNum  }}&nbsp;游戏币！</span>&nbsp;&nbsp;
            <el-button size="small" :disabled=!selVipVal type="danger" v-tap="{ methods:setPay }">确认充值</el-button>
        </div>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/ybyz'
export default {
        data () {
            return {
                vipStyle: '',
                payNum: ''
            }
        },
        methods: {
            async setPay () {
                if (!this.selVipVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }


                if (isNaN(Number(this.payNum))) {
                    this.$message({
                        message: '请输入正确的充值数',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }

                let memberPay = await this.$store.dispatch(aTypes.memberPay, [ Number(this.selVipVal.id), Number(this.payNum), 0])
                console.log('一般运作 充值数目Msg')
                console.log(memberPay)

                if (memberPay && memberPay.success) {
                    this.$message({
                        message: '充值成功',
                        type: 'success',
                        duration: 1200
                    })
                    this.payNum = 0
                } else {
                    this.$message({
                        message: memberPay.message,
                        type: 'error',
                        duration: 1200
                    })
                }
            }
        },
        computed: {
            selVipVal () {
                return this.$store.state.ybyz.selVipVal
            }
        },
        async mounted () {
            // 默认第一页。
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
