import request from '@/utils/axios'

export function rolesPage (params) {
  return request({
    url: 'role/page',
    method: 'post',
    data: params
  })
}

export function rolesDel (params) {
  return request({
    url: 'role/del',
    method: 'post',
    data: params
  })
}

export function rolesAdd (params) {
  return request({
    url: '/role/add',
    method: 'post',
    data: params
  })
}

export function rolesUpdate (params) {
  return request({
    url: '/role/update',
    method: 'post',
    data: params
  })
}

export function rolesSetPermits (params) {
  return request({
    url: 'role/setPermits',
    method: 'post',
    data: params
  })
}
