/**
 * Created by lichun on 2017/1/19.
 */

import Vue from 'vue'
import Vuex from 'vuex'
// import SockJS from 'sockjs-client'
import home from './home'
import user from './user'
import xtManager from './xtManager'
import tgyManager from './tgyManager'
import ybyz from './ybyz'
import htyz from './htyz'
import allReport from './allReport'
import onlinePay from './onlinePay'

import {wait, str2Bytes} from '../common/util'
import { globalWebsockUrl } from '../common/config'

Vue.use(Vuex)

const state = {
    version: '1.2.14',
    toast: {
        msg: '',
        visible: false
    },
    serverTime: 0,
    clientTime: 0,
    websocket: { // 数据推送相关的
        ondata: null,
        connect: null, // 代表当前连接
        data: null, // websocket 返回来的数据， 用到推送过来的数据的地方 watch一下就好了
        reconnect: 0 // socket 记录重连次数， 起到辅助作用， 比如websocket断开了连接， 重新请求接口， 避免推送丢失引发的问题
    },
    newGameGLState: null,
    showErrorBox: false

}
const mutations = {
    initSocket (state, {connect}) {
        state.websocket.connect = connect
    },
    addConnectNum (state) {
        state.websocket.reconnect++
    },
    updateSocketData (state, data) {
        // console.log(JSON.stringify(data))
        // console.log('------------')
        if (data && data.method === 'syncGameStatus') {
            state.newGameGLState = data
        }
        state.websocket.data = data
    },
    showToast (state, msg) {
        state.toast.msg = msg
        state.toast.visible = true
    },
    setOndataCb (state, cb) {
        state.websocket.ondata = cb
    },
    setTime (state, {serverTime, clientTime}) {
        state.serverTime = serverTime
        state.clientTime = clientTime
    },
    hideToast (state) {
        state.toast.msg = ''
        state.toast.visible = false
    },
    showErrorBox (state, data) {
        state.showErrorBox = data
    }
}
const actions = {
    initWebsocket ({commit, dispatch, state}, url = globalWebsockUrl) {
        return new Promise((resolve, reject) => {
            if (state.websocket.connect) return resolve()
            const connect = new WebSocket(url)
            const tdecoder = new TextDecoder('utf-8')
            let datacb = () => {}
            connect.onmessage = function (e) {
                const binaryData = e.data
                const dataArray = new Uint8Array(binaryData)
                const len = (dataArray[0] << 24) + (dataArray[1] << 16) + (dataArray[2] << 8) + (dataArray[3])
                if (len === dataArray.length - 4) {
                    try {
                        const newArray = new Uint8Array(binaryData, 4, len)
                        const dataStr = tdecoder.decode(newArray)

                        // console.log(dataStr.toString())
                        const dataJSON = JSON.parse(dataStr)

                        if (typeof datacb === 'function') {
                            datacb(dataJSON)
                        } else {
                            commit('updateSocketData', dataJSON)
                        }
                    } catch (e) {
                        console.error(e.message)
                    }
                }
            }
            connect.onopen = function () {
                connect.binaryType = 'arraybuffer'
                commit('initSocket', {connect})
                commit('setOndataCb', (cb) => {
                    datacb = cb
                })
                resolve()
            }
            connect.onclose = function () {
                commit('initSocket', {connect: null})
            }
            connect.onerror = function (e) {
                console.error('sock error')
                commit('initSocket', {connect: null})
                e.code = '102'
                reject(e)
            }
        })
    },
    invoke ({state, commit}, {args = null, method}) {
        return new Promise((resolve, reject) => {
            if (state.websocket.connect) {
                let data = {
                    args, method, version: state.version
                }
                if (state.serverTime && state.clientTime) {
                    if (args) {
                        data = {
                            args, method, time: (state.serverTime - state.clientTime + Date.now()), version: state.version
                        }
                    } else {
                        data = {
                            method, time: (state.serverTime - state.clientTime + Date.now()), version: state.version
                        }
                    }
                }

                const encodedData = JSON.stringify(data)
                const len = str2Bytes(encodedData).length
                // console.log(len + '---------' + encodedData.length)
                const lenInfo = new Uint8Array([(len >> 24) & 0xFF, (len >> 16) & 0xFF, (len >> 8) & 0xFF, (len) & 0xFF])
                // 发送4字节的长度信息
                state.websocket.connect.send(lenInfo)
                // // 发送消息内容
                state.websocket.connect.send(encodedData)

                if (method === 'adminService/heart') {
                    resolve(true)
                    return
                }
                let finished = false
                state.websocket.ondata((data) => {
                    if (finished) return

                    if (~method.indexOf(data.method)) {
                        resolve(data.args)
                        finished = true
                        state.websocket.ondata()
                    } else {
                        return commit('updateSocketData', data)
                    }
                })

                setTimeout(() => {
                    if (!finished) {
                        const e = new Error('响应超时')
                        e.code = 101
                        reject(e)
                        state.websocket.ondata()
                        finished = true
                    }
                }, 2000)
            } else {
                const e = new Error('已经断开链接')
                e.code = 102
                commit('showErrorBox', new Date().getTime())
                reject(e)
            }
        })
    },
    async getServerTime ({dispatch, commit}) {
        const args = await dispatch('invoke', {method: 'adminService/login_getEncrytKey', args: ['AsETVVgugYm92HxSsADoBfk7lmZRJ6vRHRKjnafEC4OY8BOu0/MSoMy2bJr2ECCXZSnFPKxW15nWvVXiNmGy0I8=']})
        const clientTime = new Date().valueOf()
        const serverTime = args[0].time
        commit('setTime', {serverTime, clientTime})
        while (true) {
            await wait(5000)
            await dispatch('invoke', {method: 'adminService/heart'})
        }
    },
    showToast ({commit}, msg) {
        commit('showToast', msg)
        console.log(msg)
        setTimeout(() => {
            commit('hideToast')
        }, 3000)
    }

}

export default () => new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        home, user, xtManager, tgyManager, ybyz, htyz, allReport, onlinePay
    }
})
