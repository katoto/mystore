/**
 * Created by lichun on 2017/5/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// home  first tab
import Home from '~pages/home/home.vue'

// const Test = () => import('./pages/Test.vue' /* webpackChunkName: "test" */)
const Login = () => import('~pages/Login' /* webpackChunkName: "chunks/Login" */)

const xtManage = () => import('~pages/home/xtManage/xtManage.vue' /* webpackChunkName: "chunks/home/xtManage/xtManage.vue" */)

const xtSet = () => import('~pages/home/xtManage/xtSet.vue' /* webpackChunkName: "chunks/home/xtManage/xtSet.vue" */)
const xsSet = () => import('~pages/home/xtManage/xsSet.vue' /* webpackChunkName: "chunks/home/xtManage/xsSet.vue" */)
const userSet = () => import('~pages/home/xtManage/userSet.vue' /* webpackChunkName: "chunks/home/xtManage/userSet.vue" */)
const userIP = () => import('~pages/home/xtManage/userIP.vue' /* webpackChunkName: "chunks/home/xtManage/userIP.vue" */)
const htRun = () => import('~pages/home/xtManage/htRun.vue' /* webpackChunkName: "chunks/home/xtManage/htRun.vue" */)
const xtLog = () => import('~pages/home/xtManage/xtLog.vue' /* webpackChunkName: "chunks/home/xtManage/xtLog.vue" */)

// 2
const tgyManage = () => import('~pages/home/tgyManage/tgyManage.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyManage.vue" */)
const tgyChild = () => import('~pages/home/tgyManage/tgyChild.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChild.vue" */)

Vue.use(VueRouter)
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
                        {
                            path: 'xsSet',
                            component: xsSet
                        },
                        {
                            path: 'userSet',
                            component: userSet
                        },
                        {
                            path: 'userIP',
                            component: userIP
                        },
                        {
                            path: 'htRun',
                            component: htRun
                        },
                        {
                            path: 'xtLog',
                            component: xtLog
                        }
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
                        }
                    ]
                },
                {
                    path: '*',
                    redirect: '/home/xtManage/xtSet'
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '*',
            redirect: '/home/xtManage/xtSet'
        }

    ]
})
