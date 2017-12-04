/**
 * 默认发生任何异常都返回一个空对象
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'

const options = {}
/* if (process.env.NODE_ENV === 'production') {
    options.baseURL = 'http://weixin.yijiahx.com'
} else {
    options.baseURL = '/yijia'
}
*/
const _axios = axios.create(options)

const ajax = function (url, config = { ignore: true }) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return { data: {} }
        }
        throw new Error(response.message)
    })
}
ajax.get = function (url, config = { ignore: true }) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return { data: {} }
        }
        throw new Error(response.message)
    })
}
ajax.post = function (url, param, config = { ignore: true }) {
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return { data: {} }
        }
        throw new Error(response.message)
    })
}
export default ajax
