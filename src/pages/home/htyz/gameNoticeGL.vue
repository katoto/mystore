<template>
    <div>
        <h4 style="margin-left: 25px">新建公告：</h4>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="范围：" class="mobie-gg">
                <el-radio-group v-model="form.resource">
                    <el-radio label="0" >全服，所有在线会员</el-radio>
                    <el-radio label="1" disabled >新手练习厅所有桌</el-radio>
                    <el-radio label="2" >欢乐竞技厅所有桌</el-radio>
                    <el-radio label="3" >会员账号（多账号，xxx;xxx此格式填写）</el-radio>
                </el-radio-group>
                <el-input size="samll" placeholder="会员账号(多账号，xxx;xxx此格式填写)" v-if="form.resource && form.resource==='3'" v-model="form.vipName"></el-input>
            </el-form-item>
            <el-form-item label="正文：">
                <el-input size="small" placeholder="请输入正文" type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" v-tap="{methods:sendNotice}">发送</el-button>
                <el-button size="small" style="margin-left: 28px" v-tap="{methods:clearNoticeMsg}">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 底部 -->
        <section style="margin-bottom: 50px">
            <header class="clearfix" style="padding: 10px 0;border-top: 1px solid #000">
                <span>已发公告：</span>
                <el-button  size="small" type="primary" v-tap="{methods: upDataNotice }" >更新已发公告</el-button>
                <!--  <el-button style="margin-left: 18px" size="small" disabled  type="primary">再次发送</el-button>  -->
                <el-button :disabled="!selNoticeVal" size="small" type="warning" v-tap="{methods: initSearch}">重置</el-button>
                <el-button :disabled="!selNoticeVal" size="small" type="danger" v-tap="{methods: delSelNotice}" >删除</el-button>

            </header>
            <section>
                <el-table
                    ref="singleTable"
                    :data="gamaNoticeList"
                    highlight-current-row
                    height="450"
                    size="small"
                    border
                    @cell-click="noticeClick"
                    style="width: 100%">
                    <el-table-column
                        prop="rangeStr"
                        label="范围"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="正文"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="datetime"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="admin"
                        label="发布人">
                    </el-table-column>
                </el-table>
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
                    desc: '',
                    resource: '',
                    vipName: ''
                },
                gamaNoticeList: [{
                    admin: 'admin',
                    content: '给888888发的消息',
                    datetime: '2018-01-20 14:22:24',
                    id: 9,
                    rangeStr: '会员账号：000000',
                    rangeType: 3,
                    title: '',
                    type: 1,
                    userId: '000000'
                }],
                newFormID: 0
            }
        },
        methods: {
            clearNoticeMsg () {
                if (this.form) {
                    this.form.desc = ''
                    this.form.resource = ''
                    this.form.vipName = ''
                    setTimeout(() => {
                        this.$message({
                            message: '重置成功',
                            type: 'success',
                            duration: 1200
                        })
                    }, 1500)
                }
            },
            async sendNotice () {
                console.log(this.form)
                if (this.form) {
                    if (Number(this.form.resource) === 2) {
                        this.newFormID = 8
                    }
                    if (this.form.desc === '') {
                        this.$message({
                            message: '请输入正文',
                            type: 'error',
                            duration: 1200
                        })
                        return false
                    }
                    let result = await this.$store.dispatch(aTypes.addNotice, [{admin: 'admin',
                        content: this.form.desc.toString(),
                        datetime: '',
                        id: this.newFormID,
                        rangeStr: '',
                        rangeType: Number(this.form.resource),
                        title: '',
                        type: 0,
                        userId: this.form.vipName.toString() }])
                    console.log(result)
                    console.log('游戏公告add')
                    if (result && result.success === true) {
                        let noticeList = await this.$store.dispatch(aTypes.getNoticeList)
                        console.log(noticeList)
                        if (noticeList) {
                            this.gamaNoticeList = noticeList
                        }
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                            duration: 1200
                        })
                        this.form.desc = ''
                        this.form.resource = ''
                        this.form.vipName = ''
                    } else {
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration: 1200
                        })
                    }
                }
            },
            noticeClick (val) {
                // 列表点击
                this.$store.commit(mTypes.setselNoticeVal, val)
                // 处理一些可显示
            },
            setCurrent (row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            async upDataNotice () {
                let result = await this.$store.dispatch(aTypes.getNoticeList)
                console.log('===更新游戏公告====')
                console.log(result)
                if (result) {
                    this.gamaNoticeList = result
                    this.$message({
                        message: '更新游戏公告成功',
                        type: 'success',
                        duration: 1200
                    })
                    return false
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
                this.$store.commit(mTypes.setselNoticeVal, null)
            },
            delSelNotice () {
                console.log(this.selNoticeVal)
                console.log('==== 删除Notice ==== ')
            },
            onSubmit () {
                console.log('submit!')
            }
        },
        computed: {
            selNoticeVal () {
                return this.$store.state.htyz.selNoticeVal
            }
        },
        async mounted () {
            let result = await this.$store.dispatch(aTypes.getNoticeList)
            console.log(result)
            console.log('游戏公告管理列表')
            if (result) {
                this.gamaNoticeList = result
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
