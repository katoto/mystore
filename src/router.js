/**
 * Created by lichun on 2017/5/10.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '~pages/list'
// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/bhlist',
            component: List
        },
        {
            path: '*',
            redirect: '/bhlist'
        }

    ]
})
