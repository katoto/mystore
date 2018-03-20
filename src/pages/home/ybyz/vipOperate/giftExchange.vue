<template>
    <div id="vipOperate">
        <div :class="{'disable':!selVipVal }">
            <span>请输入兑奖数目(最多可兑：{{selVipVal.gameGold}} )：</span><el-input :disabled=!selVipVal size="small" v-model="payNum" placeholder="请输入兑奖数目"></el-input>
            <span>游戏币，&nbsp;折合礼品价值&nbsp;{{  payNum  }}&nbsp;元宝。</span><br>
            <span style="margin-top: 10px;display: inline-block;">备注信息：</span>
            <section id="js_section">
                <p >{{ initMsg }}</p>
            </section>
            <el-button size="small" :disabled=!selVipVal type="danger" v-tap="{ methods:setPay }">下一步</el-button>
        </div>
        <el-button type="text" @click="openInpPass">14234</el-button>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/ybyz'
    export default {
        data () {
            return {
                vipStyle: '',
                payNum: '1',
                initMsg:'暂无兑换请求'
            }
        },
        methods: {
            openInpPass() {
                this.$prompt('请输入密码!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({ value }) => {
                    // 输入的值 ！！
                    console.log( value );
                    if( value === '' ){
                        this.$message({
                            message: '密码不能为空',
                            type: 'error',
                            duration: 1200
                        });
                      return false;
                    }
                    let sendPassword = await this.$store.dispatch(aTypes.enterSelfPwd, [ value ]);
                    console.log(sendPassword)
                    if( sendPassword && sendPassword === true ){
                        let expiryNumber = await this.$store.dispatch(aTypes.expiry, [ this.selVipVal.id ,Number( this.payNum ) , 1 ]);
                        console.log(expiryNumber)
                        if( expiryNumber && expiryNumber === false ){
                            this.$message({
                                message: expiryNumber.message,
                                type: 'error',
                                duration: 1200
                            });
                            return false;
                        }
                    }else{
                        this.$message({
                            message: '密码有误' ,
                            type: 'error',
                            duration: 1200
                        });
                        return false;
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            async setPay () {
                if (!this.selVipVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    });
                    return false
                }
                if( Number( this.payNum ) > Number( this.selVipVal.gameGold )){
                    this.$message({
                        message: '超过可兑奖数目',
                        type: 'error',
                        duration: 1200
                    });
                    return false
                }

//                let newExpiryNumber = await this.$store.dispatch(aTypes.getUserExpiry, [ Number( this.selVipVal.id ) ])
////                1.先查询该会员对应的兑换数量
//                if( newExpiryNumber.success === false ){
//                    this.$message({
//                        message: newExpiryNumber.message ,
//                        type: 'error',
//                        duration: 1200
//                    });
//                    return false
//                }
//                2.界面显示请输入管理员密码

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
</style>
