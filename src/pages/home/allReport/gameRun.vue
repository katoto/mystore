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
            <span class="dailyCX">查询范围：</span>
            <el-select class="checkID userSel" size="small" v-model="checkVal" placeholder="请选择查询类型">
                <el-option
                    v-for="item in checkOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <span class="dailyCX">游戏类型：</span>
            <el-select class="checkID userSel" size="small" v-model="gameStyleVal" placeholder="请选择游戏类型">
                <el-option
                    v-for="item in gameStyleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-button size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
            <el-button size="small" type="danger" disabled>删除</el-button>
            <el-button size="small" type="success" v-tap="{ methods:exportExcel }">导出</el-button>
        </header>
        <section>
            <el-table id="out-table"
                :data="gameList"
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
                    prop="allPlay"
                    label="当日总押（币）"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="allGet"
                    label="当日总得（币）">
                </el-table-column>
                <el-table-column
                    prop="allGain"
                    label="当日盈利（元宝）">
                </el-table-column>
            </el-table>
        </section>

        <!-- 删除确认弹窗 -->
        <el-dialog
            title="月份账目删除"
            :visible.sync="dialogVisible"
            width="35%">
            <span>确定删除该月份游戏运行统计( {{ selTime }}月 )？</span>
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
                checkOption: [
                    {
                        label: '直属推广员',
                        value: 0,
                        disabled: true
                    },
                    {
                        label: '直属会员',
                        value: 1,
                        disabled: true
                    },
                    {
                        label: '总计',
                        value: -1
                    }],
                checkVal: -1,

                gameStyleOption: [
                    {
                        label: '所有游戏',
                        value: -1
                    },
                    {
                        label: '幸运六狮',
                        value: 1
                    },
                    {
                        label: '捕鱼摇钱树',
                        value: 2
                    },
                    {
                        label: '单挑',
                        value: 3
                    },
                    {
                        label: '万炮捕鱼',
                        value: 4
                    },
                    {
                        label: '缺一门',
                        value: 5
                    },
                    {
                        label: '欢乐牛牛',
                        value: 6
                    },
                    {
                        label: '水浒传',
                        value: 7
                    },
                    {
                        label: '千炮专版',
                        value: 8
                    }],
                gameStyleVal: -1,

                gameList: [{
                    mainSumYaGold: 0,
                    diceResult: 0,
                    mainSumDeGold: 0,
                    allGain: 0,
                    allGet: 0,
                    allPlay: 0,
                    mainResult: 0,
                    date: '2017-12-01',
                    sumRobotYa: 0,
                    diceSumDeGold: 0,
                    sumRobotDe: 0,
                    diceSumYaGold: 0
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
                //  暂无
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
                let gameRunList = await this.$store.dispatch(aTypes.getRunStatistics, [this.selTime, Number(this.gameStyleVal), -1 ])
                console.log(gameRunList)
                console.log('=========gameRunList========')
                if (gameRunList && gameRunList.length >= 0) {
                    this.gameList = gameRunList
                    if (showTips) {
                        this.$message({
                            message: '列表已更新',
                            type: 'success',
                            duration: 1200
                        })
                    }
                } else {
                    console.error('gameRunList error at dailyRecharge')
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
            let gameRunList = await this.$store.dispatch(aTypes.getRunStatistics, [this.format(new Date()), -1, -1])
            console.log(gameRunList)
            console.log('=========gameRunList========')
            if (gameRunList && gameRunList.length >= 0) {
                this.gameList = gameRunList
            } else {
                console.error('gameRunList error at dailyRecharge')
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


    .checkID{
        max-width: 250px;
    }
    header .userSel{
        max-width: 130px ;
        float: left;
        margin-left: 10px;
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
        header .userSel{
            max-width: 100%;
            margin-bottom:10px;
        }
    }
</style>
