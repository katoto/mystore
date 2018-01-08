<template>
    <div>
        <h4 style="margin-left: 25px">新建公告：</h4>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="范围：">
                <el-radio-group v-model="form.resource">
                    <el-radio label="全服，所有在线会员"></el-radio>
                    <el-radio label="新手练习厅所有桌"></el-radio>
                    <el-radio label="欢乐竞技厅所有桌"></el-radio>
                    <el-radio label="会员账号（多账号，xxx;xxx此格式填写）"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="正文：">
                <el-input size="small" placeholder="请输入正文" type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary">发送</el-button>
                <el-button size="small" style="margin-left: 28px">重置</el-button>
            </el-form-item>
        </el-form>
        <section style="margin-bottom: 50px">
            <header class="clearfix" style="padding: 10px 0;border-top: 1px solid #000">
                <span>已发公告：</span>
                <el-button style="margin-left: 18px" size="small" type="primary">再次发送</el-button>
                <el-button style="margin-left: 18px" size="small" disabled  type="primary">再次发送</el-button>
                <el-button style="margin-left: 18px" size="small" type="danger">删除</el-button>
            </header>
            <section >
                <el-table
                    :data="tableData3"
                    height="350"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="范围"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="正文"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="发布人">
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
</style>
