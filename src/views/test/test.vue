<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(item, index) in movie"
      :key="index"
      :offset="index > 0 ? 0 : 0"
    >
    <div @click="clicktovedio(item.src)" class="box">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <img :src="item.img" class="image" />
        <div style="padding: 14px" class="blue">
          <div class="bottom clearfix">
            <el-button  type="info" class="button" @click="clicktovedio(item.src)"
              >{{ item.name }}</el-button
            >
          </div>
        </div>
      </el-card></div>
    </el-col>
  </el-row>
</template>

<script>
import { getmoviedetails } from "@/api/test.js";
export default {
  data() {
    return {
      movie: [{
        src:""
      }
      ],
    };
  },

  mounted() {
    getmoviedetails().then((data) => {
      console.log(data);
      this.movie = data.data
      console.log(this.movie[0].img);
    });
  },

  methods: {
    clicktovedio(src) {
      this.$router.push({
        name: "video",
        params: {
          src: src,
        },
      });
    },
  },
};
</script>

<style>
.blue{
  background-color: #909399;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 2px;
}

.button {
  padding: 0;
  float: center;
  border: 0;
}

.image {
  width: 100%;
  height: 280px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card {
  /* margin: 20px; */
}
.box {
  cursor: pointer;
  /* padding: 10px; */
  margin: 10px 20px;
  border-radius: 15px;
  overflow: hidden;
}
.box:hover {
  box-shadow: 1px 1px 1px 2px #eee;
  opacity: 0.8;
}
</style>