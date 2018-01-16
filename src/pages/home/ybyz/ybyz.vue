<template>
    <div>
        <el-tabs  id="xtManage" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="会员操作" name="vipOperate"></el-tab-pane>
            <el-tab-pane label="平板租借记录查询" name="rentSearch" disabled></el-tab-pane>
            <!-- 暂时不用 -->
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeName: 'vipOperate'
            }
        },
        methods: {
            handleClick (tab, event) {
                if (this.activeName) {
                    switch (this.activeName) {
                    case 'vipOperate':
                        this.$router.push('/home/ybyz/vipOperate');
                        break;
                    case 'rentSearch':
                        this.$router.push('/home/ybyz/rentSearch');
                        break
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
