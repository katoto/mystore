/**
 * Created by sampson on 2017/5/10.
 */
// import ajax from '~common/ajax'
import { mapActions, mapMutations } from '~common/util'

const name = 'user'
const state = {
    loginInfo: null,
    userList: null

}
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
    async getUserList ({dispatch, commit}, args) {
        let result = await dispatch('invoke', {method: 'memberService/getUserList', args: [name, null, false, true, 0]})
        commit(mTypes.setUserList, result[0])
    }

}, name)

const mutationsInfo = mapMutations({
    setLoginInfo (state, info) {
        state.loginInfo = info
    },
    setUserList (state, list) {
        state.userList = list
    }

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
