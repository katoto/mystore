<template>
<div class="container">
    <div class="header">
        <div class="nav">
            <div class="nav-item-l" v-tap="{methods: change, tab: 0}">
                <span v-if="tab === 1" class="nav-item-txt">竞技彩专家</span>
                <div v-else class="nav-item-cur">
                    <span class="nav-item-txt red">竞技彩专家</span>
                </div>
            </div>
            <div class="nav-item-r" v-tap="{methods: change, tab: 1}">
                <span v-if="tab === 0" class="nav-item-txt">数字彩专家</span>
                <div v-else class="nav-item-cur">
                    <span class="nav-item-txt red">数字彩专家</span>
                </div>
            </div>
        </div>
        <div class="search">
            <input type="search" placeholder="Search">

        </div>

        </div>

    <div class="list">
<list-item></list-item>
<list-item></list-item>
<list-item></list-item>
<list-item></list-item>
<list-item></list-item>


    </div>


</div>
</template>

<script>
import listItem from '../components/expertList/listItem.vue'
export default {
    data () {
        return {
            tab: 1
        }
    },
    components: {
        listItem
    },
    methods: {
        change ({ tab = 0 }) {
            this.tab = tab
        }
    }
}
</script>

<style lang="css" scoped>
span {
  font-size: 30rem;
}
.red {
  color: red;
}
.header {
  flex-direction: column;
}
.nav {
  flex-direction: row;
  height: 100rem;
}
.nav-item-l {
  /* border: 1rem solid gray; */
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
.nav-item-r {
  /* border: 1rem solid gray; */
  flex: 1;
  align-items: center;
  margin-left: 20rem;
  justify-content: flex-start;
}

.nav-item-cur {
  height: 96rem;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-color: red;
  border-bottom-width: 4rem;
}

.search {
  height: 100rem;
  justify-content: center;
  align-items: center;
}
input {
  height: 60rem;
  width: 300rem;
  font-size: 30rem;
}
.list {
  flex-direction: column;
}
</style>
