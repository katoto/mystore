/**
 * Created by lichun on 2017/1/18.
 */
import 'es6-promise/auto'
import Vue from 'vue'
import App from './pages/App.vue'
import storeFactory from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import vueTap from 'v-tap'
Vue.use(vueTap)
const store = storeFactory()
sync(store, router)

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }
