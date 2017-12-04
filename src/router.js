/**
 * Created by lichun on 2017/5/10.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '~pages/home.vue'
import expertList from '~pages/expertList.vue'
// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/list',
            component: expertList
        },
        {
            path: '*',
            redirect: '/list'
        }

    ]
})
