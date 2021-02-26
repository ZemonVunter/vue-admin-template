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
        <h3 class="title">反转社区注册</h3>
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
        />
      </el-form-item>

      <el-form-item prop="checkpassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          id="chkpsw"
          :key="passwordType"
          ref="checkpassword"
          v-model="loginForm.checkpassword"
          :type="passwordType"
          placeholder="请确认您输入的密码"
          name="checkpassword"
          tabindex="2"
          auto-complete="on"
          maxlength="16"
        />
      </el-form-item>
      <el-form-item
        ><span class="svg-container">
          <i class="el-icon-user"></i>
        </span>

        <el-select v-model="loginForm.sex" placeholder="请选择性别">
          <el-option label="帅锅" value="男"></el-option>
          <el-option label="美铝" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="   请选择您的出生日期(可点击顶部年份或月份，快速选择)"
          v-model="loginForm.birthday"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions0"
          align="center"
          :editable='false'
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="plane" />
        </span>
        <el-input
          placeholder="请输入验证码（点击图片刷新）"
          v-model="loginForm.code"
          @keyup.enter.native="handleLogin('loginForm')"
          clearable
        >
        </el-input>
      </el-form-item>
      <div class="img-yzm">
        <img
          src="http://192.168.31.162:8080/user/login/getCode"
          alt="captcha"
          @click="getCaptcha"
          ref="captcha"
        />
      </div>
      <el-button
        id="login_btn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-top: 25px"
        @click.native.prevent="handleLogin('loginForm')"
        >注册</el-button
      >
    </el-form>

    <div class="info" style="bottom: 40px">Beta: 1.0</div>
    <div class="info">Technical Support: XXX</div>
  </div>
</template>
<script>
import { register } from "@/api/login.js";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      var specialKey = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/gi;
      if (value.length < 3) {
        callback(new Error("用户名组成为字母或数字大于等于3！"));
      } else if (!specialKey.test(value)) {
        callback(new Error("用户名只允许汉字以及英文字母和数字！"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      //var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
      // callback(new Error("'密码必须由数字、字母、特殊字符组合,请输入6-16位'!"));
      var passwordreg = /(?=.*\d)(?=.*[a-zA-Z]).{6,16}/;
      if (!passwordreg.test(value)) {
        callback(new Error("'密码必须由数字、字母组合,请输入6-16位'!"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      var codeReg = /^[a-zA-Z0-9]{4}$/;
      if (!codeReg.test(value)) {
        callback(new Error("'验证码格式错误'!"));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      loginForm: {
        username: "",
        password: "",
        code: "",
        sex: "",
        birthday: "",
        checkpassword: "",
      },
      //  confirmPassword:"",
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
        checkpassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateConfirmPassword,
          },
        ],

        code: [{ required: true, trigger: "blur", validator: validateCode }],
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // confirmPassword() {
    //   if (this.confirmPassword !== this.loginForm.password) {
    //     callback(new Error("'密码必须由数字、字母组合,请输入6-16位'!"));
    //   }
    // },
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
          register(this.loginForm)
            .then((res) => {
              this.$router.push({ path: "/login" });
            })
            .catch((err) => {
              this.$refs.captcha.src =
                "http://192.168.31.162:8080/user/login/getCode?time=" +
                Date.now();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getCaptcha() {
      this.$refs.captcha.src =
        "http://192.168.31.162:8080/user/login/getCode?time=" + Date.now();
    },
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
      // padding: 12px 5px 12px 15px;
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
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 110px 35px 50px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
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
// // elment-ui日期选择框的日历图标和清除图标默认样式修改
// /deep/ .el-input__prefix,
// /deep/ .el-input__icon {
//   // line-height: 30px; // 可以通过设置行高改变图标在竖直方向上位置
// }
</style>
