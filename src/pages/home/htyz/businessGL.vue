<template>
    <div>
        <header class="clearfix">
            <el-form ref="form" :model="form" label-width="80px">
                <div style="height: 36px">
                    <el-button size="small" type="primary">刷新</el-button>
                    <el-button size="small" type="primary">开始营业</el-button>
                    <el-button size="small" type="primary">暂停营业</el-button>
                    <el-button size="small" type="primary">确认交班</el-button>
                    <el-button size="small" type="primary" disabled>换班</el-button>
                </div>
                <div class="clearfix">
                    <span class="xtSpan" style="float: left">当前营业状态：A更，暂停营业</span>
                    <span style="float: right;font-weight: 600;margin-right: 20px;color: #f56c6c">说明：营收=充值-兑奖+平板租借-平板归还</span>
                </div>
            </el-form>
        </header>
        <el-table
            :data="tableData3"
            height="350"
            size="small"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="服务员账号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="充值数目（元宝）"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="兑奖数目（元宝）">
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
                label="实际营收（元宝）">
            </el-table-column>
            <el-table-column
                prop="address"
                label="结账数目（元宝）">
            </el-table-column>
            <el-table-column
                prop="address"
                label="交班状态">
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                input: '',
                centerDialogVisible: true,
                form: {
                    name: '',
                    desc: ''
                },
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
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                value7: '',
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
                    },
                    {
                        value: '1000'
                    }],
                value: '10万',
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
            onSubmit () {
                console.log('submit!')
            },
            clickPage (size) {
                // 分页
                console.log(size)
            }
        },
        computed: {},
        mounted () {
        }
    }
</script>
<style scoped>
    .el-pagination{
        text-align: center;
        margin: 25px 0;
    }
    .bottomSel p{
        margin-top: 5px;
        line-height: 26px;
    }
    header{
        margin-bottom: 10px;
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

    .checkID{
        max-width: 120px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }

    .el-row{
        padding: 1px 0;
    }
</style>
