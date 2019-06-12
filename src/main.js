// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import FastClick from 'fastclick'
import Vuex from 'vuex'
import VueJsonp from 'vue-jsonp'
import {
  setToken, getToken,
  getInvitation, setInvitation,
  getCode, setCode,
  getDistributorId
} from './libs/util'
import { ToastPlugin } from 'vux'
Vue.use(Vuex)
Vue.use(VueJsonp)
Vue.use(ToastPlugin)
// import api from './api/api'
import store from './store/index.js'
//移动端适配
import 'lib-flexible/flexible.js'

// Vue.prototype.$api = api;//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$api使用
//点击事件优化
Vue.config.productionTip = false
FastClick.attach(document.body);

require('es6-promise').polyfill()



/* eslint-disable no-new */
/**
 */
// setToken("5O1554642125630")
const token = getToken()
let checkIsLoginGotologin = function (to, next) {

  const token = getToken()
  let isNotInvitation = getInvitation()
  let distributorID = getDistributorId()
  // console.log(to)
  // Vue.$vux.toast.show({
  //   text:JSON.stringify(to.name)+","+distributorID+","+token,
  //   time:2000,
  //   type:'warn',
  //   width:'2.7rem'
  // })
  if (to.name === "home") {
    store.commit("changeFooter", 0)
  }
  if (token && to.name !== LOGIN_PAGE_NAME) {
    //已登录， 要跳转的页面不是填写邀请码页,
    if (distributorID <= 0 || distributorID == "") {//未绑定分销商
      next({
        name: LOGIN_PAGE_NAME // 跳转到邀请码页
      })
    } else {//已绑定分销商
      next()
    }
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是填写邀请码页,

    if (distributorID && distributorID > 0) {//已填写邀请码或无需邀请码
      next({
        name: 'home' // 跳转到homeName页
      })
    } else {//未填写邀请码
      next()
    }
  } else {
    next()
  }
}

let getCodePullCode = async function (url, to, next) {
  let mycode = url.substring(url.indexOf('code=') + 5, url.indexOf('state=') - 1);// 前台截取code
  let nowurl = window.location.href.split("#")[0]
  store.dispatch("getSdkSign", { code: mycode, ip: "192.0.0.1", url: nowurl }).then(res => {
    console.log(res)
    location.href = `${URL}?a=1`;
  })
}

const LOGIN_PAGE_NAME = 'invitation_code'
let URL = ''
router.beforeEach((to, from, next) => {
  let url = location.href;
  const token = getToken()
  // store.dispatch("isout").then(res => {

  // })
  //start
  if (!token && (url.indexOf('code=') < 1)) {
    let redirectUrl = window.location.href
    redirectUrl = encodeURIComponent(redirectUrl)
    URL = window.location.href
    const appid = process.env.APP_ID
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  } else {
    (!(url.indexOf('code=') < 1)) ? getCodePullCode(url, to, next) : checkIsLoginGotologin(to, next)

  }
  //end
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
  // render: h => h(App)
})
