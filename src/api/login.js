import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/login/register',
    method: 'post',
    data
  })
}