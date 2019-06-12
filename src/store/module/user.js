import { usersigup,
  userlogout,
  getinvitation,
  noinvitationcode,
  isout
 } from '@/api/api';
import { setToken, getToken,setInvitation,getInvitation } from '@/libs/util'
const state = {
  token: getToken(),
  invitation:getInvitation()
  ,userid:''
  ,distributor:''
  ,username:''
  
}

const actions = {

  getuserlogout ({ commit }, p) {
    return new Promise((resolve, reject) => {
      userlogout({
        userToken:getToken()
      }).then(res => {
        const data = res.data
        setToken("")
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getinvitation ({ commit }, p) {
    return new Promise((resolve, reject) => {
      getinvitation({
        userToken:getToken(),
        string:p
      }).then(res => {
        const data = res.data
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getnoinvitationcode ({ commit }, p) {
    return new Promise((resolve, reject) => {
      noinvitationcode({
        userToken:getToken()
      }).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  isout ({ commit }, p) {
    return new Promise((resolve, reject) => {
      isout({
        userToken:getToken()
      }).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  handleIsNotInvitation({ commit } , data){
    commit("setInvitation",data)
  },
}

const getters = {

}

const mutations = {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  setInvitation (state, invitation) {
    state.invitation = invitation
    setInvitation(invitation)
  },
  setUserid( state, userid ){
    state.userid = userid
  },
  setDistributor (state, distributor) {
    state.distributor = distributor
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}