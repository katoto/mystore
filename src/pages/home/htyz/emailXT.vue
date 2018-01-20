<template>
    <div>
        <h4 style="margin-left: 25px">新建邮件：</h4>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="范围：">
                <el-radio-group v-model="form.resource">
                    <el-radio label="0">全服（在线+离线）</el-radio>
                    <el-radio label="1" disabled >新手练习厅所有桌</el-radio>
                    <el-radio label="2">欢乐竞技厅所有桌</el-radio>
                    <el-radio label="3">会员账号（多账号，xxx;xxx此格式填写）</el-radio>
                </el-radio-group>
                <el-input size="samll" placeholder="会员账号(多账号，xxx;xxx此格式填写)" v-if="form.resource && form.resource==='4'" v-model="form.vipName"></el-input>
            </el-form-item>
            <el-form-item label="标题：">
                <el-input size="small" placeholder="请输入标题" v-model="form.emailTitle"></el-input>
            </el-form-item>
            <el-form-item label="内容：">
                <el-input size="small" placeholder="请输入内容" type="textarea" v-model="form.emailContent"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" v-tap="{methods:sendEmailMsg}">发送</el-button>
                <el-button size="small" style="margin-left: 28px" v-tap="{methods:clearEmailMsg}">重置</el-button>
            </el-form-item>
        </el-form>


        <!-- 底部已知内容 -->
        <section style="margin-bottom: 50px">
            <header class="clearfix" style="padding: 10px 0;border-top: 1px solid #000">
                <span>发件箱（已发邮件）：</span>
                <el-button  style="margin-left: 18px" size="small" type="primary" v-tap="{methods: upDataNotice }" >更新已发公告</el-button>
                <el-button :disabled="!selEmailVal" style="margin-left: 18px" size="small" type="warning" v-tap="{methods: initSearch}">重置</el-button>
                <el-button :disabled="!selEmailVal" style="margin-left: 18px" size="small" type="danger" v-tap="{methods: delSelNotice}" >删除</el-button>

            </header>
            <section >
                <el-table
                    ref="singleTable"
                    :data="emailList"
                    highlight-current-row
                    height="400"
                    size="small"
                    border
                    @cell-click="emailListClick"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="收件人"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="标题"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="内容">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="发布人">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="奖励总计">
                    </el-table-column>
                </el-table>

                <!--<div class="block">-->
                    <!--<el-pagination-->
                        <!--@current-change="clickPage"-->
                        <!--background-->
                        <!--size="small"-->
                        <!--layout="prev, pager, next"-->
                        <!--:total="50">-->
                    <!--</el-pagination>-->
                <!--</div>-->

            </section>
        </section>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    resource: '',
                    vipName: '',
                    emailTitle: '',
                    emailContent: ''
                },
                emailList: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
            }
        },
        methods: {
            clearEmailMsg () {
                if (this.form) {
                    this.form.emailTitle = ''
                    this.form.resource = ''
                    this.form.vipName = ''
                    this.form.emailContent = ''
                    setTimeout(() => {
                        this.$message({
                            message: '重置成功',
                            type: 'success',
                            duration: 1200
                        })
                    }, 1500)
                }
            },
            sendEmailMsg () {
                console.log('==更新email====')
                console.log(  this.form  );


            },
            emailListClick (val) {
                // 列表点击
                this.$store.commit(mTypes.setselEmailVal, val)
                // 处理一些可显示
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            upDataNotice () {
                console.log('===更新游戏公告====')
            },
            initSearch (showTips = true) {
                if (showTips) {
                    this.$message({
                        message: '重置成功',
                        type: 'success',
                        duration: 1200
                    })
                }
                // 去除 表格选中
                this.$refs.singleTable.setCurrentRow('')
                this.$store.commit(mTypes.setselEmailVal, null)
            },
            delSelNotice () {
                console.log(this.setselEmailVal)
                console.log('==== 删除Notice ==== ')
            },
            onSubmit () {
                console.log('submit!')
            }

        },
        computed: {
            selEmailVal () {
                return this.$store.state.htyz.setselEmailVal
            }
        },
        mounted () {


        }
    }
</script>
<style scoped>
    .el-pagination{
        text-align: center;
        margin: 25px 0;
    }
</style>
