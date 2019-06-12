<template>
<div class="goods">
    <div class="mall-head" ref="mallHead">
      <header-c :title="headerTitle">
      </header-c>
    </div>
    <div class="mall-top"  ref="mallTop">
      <div class="mall-search">
      <search-c  @on-data="getSearchData" @on-all-data="getSearchAll"></search-c>
      </div>
    </div>
    <div class="mall-top-px"  ref="mallTopPX">
      <div class="mall-search-px">
        <hot-p-x  @on-getDataByType="getDataByType"></hot-p-x>
      </div>
    </div>
    <div class="mall-cell">
          <scroller lock-x use-pullup use-pulldown 
           @on-pullup-loading="loadMore" :height="scrolHeight"
          @on-pulldown-loading="refresh" v-model="status" 
           :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" 
          ref="scroller">
      
      <flexbox orient="vertical" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(k,i) in goodsList" :key="i" class="c-mall-goods-p">
          <panel-for-coll :goodsList="k"></panel-for-coll>
        </flexbox-item>
        <div class="tip-nomessage" v-show="goodsList.length<1">
          暂无商品
        </div>
      </flexbox>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
       v-show="goodsList.length>0"
       style=" text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">加载更多</span>
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      <load-more v-show="goodsList.length>0&&loadmore" :show-loading="false" tip="我是有底线的人"></load-more>
      </div>
    </scroller>
    </div>

</div>
</template>
<script>
import { Flexbox, FlexboxItem ,LoadMore,Scroller,Spinner} from 'vux'
import SearchC from '@/components/search'
import HeaderC from '@/components/header'
import SwiperC from '@/components/swiper'
import PanelForColl from '@/components/panel/panelForColl'
import ContentTitle from '@/components/basic/contentTitle'
import HotPX from '@/components/hotGoods/hotPX'
import { mapActions } from 'vuex';
export default {
    name:"goods",
    components:{
      Flexbox, 
      FlexboxItem,
      HeaderC,
      SearchC,
      SwiperC,
      PanelForColl,
      ContentTitle,
      HotPX,
      LoadMore,
      Scroller,
      Spinner
    },
    data(){
        return {
          headerTitle:"",
          goodsList:[],
          pullupEnabled: true,
          status: {
            pullupStatus: 'default',
            pulldownStatus: 'default'
          },
          scrolHeight:"0",
          loadmore:false
        }
    },
    mounted(){
      this.scrolHeight=(-(this.$refs.mallHead.offsetHeight
                        +this.$refs.mallTop.offsetHeight
                        +this.$refs.mallTopPX.offsetHeight)).toString()
      this.getShopData()
    },
    methods: {
      ...mapActions([
        'getselectcommodity',
        'getmechanical',
        'getmedicament'
        ]),
        loadMore () {
      setTimeout(() => {
       //获取数据
        // if(this.goodsList.length>20){
        //   this.$refs.scroller.disablePullup()
        //   this.loadmore=true
        // }else{
          
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
        // }
      }, 2000)
    },
    refresh () {
      setTimeout(() => {
       // this.goodsList=[]
        //获取数据
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 2000)
    },
         getDataByType(val){
        this.goodsList=val
      },
      getSearchData(data){
        this.goodsList=data
      },
      getSearchAll(){
        this.getShopData()
      },
      getShopData(){
              if(this.$route.query.type==1){
          this.headerTitle="全部商品"
          this.getselectcommodity().then(res=>{
            this.goodsList=res.commodity
          })
      }
      if(this.$route.query.type==2){
          this.headerTitle="电动机械"
          this.getmechanical().then(res=>{
            this.goodsList=[...res]
          })
      }
      if(this.$route.query.type==3){
          this.headerTitle="园林药剂"
          this.getmedicament().then(res=>{
            this.goodsList=[...res]
          })
      }
      }
    }
}
</script>
<style lang="less">
.goods{
  .mall-top{
     background-color: @bg-color;
     height:100px;
     .mall-search{
     background-color: @bg-color;
       height:100px;
       position: absolute;
       width:100%;
       z-index:99;
     }
  }
  .mall-top-px{
     background-color: @bg-color;
     height:80px;
     .mall-search-px{
       height:80px;
       position: absolute;
       width:100%;
       z-index:99;
     }
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
