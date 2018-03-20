/**
 * Created by xiezg on 2018/1/16.
 */

import { mapActions, mapMutations } from '~common/util'

const name = 'ybyz'
const state = {
    loginInfo: null,
    userList: null,
    selVipVal: null,

    updataybyzSearchFn: null
}

const mutationsInfo = mapMutations({
    updataybyzSearchFn (state, info) {
        // 充值之后更新上面的列表
        state.updataybyzSearchFn = info
    },
    //  new
    setSelVipVal (state, info) {
        state.selVipVal = info
    },
    setLoginInfo (state, info) {
        state.loginInfo = info
    },
    setLoginInfoConfig (state, config) {
        if (state.loginInfo) {
            state.loginInfo.config = config
        } else {
            console.error('commit Infoconfig error')
        }
    },
    setUserList (state, list) {
        state.userList = list
    }
}, name)

const actionsInfo = mapActions({
    async login ({dispatch, commit}, {name, pass}) {
        try {
            const args = await dispatch('invoke', {method: 'adminService/adminLogin', args: [name, pass, false, true, 0]})
            const result = args[0]
            if (result.success) {
                commit(mTypes.setLoginInfo, result)
                console.log(JSON.stringify(result))
            } else {
                console.log(result.message)
                throw new Error(result.message)
            }
        } catch (e) {
            throw e
        }
    },
    // copy 1
    async getUserList ({dispatch, commit}, args) {
        let result = await dispatch('invoke', {method: 'memberService/getUserList', args: [name, null, false, true, 0]})
        commit(mTypes.setUserList, result[0])
    },
    // 获取会员列表
    //     客户端发送: method: memberService/getUserList; version: 1.2.14; time: 1.5153050774E12;
    //      args: [0,Pager [pageNumber=1, pageSize=8, totalCount=0, pageCount=0, orderBy=, order=,
    //     list=null],]
    async getVipUserList ({dispatch, commit}, args = [ 0, {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 8, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/getUserList',
            args
        })
        return argsData[0]
    },

    // 按账号搜索会员  搜索条件 wang
    async searchUser ({dispatch, commit}, args = [ 'wang', 0, 0 ]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/searchUser',
            args
        })
        return argsData[0]
    },
    // 会员充值
    // 客户端发送: method: memberService/pay; version: 1.2.14;
    // time: 1.51530669327E12;
    // args: [3,5000,0,]  //args里内容3为用户id
    // 客户端收到： {"args":[{"message":"","plusGold":5000,"type":0,
    //     "success":true}]
    async memberPay ({dispatch, commit}, args = [ 0, 1000, 0 ]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/pay',
            args
        })
        return argsData[0]
    },
    // 充值查询
    async getUserPayLog ({dispatch, commit}, args = [ 3, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'payLogService/getUserPayLog',
            args
        })
        return argsData[0]
    },
    // 赠送查询
    async getUserAward ({dispatch, commit}, args = [ 3, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'userAwardService/getUserAward',
            args
        })
        return argsData[0]
    },
    // 扣除查询
    async getUserMinus ({dispatch, commit}, args = [ 3, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'payLogService/getUserMinus',
            args
        })
        return argsData[0]
    },
    // 游玩记录
    async getUserPlayLog ({dispatch, commit}, args = [ 3, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/getUserPlayLog',
            args
        })
        return argsData[0]
    },
    // 会员登录记录
    async getUserLoginRec ({dispatch, commit}, args = [ 3, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'loginRecordService/getUserLoginRec',
            args
        })
        return argsData[0]
    },

    // 礼品兑换
    async getUserExpiry ({dispatch, commit}, args = [ 67 ]) {
        const argsData = await dispatch('invoke', {
            method: 'payLogService/getUserExpiry',
            args
        })
        return argsData[0]
    },

    // 验证密码
    async enterSelfPwd ({dispatch, commit}, args = [ '888888' ]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/enterSelfPwd',
            args
        })
        return argsData[0]
    },

    // 处理兑换
    async expiry ({dispatch, commit}, args = [67, 1000, 1]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/expiry',
            args
        })
        return argsData[0]
    },
    // 一般运作兑奖
    async getUserExchangeLog ({dispatch, commit}, args = [67, '2018-03-01', '2018-03-19', {'list': [],
        'order': '',
        'orderBy': '',
        'pageCount': 0,
        'pageNumber': 1,
        'pageSize': 6,
        'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'payLogService/getUserExchangeLog',
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
