<template>
<div class="body">
<div class="xx">
      <div class="xx-h">
          <div class="xx-h-item"><span class="xx-h-txt">注数 145</span></div>
          <div class="xx-h-item"><span class="xx-h-txt">方案金额 8544</span></div>
          <div class="xx-h-item xx-h-zj"><span class="xx-h-zj-txt">已中4等奖</span></div>
      </div>
      <div class="xx-c">

         <div class="xx-c-l"><span class="xx-c-l-txt">前区</span></div>
         <div class="xx-c-r">
             <div class="xx-c-r-ball red-ball"><span class="xx-c-r-ball-txt">01</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">02</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">03</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">04</span></div>
             <div class="xx-c-r-ball red-ball"><span class="xx-c-r-ball-txt">05</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">06</span></div>
             <div class="xx-c-r-ball red-ball"><span class="xx-c-r-ball-txt">07</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">08</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">09</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">10</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">11</span></div>
             <div class="xx-c-r-ball"><span class="xx-c-r-ball-txt">12</span></div>

         </div>

      </div>


      <div class="xx-c">

         <div class="xx-c-l"><span class="xx-c-l-txt">后区</span></div>
         <div class="xx-c-r">
             <div class="xx-c-r-ball-b"><span class="xx-c-r-ball-txt">01</span></div>
             <div class="xx-c-r-ball-b"><span class="xx-c-r-ball-txt">02</span></div>
             <div class="xx-c-r-ball-b"><span class="xx-c-r-ball-txt">03</span></div>
             <div class="xx-c-r-ball-b blue-ball"><span class="xx-c-r-ball-txt">04</span></div>
             <div class="xx-c-r-ball-b"><span class="xx-c-r-ball-txt">05</span></div>
             <div class="xx-c-r-ball-b"><span class="xx-c-r-ball-txt">06</span></div>


         </div>

      </div>
<div>
    <span class="kjhm"><span>开奖号码：</span> <span class="kj-red">02 09 16 26 30 </span><span class="kj-blue">02 12</span></span>

</div>


   </div>


</div>
</template>
<style scoped>
div {
  display: flex;
  font-size: 30rem;
}
.body {
  background-color: white;
  padding: 20rem;
  flex-direction: column;
}
.xx {
  border: 2px solid #dddddd;
  /* height: 300px; */
  border-radius: 10px;
  flex-direction: column;
  padding: 20px;
}
.xx-h {
  flex-direction: row;
  border-bottom-width: 2px;
  border-bottom-color: #eeeeee;
  border-bottom-style: solid;
}
.xx-h-item {
  width: 0;
  flex: 1;
}
.xx-h-zj {
  justify-content: flex-end;
}
.xx-h-zj-txt {
  color: red;
  font-size: 24px;
  line-height: 80px;
}
.xx-h-txt {
  font-size: 24px;
  color: #999999;
  line-height: 80px;
}
.xx-c {
  /*border: 1px solid red;*/
  flex-direction: row;
}
.xx-c-l {
  width: 100rem;
}
.xx-c-l-txt {
  font-size: 25rem;
  line-height: 100rem;
}
.xx-c-r {
  flex: 1;
  flex-wrap: wrap;
}

.xx-c-r-ball {
  width: 70rem;
  height: 70rem;
  border-radius: 35rem;
  background-color: #f5bfbf;
  margin: 8rem;
  justify-content: center;
  align-items: center;
}

.xx-c-r-ball-b {
  width: 70rem;
  height: 70rem;
  border-radius: 35rem;
  background-color: #c7d8f5;
  margin: 8rem;
  justify-content: center;
  align-items: center;
}
.xx-c-r-ball-txt {
  font-size: 30rem;
  color: #ffffff;
}
.zq-xx-rq {
  justify-content: center;
  align-items: center;
  width: 80rem;
}
.zq-xx-rq-txt {
  color: green;
  font-size: 35rem;
}

.zq-xx-c-item {
  flex: 1;
  width: 0;
  justify-content: center;
  align-items: center;
}
.team-name {
  font-size: 35px;
  color: #333333;
}
.zq-xx-option {
  height: 60px;
  width: 160px;
  /*border: 1px solid red;*/
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 5px;
}
.o-selected {
  background-color: red;
}
.n-selected {
  color: #ffffff;
}

.home-flag {
  color: #888888;
  font-size: 25px;
}

.red-ball {
  background-color: red;
}
.blue-ball {
  background-color: #4f8bee;
}

.kjhm {
    font-size:28rem;
    line-height:50rem;
}
.kj-red {
color: red;
}
.kj-blue {
    color:#4f8bee
}

</style>

