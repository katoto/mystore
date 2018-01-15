<template>
    <div>
        <div>
            <span>请输入充值数目：</span><el-input size="small" v-model="payNum" placeholder="请输入充值数目"></el-input>
            <span>&nbsp;共&nbsp;{{ parseInt(  payNum / 3 )  }}&nbsp;游戏币！</span>&nbsp;&nbsp;
            <el-button size="small" type="danger" v-tap="{ methods:setPay }">确认充值</el-button>
        </div>
    </div>
</template>

<script>
    import { actionTypes, mutationTypes } from '~store/tgyManager'
    export default {
        data () {
            return {
                payNum: ''
            }
        },
        watch: {},
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
</style>
