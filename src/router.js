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

// 3
const ybyz = () => import('~pages/home/ybyz/ybyz.vue' /* webpackChunkName: "chunks/home/ybyz/ybyz.vue" */)
const rentSearch = () => import('~pages/home/ybyz/rentSearch.vue' /* webpackChunkName: "chunks/home/ybyz/rentSearch.vue" */)
// 3.1
const vipOperate = () => import('~pages/home/ybyz/vipOperate/vipOperate.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/vipOperate.vue" */)
const giftExchange = () => import('~pages/home/ybyz/vipOperate/giftExchange.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giftExchange.vue" */)
const flatRent = () => import('~pages/home/ybyz/vipOperate/flatRent.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/flatRent.vue" */)
const rentReturn = () => import('~pages/home/ybyz/vipOperate/rentReturn.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rentReturn.vue" */)
const rechargeSearch = () => import('~pages/home/ybyz/vipOperate/rechargeSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rechargeSearch.vue" */)
const DJSearch = () => import('~pages/home/ybyz/vipOperate/DJSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/DJSearch.vue" */)
const giveSearch = () => import('~pages/home/ybyz/vipOperate/giveSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giveSearch.vue" */)
const delSearch = () => import('~pages/home/ybyz/vipOperate/delSearch.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/delSearch.vue" */)
const rentList = () => import('~pages/home/ybyz/vipOperate/rentList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/rentList.vue" */)
const playList = () => import('~pages/home/ybyz/vipOperate/playList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/playList.vue" */)
const vipLoginList = () => import('~pages/home/ybyz/vipOperate/vipLoginList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/vipLoginList.vue" */)
const BPList = () => import('~pages/home/ybyz/vipOperate/BPList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/BPList.vue" */)
const bindingList = () => import('~pages/home/ybyz/vipOperate/bindingList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/bindingList.vue" */)
const giveGoodsList = () => import('~pages/home/ybyz/vipOperate/giveGoodsList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/giveGoodsList.vue" */)
const weeklyList = () => import('~pages/home/ybyz/vipOperate/weeklyList.vue' /* webpackChunkName: "chunks/home/ybyz/vipOperate/weeklyList.vue" */)

// 4
const htyz = () => import('~pages/home/htyz/htyz.vue' /* webpackChunkName: "chunks/home/htyz/htyz.vue" */)
const gameHomeGL = () => import('~pages/home/htyz/gameHomeGL.vue' /* webpackChunkName: "chunks/home/htyz/gameHomeGL.vue" */)
const gameNoticeGL = () => import('~pages/home/htyz/gameNoticeGL.vue' /* webpackChunkName: "chunks/home/htyz/gameNoticeGL.vue" */)
const actGL = () => import('~pages/home/htyz/actGL.vue' /* webpackChunkName: "chunks/home/htyz/actGL.vue" */)
const logNoticeGL = () => import('~pages/home/htyz/logNoticeGL.vue' /* webpackChunkName: "chunks/home/htyz/logNoticeGL.vue" */)
const emailXT = () => import('~pages/home/htyz/emailXT.vue' /* webpackChunkName: "chunks/home/htyz/emailXT.vue" */)
const vvipGL = () => import('~pages/home/htyz/vvipGL.vue' /* webpackChunkName: "chunks/home/htyz/vvipGL.vue" */)
const businessGL = () => import('~pages/home/htyz/businessGL.vue' /* webpackChunkName: "chunks/home/htyz/businessGL.vue" */)
const dataBackup = () => import('~pages/home/htyz/dataBackup.vue' /* webpackChunkName: "chunks/home/htyz/dataBackup.vue" */)

// 5
const allReport = () => import('~pages/home/allReport/allReport.vue' /* webpackChunkName: "chunks/home/allReport/allReport.vue" */)
const dailyRecharge = () => import('~pages/home/allReport/dailyRecharge.vue' /* webpackChunkName: "chunks/home/allReport/dailyRecharge.vue" */)
const dailyPrize = () => import('~pages/home/allReport/dailyPrize.vue' /* webpackChunkName: "chunks/home/allReport/dailyPrize.vue" */)
const dailyAccount = () => import('~pages/home/allReport/dailyAccount.vue' /* webpackChunkName: "chunks/home/allReport/dailyAccount.vue" */)
const monthAccount = () => import('~pages/home/allReport/monthAccount.vue' /* webpackChunkName: "chunks/home/allReport/monthAccount.vue" */)
const gameRun = () => import('~pages/home/allReport/gameRun.vue' /* webpackChunkName: "chunks/home/allReport/gameRun.vue" */)
const businessAccount = () => import('~pages/home/allReport/businessAccount.vue' /* webpackChunkName: "chunks/home/allReport/businessAccount.vue" */)
const regisTotal = () => import('~pages/home/allReport/regisTotal.vue' /* webpackChunkName: "chunks/home/allReport/regisTotal.vue" */)
const pvTotal = () => import('~pages/home/allReport/pvTotal.vue' /* webpackChunkName: "chunks/home/allReport/pvTotal.vue" */)
const onlineTotal = () => import('~pages/home/allReport/onlineTotal.vue' /* webpackChunkName: "chunks/home/allReport/onlineTotal.vue" */)
const keepOnline = () => import('~pages/home/allReport/keepOnline.vue' /* webpackChunkName: "chunks/home/allReport/keepOnline.vue" */)
const payTotal = () => import('~pages/home/allReport/payTotal.vue' /* webpackChunkName: "chunks/home/allReport/payTotal.vue" */)

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
