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
                <td width="25%" align="center">难易程度：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="gameDiff" :disabled="roomId===1">
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
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
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
                <td align="center">最小携带（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [1, 50,100, 200,300,400, 500,1000,5000]"
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
                <td align="center">最大炮值（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="maxGunValue" :disabled="roomId===1">
                        <el-option v-for="item in [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]"
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
                <td align="center">最小炮值（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGunValue" :disabled="roomId===1">
                        <el-option v-for="item in [1, 2, 5, 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>
                <td align="center">加炮幅度（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="addstepGunValue" :disabled="roomId===1">
                        <el-option v-for="item in [1, 2, 5, 10, 50, 100]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
            </tr>

        </table>
        <h3 style="text-align: center;color: red;" v-if="modify">注意： 修改‘游戏难度’， ‘场地类型’， ‘一币分值’后， 账目清零</h3>
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
                'addstepGunValue': 50,
                'autoKick': 10,
                'exchange': 100,
                'gameDiff': 2,
                'id': 0,
                'maxGunValue': 1000,
                'minGold': 1,
                'minGunValue': 50,
                'name': '',
                'onceExchangeValue': 100,
                'onlineNumber': 0,
                'orderBy': 1,
                'roomId': 2,
                'siteType': 1,
                'state': 1,
                'sumDeFen': 35150,
                'sumSeat1DeFen': 0,
                'sumSeat1YaFen': 0,
                'sumSeat2DeFen': 0,
                'sumSeat2YaFen': 0,
                'sumSeat3DeFen': 35150,
                'sumSeat3YaFen': 34150,
                'sumSeat4DeFen': 0,
                'sumSeat4YaFen': 0,
                'sumYaFen': 34150
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
