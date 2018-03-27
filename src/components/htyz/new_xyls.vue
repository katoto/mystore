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
                    <el-select class="" size="small" v-model="roomId" :disabled="modify">
                        <el-option
                            label="欢乐竞技厅"
                            :value="2"/>
                        <el-option
                            label="新手练习厅"
                            :value="1"/>
                    </el-select>
                </td>
                <td width="25%" align="center">动物几率：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="animalDiff" :disabled="roomId===1">
                        <el-option
                            label="难"
                            :value="0"/>
                        <el-option
                            label="中"
                            :value="1"/>
                        <el-option
                            label="易"
                            :value="2"/>
                        <el-option v-for="item in [90, 91,92, 93,94,95, 96,97,98,99]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td  align="center">桌名：</td>
                <td><el-input v-model="name" placeholder="请输入内容"></el-input></td>
                <td align="center">庄闲和几率：</td>
                <td>
                    <el-select class="" size="small" v-model="zxhDiff" :disabled="roomId===1">
                        <el-option
                            label="难"
                            :value="0"/>
                        <el-option
                            label="中"
                            :value="1"/>
                        <el-option
                            label="易"
                            :value="2"/>
                        <el-option v-for="item in [90, 91,92, 93,94,95, 96,97,98,99]"
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
                <td align="center">抽/放水类型：</td>
                <td>
                    <el-select class="" size="small" v-model="waterType" :disabled="roomId===1">
                        <el-option
                            label="抽水"
                            :value="0"/>
                        <el-option
                            label="放水"
                            :value="1"/>
                    </el-select>
                    <el-slider v-model="waterValue" :max="999" show-input :disabled="roomId===1"></el-slider>
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
                <td align="center">场地类型：</td>
                <td>
                    <el-select class="" size="small" v-model="siteType" :disabled="roomId===1">
                        <el-option
                            label="大型场地"
                            :value="2"/>
                        <el-option
                            label="中型场地"
                            :value="1"/>
                        <el-option
                            label="小型场地"
                            :value="0"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">动物最大押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="maxBet" :disabled="roomId===1">
                        <el-option v-for="item in [50,100, 150, 200,250,300,400, 500,600, 700, 800, 900,1000,1500]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">一币分值（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="exchange" :disabled="roomId===1">
                        <el-option v-for="item in [1,2, 5, 10,50,1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">动物最小押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="minBet" :disabled="roomId===1">
                        <el-option v-for="item in [1,5, 10, 50, 100, 200,500]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">押注时间：</td>
                <td>
                    <el-select class="" size="small" v-model="betTime" :disabled="roomId===1">
                        <el-option v-for="item in [10,15, 20, 25,30,35]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">庄闲最大押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="max_zx" :disabled="roomId===1">
                        <el-option v-for="item in [1,5, 10, 50, 100, 200,500]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">赔率表类型：</td>
                <td>
                    <el-select class="" size="small" v-model="beilvType" :disabled="roomId===1">
                        <el-option
                            label="46倍组合"
                            :value="0"/>
                        <el-option
                            label="68倍组合"
                            :value="1"/>
                        <el-option
                            label="78倍组合"
                            :value="2"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">和最大押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="max_h" :disabled="roomId===1">
                        <el-option v-for="item in [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,1500, 2000, 2500]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">赔率表模式：</td>
                <td>
                    <el-select class="" size="small" v-model="beilvModel" :disabled="roomId===1">
                        <el-option
                            label="固定"
                            :value="0"/>
                        <el-option
                            label="打乱"
                            :value="1"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">庄闲和最小押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="min_zxh" :disabled="roomId===1">
                        <el-option v-for="item in [0, 1, 5, 10, 20, 50, 100, 200, 500, 1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

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
        </table>
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
                'animalDiff': 1,
                'autoKick': 10,
                'beilvModel': 1,
                'beilvType': 0,
                'betTime': 30,
                'exchange': 50,
                'id': 0,
                'maxBet': 500,
                'max_h': 1000,
                'max_zx': 1000,
                'minBet': 50,
                'minGold': 1,
                'min_zxh': 50,
                'name': '',
                'onceExchangeValue': 100,
                'onlineNumber': 0,
                'orderBy': 0,
                'roomId': 2,
                'siteType': 1,
                'state': 1,
                'sumDeFen': 0,
                'sumYaFen': 0,
                'sumZhxDeFen': 0,
                'sumZhxYaFen': 0,
                'waterType': 0,
                'waterValue': 0,
                'zxhDiff': 1
            }
        },
        beforeMount () {
            if (this.modify && this.init) {
                console.log(this.init)
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
                this.$emit('submit', param)
            }
        }
    }
</script>
