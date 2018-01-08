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
            <el-button size="small" type="primary">更新</el-button>
            <el-button size="small" style="margin-left: 28px">重置</el-button>
        </section>
    </section>
    <div v-else>
         登陆msg error 无返回loginInfo
    </div>
</template>

<script>
    export default {
        data () {
            return {
                openUserChat: false,
                checkPay: 0,
                checkDJ: 0,
                SQWarning: false,
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
                OpenChat: false,
                xtfreeze: [
                    {
                        label: '2个月',
                        value: 2

                    },
                    {
                        label: '4个月',
                        value: 4
                    },
                    {
                        label: '6个月',
                        value: 6
                    },
                    {
                        label: '12个月',
                        value: 12
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

                openVIP: false
            }
        },
        watch: {
            loginInfo ( loginInfo ) {
                this.setXTInit( loginInfo );
            }
        },
        methods: {
            setXTInit( loginInfo ){
                if (loginInfo && loginInfo.config) {
                    if (loginInfo.config.authorize && loginInfo.config.authorize === 1) {
                        this.SQWarning = true
                    }
                    if (loginInfo.config.chat && loginInfo.config.chat === 1) {
                        this.OpenChat = true
                    }
                    if (loginInfo.config.registVerify && loginInfo.config.registVerify === 1) {
                        this.openVIP = true
                    }
                    if (loginInfo.config.userCheck && loginInfo.config.userCheck === 1) {
                        this.openUserChat = true
                    }

                    if (loginInfo.config.moneyOverrun) {
                        this.xtbreakVal = loginInfo.config.moneyOverrun
                    }
                    if (loginInfo.config.notActive) {
                        try {
                            this.xtFreeVal = parseInt(loginInfo.config.notActive) / 30 + '个月'
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
                            this.xttgdjVal = parseInt(loginInfo.config.promoterSumMoney) / 10000 +'万'
                        } catch (e) {
                            console.error('promoterSumMoney error at 387')
                        }
                    }
                    if (loginInfo.config.sumExpiryMoney) {
                        try {
                            this.xtRdjVal = parseInt(loginInfo.config.sumExpiryMoney) / 10000 +'万'
                        } catch (e) {
                            console.error('sumExpiryMoney error at 387')
                        }
                    }

                    if (loginInfo.config.sumPayMoney) {
                        try {
                            this.xtRczVal = parseInt(loginInfo.config.sumPayMoney) / 10000 +'万'
                        } catch (e) {
                            console.error('sumPayMoney error at 387')
                        }
                    }
                    if ( loginInfo.config.userSumMoney ) {
                        try {
                            this.xthydjVal = parseInt(loginInfo.config.userSumMoney) / 10000 +'万'
                        } catch (e) {
                            console.error('userSumMoney error at 387')
                        }
                    }
                }
            }
        },
        computed: {
            loginInfo () {
                return this.$store.state.user.loginInfo;
            }
        },
        mounted () {
            if( this.loginInfo ){
                this.setXTInit( this.loginInfo );
            }else{
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
