<template>
    <div id="xtLog">
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
                    label="时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户账号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="登陆IP">
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
    </div>
</template>

<script>
    import {aTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                input: '',
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
            clickPage (size) {
                // 分页
                console.log(size)
            }
        },
        computed: {},
        async mounted () {
            let result = await this.$store.dispatch(aTypes.getXtLog, { firstParam:'-1',starttime: '2018-01-01', endtime: '2018-01-08'})
            console.log( result );
            console.log(result)
        }
    }
</script>
<style scoped>
    header{
        margin-bottom: 16px;
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
        width: 60%;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
</style>
