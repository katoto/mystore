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
                <td width="25%" align="center">比倍开关：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="diceSwitch" :disabled="roomId===1">
                        <el-option
                            label="OFF"
                            :value="0"/>
                        <el-option
                            label="ON"
                            :value="1"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
                </td>
                <td align="center">直接比倍：</td>
                <td>
                    <el-select class="" size="small" v-model="diceDirectSwitch" :disabled="roomId===1">
                        <el-option
                            label="OFF"
                            :value="0"/>
                        <el-option
                            label="ON"
                            :value="1"/>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">自动提出挂机玩家：</td>
                <td>
                    <el-select class="" size="small" v-model="autoKickOut">
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
                <td align="center">比倍爆机（分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="diceOverflow" :disabled="roomId===1">
                        <el-option v-for="item in [5,10, 15, 20,25,50]"
                                   :label="item + '万'"
                                   :value="item*10000"/>
                    </el-select>
                </td>
            </tr>


            <tr>
                <td align="center">最小携带：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [1, 50,100, 200,300,400, 500,1000,5000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">主游戏难度：</td>
                <td>
                    <el-select class="" size="small" v-model="mainGameDiff" :disabled="roomId===1">
                        <el-option
                            label="最容易"
                            :value="0"/>
                        <el-option
                            label="容易"
                            :value="1"/>
                        <el-option
                            label="难"
                            :value="2"/>
                        <el-option
                            label="最难"
                            :value="3"/>
                        <el-option
                            label="死难"
                            :value="4"/>

                    </el-select>
                </td>

            </tr>

            <tr>
                <td align="center">单线最大押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="maxSinglelineBet" :disabled="roomId===1">
                        <el-option v-for="item in [5, 10, 20, 30, 40, 50]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">比倍游戏难度：</td>
                <td>
                    <el-select class="" size="small" v-model="diceGameDiff" :disabled="roomId===1">
                        <el-option
                            label="最容易"
                            :value="0"/>
                        <el-option
                            label="容易"
                            :value="1"/>
                        <el-option
                            label="难"
                            :value="2"/>
                        <el-option
                            label="最难"
                            :value="3"/>
                        <el-option
                            label="死难"
                            :value="4"/>

                    </el-select>
                </td>
            </tr>

            <tr>
                <td align="center">单线最小押注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="minSinglelineBet" :disabled="roomId===1">
                        <el-option v-for="item in [1, 2, 5, 10, 20]"
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
                <td align="center">单线压注（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="singlechangeScore" :disabled="roomId===1">
                        <el-option v-for="item in [3, 5, 10]"
                                   :label="item"
                                   :value="item"/>
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
                <td align="center">一币分值（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="exchange" :disabled="roomId===1">
                        <el-option v-for="item in [1,2, 5, 10,50,1000]"
                                   :label="item"
                                   :value="item"/>
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
                'allSamePhoto': 0,
                'autoKickOut': 10,
                'datetime': '',
                'diceDirectSwitch': 1,
                'diceGameDiff': 1,
                'diceGameSumDeFen': 0,
                'diceGameSumYaFen': 0,
                'diceOverflow': 200000,
                'diceSwitch': 1,
                'exchange': 50,
                'full': false,
                'id': 0,
                'mainGameDiff': 2,
                'mainGameSumDeFen': 0,
                'mainGameSumYaFen': 0,
                'maxSinglelineBet': 30,
                'minGold': 1,
                'minSinglelineBet': 1,
                'name': '3333',
                'onLineNumber': 0,
                'onceExchangeValue': 100,
                'orderBy': 1,
                'playMary': 0,
                'roomId': 2,
                'singlechangeScore': 3,
                'state': 1,
                'sumDeFen': 0,
                'sumYaFen': 0,
                'userId': -1,
                'userPhotoId': -1,
                'weaponsOrfigure': 0
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
                this.$emit('submit', param)
            }
        }
    }
</script>
