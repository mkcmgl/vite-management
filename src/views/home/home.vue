<template>
    <div class="home_container">
    
        <div class="homepage_header">头</div>
    
        <div class="homepage_menu">左</div>
    
        <div class="homepage_content">内容</div>
    
    
    
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, } from 'vue'
</script>

<style lang="less" scope>
.home_container {
    position: relative;
 
    height: 100%;
    .homepage_header {
        height: 70px;
        background-color: antiquewhite;
    }
    .homepage_menu {
        position: absolute;
        top: 70px;
        left: 0;
        bottom: 0;
        width: 250px;
        background-color: beige;
    }
    .homepage_content{
        position: absolute;
        top: 70px;
        left: 250px;
        bottom: 0;
        right: 0;
        background-color: skyblue;

    }
}
</style>