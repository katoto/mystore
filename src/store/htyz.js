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

    //  获取幸运六师桌子列表
    async getDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getDeskList',
            args
        })
        return argsData[0]
    },
    // 获取摇钱树桌子
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
    // 获取万炮捕鱼
    async getBulletFishDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getBulletFishDeskList',
            args
        })
        return argsData[0]
    },
    // 获取美人鱼
    async getMermaidDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getMermaidDeskList',
            args
        })
        return argsData[0]
    },
    // 获取缺一门
    async getLackDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getLackDeskList',
            args
        })
        return argsData[0]
    },
    // 获取欢乐牛牛
    async getJoyDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getJoyDeskList',
            args
        })
        return argsData[0]
    },
    // 获取水浒传
    async getWaterDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'waterDeskService/getWaterDeskList',
            args
        })
        return argsData[0]
    },
    // 获取千炮捕鱼
    async getThousandFishDeskList ({dispatch, commit}, args = []) {
        const argsData = await dispatch('invoke', {
            method: 'deskService/getThousandFishDeskList',
            args
        })
        return argsData[0]
    },

    // 2 更新大厅状态  运营转态 立刻进入 3点开始
    //  刷新 ，就是获取一次桌子。
    async updateGameStatus ({dispatch, commit}, args = [{'content': '', 'cooperateEndDate': '———', 'cooperateMode': 0, 'cooperateStartDate': '———', 'statusIndex': 0, 'time': 0}]) {
        const argsData = await dispatch('invoke', {
            method: 'systemConfigService/updateGameStatus',
            args
        })
        return argsData[0]
    },

    // 3 .新增桌：幸运六狮addDesk 然后依次addFishDesk、addCardDesk、addBulletFishDesk、addMermaidDesk、addLackDesk、addJoyDesk、addWaterDesk、addThousandFishDesk
    async deskServiceAllAdd ({dispatch, commit}, methodName = 'deskService/addDesk', args = [{'content': '', 'cooperateEndDate': '———', 'cooperateMode': 0, 'cooperateStartDate': '———', 'statusIndex': 0, 'time': 0}]) {
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
    }

}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default { state, actions, mutations }
