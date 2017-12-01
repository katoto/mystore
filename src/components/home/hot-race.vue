<template>
	<div class="rmss">
 	  <div class="rmss-header">
 		  <div class="rmss-h-l"><span class="rmss-h-l-txt">热门赛事</span></div>
 		  <div class="rmss-h-r"><span class="rmss-h-l-txt">换一换</span></div>
 	  </div>
 	  <div class="rmss-desc">
 		  <div class="rmss-desc-l"><span class="rmss-desc-l-txt">桥村太少， 啊呀可笑啊呀可笑GFCvs弥勒佛而（复人就是账单）</span></div>
 		  <div class="rmss-desc-r">
 			  <div class="rmss-desc-r-c"><span class="rmss-desc-r-txt">付费</span></div>
 		  </div>

 	  </div>
 	  <div class="rmss-tj">
 		  <div class="rmss-tj-l">
 			  <span class="rmss-tj-txt">达拉斯妞妞三天胜率66.7近10中9</span>

 		  </div>
 		  <div class="rmss-tj-r">
 			  <span class="rmss-tj-txt">1205 02:30</span>
 		  </div>

 	  </div>


 	  <div class="rmss-content">
 		  <div class="rmss-c-h">
 			  <div class="rmss-c-h-l">
 				  <span class="rmss-c-h-l-txt">11-24 周四 18:00</span>

 			  </div>
 			  <div class="rmss-c-h-r">
 				  <span class="rmss-c-h-r-txt">12位专家解读</span>
 			  </div>
 		  </div>
 		  <div class="rmss-c-c">
 			  <div class="rmss-c-c-l">
 				  <span class="rmss-c-c-l-txt">利物浦</span><img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img>
 			  </div>
 			  <div class="rmss-c-c-c">
 				  <span class="rmss-c-c-c-txt">金杯赛</span>
 			  </div>

 			  <div class="rmss-c-c-r">
 				  <img src="http://img.m.500.com/esun/avatar/e1/f4/e1f45cc479a511e79a50.jpg?!100.webp&t=1501913902.55"></img><span class="rmss-c-c-r-txt">利物浦</span>
 			  </div>

 		  </div>

 	  </div>


   </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.rmss {
	margin: 20px 0;
	padding: 0 20rem;
	flex-direction: column;
	background-color: white;
}

.rmss-header {

	border-bottom-width: 1rem;
	border-bottom-color: gray;
	border-bottom-style: solid;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 50rem;

}

.rmss-h-l,
.rmss-h-r {
	/*font-size: 30rem;*/
}

.rmss-h-l-txt,
.rmss-h-r-txt {
	font-size: 30rem;
}

.rmss-desc {
	flex-direction: row;

}

.rmss-desc-l {
	flex: 1;
	padding: 20rem;
}

.rmss-desc-l-txt {
	font-size: 30rem;
}

.rmss-desc-r {
	width: 100rem;
	/*border: 1px solid red;*/
	justify-content: center;
	align-items: center;
}

.rmss-desc-r-c {
	background-color: red;
	height: 40rem;
	line-height: 40rem;
	border-radius: 5rem;
	padding: 0 5rem;
}

.rmss-desc-r-txt {
	font-size: 30rem;
	color: white;
}

.rmss-tj {
	flex-direction: row;
	justify-content: space-between;
}

.rmss-tj-l,
.rmss-tj-r {
	font-size: 30rem;
}

.rmss-content {
	border: 2rem solid #DDDDDD;
	height: 200rem;
	/*width: 6rem;*/
	/*margin: 0 auto;*/
	border-radius: 10rem;
	flex-direction: column;
	margin: 30rem 0;
	padding: 10rem;
}

.rmss-c-h {
	flex-direction: row;
	justify-content: space-between;
	height: 50rem;
	align-items: center;
}

.rmss-c-h-l-txt,
.rmss-c-h-r-txt {
	font-size: 25rem;
}

.rmss-c-c {
	flex-direction: row;
	flex: 1;
	/*border: 1px solid red;*/
}

.rmss-c-c-l,
.rmss-c-c-r {
	flex: .4;
	flex-direction: row;
	align-items: center;
}

.rmss-c-c-l {
	justify-content: flex-end;
}

.rmss-c-c-l-txt,
.rmss-c-c-r-txt {
	font-size: 30rem;
}

.rmss-c-c-img {
	/*display: inline-block;*/
	width: 50rem;
	height: 50rem;
}

.rmss-c-c-c {
	flex: .2;
	justify-content: center;
	align-items: center;
}

.rmss-c-c-c-txt {
	font-size: 30rem;
	background-color: #dde9f3;
	color: #e89fce;
	border-radius: 5rem;
	padding: 0 5rem;
}

</style>
