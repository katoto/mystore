<template>
    <div class="tgyChild">
        <div class="overflow">
            <div class="fl overflow tgyChild-findBox">
                 <p>查找：</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <el-button>查找</el-button>
                <el-button>重置</el-button>
            </div>
            <div class="fr overflow tgyChild-btnBox">
                <el-button>备注修改</el-button>
                <el-button>密码重置</el-button>
                <el-button>下级调整</el-button>
                <el-button>删除</el-button>
                <el-button disabled>解禁</el-button>
                <el-button>禁用</el-button>
                <el-button>新增</el-button>
            </div>
        </div>
        <div class="tgyMain">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="account"
                        label="账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="game"
                        label="游戏币"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="permissions"
                        label="权限">
                </el-table-column>
                <el-table-column
                        prop="promotion"
                        label="直属推广数">
                </el-table-column>
                <el-table-column
                        prop="member"
                        label="直属会员数">
                </el-table-column>
                <el-table-column
                        prop="superior"
                        label="所属上级">
                </el-table-column>
                <el-table-column
                        prop="rechargeNumber"
                        label="申请充值数目">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="新增时间">
                </el-table-column>
                <el-table-column
                        prop="remarks"
                        label="备注">
                </el-table-column>
            </el-table>
            <div class="overflow">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
                <p class="fr gty-tips">
                    推广员携带（币）：51004 3/3
                </p>
            </div>
        </div>
        <div class="tgyChild2">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tgyChild-nav">
                <el-tab-pane label="推广员充值" name="tgyChildCz"></el-tab-pane>
                <el-tab-pane label="推广员兑换" name="tgyChildDh"></el-tab-pane>
                <el-tab-pane label="充值查询" name="tgyChildCzcx" ></el-tab-pane>
                <el-tab-pane label="兑奖查询" name="tgyChildDjcx" ></el-tab-pane>
                <el-tab-pane label="游玩记录" name="tgyChildYwjl" ></el-tab-pane>
                <el-tab-pane label="推广员登录IP记录" name="tgyChildIpjl" ></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
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
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`)
            }
        },
        data () {
            return {
                tableData: [{
                    account: '2016-05-03',
                    game: '王小虎',
                    permissions: '上海',
                    promotion: '普陀区',
                    member: '上海市普陀区金沙江路 1518 弄',
                    superior: 200333,
                    rechargeNumber: '上海市普陀区金沙江路 1518 弄',
                    status: '上海市普陀区金沙江路 1518 弄',
                    time: '上海市普陀区金沙江路 1518 弄',
                    remarks: '上海市普陀区金沙江路 15181518151815181518 弄'
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                value: '',
                input: '',
                options: '',
                activeName: 'tgyChildCz'
            }
        }
    }
</script>
<style scoped>
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
        padding:20px;
        margin-top:20px;
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
</style>
