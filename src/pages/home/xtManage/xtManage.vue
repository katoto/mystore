<template>
    <div>
        <el-tabs  id="xtManage" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="系统管理" name="xtSet"></el-tab-pane>
            <el-tab-pane label="销售管理" name="xsSet"></el-tab-pane>
            <el-tab-pane label="用户设置" name="userSet"></el-tab-pane>
            <!--<el-tab-pane label="用户登录IP记录" name="userIP"></el-tab-pane>-->
            <el-tab-pane label="后台运作操作记录" name="htRun"></el-tab-pane>
            <el-tab-pane label="系统日志" name="xtLog"></el-tab-pane>
            <!-- 暂时不用 -->
            <!--<el-tab-pane label="分享设置" name="htyz"></el-tab-pane>-->
            <!--<el-tab-pane label="增设游戏桌" name="zjbg"></el-tab-pane>-->
            <!--<el-tab-pane label="保单箱控制系统密码修改" name="zjbg"></el-tab-pane>-->
          </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeName: 'xtSet'
            }
        },
        methods: {
            handleClick (tab, event) {
                if (this.activeName) {
                    switch (this.activeName) {
                    case 'xtSet':
                        this.$router.push('/home/xtManage/xtSet')
                        break
                    case 'xsSet':
                        this.$router.push('/home/xtManage/xsSet')
                        break
                    case 'userSet':
                        this.$router.push('/home/xtManage/userSet')
                        break
                    case 'userIP':
                        this.$router.push('/home/xtManage/userIP')
                        break
                    case 'htRun':
                        this.$router.push('/home/xtManage/htRun')
                        break
                    case 'xtLog':
                        this.$router.push('/home/xtManage/xtLog')
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
