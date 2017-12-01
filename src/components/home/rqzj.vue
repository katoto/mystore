<!-- 人气专家 -->
<template>
	<div class="rqzj">
 	  <div class="rqzj-header">
 		  <div class="rqzj-h-l"><span class="rqzj-h-l-txt">人气专家</span></div>
 		  <div class="rqzj-h-r"><span class="rqzj-h-r-txt">更多</span></div>
 	  </div>
 	  <div class="rqzj-content">
 		  <div class="rqzj-c-item">
 			  <img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img>
 			  <span class="rqzj-c-item-txt">采臣看房</span>
 		  </div>
 		  <div class="rqzj-c-item">
 			  <img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img>
 			  <span class="rqzj-c-item-txt">采臣看房</span>
 		  </div>
 		  <div class="rqzj-c-item">
 			  <img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img>
 			  <span class="rqzj-c-item-txt">采臣看房</span>
 		  </div>
 		  <div class="rqzj-c-item">
 			  <img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img>
 			  <span class="rqzj-c-item-txt">采臣看房</span>
 		  </div>

 	  </div>
 	  <div class="rqzj-footer"><span class="rqzj-f-txt">快报 吴彦祖3分钟前购买了秦昭解盘的推荐</span></div>

   </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.rqzj {
	margin: 10px 0;
	padding: 10px 20rem;
	flex-direction: column;
	background-color: white;
	border-radius: 5rem;
}

.rqzj-header {

	border-bottom-width: 1rem;
	border-bottom-color: gray;
	border-bottom-style: solid;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 50rem;
}

.rqzj-h-l,
.rqzj-h-r {
	line-height: 40rem;
}

.rqzj-h-l-txt,
.rqzj-h-r-txt {
	font-size: 30rem;
}

.rqzj-content {
	height: 200rem;
	/*border: 1px solid blue;*/
	flex-direction: row;
	justify-content: space-between;
	padding: 0 20rem;
	align-items: center;
}

.rqzj-c-item {
	height: 120rem;
	flex-direction: column;
	/*width: 120rem;*/
	/*border: 1px solid red;*/
	align-items: center;
	justify-content: space-between;
}

.rqzj-c-item-txt {
	font-size: 22rem;
}

.rqzj-footer {}

.rqzj-f-txt {
	line-height: 40rem;
	font-size: 30rem;
}

</style>
