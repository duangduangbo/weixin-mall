<template>
<div class="myself">
    <div class="myself-top">
      <center-top :img_url="imgUrl" :username="username" ></center-top>
    </div>
    <div class="myself-cell">
      <center-cell :list="linkList" :moneyLink="moneyLink"></center-cell>
    </div>
</div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import CenterTop from './components/centerTop'
import CenterCell from './components/centerCell'

export default {
    name:"myself",
    components:{
      Flexbox, 
      FlexboxItem,
      CenterTop,
      CenterCell
    },
    data(){
        return {
        }
    },
    created(){
    },
    computed: {
      imgUrl(){
        return this.$store.state.wx.headimgurl
      },
      username(){
        return this.$store.state.wx.username
      },
      linkList(){
        return this.$store.state.myCenterList
      },
      moneyLink(){
        return this.$store.state.moneyLink
      }
    }
}
</script>
<style lang="less" scoped>
.myself{
 .myself-cell{
   margin-top:15px;
 }
}
</style>
