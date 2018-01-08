<template>
    <div>
        <section style="padding-bottom: 20px;border-bottom: 1px solid #000;">
            <header class="clearfix">
                <div class="xtPicker">
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        size="small"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <span class="xtSpan">用户账号：</span>
                <el-select class="checkID xtSel" size="small" v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
                <el-input size="small" class="xtInp" v-model="input" placeholder="请输入内容"></el-input>
                <el-button style="margin-left: 18px" size="small" type="primary">查询</el-button>
            </header>
            <section>
                <el-table
                    :data="tableData3"
                    height="350"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="账号"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="昵称"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="等级">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="账目状态">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="游戏币">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="彩票数">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="所属推广员">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="申请充值数目(元宝)">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="联系方式">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="最近登录">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="子账号">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        @current-change="clickPage"
                        background
                        size="small"
                        layout="prev, pager, next"
                        :total="50">
                    </el-pagination>
                </div>
            </section>
        </section>
        <el-tabs  id="vipOperate" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="会员充值" name="vipOperate"></el-tab-pane>
            <el-tab-pane label="礼品兑换" name="giftExchange" ></el-tab-pane>
            <el-tab-pane label="平板租借" name="flatRent" ></el-tab-pane>
            <el-tab-pane label="平板归还" name="rentReturn" ></el-tab-pane>
            <el-tab-pane label="充值查询" name="rechargeSearch" ></el-tab-pane>
            <el-tab-pane label="兑奖查询" name="DJSearch" ></el-tab-pane>
            <el-tab-pane label="赠送查询" name="giveSearch" ></el-tab-pane>
            <el-tab-pane label="扣除查询" name="delSearch" ></el-tab-pane>
            <el-tab-pane label="租借记录" name="rentList" ></el-tab-pane>
            <el-tab-pane label="游玩记录" name="playList" ></el-tab-pane>
            <el-tab-pane label="会员登录IP记录" name="vipLoginList" ></el-tab-pane>
            <el-tab-pane label="币票兑换记录" name="BPList" ></el-tab-pane>
            <el-tab-pane label="绑定账号记录" name="bindingList" ></el-tab-pane>
            <el-tab-pane label="物品赠收记录" name="giveGoodsList" ></el-tab-pane>
            <el-tab-pane label="每周营收" name="weeklyList" disabled></el-tab-pane>
            <!-- 暂时不用 -->
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                input:'',
                activeName: 'vipOperate',
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                value7: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                options2: [
                    {
                        value: '100万'
                    },
                    {
                        value: '1000万',
                        disabled: true
                    },
                    {
                        value: '10万'
                    },
                    {
                        value: '1万'
                    }],
                value: '10万',
            }
        },
        methods: {
            handleClick (tab, event) {
                if (this.activeName) {
                    switch (this.activeName) {
                        case 'vipOperate':
                            this.$router.push('/home/ybyz/vipOperate');
                            break;
                        case 'giftExchange':
                            this.$router.push('/home/ybyz/giftExchange');
                            break;
                        case 'flatRent':
                            this.$router.push('/home/ybyz/flatRent');
                            break;
                        case 'rentReturn':
                            this.$router.push('/home/ybyz/rentReturn');
                            break;
                        case 'rechargeSearch':
                            this.$router.push('/home/ybyz/rechargeSearch');
                            break;
                        case 'DJSearch':
                            this.$router.push('/home/ybyz/DJSearch');
                            break;
                        case 'giveSearch':
                            this.$router.push('/home/ybyz/giveSearch');
                            break;
                        case 'delSearch':
                            this.$router.push('/home/ybyz/delSearch');
                            break;
                        case 'rentList':
                            this.$router.push('/home/ybyz/rentList');
                            break;
                        case 'playList':
                            this.$router.push('/home/ybyz/playList');
                            break;
                        case 'vipLoginList':
                            this.$router.push('/home/ybyz/vipLoginList');
                            break;
                        case 'BPList':
                            this.$router.push('/home/ybyz/BPList');
                            break;
                        case 'bindingList':
                            this.$router.push('/home/ybyz/bindingList');
                            break;
                        case 'giveGoodsList':
                            this.$router.push('/home/ybyz/giveGoodsList');
                            break;
                        case 'weeklyList':
                            this.$router.push('/home/ybyz/weeklyList');
                            break;

                    }
                }
            },
            clickPage (size) {
                // 分页
                console.log(size)
            }
        }
    }
</script>
<style scoped>
    #vipOperate{
        padding-top: 15px;
    }
    header .xtPicker{
        margin-bottom: 16px;
        max-width: 280px ;
        float: left;
    }
    header .xtSpan{
        float: left;
        line-height: 32px;
        margin-left: 10px;
    }
    header .xtSel{
        max-width: 100px ;
        float: left;
        margin-left: 10px;
    }
    header .xtInp{
        max-width: 120px ;
        float: left;
        margin-left: 10px;
    }
    header button{
        float: left;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }

</style>
