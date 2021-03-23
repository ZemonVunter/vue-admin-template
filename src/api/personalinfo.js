import request from '@/utils/request'

export function getpersonalinfo(params){
  return request({
    url: '/person/personaldetails',
    method: 'get',
    params
  })
}
export function updatepersonalinfo(data) {
  return request({
    url: '/person/updatepersonalinfo',
    method: 'post',
    data
  })
}
