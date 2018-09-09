import { post, get } from '../axiosconfig/axiosConfig'
export default {
  getResourceList (params) {
    return get('/resources', params)
  },
  // 获取终端标签列表
  getTermTagslist () {
    return get('/project/termtags')
  },
  // 新增终端标签
  termTagsAdd(params) {
    return post('/project/termtags', params)
  },
  // 获取终端列表
  getTermlist (params) {
    return get('/terms', params)
  },
  // 获取终端详情
  getTermInfo (params, id) {
    return get(`/terms/${id}`, params)
  },
  // 获取终端配置
  getTermConfig (params, id) {
    return get(`/terms/${id}/config`, params)
  },
}
