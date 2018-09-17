import { post, get } from '../axiosconfig/axiosConfig'
export default {
  login (params) {
    return post('/token', params)
  },
  getCode () {
    return get('/captcha/')
  },
  // 获取登录随机码
  getVerifyCode (params, phone) {
    return get(`/verifycode/${phone}`, params)
  }
}
