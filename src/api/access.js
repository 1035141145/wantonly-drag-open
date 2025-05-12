import request from '@/utils/axios'

export function permitsList(params) {
    return request({
        url: 'permit/list',
        method: 'post',
        data: params,
    })
}

export function permitsDel(params) {
    return request({
        url: 'permit/del',
        method: 'post',
        data: params,
    })
}

export function permitsAdd(params) {
    return request({
        url: '/permit/add',
        method: 'post',
        data: params,
    })
}

export function permitsUpdate(params) {
    return request({
        url: '/permit/update',
        method: 'post',
        data: params,
    })
}
