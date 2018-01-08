<template>
    <div>
        <el-tabs  id="xtManage" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="每日充值报告" name="dailyRecharge"></el-tab-pane>
            <el-tab-pane label="每日兑奖报告" name="dailyPrize"></el-tab-pane>
            <el-tab-pane label="每日账目详单" name="dailyAccount"></el-tab-pane>
            <el-tab-pane label="每月账目详单" name="monthAccount"></el-tab-pane>
            <el-tab-pane label="游戏运行统计" name="gameRun"></el-tab-pane>
            <el-tab-pane label="营业日账目统计" name="businessAccount"></el-tab-pane>
            <el-tab-pane label="新注册分析" name="regisTotal"></el-tab-pane>
            <el-tab-pane label="日活跃分析" name="pvTotal"></el-tab-pane>
            <el-tab-pane label="同时在线分析" name="onlineTotal"></el-tab-pane>
            <el-tab-pane label="新注册留存分析" name="keepOnline"></el-tab-pane>
            <el-tab-pane label="付费分析" name="payTotal"></el-tab-pane>
            <!-- 暂时不用  绘图部分 -->
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeName: 'dailyRecharge'
            }
        },
        methods: {
            handleClick (tab, event) {
                if (this.activeName) {
                    switch (this.activeName) {
                    case 'dailyRecharge':
                        this.$router.push('/home/allReport/dailyRecharge')
                        break
                    case 'dailyPrize':
                        this.$router.push('/home/allReport/dailyPrize')
                        break
                    case 'dailyAccount':
                        this.$router.push('/home/allReport/dailyAccount')
                        break
                    case 'monthAccount':
                        this.$router.push('/home/allReport/monthAccount')
                        break
                    case 'gameRun':
                        this.$router.push('/home/allReport/gameRun')
                        break
                    case 'businessAccount':
                        this.$router.push('/home/allReport/businessAccount')
                        break
                    case 'regisTotal':
                        this.$router.push('/home/allReport/regisTotal')
                        break
                    case 'pvTotal':
                        this.$router.push('/home/allReport/pvTotal')
                        break
                    case 'onlineTotal':
                        this.$router.push('/home/allReport/onlineTotal')
                        break
                    case 'keepOnline':
                        this.$router.push('/home/allReport/keepOnline')
                        break
                    case 'payTotal':
                        this.$router.push('/home/allReport/payTotal')
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
