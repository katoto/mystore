<template>
    <div>
        <header class="clearfix">
            <div  class="userPicker">
                <el-date-picker
                    v-model="userIPTime"
                    type="daterange"
                    align="right"
                    size="small"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="logTimeChange"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <span class="userCX">查询id：</span>
            <el-select class="checkID userSel" size="small" v-model="xtUserSel" placeholder="请选择">
                <el-option
                    v-for="item in adminList"
                    :key="item.value"
                    :label="item.username"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
        </header>
        <section>
            <el-table
                :data="userIPList"
                height="350"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户账号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="登陆IP">
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
                userIPTime: '',

                userIPList: [
                    {
                        admin: 'admin',
                        authority: '超级管理员',
                        content: '登陆管理后台',
                        datetime: '2018-01-08 15:33:59'
                    }],
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
                console.log(this.xtStartTime)
                console.log(this.xtEndTime)
                console.log(this.xtUserSel)
                //                loading
                let result = await this.$store.dispatch(actionTypes.getXtLog, { userId: this.xtUserSel, starttime: this.xtStartTime, endtime: this.xtEndTime, pageNumber: 1})
                console.log('查询')
                console.log(result)
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
            console.log('userIP adminList')
            console.log(this.adminList)
            console.log(getManageList)

            this.$message({
                message: '暂无接口(暂停)',
                type: 'error',
                duration: 1200
            })

        //            let result = await this.$store.dispatch(actionTypes.getXtLog, { userId: -1, starttime: this.format( new Date().getTime() - 3600 * 1000 * 24 * 10 ), endtime: this.format( new Date() ),pageNumber:1})
        //            console.log(result)
        //            if (result && result.list) {
        //                let copyList = result.list
        //                this.xtLogList = copyList
        //                // 处理页码
        //                this.totalCount = result.totalCount,
        //                    this.pageNumber = result.pageNumber,
        //                    this.pageSize = result.pageSize
        //            }
        }
    }
</script>
<style scoped>
    header{
        margin-bottom: 16px;
    }
    header .userPicker{
        margin-bottom: 16px;
        max-width: 300px ;
        float: left;
    }
    header .userCX{
        float: left;
        line-height: 32px;
        margin-left: 10px;
    }
    header .userSel{
        max-width: 130px ;
        float: left;
        margin-left: 10px;
    }
    header button{
        float: left;
    }
    .checkID{
        max-width: 250px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 98%;
    }
    .el-pagination{
        margin-top: 20px;
        text-align: center;
    }
</style>
