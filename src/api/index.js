/**
 * 前台接口
 * 2021.04.15
 */

import request from '@/utils/request'

/**
 * 查询基础配置
 */
 export function getIndex() {
  return request({
    url: '/index',
    method: 'get',
  })
}


/**
 * 登录
 * @param {array} data 请求数据
 */
 export function postLogin(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

/**
 * 查询概况
 */
 export function getUserHome() {
  return request({
    url: '/user/home',
    method: 'get',
  })
}

/**
 * 查询存储桶概况数据
 */
 export function getHomeStorsge() {
  return request({
    url: '/user/storage',
    method: 'get',
  })
}

/**
 * 查询动态日志
 */
 export function getHomeLog(params) {
  return request({
    url: '/user/log',
    method: 'get',
    params
  })
}

/**
 * 查询用户信息
 */
 export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

/**
 * 修改密码
 * @param {array} data 请求数据
 */
 export function putResetPwd(data) {
  return request({
    url: '/user/resetPwd',
    method: 'put',
    data
  })
}

/**
 * 重置密钥
 */
 export function putResetKey() {
  return request({
    url: '/user/resetKey',
    method: 'put',
  })
}

/**
 * 修改资料
 * @param {array} data 请求数据
 */
 export function putUpdate(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

/**
 * 查询设置信息
 * @param {string} type 请求数据
 */
 export function getSetup(type) {
  return request({
    url: '/setup/index/'+type,
    method: 'get',
  })
}

/**
 * 更新设置
 * @param {array} data 请求数据
 */
 export function putSetup(data) {
  return request({
    url: '/setup/update',
    method: 'put',
    data:data
  })
}

/**
 * 发送测试邮件
 */
 export function postSendMail() {
  return request({
    url: '/setup/sendTest',
    method: 'post',
  })
}

/**
 * 发送验证码
 * @param {array} data 请求数据
 */
 export function postCode(data) {
  return request({
    url: '/account/sendCode',
    method: 'post',
    data
  })
}

/**
 * 注册
 * @param {array} data 请求数据
 */
 export function postReg(data) {
  return request({
    url: '/account/register',
    method: 'post',
    data
  })
}

/**
 * 找回密码
 * @param {array} data 请求数据
 */
 export function postForget(data) {
  return request({
    url: '/account/forget',
    method: 'post',
    data
  })
}

/**
 * 角色组列表
 * @param {array} params 请求数据
 */
 export function getRole(params) {
  return request({
    url: '/role/query',
    method: 'get',
    params
  })
}

/**
 * 新增角色
 * @param {array} data 请求数据
 */
 export function postRole(data) {
  return request({
    url: '/role/save',
    method: 'post',
    data
  })
}

/**
 * 修改角色
 * @param {array} data 请求数据
 */
 export function putRole(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

/**
 * 删除角色
 * @param {array} params 请求数据
 */
 export function delRole(params) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params
  })
}

/**
 * 查询存储桶列表
 * @param {array} params 请求数据
 */
 export function getStorage(params) {
  return request({
    url: '/storage/query',
    method: 'get',
    params
  })
}

/**
 * 查询存储桶类型列表
 */
 export function getStorageType() {
  return request({
    url: '/storage/type',
    method: 'get',
  })
}

/**
 * 新增桶
 * @param {array} data 请求数据
 */
 export function postStorage(data) {
  return request({
    url: '/storage/save',
    method: 'post',
    data
  })
}

/**
 * 修改桶
 * @param {array} data 请求数据
 */
 export function putStorage(data) {
  return request({
    url: '/storage/update',
    method: 'put',
    data
  })
}

/**
 * 删除桶
 * @param {array} params 请求数据
 */
 export function delStorage(params) {
  return request({
    url: '/storage/delete',
    method: 'delete',
    params
  })
}

/**
 * 查询图片列表
 * @param {array} params 请求数据
 */
 export function getImages(params) {
  return request({
    url: '/images/query',
    method: 'get',
    params
  })
}

/**
 * 删除图片
 * @param {array} params 请求数据
 */
 export function delImages(params) {
  return request({
    url: '/images/delete',
    method: 'delete',
    params
  })
}

/**
 * 成员列表
 * @param {array} params 请求数据
 */
 export function getMember(params) {
  return request({
    url: '/member/query',
    method: 'get',
    params
  })
}

/**
 * 新增成员
 * @param {array} data 请求数据
 */
 export function postMember(data) {
  return request({
    url: '/member/save',
    method: 'post',
    data
  })
}

/**
 * 修改成员
 * @param {array} data 请求数据
 */
 export function putMember(data) {
  return request({
    url: '/member/update',
    method: 'put',
    data
  })
}

/**
 * 删除成员
 * @param {array} params 请求数据
 */
 export function delMember(params) {
  return request({
    url: '/member/delete',
    method: 'delete',
    params
  })
}

/**
 * 上传图片
 * @param {array} data 请求数据
 */
 export function postUpload(data) {
  return request({
    url: '/api/upload',
    method: 'post',
    data
  })
}


/**
 * 获取更新
 */
 export function getUpdate() {
  return request({
    url: '/updade/version',
    method: 'get',
  })
}

/**
 * 下载更新包
 * @param {array} data 请求数据
 */
 export function postUpdate(data) {
  return request({
    url: '/updade/update',
    method: 'post',
    data
  })
}










