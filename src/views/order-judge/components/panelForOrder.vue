<template>
    <div class="order-judge c-line">
        <flexbox :gutter="gutter" align="flex-start">
            <flexbox-item :span="4/14">
            <div  style="display:inline-block;">
                 <x-img :src="goodsList.picurl" :default-src="picurl"
                    class="c-img-main" ></x-img>
            </div>
            </flexbox-item>
            <flexbox-item :span="10/14">
                <div class="c-content">
                    <div class="c-title">{{ goodsList.name }}</div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
// 评价订单图文
import { Flexbox, FlexboxItem ,XImg} from 'vux'
export default {
    name:"PanelFOrOrder",
    components:{
        Flexbox,
        FlexboxItem,
        XImg
    },
    props:{
        gutter:{
            default:0
        },
        orient:{
            default:"horizontal"
        },
        img_url:{
            default:require("@_a/images/banner.png")
        },
        goodsList:Object
    },
    data(){
        return {
            picurl:require("@_a/images/error.jpg"),
        }
    }
    
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.order-judge{
    padding:15px 0;
    background-color: @bg-color;
    position: relative;
}
.c-line:before{
    height:0;
    border:none;
}
.c-content{
    margin-top:15px;
    .c-title{
        padding:0 10px;
    }
}
.c-img-main {
	width: 208px;
	height: 158px;
	border-radius: 4px;
}
</style>
