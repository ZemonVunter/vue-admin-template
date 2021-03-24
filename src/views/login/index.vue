<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">反转社区</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          id="account"
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          id="psw"
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin('loginForm')"
          clearable
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- <el-form-item prop="password">
        <span class="svg-container">
          <icon class="el-icon-s-claim" />
        </span>
        <el-input
          placeholder="请输入验证码"
          v-model="loginForm.code"
          @keyup.enter.native="handleLogin"
          clearable
        >
        </el-input>
      </el-form-item>
      <div class="img-yzm">
        <img
          src="http://localhost:9000/user/login/getCode"
          alt="captcha"
          @click="getCaptcha"
          ref="captcha"
        />
      </div> -->

      <el-button
        :loading="loading"
        type="primary"
        style="width: 40%; margin-top: 25px"
        @click.native.prevent="handleLogin('loginForm')"
        >登录
      </el-button>

      <el-button
        :loading="loading"
        type="info"
        style="width: 40%; margin-top: 25px"
        @click="register"
        class="zhuce"
        >注册
      </el-button>
    </el-form>
    <!-- <div class="info" style="bottom: 40px">Beta: 1.0</div>
    <div class="info">Technical Support: XXX</div> -->
  </div>
</template>

<script>
import { login } from "@/api/login.js";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度错误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    
    register(){
      this.$router.push({path:'/register'})
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
   handleLogin(formName) {
     this.$refs[formName].validate((valid) => {
        if (valid) {
      login(this.loginForm)
        .then((res) => {
          localStorage.setItem("hasLogin", true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$message({
              message:"登录成功！",
              type: 'success'
              });
          this.$router.push({ path: "/test" });
        });
       } else {
          console.log("error submit!!");
          return false;
        }
      });
        // .catch((err) => {
        //   this.$refs.captcha.src =
        //     "http://localhost:9000/user/login/getCode?time=" + Date.now();
        // });
    },
    // getCaptcha() {
    //   this.$refs.captcha.src =
    //     "http://localhost:9000/user/login/getCode?time=" + Date.now();
    // },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.info {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: gainsboro;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    border:2px solid rgb(255, 255, 255)
  }
  .el-form-item__error {
    background-color: rgb(255, 255, 255);
    filter: alpha(Opacity=40);
    color: rgb(255, 5, 5);
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: rgb(255, 255, 255);

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background-image: url('../../assets/bg1.jpeg');
   background-repeat:no-repeat; 
  background-size:100% 100%;
  -moz-background-size:100% 100%; 
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 0px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.img-yzm {
  position: relative !important;
  display: flex;
  width: 30%;
  height: 100%;
  padding: 2px;
}
.getCode {
  position: absolute;
  left: 0px;
}
/deep/ .el-form-item__content {
  display: flex;
}
/deep/.zhuce {
  margin-left: 53px;
}

</style>
