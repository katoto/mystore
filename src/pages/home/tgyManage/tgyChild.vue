<template>
    <div class="tgyChild">
        <div class="overflow">
            <div class="fl overflow tgyChild-findBox">
                 <p>查找：</p>
                <el-select size="small" v-model="tgyvalue" placeholder="请选择">
                    <el-option
                            v-for="item in tgyOptions"
                            :key="item.tgyid"
                            :label="item.name"
                            :value="item.tgyid">
                    </el-option>
                </el-select>
                <el-input size="small" v-model="tgySearch" placeholder="请输入内容"></el-input>
                <el-button size="small" v-tap="{ methods:setPromoter }" type="primary">查找</el-button>
                <el-button size="small" v-tap="{ methods:initSearch }" type="danger">重置</el-button>
            </div>
            <div class="fr overflow tgyChild-btnBox">
                <el-button size="small" v-tap="{ methods:beforeAddPromoter }" >新增</el-button>
                <el-button size="small" :disabled=currStateStop v-tap="{ methods:beforeDisablePromoter }" >禁用</el-button>
                <el-button size="small" :disabled=currStateActive v-tap="{ methods:beforeEnablePromoter }" >解禁</el-button>
                <el-button size="small" :disabled=!selTgyVal v-tap="{ methods:beforeDelPromoter }" type="danger">删除</el-button>
                <el-button size="small" :disabled=!selTgyVal v-tap="{ methods:beforeDownPromoter }" >下级调整</el-button>
                <el-button size="small" :disabled=!selTgyVal v-tap="{ methods:beforeResetPWD }"  >密码重置</el-button>
                <el-button size="small" :disabled=!selTgyVal @click="remarkVisible=true">备注修改</el-button>
            </div>
        </div>
        <div class="tgyMain">
            <el-table
                    ref="singleTable"
                    :data="tgyMainList"
                    highlight-current-row
                    height="250"
                    size="small"
                    border
                    @cell-click="tgyListClick"
                    style="width: 100%">
                <el-table-column
                        prop="username"
                        label="账号"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="gold"
                        label="游戏币"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="权限"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="childrenPromoterNum"
                        label="直属推广数"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="childrenUserNum"
                        label="直属会员数"
                        width="90"
                >
                </el-table-column>
                <el-table-column
                        prop="parentName"
                        label="所属上级">
                </el-table-column>
                <el-table-column
                        prop="payMoney"
                        label="申请充值数">
                </el-table-column>
                <el-table-column
                    prop="expiryNum"
                    label="申请兑奖数">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="新增时间">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
            </el-table>
            <div class="overflow">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNumber"
                    :page-size="pageSize"
                    layout=" prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
                <p class="fr gty-tips">
                    推广员携带（币）：{{ globalGold }}  总数{{ globalNum }}
                </p>
            </div>
        </div>
        <hr>
        <div class="tgyChild2" >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tgyChild-nav">
                <el-tab-pane label="推广员充值" :disabled=!selTgyVal name="tgyChildCz"></el-tab-pane>
                <el-tab-pane label="推广员兑换" :disabled=!selTgyVal name="tgyChildDh"></el-tab-pane>
                <el-tab-pane label="充值查询" :disabled=!selTgyVal name="tgyChildCzcx" ></el-tab-pane>
                <el-tab-pane label="兑奖查询" :disabled=!selTgyVal name="tgyChildDjcx" ></el-tab-pane>
                <el-tab-pane label="游玩记录" :disabled=!selTgyVal name="tgyChildYwjl" ></el-tab-pane>
                <el-tab-pane label="推广员登录IP记录" :disabled=!selTgyVal name="tgyChildIpjl" ></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </div>

        <!--  重置密码弹窗 -->
        <el-dialog
            title="密码重置"
            :visible.sync="dialogVisible"
            width="35%">
            <span>确定重置该推广员( {{ dialogName }} )的密码？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:resetPromoterPwd }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!--  备注修改弹窗 -->
        <el-dialog
            title="备注修改"
            :visible.sync="remarkVisible"
            width="35%">
            <span>备注：</span>
            <el-input v-model="remarkVal" ></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="remarkVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:updatePromoterRemark }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!--  新增 推广员 弹窗  -->
        <el-dialog
            title="新增推广员"
            :visible.sync="promoterVisible"
            width="35%">
            <span>* 账号：</span><el-input v-model="promoterVal1" ></el-input>
            <span>* 注册码：</span><el-input v-model="promoterVal2" ></el-input>
            <span>备注：</span><el-input v-model="promoterVal3" ></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="promoterVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods:addPromoter }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 删除 推广员 弹窗  -->
        <el-dialog
            title="删除推广员"
            :visible.sync="delVisible"
            width="35%">
            <span>确认删除该推广员（{{ delName }}）?</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: deletePromoter }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 禁用 推广员 弹窗  -->
        <el-dialog
            title="禁用推广员"
            :visible.sync="disableVisible"
            width="35%">
            <span>确认禁用该推广员（{{ disableName }}）?</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="disableVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: disablePromoter }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 解禁 推广员 弹窗  -->
        <el-dialog
            title="解禁推广员"
            :visible.sync="enableVisible"
            width="35%">
            <span>确认解禁该推广员（{{ enableName }}）?</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="enableVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: enablePromoter }"  >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 下级调整  弹窗  center  两个按钮居中-->
        <el-dialog
            title="下级调整"
            :visible.sync="downVisible"
            width="35%">
            <p style="text-align: center;margin-bottom: 20px">将直属推广员、直属会员 ({{ downPromoterName }}) 调整至</p>
            <div id="downStyle">
                <el-select size="small" v-model="downNameValue" placeholder="请选择">
                    <el-option
                        v-for="item in downNameOptions"
                        :key="item.id"
                        :label="item.username"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <span slot="footer" class="dialog-footer">
            <el-button @click="downVisible = false">取 消</el-button>
            <el-button type="primary" v-tap="{ methods: downPromoter }"  >确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    import { actionTypes, mutationTypes } from '~store/tgyManager'
    export default {
        methods: {
            async beforeDownPromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (this.selTgyVal.username) {
                    this.downPromoterName = this.selTgyVal.username
                }
                let promoter = await this.$store.dispatch(actionTypes.parentPromoterList, [Number(this.selTgyVal.id)])
                console.log('===下级调整之前==')
                console.log(promoter)
                if (promoter && promoter.length >= 0) {
                    this.downNameOptions = promoter
                }
                this.downVisible = true
            },
            async downPromoter () {
                if (this.downNameValue === '') {
                    this.$message({
                        message: '请选择下级',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                console.log('===下级调整===')
                let promoter = await this.$store.dispatch(actionTypes.updateChildrenParent, [Number(this.selTgyVal.id), Number(this.downNameValue)])
                console.log(promoter)
                if (promoter && promoter.success === true) {
                    this.$message({
                        message: '调整成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.downVisible = false
                    }, 1200)

                    // 更新列表
                }
            },

            beforeEnablePromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (this.selTgyVal.username) {
                    this.enableName = this.selTgyVal.username
                }
                this.enableVisible = true
            },
            async enablePromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let promoter = await this.$store.dispatch(actionTypes.enablePromoter, [Number(this.selTgyVal.id)])
                console.log('禁用用户Msg')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '禁用推广员成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 900)
                } else {
                    this.$message({
                        message: promoter.message,
                        type: 'error',
                        duration: 1200
                    })
                }
                setTimeout(() => {
                    this.enableVisible = false
                }, 1300)
            },
            beforeDisablePromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (this.selTgyVal.username) {
                    this.disableName = this.selTgyVal.username
                }
                this.disableVisible = true
            },
            async disablePromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let promoter = await this.$store.dispatch(actionTypes.disablePromoter, [Number(this.selTgyVal.id)])
                console.log('禁用用户Msg')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '禁用推广员成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 900)
                } else {
                    this.$message({
                        message: promoter.message,
                        type: 'error',
                        duration: 1200
                    })
                }
                setTimeout(() => {
                    this.disableVisible = false
                }, 1300)
            },
            beforeDelPromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (this.selTgyVal.username) {
                    this.delName = this.selTgyVal.username
                }
                this.delVisible = true
            },
            async deletePromoter () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let promoter = await this.$store.dispatch(actionTypes.deletePromoter, [Number(this.selTgyVal.id)])
                console.log('删除用户Msg')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '删除推广员成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 900)
                } else {
                    this.$message({
                        message: promoter.message,
                        type: 'error',
                        duration: 1200
                    })
                }
                setTimeout(() => {
                    this.delVisible = false
                }, 1300)
            },
            beforeAddPromoter () {
                this.promoterVal1 = ''
                this.promoterVal2 = ''
                this.promoterVal3 = ''
                this.promoterVisible = true
            },
            async addPromoter () {
                if (!this.promoterVal1) {
                    this.$message({
                        message: '请输入账号',
                        type: 'error',
                        duration: 1200
                    })
                }
                if (!this.promoterVal2) {
                    this.$message({
                        message: '注册码',
                        type: 'error',
                        duration: 1200
                    })
                }
    let promoter = await this.$store.dispatch(actionTypes.addPromoter, [ this.promoterVal1.toString(), this.promoterVal2.toString(), this.promoterVal3.toString() ])
                console.log('添加用户Msg')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '添加用户成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.promoterVisible = false
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 1100)
                } else {
                    this.$message({
                        message: promoter.message,
                        type: 'error',
                        duration: 1200
                    })
                }
            },

            beforeResetPWD () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                if (this.selTgyVal.username) {
                    this.dialogName = this.selTgyVal.username
                }
                this.dialogVisible = true
            },
            async resetPromoterPwd () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let promoter = await this.$store.dispatch(actionTypes.resetPromoterPwd, [ Number(this.selTgyVal.id) ])
                console.log('密码修改')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 900)
                }
                setTimeout(() => {
                    this.dialogVisible = false
                }, 1100)
            },
            async updatePromoterRemark () {
                if (!this.selTgyVal) {
                    this.$message({
                        message: '没有选择对应选项',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                let promoter = await this.$store.dispatch(actionTypes.updatePromoterRemark, [ Number(this.selTgyVal.id), this.remarkVal.toString() ])
                console.log('备注修改')
                console.log(promoter)
                if (promoter && promoter.success) {
                    this.$message({
                        message: '备注修改成功',
                        type: 'success',
                        duration: 1200
                    })
                    setTimeout(() => {
                        this.handleCurrentChange(this.currPageNumber)
                        this.initSearch(false)
                    }, 900)
                }
                setTimeout(() => {
                    this.remarkVisible = false
                }, 1100)
            },
            initSearch (showTips = true) {
                this.tgySearch = ''
                if (showTips) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
                // 去除 表格选中
                this.$refs.singleTable.setCurrentRow('')
                this.$store.commit(mutationTypes.setSelTgyVal, null)
                this.currStateStop = true
                this.currStateActive = true
            },
            handleClick (tab, event) {
                switch (this.activeName) {
                case 'tgyChildCz':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildCz')
                    break
                case 'tgyChildDh':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildDh')
                    break
                case 'tgyChildCzcx':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildCzcx')
                    break
                case 'tgyChildDjcx':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildDjcx')
                    break
                case 'tgyChildYwjl':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildYwjl')
                    break
                case 'tgyChildIpjl':
                    this.$router.push('/home/tgyManage/tgyChild/tgyChildIpjl')
                    break
                }
            },
            async handleCurrentChange (val) {
    let getPromoter = await this.$store.dispatch(actionTypes.getPromoterList, [Number(this.curTgyValue), {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': Number(val), 'pageSize': 8, 'totalCount': 0}])
                console.log(getPromoter)
                console.log('==***********===')
                this.currPageNumber = val

                if (getPromoter) {
                    if (getPromoter.pager && getPromoter.pager.list) {
                        this.tgyMainList = getPromoter.pager.list
                        this.tgyMainList.forEach((item) => {
                            if (item.state === 0) {
                                item.state = '正常'
                            } else {
                                item.state = '禁用'
                            }
                            if (item.level !== undefined) {
                                item.level = item.level + '级推广员'
                            }
                        })
                        // 处理页码
                        this.totalCount = getPromoter.pager.totalCount,
                        this.pageNumber = getPromoter.pager.pageNumber,
                        this.pageSize = getPromoter.pager.pageSize
                    }
                }
            },
            tgyListClick (val) {
                // 列表点击
                this.$store.commit(mutationTypes.setSelTgyVal, val)
            // 处理一些可显示
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            async setPromoter () {
                let promoter = await this.$store.dispatch(actionTypes.searchPromoter, [this.tgySearch.toString(), Number(this.tgyvalue) ])
                console.log(promoter)
                //                更新对应的数据
                if (promoter) {
                    this.curTgyValue = Number(this.tgyvalue)
                    if (promoter.results && promoter.results) {
                        this.tgyMainList = promoter.results
                        this.tgyMainList.forEach((item) => {
                            if (item.state === 0) {
                                item.state = '正常'
                            } else {
                                item.state = '禁用'
                            }
                            if (item.level !== undefined) {
                                item.level = item.level + '级推广员'
                            }
                        })
                    }
                    if (promoter.gold) {
                        this.globalGold = promoter.gold
                    }
                    if (promoter.number) {
                        this.globalNum = promoter.number
                    }
                }
            }
        },
        data () {
            return {

                downPromoterName: '',
                currPageNumber: 1,

                downVisible: false,
                downNameValue: '',
                downNameOptions: [
                    {
                        childrenPayScale: 0,
                        childrenPromoterNum: 0,
                        childrenUserNum: 0,
                        childrenUserOver: 100000,
                        createTime: '',
                        expiryNum: 0,
                        gold: 0,
                        id: 0,
                        level: 0,
                        parentId: 0,
                        parentName: '',
                        password: '',
                        payMoney: 0,
                        registCode: '',
                        remark: '',
                        state: 0,
                        username: '总公司：admin'
                    }],

                currStateStop: true,
                currStateActive: true,

                enableName: '',
                enableVisible: false,

                disableName: '',
                disableVisible: false,

                delName: '',
                delVisible: false,

                promoterVisible: false,
                promoterVal1: null,
                promoterVal2: null,
                promoterVal3: null,

                remarkVal: '', // 备注
                remarkVisible: false,

                dialogVisible: false,
                dialogName: '',
                tgyvalue: 0,
                tgyOptions: [
                    {tgyid: 0, name: '直属推广员'},
                    {tgyid: 1, name: '非直属推广员'}
                ],
                curTgyValue: 0, //  请求的值 （用于分页）
                tgySearch: '',

                tgyMainList: [{
                    username: '',
                    gold: '',
                    level: '',
                    childrenPromoterNum: '',
                    childrenUserNum: '3',
                    parentName: 200333,
                    expiryNum: '',
                    payMoney: '',
                    state: '正常',
                    createTime: '',
                    remark: ''
                }],

                totalCount: 1,
                pageNumber: 1,
                pageSize: 2,

                globalGold: 0,
                globalNum: 0,

                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                value: '',
                input: '',

                activeName: 'tgyChildCz'
            }
        },
        async mounted () {
            let getPromoter = await this.$store.dispatch(actionTypes.getPromoterList)
            this.curTgyValue = 0
            console.log(getPromoter)
            console.log('========')
            if (getPromoter) {
                if (getPromoter.pager && getPromoter.pager.list) {
                    this.tgyMainList = getPromoter.pager.list
                    this.tgyMainList.forEach((item) => {
                        if (item.state === 0) {
                            item.state = '正常'
                        } else {
                            item.state = '禁用'
                        }

                        if (item.level !== undefined) {
                            item.level = item.level + '级推广员'
                        }
                    })
                    // 处理页码
                    this.totalCount = getPromoter.pager.totalCount,
                    this.pageNumber = getPromoter.pager.pageNumber,
                    this.pageSize = getPromoter.pager.pageSize
                }
                if (getPromoter.gold) {
                    this.globalGold = getPromoter.gold
                }
                if (getPromoter.number) {
                    this.globalNum = getPromoter.number
                }
            }
        },
        computed: {
            selTgyVal () {
                return this.$store.state.tgyManager.selTgyVal
            },
            updataSetPromoter () {
                return this.$store.state.tgyManager.updataSetPromoter
            }
        },
        watch: {
            updataSetPromoter () {
                this.setPromoter()
                this.initSearch(false)
            },
            selTgyVal (val) {
                console.log(val)
                this.$router.push('/home/tgyManage/tgyChild/tgyChildCz')
                this.activeName = 'tgyChildCz'
                if (val) {
                    if (val.state === '禁用' && !!this.selTgyVal) {
                        this.currStateStop = true
                        this.currStateActive = false
                    } else {
                        this.currStateStop = false
                        this.currStateActive = true
                    }
                }
            }
        }
    }
</script>
<style scoped>
    #downStyle{
        text-align: center;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .overflow{
        overflow: hidden;
    }
    .tgyChild{
        position: relative;
        border:1px solid #dcdfe6;
        padding:10px 20px;
        margin-top:10px;
    }
    .tgyChild::after{
        content: '';
        display: block;
        position: absolute;
        left:30px;
        top:-10px;
        width:0;
        height:0;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #dcdfe6;
    }
    .tgyChild-findBox p{
        line-height:40px;
    }
    .tgyChild-findBox .el-input{
        width:210px;
    }
    .tgyChild-findBox>*{
        float: left;
        margin-right:10px;
    }
    .tgyChild-findBox .el-button+.el-button{
        margin-left:0;
    }
    .tgyMain{
        margin-top:20px;
    }
    .el-pagination{
        float: left;
        margin-top:20px;
    }
    .gty-tips{
        margin-top:20px;
        line-height:32px;
        color: #606266;
    }
    .tgyChild-nav{
        position: relative;
        left:-20px;
        margin-top:20px;
    }
    .tgyChild-nav a{
        padding: 0 20px;
        margin-top:20px;
        line-height:30px;
        color: #409EFF;
        font-weight:bold;
        text-decoration: none;

    }
    .tgyChild-nav a+a{
        border-left:1px solid #dcdfe6;
    }

    @media (max-width: 768px) {
        .tgyChild-findBox>*,.tgyChild-btnBox>*{
            margin:0 5px 5px 0;
        }
    }
</style>
