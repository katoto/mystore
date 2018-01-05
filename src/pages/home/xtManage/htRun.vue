<template>
    <div id="htRun">
        <el-row :gutter="25">
            <el-col :span="11">
                <h3>会员高级操作记录查询：</h3>
                <div class="grid-content bg-purple">
                    <div class="dataTime grid-content bg-purple">
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
                        <el-button style="margin-left: 8px" size="small" type="primary">刷新</el-button>
                    </div>
                    <section>
                        <el-table
                            :data="tableData3"
                            max-height="400"
                            size="small"
                            border>
                            <el-table-column
                                prop="date"
                                label="时间"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="操作员权限"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="操作员账号"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="操作记录">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                @current-change="clickPage"
                                size="small"
                                layout="prev, pager, next"
                                :total="50">
                            </el-pagination>
                        </div>
                    </section>
                </div>
            </el-col>
            <el-col :span="11">
                <h3>大厅管理操作记录查询：</h3>
                <div class="grid-content bg-purple">
                    <div class="dataTime grid-content bg-purple">

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
                        <el-button style="margin-left: 8px" size="small" type="primary">刷新</el-button>

                    </div>
                </div>
                <section>
                    <el-table
                        :data="tableData3"
                        max-height="400"
                        size="small"
                        border>
                        <el-table-column
                            prop="date"
                            label="时间"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作员权限"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作员账号"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作记录">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                            @current-change="clickPage"
                            size="small"
                            layout="prev, pager, next"
                            :total="50">
                        </el-pagination>
                    </div>
                </section>
            </el-col>
        </el-row>

        <!--<el-row :gutter="20">-->
            <!--<el-col :span="9">-->
                <!--<div class="grid-content bg-purple">-->
                <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="9">-->
                <!--<div class="grid-content bg-purple">-->
                <!--</div>-->
            <!--</el-col>-->
        <!--</el-row>-->


    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                options2: [
                    {
                        value: '100万',
                    },
                    {
                        value: '1000万',
                        disabled: true
                    },
                    {
                        value: '10万',
                    },
                    {
                        value: '1万',
                    },
                    {
                        value: '1000',
                    }],
                value: '10万',
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海上海市上海市上海市上海市市 弄'
                }]
            };
        },
        watch: {},
        methods: {
            clickPage( size ){
                // 分页
                console.log(size);
            }
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
    .checkID{
        width: 24%;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 55%;
    }
    #htRun h3{
        padding: 12px 0 ;
    }
    #htRun .el-table {
        margin-top: 14px;
    }
    #htRun .el-pagination{
        margin-top: 14px;
        text-align: center;
    }
</style>
