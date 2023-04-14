import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/basicInformation/ewPage',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/basicInformation/ewAdd',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/basicInformation/ewDel',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/basicInformation/ewUpdate',
    method: 'post',
    data: params
  })
}
