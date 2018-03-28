<template>
    <el-dialog
        :title="modify?'参数设置':'新增桌'"
        width="500"
        visible
        :before-close="onClose">
        <table>
            <tr>
                <td width="26%" align="center">所属房间：</td>
                <td width="24%">
                    <el-select class="" size="small" v-model="roomId">
                        <el-option
                            label="欢乐竞技厅"
                            :value="2"/>
                        <el-option
                            label="新手练习厅"
                            :value="1"/>
                    </el-select>
                </td>
                <td width="25%" align="center">当日最大输分（游戏分值）：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="dayLocal_ext" :disabled="roomId===1">
                        <el-option
                            label="无"
                            :value="1"/>
                        <el-option
                            label="有"
                            :value="2"/>
                    </el-select>
                    <el-slider v-if="dayLocal_ext===2" v-model="dayLocal" :min="1000" :max="100000"
                               :disabled="roomId===1"></el-slider>
                </td>
            </tr>
            <tr>
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
                </td>
                <td align="center">上分设置（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="onceExchangeValue" :disabled="roomId===1">
                        <el-option v-for="item in [10, 50, 100, 500, 1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">自动提出挂机玩家：</td>
                <td>
                    <el-select class="" size="small" v-model="autoKick">
                        <el-option
                            label="否"
                            :value="0"/>
                        <el-option
                            label="1m"
                            :value="1"/>
                        <el-option
                            label="3m"
                            :value="3"/>
                        <el-option
                            label="10m"
                            :value="10"/>
                    </el-select>


                </td>
                <td align="center">桌状态：</td>
                <td>
                    <el-select class="" size="small" v-model="state" :disabled="roomId===1">
                        <el-option
                            label="开放"
                            :value="1"/>
                        <el-option
                            label="锁定"
                            :value="0"/>
                    </el-select>
                </td>
            </tr>


            <tr>
                <td align="center">最小携带（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [1, 50,100, 200,300,400, 500,1000,5000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">游戏限红（游戏分值）：</td>
                <td>
                    <el-slider v-model="gameXianHong" :min="1000" :max="20000" :disabled="roomId===1"></el-slider>

                </td>
            </tr>

            <tr>
                <td align="center">一币分值（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="exchange" :disabled="roomId===1">
                        <el-option v-for="item in [1,2, 5, 10,50,1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">最小压分（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="minYaFen" :disabled="roomId===1">
                        <el-option v-for="item in [5,50,100,500]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>


        </table>
        <h4 style="color: red; text-align: center" v-if="modify">注意： 修改 '一币分值' 后， 账目清零</h4>
        <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="onClose">取 消</el-button>
                        <el-button size="small" type="primary" @click="onSubmit()">确 定</el-button>
                     </span>
    </el-dialog>

</template>
<script>
    export default {
        props: ['init', 'modify'],
        data () {
            return {
                dayLocal_ext: 1,
                'autoKick': 10,
                'baseYaFen': 5,
                'dataTime': '2018-01-03',
                'dayLocal': -1,
                'dayYinLi': 0,
                'exchange': 50,
                'gameXianHong': 100000,
                'id': 3,
                'minGold': 1,
                'minYaFen': 10,
                'name': '',
                'onceExchangeValue': 100,
                'onlineNumber': 0,
                'orderBy': 1,
                'roomId': 2,
                'state': 1,
                'sumDeFen': 66,
                'sumYaFen': 84
            }
        },
        watch: {
            wheelLocal_ext (ext) {
                if (ext === 1) {
                    this.wheelLocal = -1
                } else {
                    this.wheelLocal = 500000
                }
            },
            dayLocal_ext (ext) {
                if (ext === 1) {
                    this.dayLocal = -1
                } else {
                    this.dayLocal = 999000
                }
            }
        },
        beforeMount () {
            if (this.modify && this.init) {
                console.log(JSON.stringify(this.init))
                Object.assign(this, this.init)
            }
        },
        methods: {
            onClose () {
                this.$emit('close')
            },
            onSubmit () {
                if (!this.name) {
                    return this.$message({
                        message: '桌名不能为空',
                        type: 'error',
                        duration: 1200
                    })
                }
                let param = JSON.parse(JSON.stringify(this.$data))
                delete param.dayLocal_ext
                this.$emit('submit', param)
            }
        }
    }
</script>
