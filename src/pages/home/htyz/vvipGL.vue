<template>
    <div>
        <header class="clearfix">
            <el-form ref="form" :model="form" label-width="80px">
                <div>
                    <el-button size="small" type="primary">详情</el-button>
                    <el-button size="small" type="primary">封号</el-button>
                    <el-button size="small" type="primary">解禁</el-button>
                    <el-button size="small" type="primary">删号</el-button>
                    <el-button size="small" type="primary">扣除游戏币</el-button>
                    <el-button size="small" type="primary">游戏币赠送</el-button>
                    <el-button size="small" type="primary">游戏币赠送</el-button>
                    <el-button size="small" type="primary">修改等级</el-button>
                    <el-button size="small" type="primary">身份信息查询与修改</el-button>
                    <el-button size="small" type="primary">重置密码</el-button>
                    <el-button size="small" type="primary" disabled>删除异常</el-button>
                    <el-button size="small" type="primary">口令修改</el-button>
                </div>

                <el-form-item label="禁言：">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="20分钟禁言"></el-radio>
                        <el-radio label="6小时禁言"></el-radio>
                        <el-radio label="一天禁言"></el-radio>
                    </el-radio-group>
                </el-form-item>
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
                <el-button style="margin-left: 18px" size="small" type="primary">查找</el-button>
                <el-button style="margin-left: 18px" size="small" type="primary">重置</el-button>
            </el-form>
        </header>

        <section style="margin-bottom: 50px">
            <section class="bottomSel">
                <el-table
                    :data="tableData3"
                    height="350"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="账号"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="昵称"
                        width="50">
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
                        label="等级">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="状态">
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
                <p>会员携带（币）： </p>
                <p>彩票数： </p>
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
        <el-dialog
            title="会员详情"
            :visible.sync="centerDialogVisible"
            width="75%"
            center>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>账号：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>冻结状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>昵称：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>爆机状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>性别：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>游戏币数目(不含保险柜内游戏币)：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>推广员：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>体验币数目：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>身份证号：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>是否租借平板：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>会员等级：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>禁言状态：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>注册时间：4234234234</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <span>最近登录时间：4234234234</span>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                input:'',
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
        margin-bottom: 20px;
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
