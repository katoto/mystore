<template>
    <div id="app">
        <section id="xsSet">
            <div class="list">
                <h2>所有会员充值比例设置：</h2>
                1游戏币 =<el-input v-model="xsAll" placeholder="请输入"></el-input> 元宝
            </div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: '我是頭部',
                xsAll:'',
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted () {

        }
    }
</script>
<style scoped>
    #xsSet .list{
        border-bottom:1px solid #303133;
        color: #303133;
    }
    #xsSet h2{
        font-size: 16px;
        font-weight:bold;
    }
</style>
