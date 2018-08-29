import { post, get } from '../axiosconfig/axiosConfig'
export default {
  getResourceList (params) {
    return get('/resources', params)
  },
  isLogin () {
    return get('/Login/IsLogin')
  }
}
