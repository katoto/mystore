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
                            <li v-for="item in userList" @click="() => { current = item.id ; currentList = item }" :class="{active: item.id === current}" :key="item.username">{{item.username}}</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="15">
                    <section class="grid-content bg-purple" v-if="currInfo">
                        <div>
                            <strong>用户名称 : </strong>
                            <span>{{currInfo.username}}</span>
                        </div>
                        <div>
                            <strong>权限等级 : </strong>
                            <span>{{currAuthLevel}}</span>
                        </div>
                        <div>
                            <strong>特殊操作 : </strong>
                            <span>{{specialop}}</span>
                        </div>
                        <div>
                            <strong>注册时间 : </strong>
                            <span>{{currInfo.datetime}}</span>
                        </div>
                        <div>
                            <strong>最后一次操作 : </strong>
                            <span>{{currInfo.lastOperate}}</span>
                        </div>
                    </section>
                </el-col>
            </el-row>
        </div>
        <div class="userAlert">
            <el-dialog
                :title=userDialogName
                :visible.sync="dialogVisible"
                width="500"
                :before-close="handleClose">
                    <section>
                        <div>
                            <span>用户名：</span><el-input v-model="userName" placeholder="请输入内容" :disabled="isUserName"></el-input>
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
                            <el-checkbox-group v-model="checkList" :disabled="isCheck">
                                <el-checkbox label="0">删账单</el-checkbox>
                                <el-checkbox label="1">赠送游戏币</el-checkbox>
                                <el-checkbox label="2">扣除游戏币</el-checkbox>
                                <br>
                                <el-checkbox label="3">游戏大厅管理</el-checkbox>
                                <el-checkbox label="4">推广员管理</el-checkbox>
                                <el-checkbox label="5">会员注册验证</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </section>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="doAddUser()">确 定</el-button>
                     </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {actionTypes as aTypes} from '~store/xtManager'
    export default {
        data () {
            return {
                isUserName: false,
                currentList: null,
                userDialogName: '新增用户',
                isCheck: true,
                userList: [],
                current: 0,
                userName: '',
                setLevel: 3,
                checkList: [],
                dialogVisible: false,
                checkListNow: [],

                isAddUserFn: true
            }
        },
        watch: {
            current (current) {
                if (current) {

                }
            },
            setLevel (lev) {
                if (lev !== undefined && lev !== null) {
                    switch (Number(lev)) {
                    case 1:
                        this.isCheck = false
                        this.checkList = ['0', '1', '2', '3', '4', '5']
                        break
                    case 2:
                        this.isCheck = false
                        if (this.userDialogName === '新增用户') {
                            this.checkList = []
                        } else {
                            this.checkList = this.checkListNow
                        }
                        ;break
                    case 3:
                        this.isCheck = true
                        this.checkList = []
                        break
                    }
                }
            }
        },
        methods: {
            handleClose (done) {
                this.dialogVisible = false
            },
            delUser () {
                // eslint-disable-next-line
                if (!this.current) {
                    this.$message({
                        message: '请选择用户',
                        type: 'error',
                        duration: 1200
                    })
                } else {
                    this.$confirm('是否删除选中用户', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        try {
                            let result = await this.$store.dispatch(aTypes.deleteAdmin, [this.current])
                            if (!result.success) {
                                this.$message({
                                    type: 'error',
                                    message: result.message,
                                    duration: 1200
                                })
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration: 1200
                                })
                                this.userList = await this.$store.dispatch(aTypes.adminList)
                            }
                        } catch (e) {
                            this.$message({
                                type: 'error',
                                message: '删除失败!',
                                duration: 1200
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                            duration: 1200
                        })
                    })
                }
            },
            addUser () {
                this.dialogVisible = true
                this.userDialogName = '新增用户'
                this.isUserName = false

                this.isAddUserFn = true
            },
            async doAddUser () {
                if (this.isAddUserFn) {
                    let cl = [false, false, false, false, false, false]
                    this.checkList.forEach(e => {
                        cl[e] = true
                    })
                    if (this.userName === '') {
                        this.$message({
                            message: '请输入用户名',
                            type: 'error',
                            duration: 1200
                        })
                        return false
                    }

                    let args = [this.userName, Number(this.setLevel), ...cl]
                    let result = await this.$store.dispatch(aTypes.addAdmin, args)
                    if (!result.success) {
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration: 1200
                        })
                    } else {
                        this.userList = await this.$store.dispatch(aTypes.adminList)
                    }
                    this.dialogVisible = false
                } else {
                    // 修改用户 设置
                    let cl = [false, false, false, false, false, false]
                    this.checkList.forEach(e => {
                        cl[e] = true
                    })

                    let args = [Number(this.current), Number(this.setLevel), ...cl]
                    let result = await this.$store.dispatch(aTypes.updateAuth, args)
                    if (!result.success) {
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration: 1200
                        })
                    } else {
                        this.userList = await this.$store.dispatch(aTypes.adminList)
                        this.$message({
                            message: '权限设置成功',
                            type: 'success',
                            duration: 1200
                        })
                    }
                    this.dialogVisible = false
                }
            },
            async qxSet () {
                console.log('====55======')
                console.log(this.currentList)
                if (!this.current) {
                    this.$message({
                        message: '请选择用户',
                        type: 'error',
                        duration: 1200
                    })
                } else {
                    this.userDialogName = '权限设置'
                    // 用户名不可点击
                    this.isUserName = true
                    // 展现当前的msg
                    let newOptionList = []
                    if (this.currentList) {
                        this.userName = this.currentList.username
                        if (this.currentList.authDeleteBill) {
                            newOptionList.push('0')
                        }
                        if (this.currentList.authGiveGold) {
                            newOptionList.push('1')
                        }

                        if (this.currentList.authMinusGold) {
                            newOptionList.push('2')
                        }
                        if (this.currentList.authHallAdmin) {
                            newOptionList.push('3')
                        }
                        if (this.currentList.authPromoter) {
                            newOptionList.push('4')
                        }
                        if (this.currentList.authUserRegist) {
                            newOptionList.push('5')
                        }
                        //                        权限类型
                        this.setLevel = Number(this.currentList.type)
                        this.checkListNow = newOptionList
                    }
                    this.dialogVisible = true
                    //                    this.doAddUser( true , newOptionList  )
                    this.isAddUserFn = false
                }
            },
            async resetPass () {
                if (!this.current) {
                    this.$message({
                        message: '请选择用户',
                        type: 'error',
                        duration: 1200
                    })
                } else {
                    let result = await this.$store.dispatch(aTypes.resetPassword, [Number(this.current)])
                    if (!result.success) {
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration: 1200
                        })
                    } else {
                        this.$message({
                            message: '重置密码成功',
                            type: 'success',
                            duration: 1200
                        })
                        setTimeout(async () => {
                            this.userList = await this.$store.dispatch(aTypes.adminList)
                        }, 1200)
                    }
                }
            }

        },
        computed: {
            currInfo () {
                if (this.userList.length) {
                    let currInfo = null
                    this.userList.some((info) => {
                        if (info.id === this.current) {
                            return currInfo = info
                        }
                    })
                    return currInfo
                }
            },
            specialop () {
                let result = []
                if (this.currInfo) {
                    if (this.currInfo.authDeleteBill) {
                        result.push('删账单')
                    }
                    if (this.currInfo.authGiveGold) {
                        result.push('赠送游戏币')
                    }
                    if (this.currInfo.authHallAdmin) {
                        result.push('游戏大厅管理')
                    }
                    if (this.currInfo.authMinusGold) {
                        result.push('扣除游戏币')
                    }
                    if (this.currInfo.authPromoter) {
                        result.push('推广员管理')
                    }
                    if (this.currInfo.authUserRegist) {
                        result.push('会员注册验证')
                    }
                }
                return result.join(',')
            },
            currAuthLevel () {
                if (this.currInfo) {
                    switch (this.currInfo.type) {
                    case 1:
                        return '系统管理员'
                    case 2:
                        return '主管'
                    case 3:
                        return '服务员'
                    }
                }
            }
        },
        async mounted () {
            // 去用户list
            this.userList = await this.$store.dispatch(aTypes.adminList, [])
            console.log(this.userList)
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
    .el-dialog{
        width:90%;
    }
    @media (max-width: 768px) {
        .el-button+.el-button{
            margin-left:4px;
        }
        #userSet .el-button{
            padding:9px 12px;
        }
        #userSet ul li{
            font-size:12px;
        }
        .grid-content strong,.grid-content span{
            font-size:14px;
        }

        .el-checkbox{
            display: block;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-radio+.el-radio {
            margin-left: 20px;
        }
        .el-message-box{
            width:80%;
        }
    }
</style>
