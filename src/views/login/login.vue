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
const ruleFormRef = ref<FormInstance>();

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    // if (ruleForm.checkPass !== '') {
    //     if (!ruleFormRef.value) return
    //     ruleFormRef.value.validateField('checkPass', () => null)
    // }
    callback();
  }
};
const validatePwd = (rule: unknown, value: string|undefined, callback: (msg?:string|Error)=>void) => {
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
    { validator: validatePass, trigger: "blur" },
  ],
  pwd: [
    { validator: validatePwd, trigger: "blur" },
    { required: true, message: "密码不能为空", trigger: blur },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const login = () => {

};
</script>

<style lang="less" scope></style>
