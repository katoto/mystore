<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
            <el-input size="small" placeholder="请输入标题" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="正文">
            <!--  rows=8  -->
            <el-input size="small"  placeholder="请输入正文" type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" v-tap="{ methods:onSubmit }">更新</el-button>
            <el-button size="small" style="margin-left: 28px" v-tap="{ methods:onInitFn }" >重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { aTypes, mTypes } from '~store/htyz'
export default {
        data () {
            return {
                form: {
                    name: '',
                    desc: ''
                }
            }
        },
        watch: {},
        methods: {
            async onSubmit () {
                let result = await this.$store.dispatch(aTypes.updateNotice, [ this.form.name.toString(), this.form.desc.toString()])
                console.log(result)
                console.log('更新公告')
                if (result && result.success === true) {
                    this.$message({
                        message: '更新公告成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.form.name = ''
                        this.form.desc = ''
                    }, 1500)
                }
            },
            onInitFn () {
                this.form.name = ''
                this.form.desc = ''

                this.$message({
                    message: '重置成功',
                    type: 'success',
                    duration: 1200
                })
            }

        },
        computed: {},
        mounted () {
        }
}
</script>
<style scoped>

</style>
