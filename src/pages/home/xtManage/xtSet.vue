<template>
    <section id="xtSet">
        <!-- 数据之后要处理对应一下 -->
        <!--<div>-->
            <!--<el-checkbox v-model="isOpenChat">用户检查</el-checkbox></br>-->
            <!--<p>-->
                <!--<span>充值检查数目 : </span>&nbsp;-->
                <!--<el-input v-model="input" placeholder="请输入数目"></el-input>&nbsp;-->
                <!--<span> 元宝，(单次充值超过此数目时触发)</span>-->
            <!--</p>-->
            <!--<p>-->
                <!--<span>充值检查数目 : </span>&nbsp;-->
                <!--<el-input  v-model="input" placeholder="请输入数目"></el-input>&nbsp;-->
                <!--<span> 元宝，(单次充值超过此数目时触发)</span>-->
            <!--</p>-->
        <!--</div>-->
        <div>
            <p>平板租借检查：默认开启，不可设置</p>
        </div>
        <hr>
        <section>
            <el-checkbox v-model="isOpenChat">授权警告</el-checkbox></br>
            <div>
                <p>日累计充值数目（元宝）：</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>日累计兑奖数目（元宝）：</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>单个会员日兑奖数目（元宝）：</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>单个推广员日兑奖数目（元宝）：</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
        </section>
        <hr>
        <div>
            <el-checkbox v-model="isOpenChat">聊天开启</el-checkbox>
        </div>
        <hr>
        <section>
            <p>自动冻结设置（未活跃时间过长）：</p>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
        </section>
        <hr>
        <section>
            <p>爆机设置（元宝）（总额超限）：</p>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
        </section>
        <section>
            <el-checkbox v-model="isOpenChat">会员注册验证开启</el-checkbox>
        </section>
        <section>
            <el-button>更新</el-button>
            <el-button>重置</el-button>
        </section>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                isOpenChat:true ,
                options2: [
                    {
                        value: '100万',
                    },
                    {
                    value: '1000万',
                    disabled: true
                    },
                    {
                    value: '10万',
                    },
                    {
                    value: '1万',
                    },
                    {
                    value: '1000',
                }],
                value: '10万'
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted () {

        }
    }
</script>
<style scoped>
    #xtSet .el-input{
        width: 25%;
    }
    #xtSet, #xtSet span ,#xtSet p{
        font-size: 16px;
        font-weight: 500;
        color: #303133;
    }
    #xtSet section{
        padding-top: 20px;
    }
    #xtSet{
        padding-left: 20px;
        padding-bottom: 100px;
    }
</style>
