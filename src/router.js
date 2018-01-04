/**
 * Created by lichun on 2017/5/10.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '~pages/home.vue'
import expertList from '~pages/expertList.vue'
import detail from '~pages/detail.vue'
import expert from '~pages/expert.vue'
// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)
// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)

const Login = () => import('~pages/Login'  /* webpackChunkName: "chunks/Login" */)

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
            path: '/login',
            component: Login
        },
        {
            path: '/detail',
            component: detail
        },
        {
            path: '/expert',
            component: expert
        },
        {
            path: '*',
            redirect: '/home'
        }

    ]
})
