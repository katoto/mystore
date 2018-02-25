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
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="logTimeChange"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <span class="xtSpan">用户账号：</span>
            <el-select class="checkID xtSel" size="small" v-model="xtUserSel" placeholder="请选择">
                <el-option
                    v-for="item in adminList"
                    :key="item.value"
                    :label="item.username"
                    :value="item.id"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-input size="small" class="xtInp" disabled v-model="xtInpVal" placeholder="请输入内容"></el-input>
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
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    },
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
                xtStartTime: null,
                xtEndTime: null,

                adminList: [],
                xtUserSel: ''

            }
        },
        watch: {},
        methods: {
            logTimeChange (val) {
                console.log(this.format(val[0]))
                console.log(this.format(val[1]))
                //                取到值
                this.xtStartTime = this.format(val[0])
                this.xtEndTime = this.format(val[1])
            },
            format (time, format = 'yyyy-MM-dd') {
                let t = new Date(time)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            async clickPage (size) {
                // 分页  请求数据 ，更新数据
                console.log(size)
                let result = null
                if (!this.xtStartTime || !this.xtEndTime || !this.xtUserSel) {
                    result = await this.$store.dispatch(actionTypes.getXtLog, { userId: -1, starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: size})
                    console.log('全部分页')
                    console.log(result)
                } else {
                    result = await this.$store.dispatch(actionTypes.getXtLog, { userId: this.xtUserSel, starttime: this.xtStartTime, endtime: this.xtEndTime, pageNumber: size})
                    console.log('选择分页')
                    console.log(result)
                }
                if (result && result.list) {
                    let copyList = result.list
                    this.xtLogList = copyList
                    // 处理页码
                    this.totalCount = result.totalCount,
                    this.pageNumber = result.pageNumber,
                    this.pageSize = result.pageSize
                }
            },
            async getMsg () {
                if (!this.xtStartTime || !this.xtEndTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (!this.xtUserSel) {
                    this.$message({
                        message: '请选择查询用户',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //                loading
                let result = await this.$store.dispatch(actionTypes.getXtLog, { userId: this.xtUserSel, starttime: this.xtStartTime, endtime: this.xtEndTime, pageNumber: 1})

                if (result && result.list) {
                    let copyList = result.list
                    this.xtLogList = copyList
                    // 处理页码
                    this.totalCount = result.totalCount,
                    this.pageNumber = result.pageNumber,
                    this.pageSize = result.pageSize
                }
            }
        },
        computed: {},
        async mounted () {
            // 获取管理员列表  第一个参数代表查询的用户
            let getManageList = await this.$store.dispatch(actionTypes.adminList, [])
            if (getManageList && getManageList.length >= 0) {
                getManageList.forEach((item, index) => {
                    if (item.id && item.username) {
                        this.adminList.push({ username: item.username, id: item.id })
                    }
                })
            } else {
                console.error('adminList error at xtLog')
            }

            let result = await this.$store.dispatch(actionTypes.getXtLog, { userId: -1, starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: 1})
            if (result && result.list) {
                let copyList = result.list
                this.xtLogList = copyList
                // 处理页码
                this.totalCount = result.totalCount,
                this.pageNumber = result.pageNumber,
                this.pageSize = result.pageSize
            }
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
        width: 80%;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    @media (max-width: 768px) {
        header button{
            margin-left:15px;
        }
        header .xtPicker{
            max-width:100%;
        }
        header .xtSpan{
            margin-left:0;
        }
        header button{
            margin:10px 0 0 0 !important;
        }
    }
</style>
