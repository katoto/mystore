<template>
	<div class="tabs">
 	  <div class="tabs-item">
           <span v-if="index !== 'jz'">推荐</span>
 		  <div class="tabs-item-c" v-else><span class="red">推荐</span></div>
    </div>
 	  <div class="tabs-item">
 		  <span v-if="index !== 'jz'">竞足</span>
 		  <div class="tabs-item-c" v-else><span class="red">竞足</span></div>
 	  </div>
 	  <div class="tabs-item">
 		  <span v-if="index !== 'zc'">足彩</span>
           <div class="tabs-item-c" v-else><span class="red">足彩</span></div>
 	  </div>
 	  <div class="tabs-item">
           <span v-if="index !== 'jl'">竞篮</span>
           <div class="tabs-item-c" v-else><span class="red">竞篮</span></div>
       </div>
 	  <div class="tabs-item">
           <span v-if="index !== 'ssq'">双色球</span>
           <div class="tabs-item-c" v-else><span class="red">双色球</span></div>
 	  </div>
 	  <div class="tabs-item">
            <span v-if="index !== 'dlt'">大乐透</span>
           <div class="tabs-item-c" v-else><span class="red">大乐透</span></div>

       </div>


   </div>
</template>

<script>
export default {
    props: ['index']
}
</script>

<style lang="css">
.tabs {
  height: 80rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /*border: 1px solid red;*/
  flex-direction: row;
  background-color: white;
}

.tabs-item {
  font-size: 30rem;
  width: 120rem;
  justify-content: center;
  align-items: center;
}

.tabs-item-c {
  justify-content: center;
  align-items: center;
  height: 76rem;
  border-bottom-width: 4rem;
  border-bottom-color: red;
  border-bottom-style: solid;
}
</style>
