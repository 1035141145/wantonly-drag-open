import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/projectShow/page',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/projectShow/add',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/projectShow/del',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/projectShow/update',
    method: 'post',
    data: params
  })
}
