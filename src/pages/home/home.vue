<template>
    <el-container>
        <el-header>系统管理</el-header>
        <el-main>
            <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="系统管理" name="xtManage"></el-tab-pane>
                <el-tab-pane label="推广员管理" name="tgyManage"></el-tab-pane>
                <el-tab-pane label="一般运作" name="ybyz"></el-tab-pane>
                <el-tab-pane label="后台运作" name="htyz"></el-tab-pane>
                <el-tab-pane label="总结报告" name="allReport"></el-tab-pane>
                <el-tab-pane label="在线充值" name="onlinePay"></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>

export default {
    data () {
        return {
            activeName: 'xtManage'
        }
    },
    computed: {
        socketData () {
            return this.$store.state.websocket.data
        }
    },
    watch: {
        socketData (socketData) {
            // 处理登出的情况
            if (socketData.method === 'logoffNotice') {
                this.$message({
                    message: '当前已退出登录',
                    type: 'success',
                    duration: 1200
                })
                setTimeout(() => {
                    this.$router.replace('/login')
                }, 3000)
            }
        }
    },
    methods: {
        handleClick (tab, event) {
            if (this.activeName) {
                switch (this.activeName) {
                case 'xtManage':
                    this.$router.push('/home/xtManage/xtSet')
                    break
                case 'tgyManage':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildCz')
                    break
                case 'ybyz':
                    this.$router.push('/home/ybyz/vipOperate')
                    break
                case 'htyz':
                    this.$router.push('/home/htyz/gameHomeGL')
                    break
                case 'allReport':
                    this.$router.push('/home/allReport/dailyRecharge')
                    break
                case 'onlinePay':
                    this.$router.push('/home/onlinePay')
                    break
                }
            }
        }
    }
}
</script>
<style scoped>
.el-header {
    color: #333;
    line-height: 50px;
    height: 50px !important;
    font-size: 20px;
    font-weight: 700;
}
.el-main{
    padding-top: 0;
}
</style>
