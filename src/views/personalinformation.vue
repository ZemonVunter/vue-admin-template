<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-col :md="{span: 5}" 
      :xs=" {span: 17}">
        <el-input
          v-model="ruleForm.username"
          :disabled="true"
          autosize
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-col :md="{span: 5}" 
      :xs=" {span: 17}">
        <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
     <el-col :md="{span: 5}" 
      :xs=" {span: 17}">
        <el-input v-model="ruleForm.sex" :disabled="true"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
     <el-col :md="{span: 5}" 
      :xs=" {span: 17}">
        <el-date-picker
          type="date"
          placeholder="   请选择您的出生日期(可点击顶部年份或月份，快速选择)"
          v-model="ruleForm.birthday"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions0"
          align="center"
          :editable="false"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="认证状态" prop="name">
      <el-col :md="{span: 5}" 
      :xs=" {span: 17}">
        <el-input v-model="ruleForm.authStatus" :disabled="true"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="confirmchange" @click.native.prevent="submitForm('ruleForm')"
        >确认修改</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { getpersonalinfo } from "@/api/personalinfo.js";
import{updatepersonalinfo} from "@/api/personalinfo.js";
export default {
    
  data() {
        const validatephone = (rule, value, callback) => {
      var codeReg =/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!codeReg.test(value)) {
        callback(new Error("请输入正确的手机号！"));
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
      ruleForm: {
        username: "",
        sex: "",
        authStatus: "",
        birthday: "",
        phone: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入正确的手机号", trigger: "change" ,validator: validatephone},
        ],
      },
    };
  },
  mounted() {
   let username = JSON.parse(localStorage.getItem("userInfo")).username;
    this.ruleForm.username=username;
      getpersonalinfo({username:username}).then((result) =>{
           this.ruleForm.birthday=result.data.birthday;
           this.ruleForm.sex=result.data.sex;
           this.ruleForm.authStatus=result.data.authStatus;
           this.ruleForm.phone=result.data.phone;
     });
  },

  methods: {
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
         that.change();
          } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    change(){
       updatepersonalinfo(this.ruleForm).
          then((res) =>{
            this.$message({
              message:res.message,
              type: 'success'
              });
        });
    }
  },
};
</script>

<style scoped>
.confirmchange{
margin-top: 15px;
margin-left: 30px;
}
</style>