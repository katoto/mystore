/**
 * Created by lichun on 2017/5/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// home  first tab
import Home from '~pages/home/home.vue'

import test from '~pages/test.vue'

const Login = () => import('~pages/Login' /* webpackChunkName: "chunks/Login" */)

const xtManage = () => import('~pages/home/xtManage/xtManage.vue' /* webpackChunkName: "chunks/home/xtManage/xtManage" */)

const xtSet = () => import('~pages/home/xtManage/xtSet.vue' /* webpackChunkName: "chunks/home/xtManage/xtSet" */)
const xsSet = () => import('~pages/home/xtManage/xsSet.vue' /* webpackChunkName: "chunks/home/xtManage/xsSet" */)
const userSet = () => import('~pages/home/xtManage/userSet.vue' /* webpackChunkName: "chunks/home/xtManage/userSet" */)
const userIP = () => import('~pages/home/xtManage/userIP.vue' /* webpackChunkName: "chunks/home/xtManage/userIP" */)
const htRun = () => import('~pages/home/xtManage/htRun.vue' /* webpackChunkName: "chunks/home/xtManage/htRun" */)
const xtLog = () => import('~pages/home/xtManage/xtLog.vue' /* webpackChunkName: "chunks/home/xtManage/xtLog" */)

// 2
const tgyManage = () => import('~pages/home/tgyManage/tgyManage.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyManage" */)
const tgyChild = () => import('~pages/home/tgyManage/tgyChild.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChild" */)
const tgyChildCz = () => import('~pages/home/tgyManage/tgyChildCz.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildCz" */)
const tgyChildCzcx = () => import('~pages/home/tgyManage/tgyChildCzcx.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildCzcx" */)
const tgyChildDh = () => import('~pages/home/tgyManage/tgyChildDh.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildDh" */)
const tgyChildDjcx = () => import('~pages/home/tgyManage/tgyChildDjcx.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildDjcx" */)
const tgyChildIpjl = () => import('~pages/home/tgyManage/tgyChildIpjl.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildIpjl" */)
const tgyChildYwjl = () => import('~pages/home/tgyManage/tgyChildYwjl.vue' /* webpackChunkName: "chunks/home/tgyManage/tgyChildYwjl" */)

// 3
const ybyz = () => import('~pages/home/ybyz/ybyz.vue' /* webpackChunkName: "chunks/home/ybyz/ybyz" */)
const rentSearch = () => import('~pages/home/ybyz/rentSearch.vue' /* webpackChunkName: "chunks/home/ybyz/rentSearch" */)
// 3.1
const vipOperate = () => import('~pages/home/ybyz/vipOperate/vipOperate.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/vipOperate" */)
const giftExchange = () => import('~pages/home/ybyz/vipOperate/giftExchange.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giftExchange" */)
const flatRent = () => import('~pages/home/ybyz/vipOperate/flatRent.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/flatRent" */)
const rentReturn = () => import('~pages/home/ybyz/vipOperate/rentReturn.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rentReturn" */)
const rechargeSearch = () => import('~pages/home/ybyz/vipOperate/rechargeSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rechargeSearch" */)
const DJSearch = () => import('~pages/home/ybyz/vipOperate/DJSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/DJSearch" */)
const giveSearch = () => import('~pages/home/ybyz/vipOperate/giveSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giveSearch" */)
const delSearch = () => import('~pages/home/ybyz/vipOperate/delSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/delSearch" */)
const rentList = () => import('~pages/home/ybyz/vipOperate/rentList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rentList" */)
const playList = () => import('~pages/home/ybyz/vipOperate/playList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/playList" */)
const vipLoginList = () => import('~pages/home/ybyz/vipOperate/vipLoginList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/vipLoginList" */)
const BPList = () => import('~pages/home/ybyz/vipOperate/BPList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/BPList" */)
const bindingList = () => import('~pages/home/ybyz/vipOperate/bindingList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/bindingList" */)
const giveGoodsList = () => import('~pages/home/ybyz/vipOperate/giveGoodsList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giveGoodsList" */)
const weeklyList = () => import('~pages/home/ybyz/vipOperate/weeklyList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/weeklyList" */)

// 4
const htyz = () => import('~pages/home/htyz/htyz.vue' /* webpackChunkName: "chunks/home/htyz/htyz" */)
const gameHomeGL = () => import('~pages/home/htyz/gameHomeGL.vue' /* webpackChunkName: "chunks/home/htyz/gameHomeGL" */)
const gameNoticeGL = () => import('~pages/home/htyz/gameNoticeGL.vue' /* webpackChunkName: "chunks/home/htyz/gameNoticeGL" */)
const actGL = () => import('~pages/home/htyz/actGL.vue' /* webpackChunkName: "chunks/home/htyz/actGL" */)
const logNoticeGL = () => import('~pages/home/htyz/logNoticeGL.vue' /* webpackChunkName: "chunks/home/htyz/logNoticeGL" */)
const emailXT = () => import('~pages/home/htyz/emailXT.vue' /* webpackChunkName: "chunks/home/htyz/emailXT" */)
const vvipGL = () => import('~pages/home/htyz/vvipGL.vue' /* webpackChunkName: "chunks/home/htyz/vvipGL" */)
const businessGL = () => import('~pages/home/htyz/businessGL.vue' /* webpackChunkName: "chunks/home/htyz/businessGL" */)
const dataBackup = () => import('~pages/home/htyz/dataBackup.vue' /* webpackChunkName: "chunks/home/htyz/dataBackup" */)

// 5
const allReport = () => import('~pages/home/allReport/allReport.vue' /* webpackChunkName: "chunks/home/allReport/allReport" */)
const dailyRecharge = () => import('~pages/home/allReport/dailyRecharge.vue' /* webpackChunkName: "chunks/home/allReport/dailyRecharge" */)
const dailyPrize = () => import('~pages/home/allReport/dailyPrize.vue' /* webpackChunkName: "chunks/home/allReport/dailyPrize" */)
const dailyAccount = () => import('~pages/home/allReport/dailyAccount.vue' /* webpackChunkName: "chunks/home/allReport/dailyAccount" */)
const monthAccount = () => import('~pages/home/allReport/monthAccount.vue' /* webpackChunkName: "chunks/home/allReport/monthAccount" */)
const gameRun = () => import('~pages/home/allReport/gameRun.vue' /* webpackChunkName: "chunks/home/allReport/gameRun" */)
const businessAccount = () => import('~pages/home/allReport/businessAccount.vue' /* webpackChunkName: "chunks/home/allReport/businessAccount" */)
const regisTotal = () => import('~pages/home/allReport/regisTotal.vue' /* webpackChunkName: "chunks/home/allReport/regisTotal" */)
const pvTotal = () => import('~pages/home/allReport/pvTotal.vue' /* webpackChunkName: "chunks/home/allReport/pvTotal" */)
const onlineTotal = () => import('~pages/home/allReport/onlineTotal.vue' /* webpackChunkName: "chunks/home/allReport/onlineTotal" */)
const keepOnline = () => import('~pages/home/allReport/keepOnline.vue' /* webpackChunkName: "chunks/home/allReport/keepOnline" */)
const payTotal = () => import('~pages/home/allReport/payTotal.vue' /* webpackChunkName: "chunks/home/allReport/payTotal" */)

// 6
const onlinePay = () => import('~pages/home/onlinePay/onlinePay.vue' /* webpackChunkName: "chunks/home/onlinePay/onlinePay" */)

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
                            component: tgyChild,
                            children: [
                                {
                                    path: 'tgyChildCz',
                                    component: tgyChildCz
                                },
                                {
                                    path: 'tgyChildCzcx',
                                    component: tgyChildCzcx
                                },
                                {
                                    path: 'tgyChildDh',
                                    component: tgyChildDh
                                },
                                {
                                    path: 'tgyChildDjcx',
                                    component: tgyChildDjcx
                                },
                                {
                                    path: 'tgyChildIpjl',
                                    component: tgyChildIpjl
                                },
                                {
                                    path: 'tgyChildYwjl',
                                    component: tgyChildYwjl
                                },
                                {
                                    path: '/',
                                    redirect: tgyChildCz
                                }

                            ]
                        }
                    ]
                },
                {
                    path: 'ybyz',
                    component: ybyz,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'vipOperate',
                            component: vipOperate
                        },
                        {
                            path: 'rentSearch',
                            component: rentSearch
                        },
                        {
                            path: 'giftExchange',
                            component: giftExchange
                        },
                        {
                            path: 'rechargeSearch',
                            component: rechargeSearch
                        },
                        {
                            path: 'DJSearch',
                            component: DJSearch
                        },
                        {
                            path: 'giveSearch',
                            component: giveSearch
                        },
                        {
                            path: 'delSearch',
                            component: delSearch
                        },
                        {
                            path: 'playList',
                            component: playList
                        },
                        {
                            path: 'vipLoginList',
                            component: vipLoginList
                        }
                    ]
                },
                {
                    path: 'htyz',
                    component: htyz,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'gameHomeGL',
                            component: gameHomeGL
                        },
                        {
                            path: 'gameNoticeGL',
                            component: gameNoticeGL
                        },
                        {
                            path: 'actGL',
                            component: actGL
                        },
                        {
                            path: 'logNoticeGL',
                            component: logNoticeGL
                        },
                        {
                            path: 'emailXT',
                            component: emailXT
                        },
                        {
                            path: 'vvipGL',
                            component: vvipGL
                        },
                        {
                            path: 'businessGL',
                            component: businessGL
                        },
                        {
                            path: 'dataBackup',
                            component: dataBackup
                        }]
                },
                {
                    path: 'allReport',
                    component: allReport,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'dailyRecharge',
                            component: dailyRecharge
                        },
                        {
                            path: 'dailyPrize',
                            component: dailyPrize
                        },
                        {
                            path: 'dailyAccount',
                            component: dailyAccount
                        },
                        {
                            path: 'monthAccount',
                            component: monthAccount
                        },
                        {
                            path: 'gameRun',
                            component: gameRun
                        },
                        {
                            path: 'businessAccount',
                            component: businessAccount
                        },
                        {
                            path: 'regisTotal',
                            component: regisTotal
                        },
                        {
                            path: 'pvTotal',
                            component: pvTotal
                        },
                        {
                            path: 'onlineTotal',
                            component: onlineTotal
                        },
                        {
                            path: 'keepOnline',
                            component: keepOnline
                        },
                        {
                            path: 'payTotal',
                            component: payTotal
                        }
                    ]
                },
                {
                    path: 'onlinePay',
                    component: onlinePay,
                    meta: { requireAuth: true }
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
            path: '/test',
            component: test
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})
