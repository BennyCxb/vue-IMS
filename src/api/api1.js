import { post, get } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/token', params)
  },
  isLogin () {
    return get('/Login/IsLogin')
  }
}
