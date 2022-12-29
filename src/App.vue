<template>
  
    <router-view ></router-view>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, } from 'vue'
    
</script>

<style lang="less" scope>
@import url('./assets/styles/rebase.less');
html,body{
    height: 100%;
}
#app{
    height: 100%;
    width: 100%;
    }
</style>

