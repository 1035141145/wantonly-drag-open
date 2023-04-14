import request from '@/utils/axios'

export function get(params) {
  return request({
    url: '/basicInformation/HandsomeMePage',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/basicInformation/HandsomeMeAdd',
    method: 'post',
    data: params
  })
}

