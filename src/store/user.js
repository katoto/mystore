/**
 * Created by sampson on 2017/5/10.
 */
// import ajax from '~common/ajax'
import { mapActions, mapMutations } from '~common/util'

const name = 'user'
const state = {
    loginInfo: null,
    userList: null

    // loginInfo: { 'authorize': 1, 'baodanPwd': 'e10adc3949ba59abbe56e057f20f883e', 'baodanStatus': 0, 'chat': 0, 'content': '', 'expiry': 30, 'expiryCheckMoney': 5000, 'gameStatus': 0, 'id': 1, 'interactPassword': 1, 'lackBaodanStatus': 0, 'leaseCheck': 1, 'moneyOverrun': 500000, 'notActive': 120, 'openBulletGame': 1, 'openCardGame': 1, 'openFishGame': 1, 'openJoyGame': 1, 'openLackGame': 1, 'openLuckGame': 1, 'openMermaidGame': 1, 'openThousandFishGame': 1, 'openWaterGame': 1, 'operationDate': '2015-03-02 15:10', 'operationStatus': 0, 'operationStopDate': 1456848000000, 'payCheckMoney': 10000, 'payScale': 100, 'promoterPayScale': 300, 'promoterSumMoney': 100000, 'registVerify': 1, 'sumExpiryMoney': 20000, 'sumPayMoney': 10000, 'switchType': 1, 'tempPromoterSumMoney': 0, 'tempSumExpiryMoney': 0, 'tempSumPayMoney': 0, 'tempUserSumMoney': 0, 'userCheck': 1, 'userSumMoney': 50000, 'weihuTime': -1 }

}
const actionsInfo = mapActions({
    async login ({dispatch, commit}, {name, pass}) {
        try {
            const args = await dispatch('invoke', {method: 'adminService/adminLogin', args: [name, pass, false, true, 0]})
            const result = args[0]
            if (result.success) {
                commit(mTypes.setLoginInfo, result)
                // console.log(JSON.stringify(result))
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
    updateRoomStatus (state, status) {
        state.loginInfo.roomStatus = status
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

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
