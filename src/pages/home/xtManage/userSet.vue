<template>
    <div id="userSet">
        <el-button size="small"  @click="addUser">新增用户</el-button>
        <el-button  size="small" @click="delUser">删除用户</el-button>
        <el-button size="small" @click="qxSet">权限设置</el-button>
        <el-button  size="small" @click="resetPass">重置密码</el-button>
        <div style="height: 100%">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="usershow grid-content bg-purple">
                        <ul>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                            <li>1234131231</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="15">
                    <section class="grid-content bg-purple">
                        <div>
                            <strong>用户名称 : </strong>
                            <span>33333333</span>
                        </div>
                        <div>
                            <strong>权限等级 : </strong>
                            <span>33333333</span>
                        </div>
                        <div>
                            <strong>特殊操作 : </strong>
                            <span>33333333</span>
                        </div>
                        <div>
                            <strong>注册时间 : </strong>
                            <span>33333333</span>
                        </div>
                        <div>
                            <strong>最后一次操作 : </strong>
                            <span>33333333</span>
                        </div>
                    </section>
                </el-col>
            </el-row>
        </div>
        <div class="userAlert">
            <el-dialog
                title="新增用户"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                    <section>
                        <div>
                            用户名：<el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            权限等级：
                            <el-radio-group v-model="radio2">
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </div>
                        <div>
                            特殊操作：
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="复选框 A"></el-checkbox>
                                <el-checkbox label="复选框 B"></el-checkbox>
                                <el-checkbox label="复选框 C"></el-checkbox>
                                <el-checkbox label="禁用" disabled></el-checkbox>
                                <el-checkbox label="选中且禁用" disabled></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </section>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                     </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                input:1,
                radio2: 3,
                checkList: ['选中且禁用','复选框 A'],
                title: '',
                dialogVisible: true
            }
        },
        watch: {},
        methods: {
            handleClose(done) {
                this.dialogVisible = false;
            },
            delUser() {
                if( 0 ){
                    this.$message({
                        message: '请选择用户',
                        type: 'error',
                        duration:1200
                    });
                }else{
                    this.$confirm('是否删除选中用户', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration:1200
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                            duration:1200
                        });
                    });
                }

            },
            addUser() {
                this.dialogVisible = true;
            },
            qxSet() {
                this.$message({
                    message: '请选择用户',
                    type: 'error',
                    duration:1200
                });
            },
            resetPass() {
                this.$message({
                    message: '请选择用户',
                    type: 'error',
                    duration:1200
                });
            }
        },
        computed: {},
        mounted () {

        }
    }
</script>
<style scoped>
    #userSet .userAlert{
        font-size: 14px;
    }
    .el-row{
        margin-top: 20px;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .usershow{
        overflow-y: auto;
    }
    .grid-content {
        min-height: 300px;
        max-height: 300px;
    }
    #userSet{
        background-color: #21e6af;
        width: 80%;
    }
    #userSet ul li{
        text-align: left;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
    }
    #userSet ul li:hover{
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        cursor: pointer;
    }
    #userSet section div{
        font-size: 18px;
        padding: 10px;
    }
    #userSet section span{
        color: #303133;
    }
</style>
