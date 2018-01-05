<template>
    <div>
        <div>
            当前分享状态：
            <el-switch
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </div>
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
        <hr>
        <section>
            <el-button>更新</el-button>
            <el-button>重置</el-button>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {},
        computed: {},
        mounted () {

        }
    }
</script>
<style>
</style>
