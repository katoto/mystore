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
        const args = await dispatch('invoke', {method: 'adminService/adminLogin', args: [name, pass, false, true, 0]})
        console.log(args)
    }

}, name)

const mutationsInfo = mapMutations({

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
