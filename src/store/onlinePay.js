/**
 * Created by turbo on 2018/3/21.
 */

import { mapActions, mapMutations } from '~common/util'
import ajax from '~common/ajax'

const name = 'onlinePay'
const state = {
    loginInfo: null

}

const mutationsInfo = mapMutations({
    updataybyzSearchFn (state, info) {
        // 充值之后更新上面的列表
        state.updataybyzSearchFn = info
    }

}, name)

const actionsInfo = mapActions({
    async getOnlinePayList ({ dispatch, commit }) {
        let doLoginData = null
        doLoginData = await ajax.post(`http://www.2jx2.xin:8081/paylog.jsp?way=query`)
        console.log(doLoginData)
        return doLoginData
    },

    async confirmWebSock ({dispatch, commit}, args = [56, 100 ]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/awardGameGold',
            args
        })
        return argsData[0]
    },

    async confirmOrder ({dispatch, commit}, data) {
        let doLoginData = null
        doLoginData = await ajax.post(`http://www.2jx2.xin:8081/paylog.jsp?way=modify&order_no=` + data)
        console.log(doLoginData)
        return doLoginData
    }

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
