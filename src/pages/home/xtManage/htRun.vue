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
                        <el-button style="margin-left: 8px" size="small" type="primary">查询</el-button>

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
    import {actionTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                htRunVipTime:'',
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
                htVipList: [{
                    datetime: '2016-05-03',
                    content: '对会员“000000”进行了“扣除游戏币”操作，扣除了5000游戏币',
                    admin: 'admin',
                    authority: '超级管理员'
                }],
                totalCountVIP: 10,
                pageNumberVIP: 1,
                pageSizeVIP: 16,
                htVipStartTime:null,
                htVipEndTime:null,

                totalCountDT: 20,
                pageNumberDT: 1,
                pageSizeDT: 16,
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
            async clickPageVIP (size) {
                // 分页  请求数据 ，更新数据
                let result = null
                if (!this.htVipStartTime || !this.htVipEndTime ) {
                    result = await this.$store.dispatch(actionTypes.getUserAdminLog, {  starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: size})
                    console.log('全部分页')
                    console.log(result)
                } else {
                    result = await this.$store.dispatch(actionTypes.getUserAdminLog, {  starttime: this.htVipStartTime, endtime: this.htVipEndTime, pageNumber: size})
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
            async clickPageDT (size) {
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
        },
        computed: {},
        async mounted () {
            let getUserAdminLog = await this.$store.dispatch(actionTypes.getUserAdminLog,{ starttime: this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), endtime: this.format(new Date()), pageNumber: 1})
            console.log(getUserAdminLog)
            if( getUserAdminLog && getUserAdminLog.list ){
                this.htVipList = getUserAdminLog.list ;
                // 处理页码
                this.totalCountVIP = getUserAdminLog.totalCount,
                this.pageNumberVIP = getUserAdminLog.pageNumber,
                this.pageSizeVIP = getUserAdminLog.pageSize

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
</style>
