<template>
    <div>
        <header class="clearfix">
            <div  class="dailyPicker">
                <el-date-picker
                    v-model="selTime"
                    align="right"
                    size="small"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择查询日期"
                    :picker-options="pickerSet">
                </el-date-picker>
            </div>
            <span class="dailyCX">查询类型：</span>
            <el-select class="checkID userSel" size="small" v-model="checkDailyVal" placeholder="请选择查询类型">
                <el-option
                    v-for="item in checkDailyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
        </header>
        <section>
            <el-table
                :data="dailyList"
                height="380"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="authority"
                    label="权限"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="operator"
                    label="操作员账号">
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="会员账号">
                </el-table-column>
                <el-table-column
                    prop="charge"
                    label="充值数目（元宝）">
                </el-table-column>
                <el-table-column
                    prop="gameGold"
                    label="游戏币数量">
                </el-table-column>
            </el-table>
            <p style="padding: 15px 0">总计：{{ tableAccount }} 元宝</p>
        </section>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/allReport'
    export default {
        data () {
            return {
                tableAccount: 0,
                checkDailyOptions: [
                    {
                        label: '直属推广员',
                        value: 0
                    },
                    {
                        label: '直属会员',
                        value: 1
                    },
                    {
                        label: '所有',
                        value: 2
                    }],
                checkDailyVal: 2,
                dailyList: [{
                    authority: '超级管理员',
                    charge: 50000,
                    date: '2017-12-25 14:30:53',
                    gameGold: 50000,
                    operator: 'admin',
                    user: '88888'
                }],

                selTime: '',
                pickerSet: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick (picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    }, {
                        text: '前天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 2)
                            picker.$emit('pick', date)
                        }
                    }]
                }
            }
        },
        methods: {
            async getMsg () {
                if (!this.selTime) {
                    this.$message({
                        message: '请选择查询日期',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //   loading
                let dailyRechargeList = await this.$store.dispatch(aTypes.getPayReport, [this.selTime, Number(this.checkDailyVal)])
                console.log(dailyRechargeList)
                console.log('=========dailyRechargeList========')
                if (dailyRechargeList && dailyRechargeList.length >= 0) {
                    this.dailyList = dailyRechargeList
                    this.dailyList.forEach((item) => {
                        if (item.charge !== undefined && item.charge !== null) {
                            this.tableAccount = Number(this.tableAccount) + Number(item.charge)
                        }
                    })
                    this.$message({
                        message: '列表已更新',
                        type: 'success',
                        duration: 1200
                    })
                } else {
                    console.error('dailyRechargeList error at dailyRecharge')
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
            }
        },
        computed: {},
        async mounted () {
            // 获取管理员列表  第一个参数代表查询的用户
            this.selTime = this.format(new Date())
            let dailyRechargeList = await this.$store.dispatch(aTypes.getPayReport, [this.format(new Date()), 2])
            console.log(dailyRechargeList)
            console.log('=========dailyRechargeList========')
            if (dailyRechargeList && dailyRechargeList.length >= 0) {
                this.dailyList = dailyRechargeList
                this.dailyList.forEach((item) => {
                    if (item.charge !== undefined && item.charge !== null) {
                        this.tableAccount = Number(this.tableAccount) + Number(item.charge)
                    }
                })
            } else {
                console.error('dailyRechargeList error at dailyRecharge')
            }
        }
    }
</script>
<style scoped>
    header{
        margin-bottom: 16px;
    }
    header .dailyPicker{
        margin-bottom: 16px;
        max-width: 250px ;
        float: left;
    }
    header .dailyCX{
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

    @media (max-width: 768px) {
        header .dailyPicker{
            width:100%;
            max-width: 100%;
        }
        header .dailyCX{
            margin-left:0;
        }
    }
</style>
