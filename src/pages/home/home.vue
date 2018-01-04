<template>
    <el-container>
        <el-header>系统管理</el-header>
        <el-main>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="系统管理" name="xtManage"></el-tab-pane>
                <el-tab-pane label="推广员管理" name="tgyManage"></el-tab-pane>
                <el-tab-pane label="一般运作" name="ybyz"></el-tab-pane>
                <el-tab-pane label="后台运行" name="htyz"></el-tab-pane>
                <el-tab-pane label="总结报告" name="zjbg"></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>

export default {
    data() {
        return {
            activeName: 'xtManage'
        };
    },
    methods: {
        handleClick(tab, event) {
            if( this.activeName ){
                switch ( this.activeName ){
                    case 'xtManage':
                        this.$router.push('/home/xtManage/xtSett')
                        ;break;
                    case 'tgyManage':
                        this.$router.push('/home/tgyManage/tgyChild')
                        ;break;
                    case 'ybyz':;break;
                    case 'htyz':;break;
                    case 'zjbg':;break;
                }
            }
            console.log( this.activeName )
            console.log( tab.label );
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
