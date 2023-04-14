import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/basicInformation/ProjectExperiencePage',
    method: 'post',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/basicInformation/ProjectExperienceAdd',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/basicInformation/ProjectExperienceDel',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/basicInformation/ProjectExperienceUpdate',
    method: 'post',
    data: params
  })
}
