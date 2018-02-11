<template>
    <div id="vipLogin">
        <header class="clearfix">
            <div class="xtPicker">
                <el-date-picker
                    v-model="vipLoginTime"
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
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
        </header>
        <section>
            <el-table
                :data="vipLoginList"
                max-height="300"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="loginDate"
                    label="时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="会员账号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="loginIp"
                    label="会员登陆IP">
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
    import { aTypes, mTypes } from '~store/ybyz'
    export default {
        data () {
            return {

                totalCount: 20,
                pageNumber: 1,
                pageSize: 16,
                vipLoginList: [
                    {
                        username: '88888',
                        loginIp: '14.24.208.204',
                        userId: 2,
                        loginDate: '2018-01-08 20:36:31',
                        userType: 1
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
                vipLoginTime: '',
                xtStartTime: null,
                xtEndTime: null,

                adminList: []
            }
        },
        methods: {
            logTimeChange (val) {
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
                let result = null
                if (!this.xtStartTime || !this.xtEndTime) {
                    result = await this.$store.dispatch(aTypes.getUserLoginRec, [ Number(this.selVipVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                    console.log('全部分页')
                    console.log(result)
                } else {
                    result = await this.$store.dispatch(aTypes.getUserLoginRec, [ Number(this.selVipVal.id), this.xtStartTime, this.xtEndTime,
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                    console.log('选择时间分页')
                    console.log(result)
                }
                console.log(result)
                console.log('IP记录查询')
                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.vipLoginList = copyList
                    // 处理页码
                    this.totalCount = result.pager.totalCount
                    this.pageNumber = result.pager.pageNumber
                    this.pageSize = result.pager.pageSize
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
                if (!this.selVipVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let result = await this.$store.dispatch(aTypes.getUserLoginRec, [ Number(this.selVipVal.id), this.xtStartTime, this.xtEndTime,
                    {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0 }
                ])
                console.log('IP记录查询按钮')
                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.vipLoginList = copyList
                    // 处理页码
                    this.totalCount = result.pager.totalCount
                    this.pageNumber = result.pager.pageNumber
                    this.pageSize = result.pager.pageSize

                    this.$message({
                        message: '已更新',
                        type: 'success',
                        duration: 1200
                    })
                }
            }
        },
        computed: {
            selVipVal () {
                return this.$store.state.ybyz.selVipVal
            }
        },
        async mounted () {
            if (!this.selVipVal) {
                this.$message({
                    message: '没有选择对应选项',
                    type: 'error',
                    duration: 1200
                })
                return false
            }
            let result = await this.$store.dispatch(aTypes.getUserLoginRec, [ Number(this.selVipVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0 }
            ])
            console.log(result)
            console.log('IP记录查询')
            if (result && result.pager.list) {
                let copyList = result.pager.list
                this.vipLoginList = copyList
                // 处理页码
                this.totalCount = result.pager.totalCount
                this.pageNumber = result.pager.pageNumber
                this.pageSize = result.pager.pageSize
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
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 95%;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
</style>
