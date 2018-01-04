/**
 * Created by lichun on 2017/5/10.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import expertList from '~pages/expertList.vue'
import detail from '~pages/detail.vue'
import expert from '~pages/expert.vue'
// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)
const Login = () => import('~pages/Login'  /* webpackChunkName: "chunks/Login" */)

// home  first tab
import Home from '~pages/home/home.vue'
const xtManage = () => import('~pages/home/xtManage/xtManage.vue'  /* webpackChunkName: "chunks/home/xtManage/xtManage.vue" */);
const xtSet = () => import('~pages/home/xtManage/xtSet.vue'  /* webpackChunkName: "chunks/home/xtManage/xtSet.vue" */);

// 2
const tgyManage = () => import('~pages/home/tgyManage/tgyManage.vue'  /* webpackChunkName: "chunks/home/tgyManage/tgyManage.vue" */);
const tgyChild = () => import('~pages/home/tgyManage/tgyChild.vue'  /* webpackChunkName: "chunks/home/tgyManage/tgyChild.vue" */);

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/home',
            component: Home,
            requiresAuth: true,
            children: [
                {
                    path: 'xtManage',
                    component: xtManage,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'xtSet',
                            component: xtSet
                        },
                    ]
                },
                {
                    path: 'tgyManage',
                    component: tgyManage,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'tgyChild',
                            component: tgyChild
                        },
                    ]
                },
                {
                    path: '*',
                    redirect: '/home/xtManage/xtSet'
                }
            ]
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
            redirect: '/home/xtManage/xtSet'
        }

    ]
})
