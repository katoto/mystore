<template>
<div class="list-item">
    <div class="list-item-l">
        <div>
            <span>图片</span>
        </div>

    </div>

    <div class="list-item-c">
        <div class="list-item-c-t">
            <span class="list-item-c-t-txt">豪哥解盘</span>
        </div>
        <div class="list-item-c-b"><span class="list-item-c-b-txt">最高战绩2</span></div>

    </div>

    <div class="list-item-r">
        <div class="list-item-r-btn"><span class="list-item-r-btn-txt">关注</span></div>
    </div>



</div>
</template>
<style>
.list-item {
  height: 150rem;
  border: 1rem solid red;
  flex-direction: row;

}
.list-item-l {
  border-right: 1rem solid red;
  width: 150rem;
  justify-content: center;
  align-items: center;
}
.list-item-c {
  flex: 1;
}
.list-item-c {
flex-direction:column;
}
.list-item-c-t,.list-item-c-b {
    flex: 1;
border-left: 1rem solid red;
}
.list-item-c-t-txt {
    font-size:40rem;
    line-height:75rem;
}

.list-item-c-b {

  align-items: center;
}
.list-item-c-b-txt {
    font-size:30rem;
    color:red;
    line-height:50rem;
    border: 1rem solid red;
}

.list-item-r {
  width: 30%;
  border-left: 1rem solid red;
  justify-content: center;
  align-items: center;
}
.list-item-r-btn {
  width: 150rem;
  height: 100rem;
  border: 1rem solid red;
  justify-content: center;
  align-items: center;
}
</style>

