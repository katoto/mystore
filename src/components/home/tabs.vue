<template>
	<div class="tabs">
 	  <div class="tabs-item"><span>推荐</span></div>
 	  <div class="tabs-item">
 		  <!-- <span>竞足</span> -->
 		  <div class="tabs-item-c"><span class="red">竞足</span></div>
 	  </div>
 	  <div class="tabs-item">
 		  <span>足彩</span>
 	  </div>
 	  <div class="tabs-item"><span>竞篮</span></div>
 	  <div class="tabs-item">
 		  <!-- <span>双色球</span> -->
 		  <div class="tabs-item-c"><span class="red">双色球</span></div>
 	  </div>
 	  <div class="tabs-item"><span>大乐透</span></div>


   </div>
</template>

<script>
export default {
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
