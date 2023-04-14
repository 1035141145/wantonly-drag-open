import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/basicInformation/page',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/basicInformation/add',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/basicInformation/del',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/basicInformation/update',
    method: 'post',
    data: params
  })
}
