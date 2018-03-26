<template>
    <el-dialog
        title="公共参数设置"
        width="400"
        visible
        :before-close="onClose">
        <table>
            <tr>
                <td width="26%" align="center">难易设置：</td>
                <td width="24%">
                    <el-select class="" size="small" v-model="gameDiff">
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
                <td width="25%" align="center">赔率组合：</td>
                <td width="25%">
                    <el-select class="" size="small" v-model="caiJin">
                        <el-option
                            label="多而大"
                            :value="1"/>
                        <el-option
                            label="多而小"
                            :value="2"/>
                        <el-option
                            label="少而大"
                            :value="3"/>
                        <el-option
                            label="少而小"
                            :value="4"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">押注时间：</td>
                <td>
                    <el-select class="" size="small" v-model="betTime">
                        <el-option v-for="item in [10, 15, 20, 25, 30, 35, 40]"
                                   :label="item"
                                   :value="item"/>
                    </el-select>
                </td>
                <td align="center">保单设置：</td>
                <td>
                    <el-select class="" size="small" v-model="baodanType">
                        <el-option
                            label="不打单"
                            :value="0"/>
                        <el-option
                            label="打单"
                            :value="1"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">对单时间：</td>
                <td>
                    <el-select class="" size="small" v-model="baodanTime" :disabled="baodanType !== 1">
                        <el-option
                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]"
                            :label="item"
                            :value="item"/>

                    </el-select>
                </td>
                <td align="center">出王概率：</td>
                <td>
                    <el-select class="" size="small" v-model="trump">
                        <el-option
                            v-for="item in [8,9,10,11,12,13,14,15,16,17,18,19,20]"
                            :label="item"
                            :value="item"/>

                    </el-select>
                </td>

            </tr>

        </table>
        <div style="text-align: center"><span style="color: red">注意：以上参数修改后对所有桌生效</span></div>
        <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="onClose">取 消</el-button>
                        <el-button size="small" type="primary" @click="onSubmit()">确 定</el-button>
                     </span>
    </el-dialog>

</template>
<script>
    export default {
        props: ['init'],
        data () {
            return {
                'baodanTime': 20,
                'baodanType': 0,
                'betTime': 10,
                'caiJin': 1,
                'dateTime': '2018-02-08',
                'gameDiff': 0,
                'id': 0,
                'roundCount': 19,
                'totalPlay': 0,
                'totalWin': 0,
                'trump': 8
            }
        },
        watch: {},
        beforeMount () {
            if (this.init) {
                console.log(JSON.stringify(this.init))
                Object.assign(this, this.init)
            }
        },
        methods: {
            onClose () {
                this.$emit('close')
            },
            onSubmit () {
                let param = JSON.parse(JSON.stringify(this.$data))
                this.$emit('submit', param)
            }
        }
    }
</script>
