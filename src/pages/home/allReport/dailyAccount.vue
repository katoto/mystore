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
            <el-select class="checkID userSel" size="small" v-model="checkAccountVal" placeholder="请选择查询类型">
                <el-option
                    v-for="item in dailyAccountOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button style="margin-left: 18px" size="small" type="primary" v-tap="{ methods:getMsg }">查询</el-button>
        </header>
        <section id="dailyAccP">
            <el-table
                :data="dailyList"
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
                    prop="authority"
                    label="权限"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="operator"
                    label="操作员账号">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="操作类型">
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="会员账号">
                </el-table-column>
                <el-table-column
                    prop="gameGold"
                    label="游戏币">
                </el-table-column>
                <el-table-column
                    prop="changeValue"
                    label="数目（元宝）">
                </el-table-column>
            </el-table>
            <div>
                <span>总计：</span>
                <p>充值 {{ tableAcc_cz_1 }} 游戏币 共 {{ tableAcc_cz_2 }} 元宝</p>
                <p>兑换 {{ tableAcc_dh_1 }} 游戏币 共 {{ tableAcc_dh_2 }} 元宝</p>
                <p>赠送 {{ tableAcc_zs_1 }} 游戏币 价值 {{ tableAcc_zs_2 }} 元宝</p>
                <p>扣除 {{ tableAcc_kc_1 }} 游戏币 价值 {{ tableAcc_kc_2 }} 元宝</p>
                <p>删除 {{ tableAcc_sc_1 }} 游戏币 价值 {{ tableAcc_sc_2 }} 元宝</p>
                <p>平板租借 共收取租金 {{ tableAcc_pbzj }} 元宝</p>
                <p>平板归还 共退还租金 {{ tableAcc_pbgh }} 元宝</p>
            </div>
        </section>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/allReport'
    export default {
        data () {
            return {
                tableAcc_cz_1: 0,
                tableAcc_cz_2: 0,
                tableAcc_dh_1: 0,
                tableAcc_dh_2: 0,
                tableAcc_zs_1: 0,
                tableAcc_zs_2: 0,

                tableAcc_kc_1: 0,
                tableAcc_kc_2: 0,
                tableAcc_sc_1: 0,
                tableAcc_sc_2: 0,

                tableAcc_pbzj: 0,
                tableAcc_pbgh: 0,

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
                },

                dailyAccountOption: [
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
                checkAccountVal: 2,

                dailyList: [{
                    authority: '超级管理员',
                    changeValue: 3000,
                    type: '兑奖',
                    date: '2018-01-27 21:43:49',
                    user: 'aaaaaa',
                    gameGold: 3000,
                    operator: 'admin'
                }]
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
                let dailyAccountList = await this.$store.dispatch(aTypes.getDayAccount, [this.selTime, Number(this.checkAccountVal)])
                console.log(dailyAccountList)
                console.log('=========dailyAccountList========')
                if (dailyAccountList && dailyAccountList.length >= 0) {
                    this.dailyList = dailyAccountList

                    this.dailyList.forEach((item) => {
                        if (item.type) {
                            if (item.type === '充值') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_cz_1 = Number(this.tableAcc_cz_1) + Number(item.gameGold)
                                    this.tableAcc_cz_2 = Number(this.tableAcc_cz_2) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '兑换') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_dh_1 = Number(this.tableAcc_dh_1) + Number(item.gameGold)
                                    this.tableAcc_dh_2 = Number(this.tableAcc_dh_2) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '赠送') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_zs_1 = Number(this.tableAcc_zs_1) + Number(item.gameGold)
                                    this.tableAcc_zs_2 = Number(this.tableAcc_zs_2) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '扣除') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_kc_1 = Number(this.tableAcc_kc_1) + Number(item.gameGold)
                                    this.tableAcc_kc_2 = Number(this.tableAcc_kc_2) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '删除') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_sc_1 = Number(this.tableAcc_sc_1) + Number(item.gameGold)
                                    this.tableAcc_sc_2 = Number(this.tableAcc_sc_2) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '平板租借') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_pbzj = Number(this.tableAcc_pbzj) + Number(item.changeValue)
                                }
                            }
                            if (item.type === '平板归还') {
                                if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                    this.tableAcc_pbgh = Number(this.tableAcc_pbgh) + Number(item.changeValue)
                                }
                            }
                        }
                    })

                    this.$message({
                        message: '列表已更新',
                        type: 'success',
                        duration: 1200
                    })
                } else {
                    console.error('dailyAccountList error at dailyRecharge')
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
            // 获取列表
            this.selTime = this.format(new Date())
            let dailyAccountList = await this.$store.dispatch(aTypes.getDayAccount, [this.format(new Date()), 2])
            console.log(dailyAccountList)
            console.log('=========dailyAccountList========')
            if (dailyAccountList && dailyAccountList.length >= 0) {
                this.dailyList = dailyAccountList

                this.dailyList.forEach((item) => {
                    if (item.type) {
                        if (item.type === '充值') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_cz_1 = Number(this.tableAcc_cz_1) + Number(item.gameGold)
                                this.tableAcc_cz_2 = Number(this.tableAcc_cz_2) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '兑换') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_dh_1 = Number(this.tableAcc_dh_1) + Number(item.gameGold)
                                this.tableAcc_dh_2 = Number(this.tableAcc_dh_2) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '赠送') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_zs_1 = Number(this.tableAcc_zs_1) + Number(item.gameGold)
                                this.tableAcc_zs_2 = Number(this.tableAcc_zs_2) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '扣除') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_kc_1 = Number(this.tableAcc_kc_1) + Number(item.gameGold)
                                this.tableAcc_kc_2 = Number(this.tableAcc_kc_2) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '删除') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_sc_1 = Number(this.tableAcc_sc_1) + Number(item.gameGold)
                                this.tableAcc_sc_2 = Number(this.tableAcc_sc_2) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '平板租借') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_pbzj = Number(this.tableAcc_pbzj) + Number(item.changeValue)
                            }
                        }
                        if (item.type === '平板归还') {
                            if (item.gameGold !== undefined && item.changeValue !== undefined) {
                                this.tableAcc_pbgh = Number(this.tableAcc_pbgh) + Number(item.changeValue)
                            }
                        }
                    }
                })
            } else {
                console.error('dailyAccountList error at dailyRecharge')
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

    #dailyAccP p{
        margin-top: 10px;
        padding-left: 35px;
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
