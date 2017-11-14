<template>
    <section class="l-flex-column l-full">
        <header class="header l-flex-row">
            <div class="l-flex-1 l-box-center" :class="{'top-cur': topCur === 1}" v-tap="{methods: () => topCur = 1}">
                全部订单<i class="sjx"></i></div>
            <div class="l-flex-1 l-box-center" :class="{'top-cur': topCur === 2}" v-tap="{methods: () => topCur = 2}">
                所有地区<i class="sjx"></i></div>
            <div class="l-flex-1 l-box-center" :class="{'top-cur': topCur === 3}" v-tap="{methods: () => topCur = 3}">更多<i
                    class="sjx"></i></div>
        </header>

        <div class="layer l-full" v-if="topCur" v-tap="{methods: () => topCur = 0}"></div>

        <div class="sydq" v-if="topCur == 2">
            <ul class="area" v-if="bhdata && bhdata.region_row.length">
                <li class="area-item" v-for="region in bhdata.region_row" v-tap="{methods: () => {
                    cityid = region.id
                    page = 1
                    doQuery()
                }}">{{region.name}}


                </li>
            </ul>
        </div>


        <div class="more-dialog" v-if="topCur == 3">
            <ul class="l-flex-row l-text-center search-more-tab">
                <li class="l-flex-1 l-w-0 search-more-tab-item kbsj-tab" :class="{'cur': mTab === 0}"
                    v-tap="{methods: ()=>mTab = 0}">开标日期区间查询


                </li>
                <li class="l-flex-1 l-w-0 search-more-tab-item xmmc-tab" :class="{'cur': mTab === 1}"
                    v-tap="{methods: ()=>mTab = 1}">搜索项目名称


                </li>
            </ul>
            <div class="kbsj-search" v-if="mTab === 0">
                <ul class="search-more-content">
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>起始日期：</span>
                        <input class="input" type="date"/>
                    </li>
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>结束日期：</span>
                        <input class="input" type="date"/>
                    </li>
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>担保公司：</span>
                        <input class="input" placeholder="某某某公司"/>
                    </li>
                </ul>
                <div class="search-more-btn-qty" v-tap="{methods: doQuery}">查询</div>

            </div>
            <div class="xmmc-search l-box-vertical-center-justify" v-if="mTab === 1">
                <input type="text" class="xmmc-input" placeholder="搜索项目名称" v-model="project_name">
                <span class="xmmc-btn" v-tap="{methods: doQuery}">查询</span>

            </div>

        </div>
        <div class="more-dialog" v-if="topCur == 1">
            <ul class="l-flex-row l-text-center search-more-tab status-sel">
                <li class="l-flex-1 l-w-0 search-more-tab-item yzf-tab" :class="{'cur': aTab === 0}"
                    v-tap="{methods: () => aTab = 0}">已支付


                </li>
                <li class="l-flex-1 l-w-0 search-more-tab-item dzf-tab" :class="{'cur': aTab === 1}"
                    v-tap="{methods: () => aTab = 1}">待支付


                </li>
                <li class="l-flex-1 l-w-0 search-more-tab-item ykb-tab" :class="{'cur': aTab === 2}"
                    v-tap="{methods: () => aTab = 2}">已开标


                </li>
                <li class="l-flex-1 l-w-0 search-more-tab-item wkb-tab" :class="{'cur': aTab === 3}"
                    v-tap="{methods: () => aTab = 3}">未开标


                </li>
            </ul>
            <div class="kbsj-search">
                <ul class="search-more-content">
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>起始日期：</span>
                        <input class="input" type="date" v-model="aStart"/>
                    </li>
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>结束日期：</span>
                        <input class="input" type="date" v-model="aEnd"/>
                    </li>
                    <li class="search-more-content-item l-box-vertical-center-begin">
                        <span>担保公司：</span>
                        <input type="text" class="input" placeholder="某某某公司" v-model="guarantee_name"/>
                    </li>
                </ul>
                <div class="search-more-btn-qty" v-tap="{methods: doQuery}">查询</div>

            </div>
        </div>

        <article class="l-flex-1 l-relative content">
            <ul class="l-full l-scroll-y" v-if="bhdata && bhdata.letter_list.length">
                <li class="item" v-for="letter in bhdata.letter_list">
                    <ul>
                        <li class="item-li l-flex-row">
                            <i class="circle"></i>
                            <span class="item-title l-flex-1">{{letter.project_name}}</span>
                            <span class="item-status color-yzf" v-if="letter.pay_status === '2'">已支付</span>
                            <span class="item-status color-dzf" v-if="letter.pay_status === '1'">待支付</span>
                            <span class="item-status color-yzf" v-if="letter.pay_status === '3'">完结</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">保函金额：</span>
                            <span class="item-val">{{letter.money}}元</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">保函费用：</span>
                            <span class="item-val">{{letter.pay}}元</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">开标时间：</span>
                            <span class="item-val">{{letter.open_time | kbsj_fmt}}</span>
                            <span class="jlkbsj item-name" v-if="!letter.is_open_time">距开标时间：<span class="item-val"><span class="red-hour">{{letter.last_time}}</span></span></span>
                            <span class="jlkbsj item-name" v-if="letter.is_open_time">已开标</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">开标地点：</span>
                            <span class="item-val">{{letter.layout}}</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">订单提交时间：</span>
                            <span class="item-val">{{letter.add_time|tjsj_fmt}}</span>
                        </li>
                        <li class="item-li">
                            <span class="item-name">担保公司：</span>
                            <span class="item-val">{{letter.guarantee_name}}</span>
                        </li>
                    </ul>

                </li>
                <div class="more-wrap l-box-center" v-if="hasMore" v-tap="{methods: loadMore}">
                    加载更多

                </div>


            </ul>
            <div v-if="bhdata && !bhdata.letter_list.length" class="no-data l-box-center">
                暂无数据
            </div>

        </article>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                page: 1,
                topCur: 0,
                mTab: 0,
                aTab: 0,
                aStart: '',
                aEnd: '',
                guarantee_name: '',
                project_name: '',
                cityid: ''
            }
        },
        methods: {
            reset () {
                this.page = 1
                this.mTab = 0
                this.aTab = 0
                this.cityid = ''
                this.aStart = ''
                this.aEnd = ''
                this.guarantee_name = ''
                this.project_name = ''
            },
            doQuery () {
                /* let status = ''
                let open = ''
                if (this.topCur === 1) {
                    switch (this.aTab) {
                    case 0: {
                        status = 2
                        break
                    }
                    case 1: {
                        status = 0
                        break
                    }
                    case 2: {
                        open = 1
                        break
                    }
                    case 3: {
                        open = 0
                        break
                    }
                    }
                }
                */
                /* this.$store.dispatch('getBhdata', {
                    page: this.page,
                    nums: 10,
                    open,
                    status,
                    open_time_star: this.aStart,
                    open_time_end: this.aEnd,
                    guarantee_name: this.guarantee_name,
                    cityid: this.cityid,
                    project_name: this.project_name
                }) */
                this.topCur = 0
            },
            loadMore () {
                this.page++
                this.doQuery()
            }

        },
        watch: {
            topCur (topCur) {
                if (!topCur) {
                    this.reset()
                }
            }
        },
        created () {
            this.doQuery()
        },
        computed: {
            bhdata () {
                return this.$store.state.bhdata
            },
            hasMore () {
                return this.$store.state.hasMore
            }
        },
        filters: {
            kbsj_fmt: (tstamp) => {
                let date = new Date(tstamp * 1000)
                return `${date.getMonth() + 1}月${date.getDate()} ${date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()}`
            },
            tjsj_fmt: (tstamp) => {
                let date = new Date(tstamp * 1000)
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }
        }
    }
