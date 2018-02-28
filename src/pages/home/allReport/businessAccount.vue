<template>
    <div id="busAccountCss">
        <section>
            <div class="clearfix" >
                <p style="float:left;margin:0 0 5px 0;font-weight: 700" class="title01">各营业日总计</p>
                <p style="float: right;color: #f56c6c;font-weight: 600;margin-right: 20px" class="title02">说明：营收=充值-兑奖+平板租借-平板归还</p>
            </div>
            <header class="clearfix">
                <div  class="dailyPicker">
                    <el-date-picker
                        v-model="selTime"
                        align="right"
                        size="small"
                        type="month"
                        value-format="yyyy-MM"
                        :picker-options="pickerSet"
                        placeholder="选择查询月份">
                    </el-date-picker>
                </div>
                <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
            </header>
            <section>
                <el-table
                    :data="businessList"
                    height="350"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="index"
                        label="营业日"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="开启日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="结束日期">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="更次类型">
                    </el-table-column>
                    <el-table-column
                        prop="income"
                        label="营收(元宝)">
                    </el-table-column>
                </el-table>
            </section>
            <p style="padding: 15px 0">当月营收总计：{{ tableAccCoin }} 元宝</p>
        </section>

<!--        <section class="secBox">
            <div class="clearfix" >
                <p style="float:left;margin:10px 0 10px 0;font-weight: 700">每更记录</p>&nbsp;&nbsp;&nbsp;
                <el-button type="success" plain>A 更</el-button>
                <el-button type="info" plain>B 更</el-button>
                <el-button type="warning" plain>C 更</el-button>
            </div>
            <section style="margin-top: 10px">
                <el-table
                    :data="tableData3"
                    height="300"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作员账号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="充值总额（元宝）"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="兑奖总额（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="租借平板押金（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="归还平板押金(元宝)">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="营收(元宝)">
                    </el-table-column>
                </el-table>
            </section>
        </section>
        <section class="secBox" style="margin-top: 30px;margin-bottom: 50px">
            <div class="clearfix" >
                <p style="float:left;margin:10px 0 10px 0;font-weight: 700">操作详情</p>
            </div>
            <section >
                <el-table
                    :data="tableData3"
                    height="250"
                    size="small"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作数目（元宝）">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="游戏币">
                    </el-table-column>

                </el-table>
            </section>
        </section>-->

    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/allReport'
    export default {
        data () {
            return {
                tableAccCoin: 0,

                selTime: '',
                pickerSet: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    }
                },
                businessList: [{
                    'startTime': '2018-01-07 18:52:49',
                    'id': 4,
                    'index': 1,
                    'income': 0,
                    'endTime': '2018-01-10 13:11:04',
                    'type': '分AB两更'
                }]
            }
        },
        methods: {
            async getMsg (showTips = true) {
                if (!this.selTime) {
                    this.$message({
                        message: '请选择查询月份',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let businessAccountList = await this.$store.dispatch(aTypes.getMonthBusine, [this.selTime ])
                console.log(businessAccountList)
                console.log('=========businessAccountList========')
                if (businessAccountList && businessAccountList.length >= 0) {
                    this.businessList = businessAccountList

                    this.businessList.forEach((item) => {
                        if (item.income !== undefined) {
                            this.tableAccCoin = Number(this.tableAccCoin) + Number(item.income)
                        }
                    })

                    if (showTips) {
                        this.$message({
                            message: '列表已更新',
                            type: 'success',
                            duration: 1200
                        })
                    }
                } else {
                    console.error('businessAccountList error at dailyRecharge')
                }
            },
            format (time, format = 'yyyy-MM') {
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
            // 获取 monthAccount 列表
            this.selTime = this.format(new Date())
            let businessAccountList = await this.$store.dispatch(aTypes.getMonthBusine, [this.format(new Date())])
            console.log(businessAccountList)
            console.log('=========businessAccountList========')
            if (businessAccountList && businessAccountList.length >= 0) {
                this.businessList = businessAccountList

                this.businessList.forEach((item) => {
                    if (item.income !== undefined) {
                        this.tableAccCoin = Number(this.tableAccCoin) + Number(item.income)
                    }
                })
            } else {
                console.error('businessAccountList error at dailyRecharge')
            }
        }
    }
</script>
<style scoped>
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

    header button{
        float: left;
    }

    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 98%;
    }
    .el-pagination{
        margin-top: 20px;
        text-align: center;
    }

    #busAccountCss .secBox{
        border-top: 1px solid #000;
    }



    @media (max-width: 768px) {
        .el-main .title01{
            font-size: 12px !important;
        }
        .title02{
            font-size: 8px !important;
            margin-top:4px;
        }
    }
</style>
