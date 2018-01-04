/**
 * Created by sampson on 2017/5/15.
 */
export function mapActions (acts, ns) {
    const aTypes = {}
    const actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return { actions, aTypes }
}

export const platform = (function () {
    return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
})()

export let getCk = function () {
    if (!localStorage.getItem(src()+'ck') || localStorage.getItem(src()+'ck') === '' || localStorage.getItem(src()+'ck') === 'undefined') {
        if (getCookie(src()+'ck') && getCookie(src()+'ck') !== '') {
            return getCookie(src()+'ck')
        }
        return ''
    }
    return localStorage.getItem(src()+'ck') || ''
}

// 数组转对象，对象的key 队友第二个参数
export function convertArrToObj (arr, key) {
    let result = {}
    if (arr) {
        arr.forEach(item => {
            result[item[key]] = item
        })
    }
    return result
}
export function mapMutations (muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        // console.log(key);
        // console.log(mTypes[key])
        mutations[mTypes[key]] = muts[key]
    })
    return { mutations, mTypes }
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}
