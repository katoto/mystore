<template>
    <el-container>
        <el-main>
            <p class="loginTitle">后台管理系统登陆</p>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model.number="ruleForm2.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import {aTypes} from '../store/user'
export default {
    data () {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'))
            }
            setTimeout(() => {
                //  处理规则
                if (value === '') {
                }
                callback()
            }, 10)
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    //  处理字符等
                }
            }
            callback()
        }
        return {
            ruleForm2: {
                pass: '',
                name: ''
            },
            rules2: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                name: [{ validator: checkName, trigger: 'blur' }]
            }
        }
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    (async () => {
                        try {
                            await this.$store.dispatch(aTypes.login, this.ruleForm2)
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                duration: 1200
                            })
                            this.$router.replace({path: '/home/xtManage/xtSet'})
                        } catch (e) {
                            this.$message({
                                message: e.message,
                                type: 'error',
                                duration: 1200
                            })
                        }
                    })()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>
<style scoped>
.el-main {
  color: #333;
  line-height: 60px;
  font-size: 14px;
  max-width: 600px;
  margin: 80px auto;
}
.el-main .loginTitle {
  text-align: center;
  font-size: 18px;
}
</style>
