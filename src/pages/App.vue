<template>
    <div id="app" class="l-full">
        <router-view v-if="serverTime"></router-view>
    </div>
</template>
<script>
export default {
  computed: {
    serverTime() {
      return this.$store.state.serverTime;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("initWebsocket");
      await this.$store.dispatch("getServerTime");
    } catch (e) {
      setTimeout(() => {
        location.reload();
      }, 5000)
    }
    
    
  }
};
</script>
<style>
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
table,
th,
td,
form,
fieldset,
legend,
input,
textarea,
button,
select {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
em,
i {
  font-style: normal;
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}

.l-box-center {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.l-box-vertical-center {
  display: -webkit-box;
  -webkit-box-align: center;
  display: flex;
  align-items: center;
  -webkit-box-orient: horizontal;
  flex-flow: row;
}

.l-box-vertical-center-justify {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  flex-flow: row;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.l-box-vertical-center-begin {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  flex-flow: row;
  -webkit-box-align: center;
  -webkit-box-pack: start;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.l-box-vertical-center-end {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  flex-flow: row;
  -webkit-box-align: center;
  -webkit-box-pack: end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.l-box-horizontal-center {
  display: -webkit-box;
  -webkit-box-pack: center;
  display: flex;
  justify-content: center;
  -webkit-box-orient: horizontal;
  flex-flow: row;
}

.l-trans-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.l-flex-column {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  display: flex;
  flex-flow: column;
  height: 100%;
}

.l-flex-row {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  display: flex;
  flex-flow: row;
  width: 100%;
}

.l-flex-1 {
  -webkit-box-flex: 1;
  flex: 1;
  overflow: hidden;
}

.l-scroll-y {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.l-full {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.l-relative {
  position: relative;
}

.l-z-index-1 {
  z-index: 1;
}

.l-z-index-2 {
  z-index: 2;
}

.l-z-index-0 {
  z-index: 0;
}

.l-w-0 {
  width: 0;
}

.l-text-center {
  text-align: center;
}

.l-h-0 {
  height: 0;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  font-size: 14px;
}
</style>
