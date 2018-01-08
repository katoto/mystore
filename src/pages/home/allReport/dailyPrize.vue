<template>
    <div>
        <header class="clearfix">
            <div  class="dailyPicker">
                <el-date-picker
                    v-model="selTime"
                    align="right"
                    size="small"
                    type="date"
                    placeholder="选择查询日期"
                    :picker-options="pickerSet">
                </el-date-picker>
            </div>
            <span class="dailyCX">查询类型：</span>
            <el-select class="checkID userSel" size="small" v-model="value" placeholder="请选择查询类型">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
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
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="权限"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作员账号">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="会员账号">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="游戏币">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="兑换价值（元宝）">
                </el-table-column>
            </el-table>
            <p style="padding: 15px 0">
                总计：兑换 0 游戏币 共0.00 元宝
            </p>
            <!--<div class="block">-->
            <!--<el-pagination-->
            <!--@current-change="clickPage"-->
            <!--background-->
            <!--size="small"-->
            <!--layout="prev, pager, next"-->
            <!--:total="50">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selTime: '',
                pickerSet: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick (picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    }, {
                        text: '前天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 2)
                            picker.$emit('pick', date)
                        }
                    }]
                },
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
                value: '直属会员',
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
    header .userSel{
        max-width: 130px ;
        float: left;
        margin-left: 10px;
    }
    header button{
        float: left;
    }
    .checkID{
        max-width: 250px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 98%;
    }
    .el-pagination{
        margin-top: 20px;
        text-align: center;
    }
</style>
