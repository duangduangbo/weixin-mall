import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/libs/index'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'
const { title, cookieExpires, useI18n } = config

export const TOKEN_KEY = 'user_token'
export const DISTRIBUTOR_ID = 'distributorId'
export const INVITATION_KEY = 'invitation'
export const INVITATION_CODE = 'invitation_code'
export const CODE_KEY = 'code'
export const USER_NAME = 'user_name'
export const USER_HEADIMG = 'user_HeadImg'

export const setToken = (token) => {
  // window.localStorage.setItem(TOKEN_KEY, token)
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  // window.localStorage.getItem(TOKEN_KEY)
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}


export const setUserName = (username) => {
  Cookies.set(USER_NAME, username, { expires: cookieExpires || 1 })
}

export const getUserName = () => {
  const username = Cookies.get(USER_NAME)
  if (username) return username
  else return ""
}
export const setUserHeadImg = (img) => {
  Cookies.set(USER_HEADIMG, img, { expires: cookieExpires || 1 })
}

export const getUserHeadImg = () => {
  const img = Cookies.get(USER_HEADIMG)
  if (img) return img
  else return ""
}

export const setDistributorId = (id) => {
  Cookies.set(DISTRIBUTOR_ID, id, { expires: cookieExpires || 1 })
}

export const getDistributorId = () => {
  const id = Cookies.get(DISTRIBUTOR_ID)
  if (id) return id
  else return 0
}

export const setCode = (token) => {
  Cookies.set(TOKEN_KEY, code, { expires: cookieExpires || 1 })
}

export const getCode = () => {
  const code = Cookies.get(CODE_KEY)
  if (code) return code
  else return false
}
export const setInvitation = (invitation) => {
  Cookies.set(INVITATION_KEY, invitation, { expires: cookieExpires || 1 })
}

export const getInvitation = () => {
  const invitation = Cookies.get(INVITATION_KEY)
  if (invitation) return invitation
  else return false
}
export const setInvitationCode = (code) => {
  Cookies.set(INVITATION_CODE, code, { expires: cookieExpires || 1 })
}

export const getInvitationCode = () => {
  const code = Cookies.get(INVITATION_CODE)
  if (code) return code
  else return ''
}
// 修改时间格式
export const getHour24 = (val) => {
  let time=new Date(Number(val)).toLocaleString("chinese",{hour12:false})
  return time
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}


export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}


export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}


