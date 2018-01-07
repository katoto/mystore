/**
 * Created by sampson on 2017/5/10.
 */
// import ajax from '~common/ajax'
import { mapActions, mapMutations } from '~common/util'

const name = 'user'
const state = {

}
const actionsInfo = mapActions({
    async login ({dispatch, commit}, {name, pass}) {
        try {
            const args = await dispatch('invoke', {method: 'adminService/adminLogin', args: [name, pass, false, true, 0]})
            const result = args[0]
            if (result.success) {
                console.log(JSON.stringify(result))
            } else {
                console.log(result.message)
            }
            console.log(JSON.stringify(result))
        } catch (e) {
            console.log('用户名不存在')
        }
    }

}, name)

const mutationsInfo = mapMutations({

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
