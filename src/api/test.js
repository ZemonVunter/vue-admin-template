import request from '@/utils/request'

export function getmoviedetails(){
  return request({
    url: '/movie/details',
    method: 'get',
  })
}
