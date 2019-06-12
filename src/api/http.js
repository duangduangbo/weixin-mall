import Vue from 'vue'
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import  { ToastPlugin,Toast,AlertPlugin,LoadingPlugin   } from 'vux'
import { setToken, getToken,
  setDistributorId,getInvitation,
  setInvitation,getCode,setCode,
  setInvitationCode
 } from '../libs/util'

Vue.use(Toast)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin )
Vue.use(LoadingPlugin)
var instance = axios.create({
    //  设置请求前置路径
    baseURL: process.env.API_ROOT,
    timeout: 60000,
    // 设置允许携带cookie
    withCredentials:false
  });

  
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  // 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Vue.$vux.loading.show()
    /* 添加loading S */
   // startLoading()
    /* 添加loading E */
  
    return config
  }, function (error) {
    // 对请求错误做些什么
  
    /* 关闭loading S */
   // endLoading()
    /* 关闭loading E */
  
    return Promise.reject(error)
  })

  // 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 隐藏
      Vue.$vux.loading.hide()
    // 对响应数据做点什么
    if(response.data.code<1){
      if(response.data.code == -4){
        Vue.$vux.alert.show({
          title: '错误',
          content: '登录过期，请重新登录',
          buttonText:"重新登录",
          onHide () {
            setToken("")
            setInvitation("")
            setInvitationCode("")
            setDistributorId(0)
            window.location.href="/user"
          }
        })
      }
      else if(response.data.msg.indexOf("用户不在线")>-1){
        Vue.$vux.alert.show({
          title: '错误',
          content: '登录过期，请重新登录',
          buttonText:"重新登录",
          onHide () {
            setToken("")
            setInvitation("")
            setInvitationCode("")
            setDistributorId(0)
           window.location.href="/user"
          }
        })
      }
      else{
      Vue.$vux.toast.show({
        text:response.data.msg,
        time:2000,
        type:'warn',
        width:'2.7rem'
      })
    }
      return false
    }else{
      return response
    }
  }, function (error) {
    // 对响应错误做点什么
  
    /* 关闭loading S */
    Vue.$vux.loading.hide()
    Vue.$vux.toast.show({
      text:"服务器出错",
      time:2000,
      type:'warn',
      width:'2.7rem'
    })
    /* 关闭loading E */
    return Promise.reject(error)
  })

  var httpRequest = {
    // get请求
    get (url, params) {
      return new Promise((resolve, reject) => {
        instance({
          method: 'get',
          url: url,
          params: params
        }).then(response => {
          // 请求成功
          resolve(response.data)
        }).catch(err => {
          // 请求失败
          Vue.$vux.toast.show({
            text:"请求失败",
            time:2000,
            type:'warn',
            width:'2.7rem'
          })
          reject(err)
        })
      })
    },
    // post请求
    post (url, data) {
      return new Promise((resolve, reject) => {
        instance({
          method: 'post',
          url: url,
          data: data
        }).then(response => {
          // 请求成功
          if(response)
          resolve(response.data)
        }).catch(err => {
          // 请求失败
          Vue.$vux.toast.show({
            text:"请求失败",
            time:2000,
            type:'warn',
            width:'2.7rem'
          })
          reject(err)
        })
      })
    }
  }
  
  export default httpRequest;