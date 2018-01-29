/**
 * Created by xiezg on 2018/1/16.
 */
import { mapActions, mapMutations } from '~common/util'

const name = 'allReport'
const state = {

    fadfadf: null,
    userList: null,
    selNoticeVal: null, // 公告管理
    selEmailVal: null //  邮件管理
}

const mutationsInfo = mapMutations({
//  new
    setSelVipVal (state, info) {
        state.selVipVal = info
    }

}, name)

const actionsInfo = mapActions({
    //  每日充值报告
    async getPayReport ({dispatch, commit}, args = ['2017-12-25', 2]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getPayReport',
            args
        })
        return argsData[0]
    },
    // 兑奖查询
    async getExchangeReport ({dispatch, commit}, args = ['2018-01-27', 2]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getExchangeReport',
            args
        })
        return argsData[0]
    },
    // 每日账单详情
    async getDayAccount ({dispatch, commit}, args = ['2018-01-27', 0]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getDayAccount',
            args
        })
        return argsData[0]
    },
    // 每月账单
    async getMonthAccount ({dispatch, commit}, args = ['2018-01', 0]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getMonthAccount',
            args
        })
        return argsData[0]
    },
    // 每月账单 删除
    async deleteMonthAccount ({dispatch, commit}, args = ['2018-01']) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/deleteMonthAccount',
            args
        })
        return argsData[0]
    },
    //  6.游戏运行统计  第一个参数时间 第二个参数游戏类型  第三个参数查询范围固定-1即可
    async getRunStatistics ({dispatch, commit}, args = ['2017-12', -1, -1]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getRunStatistics',
            args
        })
        return argsData[0]
    },
    // 7.营业日统计  （每更记录 操作详情这两个放一下）
    async getMonthBusine ({dispatch, commit}, args = ['2018-01']) {
        const argsData = await dispatch('invoke', {
            method: 'busineService/getMonthBusine',
            args
        })
        return argsData[0]
    },
    // 7.新注册分析
    async getNewRegist ({dispatch, commit}, args = ['2018-01-01', '2018-01-27', 0]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getNewRegist',
            args
        })
        return argsData[0]
    },
    // 7.日活跃分析
    async getDailyActive ({dispatch, commit}, args = ['2018-01-01', '2018-01-27', 0]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getDailyActive',
            args
        })
        return argsData[0]
    },
    // 同时在线分析
    async getOnlineCount ({dispatch, commit}, args = ['2017-12-01', '2018-01-27', 2]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getOnlineCount',
            args
        })
        return argsData[0]
    },
    // .新注册留存分析
    async getStay ({dispatch, commit}, args = ['2017-12-01', '2018-01-27', 2]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getStay',
            args
        })
        return argsData[0]
    },
    // .付费分析
    async getCharge ({dispatch, commit}, args = ['2017-12-01', '2018-01-27', 2]) {
        const argsData = await dispatch('invoke', {
            method: 'statementService/getCharge',
            args
        })
        return argsData[0]
    }

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
