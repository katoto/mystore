<template>
    <div class="container">
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
		<div class="search">
			<div class="search-box">
				<div class="search-icon-w"><div class="search-icon"></div></div>
				<div class="search-input">
					<span>搜索框</span>

				</div>

			</div>
		</div>

		<div class="recomend">
			<div class="recomend-wrap"></div>


		</div>

		<div class="rqzj">
			<div class="rqzj-header">
				<div class="rqzj-h-l"><span>人气专家</span></div>
				<div class="rqzj-h-r"><span>更多</span></div>
			</div>
			<div class="rqzj-content">
				<div class="rqzj-c-item"></div>
				<div class="rqzj-c-item"></div>
				<div class="rqzj-c-item"></div>
				<div class="rqzj-c-item"></div>
			</div>
			<div class="rqzj-footer"><span class="rqzj-f-txt">快报 吴彦祖3分钟前购买了秦昭解盘的推荐</span></div>

		</div>

		<div class="rmss">
			<div class="rmss-header">
				<div class="rmss-h-l"><span>热门赛事</span></div>
				<div class="rmss-h-r"><span>换一换</span></div>
			</div>
			<div class="rmss-desc">
				<div class="rmss-desc-l"><span class="rmss-desc-l-txt">桥村太少， 啊呀可笑啊呀可笑GFCvs弥勒佛而（复人就是账单）</span></div>
				<div class="rmss-desc-r"><span class="rmss-desc-r-txt">付费</span></div>

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
						<span class="rmss-c-c-l-txt">利物浦</span><span class="rmss-c-c-img"></span>
					</div>
					<div class="rmss-c-c-c">
						<span class="rmss-c-c-c-txt">金杯赛</span>
					</div>

					<div class="rmss-c-c-r">
						<span class="rmss-c-c-img"></span><span class="rmss-c-c-r-txt">利物浦</span>
					</div>

				</div>

			</div>


		</div>


    </div>
</template>
<style scoped>
	div {
		display: flex;
	}
	.red {
		color: red;
	}
    .container {
		height: 100%;
		flex-direction: column;
		background-color: #dddddd;

    }
	 .tabs {
	 	height: 80rem;
		/*border: 1px solid red;*/
		flex-direction: row;
		background: white;
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
	 	height: 75rem;
		border-bottom: 10rem solid red;
	 }
	 .tab-cur {
	 	border-bottom: 2px solid red;
	 }

	 .search {
	 	background: white;
		height: 200rem;
		justify-content: center;
		align-items: center;
		/*margin: .2rem 0;*/
	 }

	.search-box{
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
	.search-icon{
		width: 40rem;
		height: 40rem;
		background-image: url(~assets/icon-search.png);
		background-repeat: no-repeat;
		background-size: contain;
	}
	.search-input {
		flex: 1;
		font-size: 30rem;
		/*justify-content: center;*/
		align-items: center;
	}

	.recomend{
		justify-content: center;
		align-items: center;
		border: 1px solid red;
		background: white;
		height: 400rem;
	}
	.recomend-wrap {
		border: 1px solid red;
		height: 250rem;
		width: 600rem;
	}
	.rqzj{
		margin: 20rem 0;
		padding: 0 20rem;
		flex-direction: column;
		background: white;
	}
	.rqzj-header{

		border-bottom: 1px solid green;
		flex-direction: row;
		justify-content: space-between;


	}
	.rqzj-h-l,.rqzj-h-r {
		border: 1px solid blue;
		line-height: 40rem;
		font-size: 40rem;
	}
	.rqzj-content {
		height: 200rem;
		border: 1px solid blue;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.rqzj-c-item {
		height: 100rem;
		width: 100rem;
		border: 1px solid red;
	}
	.rqzj-footer {

	}
	.rqzj-f-txt{
		line-height: 40rem;
		font-size: 30rem;
	}



	/*------------------------*/
	.rmss{
		margin: 20rem 0;
		padding: 0 20rem;
		flex-direction: column;
		background: white;
	}
	.rmss-header{

		border-bottom: 1px solid green;
		flex-direction: row;
		justify-content: space-between;


	}
	.rmss-h-l,.rmss-h-r {
		border: 1px solid blue;
		line-height: 40rem;
		font-size: 40rem;
	}
	.rmss-desc {
		flex-direction: row;

	}
	.rmss-desc-l {
		flex: 1;
		padding: 20rem;
	}
	.rmss-desc-l-txt{
		font-size: 30rem;
	}
	.rmss-desc-r {
		width:　1rem;
		border: 1px solid red;
	}
	.rmss-desc-r-txt {
		font-size: 30rem;
	}
	.rmss-tj {
		flex-direction: row;
		justify-content: space-between;
	}
	.rmss-tj-l, .rmss-tj-r{
		font-size: 30rem;
	}
	.rmss-content {
		border: 1px solid blue;
		height: 200rem;
		/*width: 6rem;*/
		/*margin: 0 auto;*/
		border-radius: 10rem;
		flex-direction: column;
	}
	.rmss-c-h{
		flex-direction: row;
		justify-content: space-between;
	}
	.rmss-c-h-l-txt, .rmss-c-h-r-txt {
		font-size: 30rem;
	}
	.rmss-c-c {
		flex-direction: row;
		height: 200rem;
		border: 1px solid red;
	}
	.rmss-c-c-l, .rmss-c-c-r{
		flex: .4;
		flex-direction: row;
		align-items: center;
	}
	.rmss-c-c-l {
		justify-content: flex-end;
	}
	.rmss-c-c-l-txt, .rmss-c-c-r-txt {
		font-size: 30rem;
	}
	.rmss-c-c-img {
		display: inline-block;
		width: 50rem;
		height: 50rem;
		border: 1px solid red;
	}
	.rmss-c-c-c {
		flex: .2;
		justify-content: center;
		align-items: center;
		border: 1px solid green;
	}
	.rmss-c-c-c-txt {
		font-size: 30rem;
	}

</style>
