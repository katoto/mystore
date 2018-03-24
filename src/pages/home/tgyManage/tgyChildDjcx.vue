<template>
    <div id="DJS">
        <header class="clearfix">
            <div class="xtPicker">
                <el-date-picker
                    v-model="DJSTime"
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
            <span style="float: right;line-height: 32px;right: 20px;font-weight: 600">历史兑奖 {{ lastTotalMoney }} 元宝</span>
        </header>
        <section>
            <el-table
                :data="DJSList"
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
                    label="推广员账号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="兑奖数目（元宝）">
                </el-table-column>
                <el-table-column
                    prop="expiryType"
                    label="兑奖类型（元宝）">
                </el-table-column>
                <el-table-column
                    prop="gameGold"
                    label="总价值（币）">
                </el-table-column>
                <el-table-column
                    prop="admin"
                    label="操作员账号">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注信息">
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
    import { actionTypes } from '~store/tgyManager'
    export default {
        data () {
            return {
                lastTotalMoney: 0,

                totalCount: 20,
                pageNumber: 1,
                pageSize: 16,
                DJSList: [
                    {
                        expiryType: '推广员发起',
                        username: '88888',
                        remark: 'test',
                        admin: 'admin',
                        money: 10000,
                        datetime: '2018-03-19 16:28:34',
                        gameGold: 51666
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
                DJSTime: '',
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
                    result = await this.$store.dispatch(actionTypes.promoterExpiryLogs, [ Number(this.selTgyVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                } else {
                    result = await this.$store.dispatch(actionTypes.promoterExpiryLogs, [ Number(this.selTgyVal.id), this.xtStartTime, this.xtEndTime,
                        {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': size, 'pageSize': 6, 'totalCount': 0 }
                    ])
                }

                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.DJSList = copyList
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
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let result = await this.$store.dispatch(actionTypes.promoterExpiryLogs, [ Number(this.selTgyVal.id), this.xtStartTime, this.xtEndTime,
                    {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0 }
                ])
                if (result && result.pager.list) {
                    let copyList = result.pager.list
                    this.DJSList = copyList
                    // 处理页码
                    this.totalCount = result.pager.totalCount
                    this.pageNumber = result.pager.pageNumber
                    this.pageSize = result.pager.pageSize
                }
            }
        },
        computed: {
            selTgyVal () {
                return this.$store.state.tgyManager.selTgyVal
            }
        },
        async mounted () {
            if (!this.selTgyVal) {
                this.$message({
                    message: '没有选择对应选项',
                    type: 'error',
                    duration: 1200
                })
                return false
            }
            let result = await this.$store.dispatch(actionTypes.promoterExpiryLogs, [ Number(this.selTgyVal.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()),
                {'list': [], 'order': '', 'orderBy': '', pageCount: 0, pageNumber: 1, pageSize: 6, totalCount: 0 }
            ])

            if (result && result.pager.list) {
                let copyList = result.pager.list
                this.DJSList = copyList
                // 处理页码
                this.totalCount = result.pager.totalCount
                this.pageNumber = result.pager.pageNumber
                this.pageSize = result.pager.pageSize
            }
            if (result && result.lastTotalMoney) {
                this.lastTotalMoney = result.lastTotalMoney
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
