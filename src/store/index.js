/**
 * Created by lichun on 2017/1/19.
 */

import Vue from 'vue'
import Vuex from 'vuex'
// import SockJS from 'sockjs-client'
import home from './home'

Vue.use(Vuex)

const state = {
    toast: {
        msg: '',
        visible: false
    },
    websocket: { // 数据推送相关的
        connect: null, // 代表当前连接
        data: null, // websocket 返回来的数据， 用到推送过来的数据的地方 watch一下就好了
        reconnect: 0 // socket 记录重连次数， 起到辅助作用， 比如websocket断开了连接， 重新请求接口， 避免推送丢失引发的问题
    }
}
const mutations = {
    initSocket (state, {connect}) {
        state.websocket.connect = connect
    },
    addConnectNum (state) {
        state.websocket.reconnect++
    },
    updateSocketData (state, data) {
        state.websocket.data = data
    },
    showToast (state, msg) {
        state.toast.msg = msg
        state.toast.visible = true
    },
    hideToast (state) {
        state.toast.msg = ''
        state.toast.visible = false
    }

}
const actions = {
    initWebsocket ({commit, dispatch, state}) {
        return new Promise((resolve, reject) => {
            if (state.websocket.connect) return resolve()
            // let connect = new WebSocket(`ws://demo.oi8t5y.site.gplgg.cn:7999`)
            let connect = new WebSocket(`ws://demo.oi8t5y.site.gplgg.cn:7979`)
            let interval = null
            let hasFinished = false
            const tdecoder = new TextDecoder('utf-8')
            connect.onmessage = function (e) {
                const binaryData = e.data
                const dataArray = new Uint8Array(binaryData)
                const len = (dataArray[0] << 24) + (dataArray[1] << 16) + (dataArray[2] << 8) + (dataArray[3])
                if (len === dataArray.length - 4) {
                    const newArray = new Uint8Array(binaryData, 4, len)
                    // if(key != null){
                    //     //解密

                    // }
                    const dataStr = tdecoder.decode(newArray)
                    console.log(dataStr)
                    commit('updateSocketData', JSON.parse(dataStr))
                }
            }
            connect.onopen = function () {
                interval = setInterval(() => {
                    // connect.send(JSON.stringify({
                    //     'action': 'ping',
                    //     'from': {
                    //         url: window.location.href,
                    //         time: new Date().getTime()
                    //     }
                    // }))
                }, 15000)
                if (hasFinished) return
                hasFinished = true
                commit('initSocket', {connect})
                resolve()
            }
            connect.onclose = function () {
                console.warn('5s后 websocket 重连')
                clearInterval(interval)
                setTimeout(() => {
                    commit('addConnectNum')
                    dispatch('initWebsocket')
                }, 5000)
            }
            connect.onerror = function (e) {
                console.error('sock error')
                e.code = '102'
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('超时')
                error.code = '103'
                reject(error)
            }, 2000)
        })
    },
    sendMsg ({state}, obj) {
        if (state.websocket.connect) {
            const argsArray = []
            argsArray.push('AsETVVgugYm92HxSsADoBfk7lmZRJ6vRHRKjnafEC4OY8BOu0/MSoMy2bJr2ECCXZSnFPKxW15nWvVXiNmGy0I8=') // 该参数需要动态生成,值为RSA生成的公钥

            const data = {
                method: 'adminService/login_getEncrytKey',
                version: '1.2.14',
                args: argsArray,
                time: NaN
            }

            const encodedData = JSON.stringify(data)
            const len = encodedData.length
            const lenInfo = new Uint8Array([(len >> 24) & 0xFF, (len >> 16) & 0xFF, (len >> 8) & 0xFF, (len) & 0xFF])

            // 发送4字节的长度信息
            state.websocket.connect.send(lenInfo)
            // 发送消息内容
            state.websocket.connect.send(encodedData)
        }
    },
    showToast ({commit}, msg) {
        commit('showToast', msg)
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
        home
    }
})
