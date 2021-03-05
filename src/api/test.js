import request from '@/utils/request'

export function getmoviedetails(data) {
  return request({
    url: '/movie/details',
    method: 'get',
    data
  })
}
