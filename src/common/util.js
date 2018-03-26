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

export function str2Bytes (str) {
    var result = new Array()

    var k = 0
    for (var i = 0; i < str.length; i++) {
        var j = encodeURI(str[i])
        if (j.length == 1) {
            // 未转换的字符
            result[k++] = j.charCodeAt(0)
        } else {
            // 转换成%XX形式的字符
            var bytes = j.split('%')
            for (var l = 1; l < bytes.length; l++) {
                result[k++] = parseInt('0x' + bytes[l])
            }
        }
    }

    return result
}