</script>

<style scoped>
    .header {
        height: .65rem;
        background-color: #7fa9ff;
        font-size: .26rem;
    }

    .top-cur {
        color: #ffffff

    }

    .red-hour {
        color: #ff0202;
        font-size: 16px;
        font-weight: bold;
    }

    .sjx {
        width: 0;
        height: 0;
        border-bottom: .1rem solid black;
        border-right: .1rem solid transparent;
        margin-left: .1rem;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg)
    }

    .circle {
        background-color: #fa6600;
        width: .15rem;
        height: .15rem;
        display: inline-block;
        border-radius: .075rem;
        align-self: center;
        margin-right: .08rem
    }

    .jlkbsj {
        float: right
    }

    .color-yzf {
        color: #999999;
    }

    .color-dzf {
        color: #9fc0fc
    }

    .item {
        /*border: 1px solid red;*/
        font-size: 13px;
        margin: .2rem .15rem;
        padding: .2rem;
        background-color: #FFFFFF;
    }

    .item-li {
        border-bottom: .02rem solid #f6f6f6;
        padding: .1rem 0;
        /*align-items: center;*/
        /*-webkit-box-align: center;*/
        /*-webkit-box-pack: center*/
    }

    .item-name {

        color: #999999
    }

    .item-val {
        color: #333333

    }

    .item-title {
        font-size: 15px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #333333
    }

    .item-status {
        float: right;
    }

    .content {
        background-color: #f8f8f8;
    }

    .more-dialog {
        position: absolute;
        top: .65rem;
        left: 0;
        right: 0;
        /*padding: .1rem;*/
        font-size: .18rem;
        z-index: 2;
        background-color: #f0f0f0;
    }

    .layer {
        z-index: 1;
        background-color: rgba(0, 0, 0, .2);
    }

    .search-more-tab {
        background-color: #f8f8f8;
        height: .4rem;

    }

    .search-more-tab-item {

    }

    .search-more-content {
        margin-top: .2rem;
        background-color: #FFFFFF;
    }

    .search-more-content-item {
        height: .60rem;
        border-bottom: .01rem solid #f8f8f8;
        padding-left: .6rem
    }

    .search-more-btn-qty {
        margin: .8rem auto .4rem auto;
        background-color: #71a9fe;
        height: .4rem;
        width: 1.05rem;
        font-size: .3rem;
        text-align: center;
        border-radius: .2rem;
        color: #FFFFFF;

    }

    .input {
        border: none;
        -webkit-appearance: none
    }

    .cur {
        border-bottom: .04rem solid #7ea9fe;
    }

    .xmmc-search {
        height: .75rem;
    }

    .xmmc-input {
        height: .40rem;
        width: 4.85rem;
        margin-left: .5rem;
        border-radius: .1rem;
        border: .001rem solid gray;

    }

    .xmmc-btn {
        display: inline-block;
        margin-right: .5rem;
        vertical-align: middle;
        height: .34rem;
        line-height: .34rem;
        text-align: center;
        width: .85rem;
        font-size: .3rem;
        border-radius: .165rem;
        overflow: hidden;
        background-color: #7fa9ff;
        color: white;
    }

    .sydq {
        padding-bottom: .25rem;

        position: absolute;
        top: .65rem;
        left: 0;
        right: 0;
        /*padding: .1rem;*/
        font-size: .18rem;
        z-index: 2;
        background-color: #f0f0f0;
    }

    .area {
        padding-left: 1.1rem;
        font-size: .2rem;
    }

    .area-item {
        float: left;
        width: 1.6rem;
        margin-top: .25rem;
    }
    .more-wrap {
        font-size: .3rem;
        height: 1rem;
    }
    .no-data{
        font-size: .3rem;
        height: 3rem;
    }
</style>