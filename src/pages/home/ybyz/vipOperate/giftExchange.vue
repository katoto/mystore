<template>
    <div id="vipOperate">
        <div :class="{'disable':!selVipVal }">
            <span>请输入兑奖数目：</span><el-input :disabled=!selVipVal size="small" v-model="payNum" placeholder="请输入充值数目"></el-input>
            <span>游戏币，&nbsp;折合礼品价值&nbsp;{{  payNum  }}&nbsp;元宝</span>&nbsp;&nbsp;
            <el-button size="small" :disabled=!selVipVal type="danger" v-tap="{ methods:setPay }">确认兑奖</el-button>
        </div>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/ybyz'
    export default {
        data () {
            return {
                vipStyle: '',
                payNum: '？'
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
            //         礼品兑换接口
            //                let promoter = await this.$store.dispatch(aTypes.promoterPay, [ Number(this.selTgyVal.id), Number(this.payNum), 0])
            //                console.log('充值数目Msg')
            //                console.log(promoter)
            //                if (promoter && promoter.success) {
            //                    this.$message({
            //                        message: '充值成功',
            //                        type: 'success',
            //                        duration: 1200
            //                    })
            //                    this.payNum = 0
            //                } else {
            //                    this.$message({
            //                        message: promoter.message,
            //                        type: 'error',
            //                        duration: 1200
            //                    })
            //                }
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
