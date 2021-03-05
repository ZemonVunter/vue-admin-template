<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(o, index) in movie"
      :key="o"
      :offset="index > 0 ? 0 : 0"
    >
      <el-card :body-style="{ padding: '0px' }" class="card">
        <img
          src=movie[index].img
          class="image"
        />
        <div style="padding: 14px">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="clicktovedio">唐人街探案3</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {getmoviedetails} from  "@/api/test.js"
export default {
  data() {
    return {
      movie:[{
        id:"",
        src:"",
      // "http://182.92.235.171/movie/"+"唐人街探案3.Detective.Chinatown.3.2021.TC1080P.X264.AAC.Mandarin.CHS.mp4",
       name:"",
        img:"",
        }
      ]
      

      };
  },
  mounted(){
getmoviedetails(data){
this.movie=data.src
}
  },
  methods: {
    clicktovedio() {
      
    this.$router.push({
    name: "vedio",
    params: {
        src: this.src,
    }
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