<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(item, index) in movie"
      :key="index"
      :offset="index > 0 ? 0 : 0"
    >
      <el-card :body-style="{ padding: '0px' }" class="card">
        <img :src="item.img" class="image" />
        <div style="padding: 14px">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="clicktovedio(item.src)"
              >{{ item.name }}</el-button
            >
          </div>
        </div>
      </el-card>
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
        name: "vedio",
        params: {
          src: src,
        },
      });
    },
  },
};
</script>

<style>
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
  margin: 20px;
}
</style>