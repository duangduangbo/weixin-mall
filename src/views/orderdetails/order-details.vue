<template>
<div class="order-details">
    <div class="mall-head">
      <header-c :title="headerTitle">
      </header-c>
    </div>
    <div class="mall-top">
      <order-status :orderDetails="orderDetails"></order-status>
    </div>
    <div class="mall-cell">
      <order-details-addr :orderDetails="orderDetails"></order-details-addr>
    </div>
    <div class="mall-cell">
      <order-num :orderDetails="orderDetails"></order-num>
    </div>
    <div class="mall-cell">
      <order-goods-detail :orderDetails="orderDetails"></order-goods-detail>
    </div>
    <div class="mall-cell">
      <order-pay-msg :orderDetails="orderDetails"></order-pay-msg>
    </div>
</div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import HeaderC from '@/components/header'
import orderDetailsAddr from './components/orderDetailAddr'
import orderGoodsDetail from './components/orderGoodsDetail'
import orderNum from './components/orderNum'
import orderPayMsg from './components/orderPayMsg'
import orderStatus from './components/orderStatus'
import { mapActions,mapGetters } from 'vuex';
export default {
    name:"order_details",
    components:{
      Flexbox, 
      FlexboxItem,
      HeaderC,
      orderDetailsAddr,
      orderGoodsDetail,
      orderStatus,
      orderNum,
      orderPayMsg
    },
    data(){
        return {
          headerTitle:"订单详情",
          orderDetails:{},
          orderNumber:this.$route.query.id
        }
    },
    mounted(){
      this.getOrderD()
    },
    computed:{
      ...mapGetters([
        'getOrderTagType',
        'getTypeTagType'
      ])
    },
    methods: {
     ...mapActions([
       'getorderDetails'//订单详情
       ,'rentorderparticulars'
       ]),
       getOrderD(){
         if(this.getTypeTagType==0)//购买
         {
            this.getorderDetails(this.orderNumber).then(res=>{
              this.orderDetails=res
            })
         }else{
            this.rentorderparticulars(this.orderNumber).then(res=>{
              this.orderDetails=res
            })
         }
       }
    }
}
</script>
<style lang="less">
.order-details{
  .mall-top{
     background-color: @bg-color;
  }
 .mall-cell{
    background-color: @bg-color;
  //  padding:0 10px;
   margin-top:15px;
   
 }
}
</style>
