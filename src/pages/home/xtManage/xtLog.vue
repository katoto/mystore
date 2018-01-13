<template>
    <div id="xtLog">
        <header class="clearfix">
            <div class="xtPicker">
                <el-date-picker
                    v-model="xtLogTime"
                    type="daterange"
                    align="right"
                    size="small"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <span class="xtSpan">用户账号：</span>
            <el-select class="checkID xtSel" size="small" v-model="xtUserSel" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-input size="small" class="xtInp" v-model="xtInpVal" placeholder="请输入内容"></el-input>
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
        </header>
        <section>
            <el-table
                :data="xtLogList"
                height="350"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="datetime"
                    label="时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="authority"
                    label="权限等级"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="admin"
                    label="用户账号">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="操作">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @current-change="clickPage"
                    background
                    :current-page.sync="pageNumber"
                    size="small"
                    :page-size="pageSize"
                    layout="prev, pager, next,jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
    import {actionTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                totalCount: 20,
                pageNumber: 1,
                pageSize: 16,
                xtLogList: [
                    {
                        admin: 'admin',
                        authority: '超级管理员',
                        content: '登陆管理后台',
                        datetime: '2018-01-08 15:33:59'
                    }],
                xtInpVal: '',

                pickerOptions: {
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
                xtLogTime: '',

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
                xtUserSel: '10万'

            }
        },
        watch: {},
        methods: {
            clickPage (size) {
                // 分页  请求数据 ，更新数据
                console.log(size)
            }
        },
        computed: {},
        async mounted () {
            let copyResult = {'args': [{'list': [
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:33:59'},
                {'content': '退出管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:30:43'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:30:39'},
                {'content': '退出管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:23:07'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:22:10'},
                {'content': '退出管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:21:43'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:19:47'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:19:45'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:19:41'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:19:16'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:18:40'},
                {'content': '退出管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:17:10'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:16:35'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:15:54'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:12:17'},
                {'content': '登陆管理后台', 'authority': '超级管理员', 'admin': 'admin', 'datetime': '2018-01-08 15:12:16'}
            ],
            'order': 'desc',
            'orderBy': '',
            'pageCount': 31,
            'pageNumber': 5,
            'pageSize': 16,
            'totalCount': 491}],
            'method': 'getSystemLog'
            }
            console.log(copyResult)

            if (copyResult.args[0].list || 1) {
                let copyList = copyResult.args[0].list
                this.xtLogList = copyList
                // 处理页码
                this.totalCount = copyResult.args[0].totalCount,
                this.pageNumber = copyResult.args[0].pageNumber,
                this.pageSize = copyResult.args[0].pageSize
            }


            let result = await this.$store.dispatch(actionTypes.getXtLog, { firstParam: -1, starttime: '2018-01-01', endtime: '2018-01-08'})
            console.log(result)
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
