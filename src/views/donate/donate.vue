<template>
  <div class="block">
    <span class="demonstration"
      ><font color="red"
        >如果您喜欢我，请捐赠以维持服务器支出，每月会将捐赠人名单放在首页，捐赠请备注姓名或昵称！谢谢您！</font
      ></span
    >
    <el-carousel :autoplay="false" trigger="click" height="700px" width="400px">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
          <div class="centerImg">
                <img :src="item.idView" class="image" />
          </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'zmd',
  data() {
    return {
      imagebox: [
        { id: 0, idView: require('../../assets/imagebox/weixinpay.jpg') },
        { id: 1, idView: require('../../assets/imagebox/alipay.png') },
        //imagebox是assets下一个放图片的文件夹
      ],
    }
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (400 / 1920) * this.screenWidth
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth*0.5
    this.setSize()
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth*0.5
      this.setSize()
    }
  },
}
</script>
<style>
.centerImg{
    text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img{
     /*设置图片宽度和浏览器宽度一致*/
      width:30%;
      height:inherit;
    }
</style>