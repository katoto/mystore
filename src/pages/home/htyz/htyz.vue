<template>
    <div>
        <el-tabs  id="htyzDom" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="游戏大厅管理" name="gameHomeGL"></el-tab-pane>
            <el-tab-pane label="登录公告管理" name="logNoticeGL"></el-tab-pane>
            <el-tab-pane label="游戏公告管理" name="gameNoticeGL"></el-tab-pane>
            <el-tab-pane label="邮件系统" name="emailXT"></el-tab-pane>
            <el-tab-pane label="会员高级管理" name="vvipGL"></el-tab-pane>
            <el-tab-pane label="营业管理" name="businessGL" disabled></el-tab-pane>

            <!--<el-tab-pane label="活动管理" name="actGL"></el-tab-pane>-->
            <!--<el-tab-pane label="数据备份" name="dataBackup"></el-tab-pane>-->
            <!-- 暂时不用  绘图部分 -->
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeName: 'gameHomeGL'
            }
        },
        methods: {
            handleClick (tab, event) {
                if (this.activeName) {
                    switch (this.activeName) {
                    case 'gameHomeGL':
                        this.$router.push('/home/htyz/gameHomeGL')
                        break
                    case 'actGL':
                        this.$router.push('/home/htyz/actGL')
                        break
                    case 'logNoticeGL':
                        this.$router.push('/home/htyz/logNoticeGL')
                        break
                    case 'gameNoticeGL':
                        this.$router.push('/home/htyz/gameNoticeGL')
                        break
                    case 'emailXT':
                        this.$router.push('/home/htyz/emailXT')
                        break
                    case 'vvipGL':
                        this.$router.push('/home/htyz/vvipGL')
                        break
                    case 'businessGL':
                        this.$router.push('/home/htyz/businessGL')
                        break
                    case 'dataBackup':
                        this.$router.push('/home/htyz/dataBackup')
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>
    @media (max-width: 768px) {

    }
</style>
