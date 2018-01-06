<template>
    <div>
        <el-tabs  id="htyzDom" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="游戏大厅管理" name="gameHomeGL"></el-tab-pane>
            <el-tab-pane label="活动管理" name="actGL"></el-tab-pane>
            <el-tab-pane label="登录公告管理" name="logNoticeGL"></el-tab-pane>
            <el-tab-pane label="游戏公告管理" name="gameNoticeGL"></el-tab-pane>
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
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
