<template>
    <el-table :data="tableData" border style="width: 100%">

        <el-table-column prop="id" label="编号" width="180" />

        <el-table-column prop="username" label="账号" width="180" />

        <el-table-column prop="nickName" label="姓名" />

        <el-table-column prop="email" label="邮箱" />

        <el-table-column label="添加时间" width="180">

            <template #default="scope">

                {{ formateDate(scope.row.createTime) }}
            </template>
        </el-table-column>

        <el-table-column label="最后登录" width="180">
            <template #default="scope">

                {{ (scope.row.loginTime) }}
            </template>
        </el-table-column>
        <el-table-column label="是否启用">

            <template #default="scope">
                <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" />
            </template>
        </el-table-column>


        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="text" @click="allocRole(row.id)">分配角色</el-button>
                <el-button type="text" @click="edit(row)">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>

    <EditAdmin :visible="visible" @close="closeDialog" :form="rowData"></EditAdmin>
    <EditRoleVue :form="roleData" :visible="roleVisible" @close="closeRole"></EditRoleVue>
</template>

<script lang='ts' setup>
import { getAdminList,getAdminRoleById ,getRoleListAll} from '../../request/api'
import { reactive, ref, toRefs, } from 'vue'
import EditAdmin from './components/EditAdmin.vue';
import EditRoleVue from './components/EditRole.vue';

const state = reactive<{
    tableData: {}[],
    visible: boolean,
    rowData: AdminObjItf
    roleVisible:boolean
    roleData:AdminRoleFormData
}>({
    tableData: [],
    visible: false,
    rowData: {},
    roleVisible:false,
    roleData:{
        userRoles:[],
        roleLists:[],
        adminId:0
    }
})
const { tableData, visible, rowData,roleVisible ,roleData} = toRefs(state)

const fetchData=()=>{
    getAdminList({ keyword: '', pageNum: 1, pageSize: 10 }).then(res => {
            if (res.code === 200) {
                tableData.value = res.data.list
            }
        })
}
fetchData()

const formateDate = (time: string | undefined) => {
    if (!time) return ''
    const date = new Date(time)
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate())
    let hour = addZero(date.getHours())
    let min = addZero(date.getMinutes())
    let sec = addZero(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
const addZero = (num: number) => {
    return num > 9 ? num : '0' + num
}
const edit = (row: {}) => {
    visible.value = true
    rowData.value = row
}
const closeDialog = (val?: 'reload') => {
    visible.value=false
    rowData.value={}
    visible.value = false
    if (val === 'reload') {
        fetchData()
    }
}

// 获取所有角色
getRoleListAll().then(res => {
  if (res.code === 200) {
    roleData.value.roleLists = res.data;
  }
})

const allocRole=(id: number)=>{
    getAdminRoleById(id).then(res => {
    if (res.code === 200) {
      roleVisible.value = true;
      roleData.value.adminId = id;
      roleData.value.userRoles = res.data;
    }
  })
    
}

const closeRole=()=>{
    roleVisible.value=false
}
</script>

<style lang="less" scope>

</style>