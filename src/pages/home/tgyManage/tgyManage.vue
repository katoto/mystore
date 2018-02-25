<template>
    <div>
        <div class="overflow title">
            <h2 class="fl">推广员管理</h2>
            <p class="fr red">当前可处理的订单数：充值申请0个，兑奖申请0个</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {},
        computed: {
            loginInfo () {
                return this.$store.state.user.loginInfo
            }
        },
        mounted () {
        }
    }
</script>
<style scoped>
    h2.fl{
        font-size:16px;
        color: #409EFF;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .overflow{
        overflow: hidden;
    }
    .red{
        color: red;
    }

    @media (max-width: 768px) {
        .title h2{
            font-size:12px;
        }
        .title p{
            width:100%;
            text-align: left;
            font-size:10px;
        }
    }
</style>
