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
                <el-input size="small" placeholder="会员账号(多账号，xxx;xxx此格式填写)" v-if="form.resource && form.resource==='3'" v-model="form.vipName"></el-input>
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
                <span class="mobile-fjx">发件箱（已发邮件）：</span>
                <el-button size="small" type="primary" v-tap="{methods: upDataNotice }" >更新已发邮件</el-button>
                <el-button :disabled="!selEmailVal" size="small" type="warning" v-tap="{methods: initSearch}">重置</el-button>
                <el-button :disabled="!selEmailVal" size="small" type="danger" v-tap="{methods: delSelNotice}" >删除</el-button>

            </header>
            <section >
                <el-table
                    ref="singleTable"
                    :data="emailList"
                    highlight-current-row
                    height="350"
                    size="small"
                    border
                    @cell-click="emailListClick"
                    style="width: 100%">
                    <el-table-column
                        prop="rangeType"
                        label="收件人"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="标题"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="内容">
                    </el-table-column>
                    <el-table-column
                        prop="datetime"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="admin"
                        label="发布人">
                    </el-table-column>
                    <!--<el-table-column disabled-->
                        <!--prop="address"-->
                        <!--label="奖励总计">-->
                    <!--</el-table-column>-->
                </el-table>

                <div class="block">
                    <el-pagination
                        @current-change="clickPage"
                        background
                        size="small"
                        :page-size="pageSize"
                        :current-page.sync="pageNumber"
                        layout="prev, pager, next,jumper"
                        :total="totalCount">
                    </el-pagination>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import { aTypes, mTypes } from '~store/htyz'
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
                    admin: 'admin',
                    content: '给欢乐发的内容',
                    datetime: '2018-01-20 14:29:07',
                    id: 6,
                    ids: '',
                    rangeType: 2,
                    title: '给欢乐发的标题'
                }],
                totalCount: 0,
                pageNumber: 1,
                pageSize: 12
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
            async sendEmailMsg () {
                console.log('==更新email====')
                let result = await this.$store.dispatch(aTypes.sendMail, [{'admin': 'admin',
                    'content': this.form.emailContent,
                    'datetime': '',
                    'id': 0,
                    'ids': this.form.vipName.toString(),
                    'rangeType': Number(this.form.resource),
                    'title': this.form.emailTitle }])
                console.log(result)
                console.log('emailXt 列表')
                if (result) {
                    if (result.success === false) {
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration: 1200
                        })
                    } else {
                        this.$message({
                            message: '邮件发送成功',
                            type: 'success',
                            duration: 1200
                        })
                        this.upDataNotice(false)
                    }
                }
            },
            emailListClick (val) {
                // 列表点击
                console.log(val)
                this.$store.commit(mTypes.setselEmailVal, val)
                // 处理一些可显示
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            async clickPage (size) {
                // 分页  请求数据 ，更新数据
                let result = null
                result = await this.$store.dispatch(aTypes.getMailList, [{'list': [],
                    'order': '',
                    'orderBy': '',
                    'pageCount': 0,
                    'pageNumber': size,
                    'pageSize': 8,
                    'totalCount': 0 } ])
                console.log(result)
                console.log('emial 下一页')
                if (result) {
                    if (result.list) {
                        this.emailList = result.list
                        this.emailList.forEach((item) => {
                            switch (Number(item.rangeType)) {
                            case 0:
                                item.rangeType = '全服'
                                break
                            case 1:
                                item.rangeType = '新手练习厅'
                                break
                            case 2:
                                item.rangeType = '欢乐竞技厅'
                                break
                            case 3:
                                item.rangeType = '会员账号'
                                break
                            }
                        })
                    }
                    // 处理页码
                    this.totalCount = result.totalCount
                    this.pageNumber = result.pageNumber
                    this.pageSize = result.pageSize
                }
            },
            async upDataNotice (showTips = true) {
                console.log('===更新游戏公告====')
                let result = await this.$store.dispatch(aTypes.getMailList)
                console.log(result)
                console.log('emailXt 列表')
                if (result) {
                    if (result.list) {
                        this.emailList = result.list
                        this.emailList.forEach((item) => {
                            switch (Number(item.rangeType)) {
                            case 0:
                                item.rangeType = '全服'
                                break
                            case 1:
                                item.rangeType = '新手练习厅'
                                break
                            case 2:
                                item.rangeType = '欢乐竞技厅'
                                break
                            case 3:
                                item.rangeType = '会员账号'
                                break
                            }
                        })
                        if (showTips) {
                            this.$message({
                                message: '已更新',
                                type: 'success',
                                duration: 1200
                            })
                        }
                    }
                    // 处理页码
                    this.totalCount = result.totalCount
                    this.pageNumber = result.pageNumber
                    this.pageSize = result.pageSize
                    this.initSearch(false)
                }
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
            async delSelNotice () {
                console.log(this.selEmailVal)
                console.log('==== 删除Notice ==== ')
                let result = await this.$store.dispatch(aTypes.deleteMail, [ Number(this.selEmailVal.id) ])
                console.log(result)
                console.log('删除')
                if (result && result.success === true) {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1200
                    })
                    let mailList = await this.$store.dispatch(aTypes.getMailList)
                    console.log(mailList)
                    console.log('emailXt 列表')
                    if (mailList) {
                        if (mailList.list) {
                            this.emailList = mailList.list
                            this.emailList.forEach((item) => {
                                switch (Number(item.rangeType)) {
                                case 0:
                                    item.rangeType = '全服'
                                    break
                                case 1:
                                    item.rangeType = '新手练习厅'
                                    break
                                case 2:
                                    item.rangeType = '欢乐竞技厅'
                                    break
                                case 3:
                                    item.rangeType = '会员账号'
                                    break
                                }
                            })
                        }
                        // 处理页码
                        this.totalCount = mailList.totalCount
                        this.pageNumber = mailList.pageNumber
                        this.pageSize = mailList.pageSize
                    }
                }
            }

        },
        computed: {
            selEmailVal () {
                return this.$store.state.htyz.selEmailVal
            }
        },
        async mounted () {
            let result = await this.$store.dispatch(aTypes.getMailList)
            console.log(result)
            console.log('emailXt 列表')
            if (result) {
                if (result.list) {
                    this.emailList = result.list
                    this.emailList.forEach((item) => {
                        switch (Number(item.rangeType)) {
                        case 0:
                            item.rangeType = '全服'
                            break
                        case 1:
                            item.rangeType = '新手练习厅'
                            break
                        case 2:
                            item.rangeType = '欢乐竞技厅'
                            break
                        case 3:
                            item.rangeType = '会员账号'
                            break
                        }
                    })
                }
                // 处理页码
                this.totalCount = result.totalCount
                this.pageNumber = result.pageNumber
                this.pageSize = result.pageSize
            }
        }
    }
</script>
<style scoped>
    .el-pagination{
        text-align: center;
        margin: 25px 0;
    }
    @media (max-width: 768px) {
        .el-radio{
            margin-left: 10px;
        }
        .el-button--small{
            padding: 9px 5px;
        }
    }
</style>
