import { post, get } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/token', params)
  },
  getCode () {
    return get('/captcha/')
  }
}
