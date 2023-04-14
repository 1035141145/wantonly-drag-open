import request from '@/utils/axios'
export function getMenusList (params) {
  return request({
    url: 'permit/menus',
    method: 'post',
    data: params
  })
}
