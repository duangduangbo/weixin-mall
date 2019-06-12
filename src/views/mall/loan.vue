<template>
<div class="loan">
    <div class="mall-head">
      <header-c :title="headerTitle">
      </header-c>
    </div>
    <div class="mall-top">
      <search-c   @on-data="getSearchData" @on-all-data="getSearchAll"></search-c>
      <content-title :title="title"></content-title>
      <swiper-c class="new-swiper-c"  :swiper_list="lunboList"></swiper-c>
      <!-- <hot-p-x></hot-p-x> -->
    </div>
    <div class="mall-cell">
      <flexbox orient="vertical" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(k,i) in goodsListT" :key="i" class="c-mall-goods-p">
          <panel-for-loan :goodsList="k"></panel-for-loan>
        </flexbox-item>
        <div class="tip-nomessage" v-show="goodsListT.length<1">
          暂无商品
        </div>
      </flexbox>
    </div>
          <load-more v-show="goodsListT.length>0" :show-loading="false" tip="我是有底线的人"></load-more>

</div>
</template>
<script>
import { Flexbox, FlexboxItem ,LoadMore} from 'vux'
import SearchC from '@/components/search'
import SwiperC from '@/components/swiper'
import HeaderC from '@/components/header'
import PanelForLoan from './components/panelForLoan'
import ContentTitle from '@/components/basic/contentTitle'
import HotPX from '@/components/hotGoods/hotPX'
import { mapActions } from 'vuex';
export default {
    name:"new",
    components:{
      Flexbox, 
      FlexboxItem,
      HeaderC,
      SearchC,
      SwiperC,
      PanelForLoan,
      ContentTitle,
      HotPX,
      LoadMore
    },
    data(){
        return {
          title:"租赁",
          headerTitle:"租赁",
          goodsListT:[]//商品列表
          ,lunboList:[{
            url: 'javascript:',
            img: require("@/assets/images/banner.png"), 
            title: '',
            fallbackImg: require("@/assets/images/banner.png")//404
          }]
        }
    },
    mounted(){
      this.getShopData()
    },
    methods: {
    ...mapActions(
      ['getselectRentCommodity']
    ),
     getDataByType(val){
        this.goodsListT=val
      },
          getSearchData(data){
        this.goodsListT=data
      },
      getSearchAll(){
        this.getShopData()
      },
      getShopData(){   
      this.getselectRentCommodity().then(res=>{
        let pic=res.pic
        this.lunboList=[]
        for(var i=0;i<pic.length;i++){
          this.lunboList.push({
              url: 'javascript:',
              img: pic[i],
              title: '',
              fallbackImg: require("@/assets/images/banner.png")
          })
        }
        let commodityList=res.commodity
        this.goodsListT=commodityList
      })
      }
    }
}
</script>
<style lang="less">
.loan{
  .mall-top{
     background-color: @bg-color;
  }
 .mall-grid-c{
   .weui-grid__icon{
     width:108px;
     height: 108px;
   }
 }
 .new-swiper-c{
   padding:0 20px;
 }
 .mall-cell{
    background-color: @bg-color;
   padding:0 10px;
  //  margin-top:15px;
   .c-mall-goods-p{
     padding:0 10px;
   }
 }
}
</style>
