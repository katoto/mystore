<template>
    <div>
        <header class="clearfix">
            <el-button style="margin-left: 18px" size="small" type="primary">刷新</el-button>
            <el-button style="margin-left: 18px" size="small" type="primary">新建</el-button>
            <el-button style="margin-left: 18px" size="small" type="danger">删除</el-button>
            <el-button style="margin-left: 18px" size="small" type="success">活动期限设置</el-button>
        </header>
        <p>活动期限：</p>
        <p>活动状态： 结构得改 </p>
        <section id="dailyAccP">
            <el-table
                :data="tableData3"
                height="350"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="类型"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="内容">
                </el-table-column>

            </el-table>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
