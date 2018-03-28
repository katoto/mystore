<template>
    <el-dialog
        :title="modify?'参数设置':'新增桌'"
        width="500"
        visible
        :before-close="onClose">
        <div style="text-align: center">
            所属模式：<el-select class="" size="small" v-model="modeId">
            <el-option
                label="经典牛牛"
                :value="1"/>
            <el-option
                label="疯狂牛牛"
                :value="2"/>
            <el-option
                label="街机牛牛"
                :value="3"/>
        </el-select>
        </div>

        <hr/>
        <table v-if="modeId === 1">
            <tr>
                <td width="26%" align="center">类型：</td>
                <td width="24%">
                    <el-select class="" size="small" v-model="roomId">
                        <el-option
                            label="竞技桌"
                            :value="2"/>
                        <el-option
                            label="练习桌"
                            :value="1"/>
                    </el-select>
                </td>
                <td width="25%" align="center">下注倍数：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="multiple" :disabled="roomId===1">
                        <el-option
                            label="1、2"
                            :value="0"/>
                        <el-option
                            label="1、2、3"
                            :value="1"/>
                        <el-option
                            label="1、2、3、4"
                            :value="2"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
                </td>
                <td align="center">自动提出挂机玩家：</td>
                <td>
                    <el-select class="" size="small" v-model="autoKickOut">
                        <el-option
                            label="关闭"
                            :value="0"/>
                        <el-option
                            label="1局"
                            :value="1"/>
                        <el-option
                            label="3局"
                            :value="3"/>
                        <el-option
                            label="5局"
                            :value="5"/>
                        <el-option
                            label="7局"
                            :value="7"/>
                    </el-select>


                </td>
            </tr>



            <tr>
                <td align="center">最小携带（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [10, 50,100, 200, 500,1000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>

                <td align="center">底分（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="baseYaFen" :disabled="roomId===1">
                        <el-option v-for="item in [10, 20, 50,100, 200, 500]"
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
        <table v-if="modeId === 2">
            <tr>
                <td width="26%" align="center">类型：</td>
                <td width="24%">
                    <el-select class="" size="small" v-model="roomId">
                        <el-option
                            label="竞技桌"
                            :value="2"/>
                        <el-option
                            label="练习桌"
                            :value="1"/>
                    </el-select>
                </td>
                <td width="25%" align="center">抽水比例：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="pondWaterValue" :disabled="roomId===1">
                        <el-option
                            label="1%"
                            :value="1"/>
                        <el-option
                            label="2%"
                            :value="2"/>
                        <el-option
                            label="3%"
                            :value="3"/>
                        <el-option
                            label="4%"
                            :value="4"/>
                        <el-option
                            label="5%"
                            :value="5"/>
                        <el-option
                            label="不抽水"
                            :value="0"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
                </td>
                <td align="center">自动提出挂机玩家：</td>
                <td>
                    <el-select class="" size="small" v-model="autoKickOut">
                        <el-option
                            label="关闭"
                            :value="0"/>
                        <el-option
                            label="1局"
                            :value="1"/>
                        <el-option
                            label="3局"
                            :value="3"/>
                        <el-option
                            label="5局"
                            :value="5"/>
                        <el-option
                            label="7局"
                            :value="7"/>
                    </el-select>


                </td>
            </tr>



            <tr>
                <td align="center">最小携带（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [50,100, 200, 500,1000, 2000, 5000]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>

                </td>

                <td align="center">底分（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [2, 5, 10, 20, 50,100, 200, 500]"
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
        <table v-if="modeId === 3">
            <tr>
                <td width="26%" align="center">类型：</td>
                <td width="24%">
                    <el-select class="" size="small" v-model="roomId">
                        <el-option
                            label="竞技桌"
                            :value="2"/>
                        <el-option
                            label="练习桌"
                            :value="1"/>
                    </el-select>
                </td>
                <td width="25%" align="center">奖池抽水比例：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="pondWaterValue" :disabled="roomId===1">
                        <el-option
                            label="1%"
                            :value="1"/>
                        <el-option
                            label="2%"
                            :value="2"/>
                        <el-option
                            label="3%"
                            :value="3"/>
                        <el-option
                            label="4%"
                            :value="4"/>
                        <el-option
                            label="5%"
                            :value="5"/>
                        <el-option
                            label="不抽水"
                            :value="0"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">桌名：</td>
                <td>
                    <el-input v-model="name" placeholder="请输入内容"></el-input>
                </td>

                <td width="25%" align="center">系统抽水比例：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="waterValue" :disabled="roomId===1">
                        <el-option
                            label="1%"
                            :value="1"/>
                        <el-option
                            label="2%"
                            :value="2"/>
                        <el-option
                            label="3%"
                            :value="3"/>
                        <el-option
                            label="4%"
                            :value="4"/>
                        <el-option
                            label="5%"
                            :value="5"/>
                        <el-option
                            label="不抽水"
                            :value="0"/>
                    </el-select>
                </td>



            </tr>



            <tr>
                <td align="center">自动提出挂机玩家：</td>
                <td>
                    <el-select class="" size="small" v-model="autoKickOut">
                        <el-option
                            label="关闭"
                            :value="0"/>
                        <el-option
                            label="1局"
                            :value="1"/>
                        <el-option
                            label="3局"
                            :value="3"/>
                        <el-option
                            label="5局"
                            :value="5"/>
                        <el-option
                            label="7局"
                            :value="7"/>
                    </el-select>


                </td>

                <td align="center">上庄下限（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="dealerLimit" :disabled="roomId===1">
                        <el-option v-for="item in [1,2, 5, 10,20, 50, 100]"
                                   :label="item+'万'"
                                   :value="item*10000"/>
                    </el-select>

                </td>


            </tr>

            <tr>

                <td align="center">最小携带（游戏币）：</td>
                <td>
                    <el-select class="" size="small" v-model="minGold" :disabled="roomId===1">
                        <el-option v-for="item in [10, 20, 50,100, 200, 500,1000]"
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
                <td align="center">单项下注上限（游戏分值）：</td>
                <td>
                    <el-select class="" size="small" v-model="sMaxYaFen" :disabled="roomId===1">
                        <el-option v-for="item in [1000, 2000, 5000,10000, 20000, 50000]"
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
                'autoKickOut': 7,
                'baseYaFen': 0,
                'datetime': '',
                'dealerLimit': 500000,
                'exchange': 100,
                'id': 0,
                'maxUser': 20,
                'minGold': 10,
                'modeId': 3,
                'multiple': 0,
                'name': '',
                'onlineNumber': 0,
                'orderBy': 1,
                'password': '',
                'pondWaterValue': 2,
                'roomId': 2,
                'sMaxYaFen': 10000,
                'seatLimit': 0,
                'state': 1,
                'sumDeFen': 0,
                'sumYaFen': 0,
                'userId': 0,
                'waterValue': 3
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
