import { getwxuserinfo,getauthorize } from '@/api/api';
import { setToken, 
  getToken,
  setInvitation,
  getInvitation,
  setDistributorId,
  getDistributorId,
  getUserHeadImg,
  setUserHeadImg,
  getUserName,
  setUserName,
  getInvitationCode,
  setInvitationCode
 } from '@/libs/util'
import wx from 'weixin-js-sdk'
import axios from 'axios'; // 引入axios
import Vue from 'vue'
const state = {
  token: getToken(),
  username:getUserName(),
  userid:"",
  distributor:getDistributorId(),
  headimgurl:getUserHeadImg(),
  address:"",
  location:{},
  invitationCode:getInvitationCode()
}

const actions = {
  getSdkSign ({ commit }, p) {
    
    return new Promise((resolve, reject) => {
      getwxuserinfo(p).then(res => {
        const data = res.data
        setToken(data.user.userToken)
        setDistributorId(data.user.distributor)
        setUserHeadImg(data.user.headImgUrl)
        setUserName(data.user.nikeName)
        setInvitationCode(data.code)
        commit('setInvitationCode', data.code)
        commit('setToken', data.user.userToken)
        commit('setUserid', data.user.id)
        commit('setDistributor', data.user.distributor)
        commit('setUserName', data.user.nikeName)
        commit('setHeadImgUrl', data.user.headImgUrl)
        console.log(res.data)
        wx.config({
          debug: true, // 因为在手机上测试没法打印，当debug为true时，所有的返回值都会在手机上alert出来
          appId: data.signature.appId, // 必填，公众号唯一标识
          timestamp: data.signature.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.signature.noncestr, // 必填，生成签名的随机串
          signature: data.signature.signature,// 必填，签名
          jsApiList: ['getLocation','closeWindow','chooseWXPay'] // 必填，需要使用的JS接口列表，需要用到什么接口就去开发者文档查看相应的字段名
        });
      wx.ready(function(){
        // 定位
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
           
                  var LATLNG_MJKD = longitude + ',' + latitude;  //调用百度转换接口时所需的参数;
           
           
                  //将js-sdk转换为百度坐标
                  var urlgetbd = 'http://api.map.baidu.com/geoconv/v1/?coords=' 
          + LATLNG_MJKD + '&from=1&to=5&ak=0BtEKer4qSyife4046ZqLoXxmE6vMMnB';
                  var lng;
                  var lat;
          // Vue.$jsonp('http://api.map.baidu.com/geoconv/v1/',{
          //   coords:LATLNG_MJKD,
          //   from:1,
          //   to:5,
          //   ak:'0BtEKer4qSyife4046ZqLoXxmE6vMMnB'
          // }).then(res=>{
          //   console.log(res)
          // })
          // axios.get(urlgetbd,{
          //   withCredentials:false
          // })
          //   .then(function (response) {
          //   console.log(response)
          //   })
          //   .catch(function (error) {
          //   });
          //         $.get(urlgetbd, function (data) {
          //             if (data.status === 0) {
          //                 lng = data.result[0].x;//经度
          //                 lat = data.result[0].y;//纬度
           
           
          //                 var MJKD_LATLNG = lat + ',' + lng;     //调用百度地图接口时所需的参数;
          //                 //alert("调用百度地图api的参数" + MJKD_LATLNG);
          //                 var url = 'http://api.map.baidu.com/geocoder/v2/?ak='+AK秘钥+'&callback=renderReverse&location=' + MJKD_LATLNG + '&output=json&pois=1';
          //                 getlocation(url, function (data) {
          //                     //alert(url);
          //                     //alert(data.status);
          //                     if (data.status === 0) {
          //                         //alert("经纬度："+ GLat +"，"+ GLng + data.result.addressComponent.province + data.result.addressComponent.city + data.result.addressComponent.district);
           
           
          //                         var province = data.result.addressComponent.province;      //省名
          //                         var city = data.result.addressComponent.city;              //城市名
          //                         var district = data.result.addressComponent.district;      //区县名
          //                     }
          //                 }, 'jsonp');
          //             }
          //         }, 'jsonp');
          
          commit("setLocation",res)
          }
          });
            
        });
        wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  WXcloseWindow ({ commit }, p) {
    wx.closeWindow()
  },
  gotoPay ({ commit }, p) {
    console.log(p,getToken())
    return new Promise((resolve, reject) => {
      getauthorize({
        userToken:getToken(),
        string:p
      }).then(res => {
        const data = res.data
        wx.chooseWXPay({
          timestamp: data.signature.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: data.signature.nonceStr, // 支付签名随机串，不长于 32 位
          package: "prepay_id="+"", // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: data.signature.sign, // 支付签名
          success: function (res) {
          // 支付成功后的回调函数
              if(res.errMsg == "chooseWXPay:ok"){
                //alert("支付成功");
                resolve(res)
            }else{
                alert(res.errMsg);
                reject(res)
            }
          }
          });
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
}

const getters = {

}

const mutations = {
  setLocation(state, data){
    state.location=data
  },
  setToken(state, data){
    setToken(data)
    state.token=data
  },
  setUserName(state, data) {
    state.username=data
  },
  setHeadImgUrl(state, data){
    state.headimgurl=data
  },
  setUserId(state, data) {
    state.userid=data
  },
  setDistributor(state, data){
    state.distributor=data
  },
  setInvitationCode(state, data){
    state.invitationCode=data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}