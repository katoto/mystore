<template>
    <div id="xtLog">
        <section>
            <el-table
                :data="xtLogList"
                height="350"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="order_no"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="充值金额">
                </el-table-column>
                <el-table-column
                    prop="realReceive"
                    label="实际金额">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="时间">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="confirmWebSock(scope.row)" type="text" size="small">查看</el-button>
                    </template>
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
    import { aTypes } from '~store/onlinePay.js'
    export default {
        data () {
            return {
                totalCount: 20,
                pageNumber: 1,
                pageSize: 16,
                xtLogList: [
                    {
                        username: 'qwerty', // 用户名
                        amount: '100', // 充值金额
                        realReceive: '100', // 实际金额
                        time: 'fadsfdsd', // 时间
                        order_no: '111111', // 订单编号
                        id: 67 //  用户id，确认充值时会用到，表格里不需要显示
                    }],
                xtInpVal: '',
                xtLogTime: '',
                xtStartTime: null,
                xtEndTime: null,

                adminList: [],
                xtUserSel: ''

            }
        },
        watch: {},
        methods: {
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
            async confirmWebSock (data) {
                if (this.loginInfoConfig) {
                    let websockData = await this.$store.dispatch(aTypes.confirmWebSock, [ Number(data.id), Number(this.loginInfoConfig.payScale) / 100 ])
                    console.log(data)
                    console.log('==================')
                }
            }
        },
        computed: {
            loginInfoConfig () {
                if (this.$store.state.user.loginInfo) {
                    return this.$store.state.user.loginInfo.config
                }
                return false
            }
        },
        async mounted () {
            let getManageList = await this.$store.dispatch(aTypes.getOnlinePayList)

            if (getManageList && getManageList.length >= 0) {
                this.xtLogList = getManageList
            } else {
                console.error('getManageList error at onlinePay')
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
