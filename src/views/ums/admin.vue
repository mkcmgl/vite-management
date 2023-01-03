<template>
     <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="username" label="账号" width="180" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="添加时间" />
    <el-table-column prop="loginTime" label="最后登录" />
    <el-table-column prop="status" label="是否启用" />
    <el-table-column  label="操作" />

  </el-table>

</template>

<script lang='ts' setup>
import {getAdminList} from '../../request/api'
import { reactive, ref, toRefs, } from 'vue'
        const state=reactive<{tableData:{}[]}>({
            tableData:[]
        })
        const {tableData} =toRefs(state)
getAdminList({keyword:'',pageNum:1,pageSize:10}).then(res=>{
    if(res.code===200){
        tableData.value=res.data.list
    }
})
</script>

<style lang="less" scope>
    
</style>