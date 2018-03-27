/**
 * Created by xiezg on 2018/1/16.
 */
import { mapActions, mapMutations } from '~common/util'

const name = 'htyz'
const state = {

    fadfadf: null,
    userList: null,
    selNoticeVal: null, // 公告管理
    selEmailVal: null //  邮件管理

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
    },
    //  11111111
    setselNoticeVal (state, info) {
        state.selNoticeVal = info
    },
    setselEmailVal (state, info) {
        state.selEmailVal = info
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

    // 新建公告， 更新大厅状态
    async updateDTStatus ({dispatch, commit}, {content = '', statusIndex = 0, time = 0}) {
        let args = [{'content': content, 'cooperateEndDate': '------', 'cooperateMode': 0, 'cooperateStartDate': '------', 'statusIndex': statusIndex, 'time': time }]
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateGameStatus',
            args
        })
        return argsData[0]
    },

    async getDeskList ({dispatch, commit}, method) {
        const argsData = await dispatch('invoke', {
            method,
            args: []
        })
        // console.log(argsData)
        return argsData[0]
    },

    async commonInvoke ({dispatch, commit}, {method, args = null}) {
        const argsData = await dispatch('invoke', {
            method,
            args: args ? [args] : []
        })
        return argsData[0]
    },

    async commonInvoke_arr ({dispatch, commit}, {method, args}) {
        const argsData = await dispatch('invoke', {
            method,
            args
        })
        return argsData[0]
    },
    //  获取幸运六师桌子列表
    // async getDeskList ({dispatch, commit}, args = []) {
    //     const argsData = await dispatch('invoke', {
    //         method: 'deskService/getDeskList',
    //         args
    //     })
    //     return argsData[0]
    // },
    // 获取摇钱树桌子 @deprecated
    async getFishDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getFishDeskList',
            args
        })
        return argsData[0]
    },
    // 获取单挑桌子
    async getCardDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getCardDeskList',
            args
        })
        return argsData[0]
    },
    // 获取万炮捕鱼 @deprecated
    async getBulletFishDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getBulletFishDeskList',
            args
        })
        return argsData[0]
    },
    // 获取美人鱼 @deprecated
    async getMermaidDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getMermaidDeskList',
            args
        })
        return argsData[0]
    },
    // 获取缺一门 @deprecated
    async getLackDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getLackDeskList',
            args
        })
        return argsData[0]
    },
    // 获取欢乐牛牛 @deprecated
    async getJoyDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getJoyDeskList',
            args
        })
        return argsData[0]
    },
    // 获取水浒传 @deprecated
    async getWaterDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'waterDeskService/getWaterDeskList',
            args
        })
        return argsData[0]
    },
    // 获取千炮捕鱼 @deprecated
    async getThousandFishDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getThousandFishDeskList',
            args
        })
        return argsData[0]
    },

    // 2 更新大厅状态  运营转态 立刻进入 3点开始
    //  刷新 ，就是获取一次桌子。--
    async updateGameStatus ({dispatch, commit}, args = [{'content': '', 'cooperateEndDate': '------', 'cooperateMode': 0, 'cooperateStartDate': '------', 'statusIndex': 0, 'time': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateGameStatus',
            args
        })
        return argsData[0]
    },

    // 3 .新增桌：幸运六狮addDesk 然后依次addFishDesk、addCardDesk、addBulletFishDesk、addMermaidDesk、addLackDesk、addJoyDesk、addWaterDesk、addThousandFishDesk
    async deskServiceAllAdd ({dispatch, commit}, methodName = 'deskService/addDesk', args = [{'content': '', 'cooperateEndDate': '------', 'cooperateMode': 0, 'cooperateStartDate': '------', 'statusIndex': 0, 'time': 0}]) {
        const argsData = await dispatch('invoke', {
            method: methodName,
            args
        })
        return argsData[0]
    },

    // 4 .参数设置 更新参数 ：幸运六狮updateDesk 然后依次。。。。。同上
    async deskServiceAllUpdate ({dispatch, commit}, methodName = 'deskService/updateDesk', args = [
        {'animalDiff': 1,
            'autoKick': 10,
            'beilvModel': 1,
            'beilvType': 0,
            'betTime': 30,
            'exchange': 50,
            'id': 3,
            'maxBet': 500,
            'max_h': 1000,
            'max_zx': 1000,
            'minBet': 50,
            'minGold': 1,
            'min_zxh': 50,
            'name': '修改了桌名',
            'onceExchangeValue': 100,
            'onlineNumber': 0,
            'orderBy': 1,
            'roomId': 2,
            'siteType': 1,
            'state': 1,
            'sumDeFen': 0,
            'sumYaFen': 0,
            'sumZhxDeFen': 0,
            'sumZhxYaFen': 0,
            'waterType': 0,
            'waterValue': 0,
            'zxhDiff': 1 }]) {
        const argsData = await dispatch('invoke', {
            method: methodName,
            args
        })
        return argsData[0]
    },
    // 桌排序
    // 7代表游戏id，"115,1;代表左边排在第一位的是桌号115，120,1;116,2;119,
    // 3 代表右边120第一位，116第二位 119第三位"
    async sortDesk ({dispatch, commit}, args = [7, '115,1;120,1;116,2;119,3']) {
        const argsData = await dispatch('invoke', {
            method: 'manageService/sortDesk',
            args
        })
        return argsData[0]
    },
    //  删除桌
    async deleteWaterDesk ({dispatch, commit}, args = [116]) {
        const argsData = await dispatch('invoke', {
            method: 'waterDeskService/deleteWaterDesk',
            args
        })
        return argsData[0]
    },

    // new
    // 获取盈利信息
    //   客户端收到： {"args":[{"sumDeFen":0,"sumYaFen":200}],
    //   "method":"getDeskData"}
    async getDeskData ({dispatch, commit}, args = [3]) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getDeskData',
            args
        })
        return argsData[0]
    },

    // 开奖信息，第三个表格
    async getDeskResult ({dispatch, commit}, args = [3, '2018-02-04', '2018-02-04',
        {'list': [],
            'order': '',
            'orderBy': '',
            'pageCount': 0,
            'pageNumber': 1,
            'pageSize': 8,
            'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getDeskResult',
            args
        })
        return argsData[0]
    },

    //     登陆公告管理  下一个tab
    //  获取现有公告
    async getNotice ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'noticeService/getNotice',
            args
        })
        return argsData[0]
    },
    //  设置公告
    async updateNotice ({dispatch, commit}, args = ['新标题', '新正文']) {
        const argsData = await dispatch('invoke', {
            method: 'noticeService/updateNotice',
            args
        })
        return argsData[0]
    },
    //     游戏公告管理
    //    获取现有公告
    async getNoticeList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'noticeService/getNoticeList',
            args
        })
        return argsData[0]
    },
    //  发送公告 rangeType 0 所有 1 2 3
    async addNotice ({dispatch, commit}, args = [{'admin': 'admin',
        'content': '测试添加公告',
        'datetime': '',
        'id': 0,
        'rangeStr': '',
        'rangeType': 0,
        'title': '',
        'type': 0,
        'userId': ''}]) {
        const argsData = await dispatch('invoke', {
            method: 'noticeService/addNotice',
            args
        })
        return argsData[0]
    },

    // 发送邮件 0 1 2
    async sendMail ({dispatch, commit}, args = [{'admin': 'admin',
        'content': '测试测试内容',
        'datetime': '',
        'id': 0,
        'ids': '',
        'rangeType': 2,
        'title': '给欢乐发的标题'}]) {
        const argsData = await dispatch('invoke', {
            method: 'userMailService/sendMail',
            args
        })
        return argsData[0]
    },
    // 邮件 列表
    async getMailList ({dispatch, commit}, args = [{'list': [],
        'order': '',
        'orderBy': '',
        'pageCount': 0,
        'pageNumber': 1,
        'pageSize': 8,
        'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'userMailService/getMailList',
            args
        })
        return argsData[0]
    },
    //  删除列表 3
    async deleteMail ({dispatch, commit}, args = [3]) {
        const argsData = await dispatch('invoke', {
            method: 'userMailService/deleteMail',
            args
        })
        return argsData[0]
    },

    // 高级会员列表  直属会员0  1 2 3
    async getUserManage ({dispatch, commit}, args = [ 0, {'list': [],
        'order': '',
        'orderBy': '',
        'pageCount': 0,
        'pageNumber': 1,
        'pageSize': 12,
        'totalCount': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/getUserManage',
            args
        })
        return argsData[0]
    },
    async searchUser ({dispatch, commit}, args = ['666666', 0, 3]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/searchUser',
            args
        })
        return argsData[0]
    },

    //  封号
    async lockUser ({dispatch, commit}, args = [55]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/lockUser',
            args
        })
        return argsData[0]
    },
    //  解封
    async unlockUser ({dispatch, commit}, args = [55]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/unlockUser',
            args
        })
        return argsData[0]
    },
    //  删号
    async deleteUser ({dispatch, commit}, args = [55]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/deleteUser',
            args
        })
        return argsData[0]
    },
    //  扣除游戏币
    async minusGameGold ({dispatch, commit}, args = [56, 100]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/minusGameGold',
            args
        })
        return argsData[0]
    },
    //  赠送游戏币
    async awardGameGold ({dispatch, commit}, args = [56, 100]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/awardGameGold',
            args
        })
        return argsData[0]
    },
    //  修改等级
    async changeUserLevel ({dispatch, commit}, args = [56, 1]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/changeUserLevel',
            args
        })
        return argsData[0]
    },
    // 身份证修改 暂时不需要
    //  重置密码  分两步  getShutupType   resetUserPassword  ( 暂时只写了第二步 )
    async getShutupType ({dispatch, commit}, args = [56]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/getShutupType',
            args
        })
        return argsData[0]
    },
    async resetUserPassword ({dispatch, commit}, args = [56]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/resetUserPassword',
            args
        })
        return argsData[0]
    },
    // 解除异常
    async dealException ({dispatch, commit}, args = [3]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/dealException',
            args
        })
        return argsData[0]
    },
    // 口令修改 参数 id  与 新密码 ( 暂放 )
    async modifySafeBoxPwd ({dispatch, commit}, args = [3, '123456']) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/modifySafeBoxPwd',
            args
        })
        return argsData[0]
    },
    // 禁言
    // 第一个参数 用户id、第二个参数代表禁言时长：0正常 1是20分钟...2/3...
    async shutupUser ({dispatch, commit}, args = [3, 2]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/shutupUser',
            args
        })
        return argsData[0]
    },

    // 按账号查找会员
    // 第一个参数查找账号字符串、第二个固定、第三个会员类别
    async searchUser ({dispatch, commit}, args = ['666666', 0, 3]) {
        const argsData = await dispatch('invoke', {
            method: 'memberService/searchUser',
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
