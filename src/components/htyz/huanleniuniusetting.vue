<template>
    <el-dialog
        title="疯狂牛牛相关设置"
        width="400"
        visible
        :before-close="onClose">
        <table>
            <tr>
                <td width="50%" style="font-weight: bold">疯狂牛牛进入等级设置</td>
                <td width="50%">

                </td>

            </tr>
            <tr>
                <td align="center">等级：</td>
                <td>
                    <el-select class="" size="small" v-model="enterLimitLevel">
                        <el-option
                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]"
                            :label="'Lv.'+item"
                            :value="item"/>

                    </el-select>
                </td>

            </tr>
            <tr><td style="font-weight: bold">私人桌创建条件</td></tr>
            <tr>
                <td align="center">等级：</td>
                <td>
                    <el-select class="" size="small" v-model="level">
                        <el-option
                            v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]"
                            :label="'Lv.'+item"
                            :value="item"/>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="center">游戏携带（币）：</td>
                <td>
                    <el-input v-model="gameGold" placeholder="请输入内容" type="number"></el-input>
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
        props: ['init'],
        data () {
            return {'enterLimitLevel': 1, 'level': 2, 'gameGold': 100}
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
