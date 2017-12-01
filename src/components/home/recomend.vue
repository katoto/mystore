<template>
	<div class="recomend">
 	  <div class="recomend-wrap">
 		  <div class="recomend-w-h">
 			  <div class="recomend-w-h-l">
 				  <span class="recomend-w-h-l-txt">最准推荐</span>
 			  </div>
 			  <div class="recomend-w-h-r">
 				  <span class="recomend-w-h-r-txt">完整榜单</span>
 			  </div>
 		  </div>
 		  <div class="recomend-w-c">
 			  <div class="recomend-w-c-l">
 				  <div style="flex-direction: column;justify-content: center;align-items: center">
 					  <img style="width: 80rem;border-radius: 40rem;height: 80rem;" src="http://img.m.500.com/esun/avatar/e8/77/e8773928555011e789f1.jpg?!100.webp&t=1497919164.4"></image>
 					  <span style="font-size: 25px">小马哥足彩推荐</span>
 					  <span class="red">100%</span>
 				  </div>

 			  </div>
 			  <div class="recomend-w-c-l">
 				  <div style="flex-direction: column;justify-content: center;align-items: center">
 					  <img style="width: 80rem;border-radius: 40rem;height: 80rem;" src="http://img.m.500.com/esun/avatar/e8/77/e8773928555011e789f1.jpg?!100.webp&t=1497919164.4"></image>
 					  <span style="font-size: 25px">小马哥足彩推荐</span>
 					  <span class="red">100%</span>
 				  </div>
 			  </div>
 			  <div class="recomend-w-c-r">
 				  <div style="flex-direction: column;justify-content: center;align-items: center">
 					  <img style="width: 80rem;border-radius: 40rem;height: 80rem;" src="http://img.m.500.com/esun/avatar/e8/77/e8773928555011e789f1.jpg?!100.webp&t=1497919164.4"></image>
 					  <span style="font-size: 25px">小马哥足彩推荐</span>
 					  <span class="red">100%</span>
 				  </div>
 			  </div>
 		  </div>
 	  </div>
   </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.recomend {
	flex-direction: column;
	align-items: center;
}

.recomend-wrap {
	/*border: 1px solid red;*/
	background-color: white;
	border-radius: 10rem;
	flex-direction: column;
	height: 320rem;
	width: 700rem;
	margin: 20rem;
	padding: 10rem;
}

.recomend-w-h {
	height: 40rem;
	justify-content: space-between;
}

.recomend-w-h-l-txt,
.recomend-w-h-r-txt {
	font-size: 30rem;
}

.recomend-w-c {
	flex: 1;
	justify-content: space-between;
	/*border-top-width: 2rem;*/
	/*border-top-color: red;*/
	/*border-top-style: solid;*/
}

.recomend-w-c-l,
.recomend-w-c-c,
.recomend-w-c-r {
	flex: 1;
	/*border-width: 2rem;*/
	/*border-color: red;*/
	/*border-style: solid;*/
	justify-content: center;
	align-items: center;

}
</style>
