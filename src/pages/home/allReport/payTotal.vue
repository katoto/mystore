<template>
    <div id="xtLog">
        <header class="clearfix">
            <div class="xtPicker">
                <el-date-picker
                    v-model="selTime"
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
            </div>
            <span class="xtSpan">统计范围：</span>
            <el-select class="checkID xtSel" size="small" v-model="payValue" placeholder="请选择">
                <el-option
                    v-for="item in payOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{methods:getMsg}">查询</el-button>
        </header>
        <section>
            <el-table
                :data="payList"
                height="450"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="userCount"
                    label="付费用户">
                </el-table-column>
                <el-table-column
                    prop="payCount"
                    label="付费次数">
                </el-table-column>
                <el-table-column
                    prop="all"
                    label="收入（元宝）">
                </el-table-column>
                <el-table-column
                    prop="avg"
                    label="单均价">
                </el-table-column>
                <el-table-column
                    prop="arpu"
                    label="ARPU">
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/allReport'
    export default {
        data () {
            return {
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
                selTime: '',

                payOptions: [
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
                payValue: 2,

                payList: [{
                    userCount: 0,
                    payCount: 0,
                    avg: 0,
                    date: '2018-01-27',
                    arpu: 0,
                    all: 0
                }],

                startTime: '',
                endTime: ''
            }
        },
        watch: {},
        methods: {
            htVipTimeChange (val) {
                //                取到值
                this.startTime = this.format(val[0])
                this.endTime = this.format(val[1])
            },
            async getMsg (showTips = true) {
                if (!this.startTime || !this.endTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let payTotalList = await this.$store.dispatch(aTypes.getCharge, [this.startTime, this.endTime, Number(this.payValue) ])
                console.log(payTotalList)
                console.log('=========payTotalList========')
                if (payTotalList && payTotalList.length >= 0) {
                    this.payList = payTotalList.reverse()
                    if (showTips) {
                        this.$message({
                            message: '列表已更新',
                            type: 'success',
                            duration: 1200
                        })
                    }
                } else {
                    console.error('payTotalList error at dailyRecharge')
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
            // 获取 regisTotal 列表
            let payTotalList = await this.$store.dispatch(aTypes.getCharge, [ this.format(new Date().getTime() - 3600 * 1000 * 24 * 10), this.format(new Date()), 2 ])
            console.log('=========payTotalList========')
            if (payTotalList && payTotalList.length >= 0) {
                this.payList = payTotalList.reverse()
            } else {
                console.error('payTotalList error at dailyRecharge')
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

    @media (max-width: 768px) {
        header .xtSpan{
            margin-left: 0;
        }
    }
</style>
