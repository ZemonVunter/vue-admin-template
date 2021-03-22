import request from '@/utils/request'

export function getpersonalinfo(params){
  return request({
    url: '/person/personaldetails',
    method: 'get',
    params
  })
}
