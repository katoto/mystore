/**
 * Created by xiezg on 2018/1/16.
 */

import { mapActions, mapMutations } from '~common/util'

const name = 'ybyz'
const state = {
    loginInfo: null,
    userList: null,
    selVipVal: null
}

const mutationsInfo = mapMutations({
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
    async getVipUserList ({dispatch, commit}, args = [ 0, {'list': [], 'order': '', 'orderBy': '', 'pageCount': 0, 'pageNumber': 1, 'pageSize': 6, 'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/getUserList',
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
