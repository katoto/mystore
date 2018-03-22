/**
 * Created by sampson on 2017/5/10.
 */
// import ajax from '~common/ajax'
import { mapActions, mapMutations } from '~common/util'
import { mTypes } from '~store/user'

const name = 'tgyManager'
const state = {
    selTgyVal: null,

    updataSetPromoter: null
}
const actionsInfo = mapActions({

    // 推广员查询 第一个参数：0直属推广员  1非直属推广员
    async getPromoterList ({dispatch, commit}, args = [0, {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 8, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/getPromoterList',
            args
        })
        return argsData[0]
    },
    // 按字符串查找管理员 第一个参数 搜索字符串  第二个参数直属或非直属
    async searchPromoter ({dispatch, commit}, args = ['6', 0]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/searchPromoter',
            args
        })
        return argsData[0]
    },

    // 新增
    async addPromoter ({dispatch, commit}, args = ['111111', 'ArCSCNURPQa9SdUt', 'beizhu']) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/addPromoter',
            args
        })
        return argsData[0]
    },

    // 禁用
    async disablePromoter ({dispatch, commit}, args = [1]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/disablePromoter',
            args
        })
        return argsData[0]
    },

    // 解禁
    async enablePromoter ({dispatch, commit}, args = [1]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/enablePromoter',
            args
        })
        return argsData[0]
    },
    // 删除
    async deletePromoter ({dispatch, commit}, args = [1]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/deletePromoter',
            args
        })
        return argsData[0]
    },
    // 下级调整 1
    async getPromoterInfo ({dispatch, commit}, args = [2]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/getPromoterInfo',
            args
        })
        return argsData[0]
    },

    // 下级调整 2
    async parentPromoterList ({dispatch, commit}, args = [2]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/parentPromoterList',
            args
        })
        return argsData[0]
    },

    // 下级调整 3
    async updateChildrenParent ({dispatch, commit}, args = [2, 3]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/updateChildrenParent',
            args
        })
        return argsData[0]
    },
    // 密码重置
    async resetPromoterPwd ({dispatch, commit}, args = [2]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/resetPromoterPwd',
            args
        })
        return argsData[0]
    },

    // 备注修改
    async updatePromoterRemark ({dispatch, commit}, args = [2, 'xiu gai bei zhu']) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/updatePromoterRemark',
            args
        })
        return argsData[0]
    },

    // 推广员充值(1)
    async checkSumPay ({dispatch, commit}, args = [5000]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/checkSumPay',
            args
        })
        return argsData[0]
    },

    // 推广员充值(2)
    async promoterPay ({dispatch, commit}, args = [2, 5000, 0]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/promoterPay',
            args
        })
        return argsData[0]
    },

    // 充值查询 args = [2,"2018-01-01","2018-01-13",{"list":[],"order":"","orderBy":"","pageCount":0,"pageNumber":1,"pageSize":6,"totalCount":0}]
    // 游玩记录 "args":[2,"2018-01-01","2018-01-13",{"list":[],"order":"","orderBy":"","pageCount":0,"pageNumber":1,"pageSize":6,"totalCount":0}]
    async promoterPayLogs ({dispatch, commit}, args = [2, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/promoterPayLogs',
            args
        })
        return argsData[0]
    },

    async promoterPlayLogs ({dispatch, commit}, args = [2, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/promoterPlayLogs',
            args
        })
        return argsData[0]
    },

    // 推广员登录ip记录
    async getPromoterLoginRec ({dispatch, commit}, args = [2, '2018-01-01', '2018-01-13', {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'loginRecordService/getPromoterLoginRec',
            args
        })
        return argsData[0]
    },

    // 推广员兑奖查询
    async promoterExpiryLogs ({dispatch, commit}, args = [ 2, '2018-03-01', '2018-03-19', {'list': [], order: '', orderBy: '', pageCount: 0, pageNumber: 1, pageSize: 6, totalCount: 0 }]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/promoterExpiryLogs',
            args
        })
        return argsData[0]
    },

    // 推广员兑换 查询
    async getPromoterExpiry ({dispatch, commit}, args = [ 2 ]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/getPromoterExpiry',
            args
        })
        return argsData[0]
    },
    //  输入密码   客户端收到： {"args":[true],"method":"enterSelfPwd"}
    async enterSelfPwd ({dispatch, commit}, args = [ '888888' ]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/enterSelfPwd',
            args
        })
        return argsData[0]
    },
    // 兑奖确认
    async promoterExpiry ({dispatch, commit}, args = [ 2, 1000, 1]) {
        const argsData = await dispatch('invoke', {
            method: 'promoterService/promoterExpiry',
            args
        })
        return argsData[0]
    }

}, name)

const mutationsInfo = mapMutations({
    updataSetPromoter (state, info) {
        state.updataSetPromoter = info
    },
    setSelTgyVal (state, val) {
        state.selTgyVal = val
    }
}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const actionTypes = actionsInfo.aTypes
export const mutationTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
