<template>
    <div>
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
            <el-button size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
            <el-button size="small" type="danger" v-tap="{ methods:beforeDelMsg }">删除</el-button>
            <el-button size="small" type="success" v-tap="{ methods:exportExcel }">导出</el-button>
        </header>
        <section>
            <el-table
                id="out-table"
                :data="monthList"
                height="450"
                size="small"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="charge"
                    label="充值（元宝）"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="change"
                    label="兑奖（元宝）">
                </el-table-column>
                <el-table-column
                    prop="deposit"
                    label="平板租借（元宝）">
                </el-table-column>
                <el-table-column
                    prop="returnDeposit"
                    label="平板归还（元宝）">
                </el-table-column>
                <el-table-column
                    prop="minus"
                    label="扣除（币）">
                </el-table-column>
                <el-table-column
                    prop="give"
                    label="赠送（币）">
                </el-table-column>
                <el-table-column
                    prop="allCoin"
                    label="玩家携带总量（币）">
                </el-table-column>
                <el-table-column
                    prop="result"
                    label="营收（元宝）">
                </el-table-column>
            </el-table>
        </section>

        <!-- 删除确认弹窗 -->
        <el-dialog
            title="月份账目删除"
            :visible.sync="dialogVisible"
            width="35%">
            <span>确定删除该月份账目( {{ selTime }}月 )账单？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: delMsg }"  >确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/allReport'

    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

export default {
        data () {
            return {
                dialogVisible: false,

                selTime: '',
                pickerSet: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    }
                },
                monthList: [{
                    result: 0,
                    minus: 0,
                    charge: 0,
                    allCoin: 75804,
                    give: 0,
                    returnDeposit: 0,
                    deposit: 0,
                    change: 0,
                    date: '2018-01-01'
                }]
            }
        },
        methods: {
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
            beforeDelMsg () {
                this.dialogVisible = true
            },
            async delMsg () {
                let monthAccountList = await this.$store.dispatch(aTypes.deleteMonthAccount, [this.selTime])
                console.log(monthAccountList)
                console.log('========= delMsg ========')
                if (monthAccountList && monthAccountList.success === true) {
                    this.$message({
                        message: '月份账单已删除',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.dialogVisible = false
                    }, 1200)

                    /* 是否更新列表 ？ */
                    this.getMsg(false)
                } else {
                    console.error('monthAccountList error at dailyRecharge')
                }
            },
            async getMsg (showTips = true) {
                if (!this.selTime) {
                    this.$message({
                        message: '请选择查询月份',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let monthAccountList = await this.$store.dispatch(aTypes.getMonthAccount, [this.selTime, 0 ])
                console.log(monthAccountList)
                console.log('=========monthAccountList========')
                if (monthAccountList && monthAccountList.length >= 0) {
                    this.monthList = monthAccountList
                    if (showTips) {
                        this.$message({
                            message: '列表已更新',
                            type: 'success',
                            duration: 1200
                        })
                    }
                } else {
                    console.error('monthAccountList error at dailyRecharge')
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
            let monthAccountList = await this.$store.dispatch(aTypes.getMonthAccount, [this.format(new Date()), 0])
            console.log(monthAccountList)
            console.log('=========monthAccountList========')
            if (monthAccountList && monthAccountList.length >= 0) {
                this.monthList = monthAccountList
            } else {
                console.error('monthAccountList error at dailyRecharge')
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

    .el-button{
        margin-left: 10px;
    }
    @media (max-width: 768px) {
        header .dailyPicker{
            width:100%;
            max-width: 100%;
        }
        header .dailyCX{
            margin-left:0;
            margin-bottom:10px;
        }
        header .el-button:first-child{
            margin-left:0 !important;
        }
        button.el-button.el-button--danger.el-button--small {
             margin-top: 0;
        }
    }
</style>
