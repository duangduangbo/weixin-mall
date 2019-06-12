<template>
<div class="order" id="order">
    <div class="mall-top">
      <header-c :title="headerTitle">
      </header-c>
    </div>
    <div class="c-order-tag" id="orderTag">
      <div :class="searchBarFixed == true ? 'isFixed' :''">
        <order-tag></order-tag>
        <type-tag></type-tag>
      </div>
    </div>
    <div class="mall-cell">
      <flexbox orient="vertical" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(k,i) in orderList" :key="i" class="c-mall-goods-p">
          <order-preview :orderList="k" @on-updateorder="loadOrder"></order-preview>
        </flexbox-item>
        <div v-show="orderList.length<=0" class="tip-nomessage">
          您还没有相关的订单
      </div>
      </flexbox>
    </div>
</div>
</template>
<script>
import { Flexbox, FlexboxItem,CheckIcon } from 'vux'
import HeaderC from '@/components/header'
import OrderPreview from './components/orderPreview'
import OrderTag from './components/orderTag'
import TypeTag from './components/typeTag'
import ButtonL from '@/components/basic/buttonL'
import { constants } from 'fs';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
    name:"order",
    components:{
      Flexbox, 
      FlexboxItem,
      OrderPreview,
      OrderTag,
      HeaderC,
      ButtonL,
      CheckIcon,
      TypeTag
    },
    data(){
        return {
          headerTitle:"我的订单",
          isShow:false,
          checkedAll:false,
          searchBarFixed:true,
          orderList:[]
        }
    },
    mounted(){
      this.loadOrder()
      let self=this;
    },
    destroyed () {
      let self=this;
    },
    computed:{
      ...mapGetters([
        'getOrderTagType',
        'getTypeTagType'
      ])
    },
    watch:{
      'getOrderTagType'(newval,oldval){
        this.loadOrder()
      },
      'getTypeTagType'(newval,oldval){
        this.loadOrder()
      }
    },
    methods: {
      ...mapActions([
        'getOrderList',
        'getnopay',
        'getnosend',
        'getissend',
        'getorderAappraise',
        'rentordernopay',
        'rentordernosend',
        'rentorderissend',
        'rentorderappraise',
        'rentorder'
      ]),
      loadOrder(){
        let newval=this.getOrderTagType,typeval=this.getTypeTagType
        if(newval==0){//全部订单
          if(typeval==0){//购买
            this.getOrderList().then(res=>{
              this.orderList=res
            })
          }else{
            this.rentorder().then(res=>{
              this.orderList=res
            })
          }
        }
        if(newval==1){//代付款订单
        if(typeval==0){//购买
            this.getnopay().then(res=>{
              this.orderList=res
            })
          }else{
            this.rentordernopay().then(res=>{
              this.orderList=res
            })
          }
        }
        if(newval==2){//待发货订单
        if(typeval==0){//购买
            this.getnosend().then(res=>{
              this.orderList=res
            })
          }else{
            this.rentordernosend().then(res=>{
              this.orderList=res
            })
          }
        }
        if(newval==3){//待收货订单
          if(typeval==0){//购买
            this.getissend().then(res=>{
              this.orderList=res
            })
          }else{
            this.rentorderissend().then(res=>{
              this.orderList=res
            })
          }
        }
        if(newval==4){//待评价订单
          if(typeval==0){//购买
            this.getorderAappraise().then(res=>{
              this.orderList=res
            })
          }else{
            this.rentorderappraise().then(res=>{
              this.orderList=res
            })
          }
        }
      },
      clickManager(){
        this.isShow= !this.isShow;
      }
    }
}
</script>
<style lang="less">
.order{
  background-color: @main-bg-color;
  .c-order-tag{
    margin-top:20px;
    height:165px;
    .isFixed{
        position:fixed;
        top:90px;
        z-index:999;
        width:100%
      }
  }
  .mall-top{
     background-color: @bg-color;
     
  }
 .mall-grid-c{
   .weui-grid__icon{
     width:108px;
     height: 108px;
   }
 }
  .mall-cell{
    .c-mall-goods-p{
      background-color: @bg-color;
      margin-bottom:15px;
    }
  }

}
</style>
