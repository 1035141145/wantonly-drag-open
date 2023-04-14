import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/basicInformation/SkillControlPage',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/basicInformation/SkillControlAdd',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/basicInformation/SkillControlDel',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/basicInformation/SkillControlUpdate',
    method: 'post',
    data: params
  })
}
