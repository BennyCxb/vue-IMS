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
  termTagsAdd (params) {
    return post('/project/termtags', params)
  },
  // 获取终端列表
  getTermlist (params) {
    return get('/terms', params)
  },
  // 改变终端状态
  setTermStatus (params) {
    return post('/terms', params)
  },
  // 终端打标签
  setTermTags (params) {
    return post('/terms/tags', params)
  },
  // 获取终端详情
  getTermInfo (params, id) {
    return get(`/terms/${id}`, params)
  },
  // 获取终端配置
  getTermConfig (params, id) {
    return get(`/terms/${id}/config`, params)
  },
  // 获取模版列表
  getTemplateList (params) {
    return get('/templates', params)
  },
  // 增加模版
  addTemplate (params) {
    return post('/templates', params)
  },
  // 获取资源列表
  getResourceList (params) {
    return get('/resources', params)
  },
  // 添加资源
  addResource (params) {
    return post('/resources', params)
  },
  getUser (params, username) {
    return get(`/users/${username}`, params)
  }
}
