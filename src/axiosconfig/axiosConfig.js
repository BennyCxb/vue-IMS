import Vue from 'vue'
import axios from 'axios'
// import qs from 'qs'
import { MessageBox, Message, Loading } from 'element-ui'
import VueCookies from 'vue-cookies'

// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置cookie
axios.defaults.withCredentials = false
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

const cookies = VueCookies

const vue = Vue

// 配置接口地址
axios.defaults.baseURL = process.env.API_ROOT
var loadingInstance
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const token = cookies.get('Info')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (200 <= res.status < 300) {
      if (res.config.headers.Authorization) {
        loadingInstance.close()
      } else if (cookies.get('Info')) {
        MessageBox('身份验证失败，请重新登录！', '温馨提示', {
          confirmButtonText: '确定'
        }).then(() => {
          window.location = '/'
        })
      } else {
        loadingInstance.close()
      }
      return res
    } else {
      loadingInstance.close()
      Message.error(res.data.message)
    }
  },
  err => {
    loadingInstance.close()
    // Message.error('请求失败，请稍后再试')
    // return Promise.reject(err)
    return err
  }
)
// 发送请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
// export function Delete (url, params) {
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(url, {
//         params: params
//       })
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }
