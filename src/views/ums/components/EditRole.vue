<template>
    <el-dialog v-model="visible" title="分配角色" :before-close="close">
    <el-form :model="form">
     
      <el-form-item >
        <el-select multiple  v-model="roles" placeholder="请选择分配的角色">
          <el-option v-for="(item,index) in form.roleLists " :label="item.name" :value="item.id" />
         
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="updateRole">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, computed,watch} from 'vue'
import {updateAdminRole} from "../../../request/api"
     const  props=defineProps<{
        visible: boolean
        form:AdminRoleFormData
     }>()   
     
     const visible = computed({

        get: () => {
    return props.visible
  },
    set: val => {
    emits('visible',val)
  },
 
})

const roles = ref<number[]>([]);
    watch(
        () => props.form.userRoles,
        () => {
            roles.value = props.form.userRoles.map(item => item.id);
        }
    );

     const updateRole=()=>{
        updateAdminRole({adminId:props.form.adminId,roleIds: roles.value.join(',')})

        close();
     }
     const emits =defineEmits<{
        (event: 'close'): void
        (event: 'visible', val: boolean): void
     }>()
      const close=()=>{
        emits('close')
      }
</script>

<style lang="less" scope>
    
</style>