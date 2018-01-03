/**
 * Created by lichun on 2017/1/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import SockJS from 'sockjs-client'

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
    },
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
    },

}
const actions = {
    initWebsocket ({commit, dispatch, state}) {
        return new Promise((resolve, reject) => {
            if (state.websocket.connect) return resolve()
            let connect = new SockJS(`http://em.500.com/score/sock`)
            let interval = null
            let hasFinished = false
            connect.onmessage = function (e) {
                let data = JSON.parse(e.data)
                commit('updateSocketData', data)
            }
            connect.onopen = function () {
                interval = setInterval(() => {
                    connect.send(JSON.stringify({
                        'action': 'ping',
                        'from': {
                            url: window.location.href,
                            time: new Date().getTime()
                        }
                    }))
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
    showToast ({commit}, msg) {
        commit('showToast', msg)
        setTimeout(() => {
            commit('hideToast')
        }, 3000)
    },

}

export default () => new Vuex.Store({
    state,
    actions,
    mutations
})
