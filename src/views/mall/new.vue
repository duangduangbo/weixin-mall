<template>
<div class="new">
    <div class="mall-head">
      <header-c :title="headerTitle">
      </header-c>
    </div>
    <div class="mall-top">
      <search-c  @on-data="getSearchData" @on-all-data="getSearchAll"></search-c>
      <content-title :title="title"></content-title>
      <swiper-c class="new-swiper-c" :swiper_list="lunboList"></swiper-c>
      <hot-p-x  @on-getDataByType="getDataByType"></hot-p-x>
    </div>
    <div class="mall-cell">
      <flexbox orient="vertical" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(k,i) in goodsListT" :key="i" class="c-mall-goods-p">
          <panel-for-coll :goodsList="k"></panel-for-coll>
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
import { Flexbox, FlexboxItem,LoadMore } from 'vux'
import SearchC from '@/components/search'
import HeaderC from '@/components/header'
import SwiperC from '@/components/swiper'
import PanelForColl from '@/components/panel/panelForColl'
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
      PanelForColl,
      ContentTitle,
      HotPX,
      LoadMore
    },
    data(){
        return {
          title:"新品上市",
          headerTitle:"新品",
          goodsListT:[],
          lunboList:[{
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
      ...mapActions(['getnewshop']),
      getSearchData(data){
        this.goodsListT=data
      },
       getDataByType(val){
        this.goodsListT=val
      },
      getSearchAll(){
        this.getShopData()
      },
      getShopData(){
      this.getnewshop().then(res=>{
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
.new{
  .mall-top{
     background-color: @bg-color;
  }
  .tip-nomessage{
   height:200px;
   line-height:200px;
   text-align: center;
   width:100%
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
   margin-top:15px;
   .c-mall-goods-p{
     padding:0 10px;
   }
 }
}
</style>
