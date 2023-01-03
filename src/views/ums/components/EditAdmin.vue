<template>
    <!-- :before-close="close" -->
    <el-dialog v-model="visible" title="Shipping address" >
        <el-form :model="newForm" :label-width="formLabelWidth">
            <el-form-item label="账号：">
                <el-input v-model="newForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input v-model="newForm.nickName" autocomplete="off" />
            </el-form-item> 
            <el-form-item label="邮箱">
                <el-input v-model="newForm.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="newForm.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="newForm.note" type="textarea" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否启用">
                <!-- <el-radio-group v-model="newForm.status" class="ml-4">
                        <el-radio label="1" size="large">是</el-radio>
                        <el-radio label="0" size="large">否</el-radio>
                </el-radio-group> -->
                <el-radio v-model="newForm.status" :label="1" size="large">是</el-radio>
                <el-radio v-model="newForm.status" :label="0" size="large">否</el-radio>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="modifyAdmin">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs,computed ,watch} from 'vue'
import {updateAdmin} from "../../../request/api"

// const props=defineProps<{
//     visible:Boolean
// }>()

const props = defineProps<{
    visible:boolean,
    form:AdminObjItf
}>()

const emits = defineEmits<{
    (event: 'close',val?:'reload'): void,
    (event: 'visible', val: Boolean): void
  }>()


// (['update:visible'])
const visible = computed({
  get: () => {
    return props.visible
  },
    set: val => {
    emits('visible',val)
  },
})


const state = reactive<{
    formLabelWidth:string,
    newForm:AdminObjItf
}>({

    formLabelWidth: '120px',
    newForm:{}
})
// const emit = defineEmits<{
//     (event: 'close'): void
// }>()
const { newForm,formLabelWidth } = toRefs(state)


watch(() => props.form, () => {
  newForm.value = { ...props.form };
})

const close = (val?: 'reload') => {
    
    emits('close',val)
}

const modifyAdmin=()=>{
    if(newForm.value.id){
        updateAdmin(newForm.value.id ,newForm.value).then(res=>{
        if(res.code===200){
            close('reload');
        }
    })
    }

}
</script>

<style lang="less" scope>

</style>