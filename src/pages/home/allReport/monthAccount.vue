<template>
    <div>
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
            <el-button style="margin-left: 18px" size="small" type="danger">删除</el-button>
            <el-button style="margin-left: 18px" size="small" type="success">导出</el-button>
        </header>
        <section id="dailyAccP">
            <el-table
                :data="tableData3"
                height="350"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="充值（元宝）"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="兑奖（元宝）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="平板租借（元宝）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="平板归还（元宝）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="扣除（币）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="赠送（币）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="玩家携带总量（币）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="营收（元宝）">
                </el-table-column>
            </el-table>
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
            //            clickPage (size) {
            //                // 分页
            //                console.log(size)
            //            }
        },
        computed: {},
        mounted () {
        }
    }
</script>
<style scoped>
    header{
        margin-bottom: 16px;
    }
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

</style>
