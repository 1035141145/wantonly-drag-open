// 适用与编辑页面更新数据
import { Message } from 'element-ui'

export const urlRE = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/

function request(options) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.timeout = 6000

        let url = getURL(options.url)
        if (options.method === 'GET') {
            url += `${getURLParam(options.data)}`
        }

        xhr.open(options.method, url)

        xhr.ontimeout = reject
        xhr.onerror = reject
        xhr.onload = (e) => {
            resolve(e.target.response)
        }

        xhr.send(JSON.stringify(getURLData(options.data, options.paramType)))
    })
}

function getURLParam(data) {
    let result = ''
    data.forEach(item => {
        if (item[0]) {
            result += `&${item[0]}=${item[1]}`
        }
    })

    return result ? '?' + result : ''
}

function getURLData(data, paramType) {
    if (!data) { return '' }

    if (paramType === 'array') {
        return data
    }

    const result = {}
    data.forEach(item => {
        if (item[0]) {
            result[item[0]] = item[1]
        }
    })

    return result
}

export function getURL(url) {
    return url.startsWith('http') ? url : 'https://' + url
}

/**
 *
 * @param {object} options 请求的相关参数
 */
export async function requestWarpper(options) {
    let count = 0
    let timer
    const url = options?.url
    let res = false
    if (url && !/^\d+$/.test(url) || urlRE.test(getURL(url))) {
        res = await request(options)
    } 
    return res
}
