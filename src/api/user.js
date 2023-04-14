import request from '@/utils/axios'

export function login(params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}
export function updateState(params) {
  return request({
    url: '/user/updateState',
    method: 'post',
    data: params
  })
}
export function getMailCode(params) {
  return request({
    url: 'user/getMailCode',
    method: 'post',
    data: params
  })
}

export function reg(params) {
  return request({
    url: 'user/reg',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/user/add',
    method: 'post',
    data: params
  })
}
export function update(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: params
  })
}
export function del(params) {
  return request({
    url: '/user/del',
    method: 'post',
    data: params
  })
}
export function getUserList(reqData) {
  return request({
    url: '/user/page',
    method: 'post',
    data: reqData
  })
}

export function getLog(reqData) {
  return request({
    url: '/user/log',
    method: 'post',
    data: reqData
  })
}

export function updateRole(reqData) {
  return request({
    url: '/user/updateRole',
    method: 'post',
    data: reqData
  })
}

export function usercount(reqData) {
  return request({
    url: '/user/usercount',
    method: 'post',
    data: reqData
  })
}

export function LoginLog(reqData) {
  return request({
    url: '/user/LoginLog',
    method: 'post',
    data: reqData
  })
}

export function countMonthly(reqData) {
  return request({
    url: '/user/countMonthly',
    method: 'post',
    data: reqData
  })
}

export function regMonthly(reqData) {
  return request({
    url: '/user/regMonthly',
    method: 'post',
    data: reqData
  })
}