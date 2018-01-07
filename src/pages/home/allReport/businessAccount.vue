<template>
    <div id="busAccountCss">
        <section>
            <div class="clearfix" >
                <p style="float:left;margin:0 0 5px 0;font-weight: 700">各营业日总计</p>
                <p style="float: right;color: #f56c6c;font-weight: 600;margin-right: 20px">说明：营收=充值-兑奖+平板租借-平板归还</p>
            </div>
            <header class="clearfix">
                <div  class="dailyPicker">
                    <el-date-picker
                        v-model="selTime"
                        align="right"
                        size="small"
                        type="month"
                        placeholder="选择查询月份">
                    </el-date-picker>
                </div>
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
                        label="营业日"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="开启日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="结束日期">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="更次类型">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="营收(元宝)">
                    </el-table-column>
                </el-table>
            </section>
            <p style="padding: 15px 0">当月营收总计：0 元宝</p>
        </section>
        <section class="secBox">
            <div class="clearfix" >
                <p style="float:left;margin:10px 0 10px 0;font-weight: 700">每更记录</p>
            </div>
            <section >
                <el-table
                    :data="tableData3"
                    height="300"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作员账号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="充值总额（元宝）"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="兑奖总额（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="租借平板押金（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="归还平板押金(元宝)">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="营收(元宝)">
                    </el-table-column>
                </el-table>
            </section>
        </section>
        <section class="secBox" style="margin-top: 30px;margin-bottom: 50px">
            <div class="clearfix" >
                <p style="float:left;margin:10px 0 10px 0;font-weight: 700">操作详情</p>
            </div>
            <section >
                <el-table
                    :data="tableData3"
                    height="250"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作数目（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="游戏币">
                    </el-table-column>

                </el-table>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selTime: '',
                options2: [
                    {
                        value: '直属会员'
                    },
                    {
                        value: '直属推广员'
                    },
                    {
                        value: '所有'
                    }],
                value: '所有',
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        watch: {},
        methods: {
        },
        computed: {},
        mounted () {
        }
    }
</script>
<style scoped>
    header .dailyPicker{
        margin-bottom: 16px;
        max-width: 250px ;
        float: left;
    }
    header .dailyCX{
        float: left;
        line-height: 32px;
        margin-left: 10px;
    }

    header button{
        float: left;
    }

    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 98%;
    }
    .el-pagination{
        margin-top: 20px;
        text-align: center;
    }

    #busAccountCss .secBox{
        border-top: 1px solid #000;
    }

</style>
