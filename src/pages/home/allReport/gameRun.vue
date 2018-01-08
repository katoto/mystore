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
            <span class="dailyCX">查询范围：</span>
            <el-select class="checkID userSel" size="small" v-model="value" placeholder="请选择查询类型">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <span class="dailyCX">游戏类型：</span>
            <el-select class="checkID userSel" size="small" v-model="value" placeholder="请选择游戏类型">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
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
                    label="当日总押（币）"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="当日总得（币）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="当日盈利（元宝）">
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


    .checkID{
        max-width: 250px;
    }
    header .userSel{
        max-width: 130px ;
        float: left;
        margin-left: 10px;
    }
</style>
