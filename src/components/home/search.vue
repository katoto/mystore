<template>

	<div class="search">
 	  <div class="search-box">
 		  <div class="search-icon-w">
 			  <img src="~assets/icon-search.png"></image>
 		  </div>
 		  <div class="search-input">
 			  <span>搜索框</span>

 		  </div>


 	  </div>
   </div>
</template>

<script>
export default {
}
</script>

<style lang="css">

.search {
	/*margin-top: 80rem;*/
	background-color: white;
	height: 150rem;
	justify-content: center;
	align-items: center;
}

.search-box {
	flex-direction: row;
	background-color: #EEEEEE;
	border: 1px solid darkgray;
	border-radius: 30rem;
	height: 60rem;
	width: 600rem;
}

.search-icon-w {
	width: 80rem;
	/*border-right: 1px solid red;*/
	justify-content: center;
	align-items: center;

}

.search-icon {
	width: 40rem;
	height: 40rem;
	/*background-image: url(~assets/icon-search.png);*/
	background-repeat: no-repeat;
	/*background-size: contain;*/
}

.search-input {
	flex: 1;
	font-size: 30rem;
	/*justify-content: center;*/
	align-items: center;
}
</style>
