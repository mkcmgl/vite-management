<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login()">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import type { FormInstance } from "element-plus";
import { adminLoginApi ,getAdminInfo} from "../../request/api";
import Cookie from 'js-cookie';
import {useRouter,} from 'vue-router';
// const ruleFormRef = ref<FormInstance>();



const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("用户名不能为空"));
  } else {
    // if (ruleForm.checkPass !== '') {
    //     if (!ruleFormRef.value) return
    //     ruleFormRef.value.validateField('checkPass', () => null)
    // }
    callback();
  }
};
const validatePwd = (
  rule: unknown,
  value: string | undefined,
  callback: (msg?: string | Error) => void
) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  }
  // else if (value !== ruleForm.pass) {
  //     callback(new Error("Two inputs don't match!"))
  // }
  else {
    callback();
  }
};

const state = reactive({
  ruleForm: {
    username: "",
    pwd: "",
  },
});
let { ruleForm } = toRefs(state);

const rules = reactive({
  username: [
    { required: true, message: "用户名不能为空", trigger: blur },
    { validator: validateUsername, trigger: "blur" },
  ],
  pwd: [
    { validator: validatePwd, trigger: "blur" },
    { required: true, message: "密码不能为空", trigger: blur },
  ],
});



let ruleFormRef = ref();
let router=useRouter()
const login = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      console.log("then");
      adminLoginApi({
        username: ruleForm.value.username,
        password: ruleForm.value.pwd,
      }).then((res) => {
        if(res.code===200){
          Cookie.set('token',res.data.tokenHead+res.data.token,{expires:7})
          getAdminInfo().then((resData)=>{
            if(resData.code===200){
              router.push('/home')
            }
        })
        }
      });
    })
    .catch(() => {
      console.log("catch");
    });
};
</script>

<style lang="less" scope></style>
