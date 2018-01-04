<template>
<div class="container">
<el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>



</div>
</template>
<script>

export default {
    components: {

    },
    data () {
        return { visible: false }
    }
}
</script>
<style scoped>
.container, {
  /*height: 100%;*/
  flex-direction: column;
  background-color: #dddddd;
}
</style>
