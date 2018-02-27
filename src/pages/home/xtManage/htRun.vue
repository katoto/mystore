<template>
    <div id="htRun">
        <el-row :gutter="25">
            <el-col :span="11">
                <h3>会员高级操作记录查询：</h3>
                <div class="grid-content bg-purple">
                    <div class="dataTime grid-content bg-purple">
                        <el-date-picker
                            v-model="htRunVipTime"
                            type="daterange"
                            align="right"
                            size="small"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="htVipTimeChange"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-button style="margin-left: 8px" size="small" type="primary" v-tap="{ methods:getVipMsg }">查询</el-button>
                    </div>
                    <section>
                        <el-table
                            :data="htVipList"
                            max-height="400"
                            size="small"
                            border>
                            <el-table-column
                                prop="datetime"
                                label="时间"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="authority"
                                label="操作员权限"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="admin"
                                label="操作员账号"
                                width="110">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                label="操作记录">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                                @current-change="clickPageVIP"
                                background
                                :current-page.sync="pageNumberVIP"
                                size="small"
                                :page-size="pageSizeVIP"
                                layout="prev, pager, next,jumper"
                                :total="totalCountVIP">
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
                            v-model="htRunDTTime"
                            type="daterange"
                            align="right"
                            size="small"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="htDTTimeChange"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                        <el-button style="margin-left: 8px" size="small" type="primary" v-tap="{ methods:getDTMsg }">查询</el-button>

                    </div>
                </div>
                <section>
                    <el-table
                        :data="htDTList"
                        max-height="400"
                        size="small"
                        border>
                        <el-table-column
                            prop="datetime"
                            label="时间"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="authority"
                            label="操作员权限"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="admin"
                            label="操作员账号"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="操作记录">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                            @current-change="clickPageDT"
                            background
                            :current-page.sync="pageNumberDT"
                            size="small"
                            :page-size="pageSizeDT"
                            layout="prev, pager, next,jumper"
                            :total="totalCountDT">
                        </el-pagination>
                    </div>
                </section>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {actionTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                htRunVipTime: '',
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
                htVipList: [{
                    datetime: '2016-05-03',
                    content: '对会员“000000”进行了“扣除游戏币”操作，扣除了5000游戏币',
                    admin: 'admin',
                    authority: '超级管理员'
                }],
                totalCountVIP: 10,
                pageNumberVIP: 1,
                pageSizeVIP: 16,
                htVipStartTime: null,
                htVipEndTime: null,

                htRunDTTime: '',
                pickerOptions2: {
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
                htDTList: [{
                    datetime: '2016-05-03',
                    content: '对会员“000000”进行了“扣除游戏币”操作，扣除了5000游戏币',
                    admin: 'admin',
                    authority: '超级管理员'
                }],

                totalCountDT: 20,
                pageNumberDT: 1,
                pageSizeDT: 16,

                htDTStartTime: null,
                htDTEndTime: null

            }
        },
        watch: {},
        methods: {
            async getVipMsg () {
                if (!this.htVipStartTime || !this.htVipEndTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //                loading
                let result = await this.$store.dispatch(actionTypes.getUserAdminLog, { starttime: this.htVipStartTime, endtime: this.htVipEndTime, pageNumber: 1})

                if (result && result.list) {
                    this.htVipList = result.list
                    // 处理页码
                    this.totalCountVIP = result.totalCount,
                    this.pageNumberVIP = result.pageNumber,
                    this.pageSizeVIP = result.pageSize
                }
            },
            htVipTimeChange (val) {
                //                取到值
                this.htVipStartTime = this.format(val[0])
                this.htVipEndTime = this.format(val[1])
            },
            async clickPageVIP (size) {
                // 分页  请求数据 ，更新数据
                let result = null
                if (!this.htVipStartTime || !this.htVipEndTime) {
                    result = await this.$store.dispatch(actionTypes.getUserAdminLog, { starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: size})
                    console.log('全部分页')
                    console.log(result)
                } else {
                    result = await this.$store.dispatch(actionTypes.getUserAdminLog, { starttime: this.htVipStartTime, endtime: this.htVipEndTime, pageNumber: size})
                    console.log('选择分页')
                    console.log(result)
                }
                if (result && result.list) {
                    this.htVipList = result.list
                    // 处理页码
                    this.totalCountVIP = result.totalCount,
                    this.pageNumberVIP = result.pageNumber,
                    this.pageSizeVIP = result.pageSize
                }
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

            async getDTMsg () {
                if (!this.htDTStartTime || !this.htDTEndTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //                loading
                let result = await this.$store.dispatch(actionTypes.getGameAdminLog, { starttime: this.htDTStartTime, endtime: this.htDTEndTime, pageNumber: 1})

                if (result && result.list) {
                    this.htDTList = result.list
                    // 处理页码
                    this.totalCountDT = result.totalCount,
                    this.pageNumberDT = result.pageNumber,
                    this.pageSizeDT = result.pageSize
                }
            },
            htDTTimeChange (val) {
                //                取到值
                this.htDTStartTime = this.format(val[0])
                this.htDTEndTime = this.format(val[1])
            },
            async clickPageDT (size) {
                // 分页  请求数据 ，更新数据
                let result = null
                if (!this.htDTStartTime || !this.htDTEndTime) {
                    result = await this.$store.dispatch(actionTypes.getGameAdminLog, { starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: size})
                    console.log('全部分页')
                    console.log(result)
                } else {
                    result = await this.$store.dispatch(actionTypes.getGameAdminLog, { starttime: this.htDTStartTime, endtime: this.htDTEndTime, pageNumber: size})
                    console.log('选择分页')
                    console.log(result)
                }
                if (result && result.list) {
                    this.htDTList = result.list
                    // 处理页码
                    this.totalCountDT = result.totalCount,
                    this.pageNumberDT = result.pageNumber,
                    this.pageSizeDT = result.pageSize
                }
            }
        },
        computed: {},
        async mounted () {
            let getUserAdminLog = await this.$store.dispatch(actionTypes.getUserAdminLog, { starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: 1})
            console.log(getUserAdminLog)
            if (getUserAdminLog && getUserAdminLog.list) {
                this.htVipList = getUserAdminLog.list
                // 处理页码
                this.totalCountVIP = getUserAdminLog.totalCount,
                this.pageNumberVIP = getUserAdminLog.pageNumber,
                this.pageSizeVIP = getUserAdminLog.pageSize
            }

            let getGameAdminLog = await this.$store.dispatch(actionTypes.getGameAdminLog, { starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: 1})
            console.log(getGameAdminLog)
            if (getGameAdminLog && getGameAdminLog.list) {
                this.htDTList = getGameAdminLog.list
                // 处理页码
                this.totalCountDT = getGameAdminLog.totalCount,
                this.pageNumberDT = getGameAdminLog.pageNumber,
                this.pageSizeDT = getGameAdminLog.pageSize
            }
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
    @media (max-width: 768px) {
        .el-col-11 {
            width: 100%;
        }
        .el-date-editor--daterange.el-input__inner{
            width:70%;
        }
    }
</style>
