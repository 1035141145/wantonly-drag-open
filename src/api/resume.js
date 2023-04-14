import request from '@/utils/axios'

export function getSkillList(params) {
  return request({
    url: '/skill/page',
    method: 'post',
    data: params
  })
}

export function addSkill(params) {
  return request({
    url: '/skill/add',
    method: 'post',
    data: params
  })
}

export function removeSkill(params) {
  return request({
    url: '/skill/del',
    method: 'post',
    data: params
  })
}

export function updateSkill(params) {
  return request({
    url: '/skill/update',
    method: 'post',
    data: params
  })
}
