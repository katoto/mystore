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
    async getXtLog ({dispatch, commit}, {userId, starttime, endtime, pageNumber = 1, pageSize = 16, totalCount = 0, pageCount = 0,
        orderBy = '', order = '', list = []}) {
        console.log('start getXtLog')
        const args = await dispatch('invoke', {
            method: 'statementService/getSystemLog',
            args: [
                userId, starttime, endtime, { pageNumber, pageSize, totalCount, pageCount, orderBy, order, list }, ''
            ]
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
    // 保单箱密码修改
    async updateBaodanPwd ({dispatch, commit}, args = [123456]) {
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateBaodanPwd',
            args: ['123456']
        })
        return argsData[0]
    },

    // 增设游戏桌
    async getCheckCode ({dispatch, commit}, args = ['demo.oi8t5y.site.gplgg.cn,']) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/getCheckCode',
            args: ['demo.oi8t5y.site.gplgg.cn']
        })
        return argsData[0]
    },

    // 增设游戏桌
    async registDesk ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/registDesk',
            args: ['AS3AFy', '123456', 'demo.oi8t5y.site.gplgg.cn']
        })
        return argsData[0]
    },

    // 获取用户
    async adminList ({dispatch, commit}, args = [1]) {
        console.log(args)
        const argsData = await dispatch('invoke', {
            method: 'adminService/adminList',
            args: args
        })
        return argsData[0]
    },

    // 新增服务员（权限按从左至右从上至下的顺序排序）args":["fuwuyuan",3,false,false,false,false,false,false]
    //   新增主管: "args":["zhuguan",2,true,true,false,true,false,true]
    // 新增系统管理员 "args":["guanliyuan",1,true,true,true,true,true,true]
    async addAdmin ({dispatch, commit}, args = ['fuwuyuan', 3, false, false, false, false, false, false]) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/addAdmin',
            args: args
        })
        return argsData[0]
    },

    //
    async deleteAdmin ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/deleteAdmin',
            args: args
        })
        return argsData[0]
    },

    // 设置权限
    //  给主管设置权限  "args":[14,2,true,true,true,true,true,true]
    // 给管理员设置权限 "args":[16,1,true,true,true,true,false,true]
    async updateAuth ({dispatch, commit}, args = [14, 2, true, true, true, true, true, true]) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/updateAuth',
            args: args
        })
        return argsData[0]
    },
    // 重置密码
    async resetPassword ({dispatch, commit}, args = [16]) {
        const argsData = await dispatch('invoke', {
            method: 'adminService/resetPassword',
            args: args
        })
        return argsData[0]
    },
    // 修改销售设置
    // args分别代表：所有会员充值比例、直属推广员比例、开启交接班（-1代表不勾选，0代表不分更、1...2...）、
    // 开启交互式输入（-1代表不勾选，1代表勾选）、开启远程申请有效时限（0表示不勾选，其他数字代表多少分钟）

    async updateSales ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateSales',
            args: args
        })
        return argsData[0]
    },

    upLocalMsg ({dispatch, commit}, data) {
        commit(mTypes.setLoginInfoConfig, data)
    }

}, name)

const mutationsInfo = mapMutations({
    // setLoginInfoCofig (state, info) {
    //
    // }
}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const actionTypes = actionsInfo.aTypes
export const mutationTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
