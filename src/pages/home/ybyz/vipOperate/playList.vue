<template>
    <div id="play">
        <header class="clearfix">
            <div class="xtPicker">
                <el-date-picker
                    v-model="playTime"
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
            <span style="float: right;line-height: 32px;right: 20px;font-weight: 600">历史总计：{{ lastTotalPlay }}币 历史总得：{{ lastTotalGet }}币 历史总盈：{{ lastTotalGain }}币</span>
        </header>
        <section>
            <el-table
                :data="playList"
                max-height="300"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="datetime"
                    label="时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="账号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="yaGold"
                    label="总押（币）">
                </el-table-column>
                <el-table-column
                    prop="deGold"
                    label="总得（币）">
                </el-table-column>
                <el-table-column
                    prop="userGain"
                    label="总盈利（币）">
                </el-table-column>
                <el-table-column
                    prop="userGold"
                    label="游戏币">
                </el-table-column>
                <el-table-column
                    prop="userScore"
                    label="游戏分值">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="彩票">
                </el-table-column>
                <el-table-column
                    prop="userTotalValue"
                    label="总价值（币）">
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
                lastTotalMoney: 0,

                totalCount: 20,
                pageNumber: 1,
                pageSize: 16,
                playList: [
                    {
                        username: '1650781184',
                        datetime: '2018-01-02 13:10-13:20',
                        deGold: 0,
                        yaGold: 0,
                        userGold: 2306,
                        userScore: 0,
                        userGain: 0,
                        userTotalValue: 2306
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
                playTime: '',
                xtStartTime: null,
                xtEndTime: null,

                adminList: [],

                lastTotalGain: 0,
                lastTotalGet: 0,
                lastTotalPlay: 0
            }
        },
        watch: {},
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
                    result = await this.$store.dispatch(aTypes.getUserPlayLog, [ Number(this.selVipVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                } else {
                    result = await this.$store.dispatch(aTypes.getUserPlayLog, [ Number(this.selVipVal.id), this.xtStartTime, this.xtEndTime,
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                }
                console.log(result)
                console.log('游玩记录查询')
                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.playList = copyList
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
                let result = await this.$store.dispatch(aTypes.getUserPlayLog, [ Number(this.selVipVal.id), this.xtStartTime, this.xtEndTime,
                    {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0 }
                ])
                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.playList = copyList
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
            let result = await this.$store.dispatch(aTypes.getUserPlayLog, [ Number(this.selVipVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0 }
            ])
            console.log(result)
            console.log('游玩记录查询')
            if (result && result.pager.list) {
                let copyList = result.pager.list
                this.playList = copyList
                // 处理页码
                this.totalCount = result.pager.totalCount
                this.pageNumber = result.pager.pageNumber
                this.pageSize = result.pager.pageSize
            }
            if (result && result.lastTotalGain) {
                this.lastTotalGain = result.lastTotalGain
            }
            if (result && result.lastTotalGet) {
                this.lastTotalGet = result.lastTotalGet
            }
            if (result && result.lastTotalPlay) {
                this.lastTotalPlay = result.lastTotalPlay
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
