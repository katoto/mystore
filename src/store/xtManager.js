/**
 * Created by sampson on 2017/5/10.
 */
// import ajax from '~common/ajax'
import { mapActions, mapMutations } from '~common/util'
import { mTypes } from '~store/user'

const name = 'xtManager'
const state = {

}
const actionsInfo = mapActions({
    async getGameAdminLog ({dispatch, commit}, {starttime, endtime, pageNumber = 1, pageSize = 16, totalCount = 0, pageCount = 0,
        orderBy = '', order = '', list = null}) {
        const args = await dispatch('invoke', {
            method: 'statementService/getGameAdminLog',
            args: [
                starttime, endtime, {pageNumber, pageSize, totalCount, pageCount, orderBy, order, list}
            ]
        })
        return args[0]
    },
    async getUserAdminLog ({dispatch, commit}, {starttime, endtime, pageNumber = 1, pageSize = 16, totalCount = 0, pageCount = 0,
        orderBy = '', order = '', list = null}) {
        const args = await dispatch('invoke', {
            method: 'statementService/getUserAdminLog',
            args: [
                starttime, endtime, {pageNumber, pageSize, totalCount, pageCount, orderBy, order, list}
            ]
        })
        return args[0]
    },
    async getXtLog ({dispatch, commit}, {firstParam, starttime, endtime, pageNumber = 1, pageSize = 16, totalCount = 0, pageCount = 0,
        orderBy = '', order = '', list = null}) {
        console.log('start getXtLog')
        const args = await dispatch('invoke', {
            method: 'statementService/getSystemLog',
            args: [
                // firstParam, starttime, endtime, {pageNumber, pageSize, totalCount, pageCount, orderBy, order, list}, '', ''
                firstParam, starttime, endtime,{
                    "list": [],
                    "order": "",
                    "orderBy": "",
                    "pageCount": 0,
                    "pageNumber": 1,
                    "pageSize": 16,
                    "totalCount": 0
                },  '']
        })
        return args[0]
    },
    // 用户信息
    async upxtSetMsg ({dispatch, commit}, args = [{}]) {
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateConfig',
            args: args
        })
        return argsData[0]
    },
    upLocalMsg ({dispatch, commit}, data) {
        commit(mTypes.setLoginInfoConfig, data)
    }

}, name)

const mutationsInfo = mapMutations({
    setLoginInfoCofig (state, info) {

    }
}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const actionTypes = actionsInfo.aTypes
export const mutationTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
