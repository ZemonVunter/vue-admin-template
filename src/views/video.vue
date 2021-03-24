 <template>
  <div class="background">
    <el-button type="primary" class="reback" @click="reback()">返回首页</el-button>
    <div class="demo">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
      <a>如果播放卡顿，请暂停或返回首页重新进入，请勿刷新，刷新后页面失效。</a>
    </div>
    <div class="choicebutton" v-if="type === 'TVshow'">
      <el-row>
        <!-- <el-button v-for="">默认按钮</el-button> -->
      </el-row>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Video",
  data() {
    return {
      playerOptions: {
        playbackRates: [1.0, 2.0, 3.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            type: "video/ogg",
            type: "video/webm",
            src: "", //url地址
            tracker: "",
          },
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      type: "",
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#283443");
    this.playerOptions.sources[0].src = this.$route.params.src;
    this.type = this.$route.params.type;
  },
  methods: {
    reback(){
      this.$router.push({ path: "/test" });
    }
  },
};
</script>
<style scoped>
.demo {
  width: 90%;
  margin-top: 12%;
  margin-left: 6%;
}
.choicebutton {
  position: relative;
  top: 20px;
  left: 100px;
}
.background {
  background-color: #283443;
  /* position: relative; */
}
.reback {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
