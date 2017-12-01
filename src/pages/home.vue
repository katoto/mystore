<template>
<div class="container">
	<tabs></tabs>
	<div class="content">
		<search></search>

		<recomend></recomend>
		<rqzj></rqzj>


		<hot-race></hot-race>

		<div class="jxtd">
			<div class="jxtd-header">
				<div class="jxtd-h-l"><span class="jxtd-h-l-txt">精选推单</span></div>
				<div class="jxtd-h-r"><span class="jxtd-h-l-txt">更多</span></div>
			</div>
			<div class="jxtd-list">
				<jxtd-item></jxtd-item>
				<jxtd-item></jxtd-item>
				<jxtd-item></jxtd-item>
			</div>

		</div>


	</div>



</div>
</template>
<script>
import jxtdItem from '~components/home/jxtd-item.vue'
import hotRace from '~components/home/hot-race.vue'
import recomend from '~components/home/recomend.vue'
import search from '~components/home/search.vue'
import rqzj from '~components/home/rqzj.vue'
import tabs from '~components/home/tabs.vue'
 export default {
	 components: {
		 jxtdItem, hotRace, recomend, search, rqzj, tabs
	 }
 }

</script>
<style scoped>


.container, .content {
	/*height: 100%;*/
	flex-direction: column;
	background-color: #dddddd;


}
.content {
		margin-top: 80rem;
}

/*------------------------*/

.jxtd {
	margin: 20px 0;
	padding: 0 20rem;
	flex-direction: column;
	background-color: white;
}

.jxtd-header {
	height: 50rem;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 2px;
	border-bottom-color: #DDDDDD;
	border-bottom-style: solid;

}

.jxtd-h-l-txt,
.jxtd-h-l-txt {
	font-size: 25rem;
}

.jxtd-list {
	flex-direction: column;
}


</style>
