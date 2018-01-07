<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input size="small" placeholder="请输入标题" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <el-input size="small" placeholder="请输入正文" type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary">更新</el-button>
                <el-button size="small" style="margin-left: 28px">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
      data () {
          return {
              form: {
                  name: '',
                  desc: ''
              }
          }
      },
      watch: {},
      methods: {
          onSubmit () {
              console.log('submit!')
          }
      },
      computed: {},
      mounted () {
      }
  }
</script>
<style scoped>

</style>
