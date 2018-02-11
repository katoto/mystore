<template>
    <div id="vipOperate">
        <div :class="{'disable':!selVipVal }">
            <span>请输入兑奖数目：</span><el-input :disabled=!selVipVal size="small" v-model="payNum" placeholder="请输入兑奖数目"></el-input>
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
            }
        },
        computed: {
            selVipVal () {
                return this.$store.state.ybyz.selVipVal
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
</style>
