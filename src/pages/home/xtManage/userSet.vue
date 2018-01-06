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
                            <li >1234131231</li>
                            <li class="active">1234131231</li>
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
                width="500"
                :before-close="handleClose">
                    <section>
                        <div>
                            <span>用户名：</span><el-input v-model="userName" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span>权限等级：</span>
                            <el-radio-group v-model="setLevel">
                                <el-radio :label="1">系统管理员</el-radio>
                                <el-radio :label="2">主管</el-radio>
                                <el-radio :label="3">服务员</el-radio>
                            </el-radio-group>
                        </div>
                        <div>
                            <span>特殊操作：</span>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="删账单"></el-checkbox>
                                <el-checkbox label="赠送游戏币"></el-checkbox>
                                <el-checkbox label="扣除游戏币"></el-checkbox>
                                <br>
                                <el-checkbox label="游戏大厅管理" disabled></el-checkbox>
                                <el-checkbox label="推广员管理" disabled></el-checkbox>
                                <el-checkbox label="会员注册验证" disabled></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </section>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
                     </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                userName:1431231,
                setLevel: 3,
                checkList: ['赠送游戏币','扣除游戏币'],
                dialogVisible: false
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
    p,div,h2{
        margin:0;
        padding:0;
        font-size: 14px;
    }
    #userSet .userAlert ,.el-input{
        font-size: 14px;
    }
    #userSet .userAlert div{
        padding: 5px;
    }
    .el-dialog span{
        font-size: 14px;
    }
    .el-row{
        margin-top: 20px;
    }
    .bg-purple {
        background: #dde6f0;
    }
    .usershow{
        overflow-y: auto;
    }
    .grid-content {
        min-height: 300px;
        max-height: 300px;
    }
    #userSet{
        width: 99%;
        border-top: 1px solid #000;
    }
    #userSet .el-button{
        margin-top: 10px !important;
    }
    #userSet ul li{
        text-align: left;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        padding-left: 5px;
    }
    #userSet ul li:hover{
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        cursor: pointer;
    }
    #userSet ul li.active{
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }
    #userSet section div{
        font-size: 18px;
        padding: 10px;
    }
    #userSet section span{
        color: #303133;
    }
</style>
