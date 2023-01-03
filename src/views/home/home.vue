<template>
  <div class="home_container">
    <div class="homepage_header">头</div>

    <div class="homepage_menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :router="true"
        :unique-opened="true"
      >
        <el-sub-menu :index="menu.id+''" v-for="(menu, index) in newMenus" ::key="menu.id">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->

            <span>{{ menu.title }}</span>
          </template>
          <template  v-for="(submenu, index) in menu.children"
            :key="submenu.id">
                
            <el-menu-item
            :index="'/'+menu.name+'/'+submenu.name"
            v-if="!submenu.hidden"
          >
            {{ submenu.title }}
          </el-menu-item>
          </template>
   
        </el-sub-menu>
      </el-menu>
    </div>

    <div class="homepage_content">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs ,computed} from "vue";
import { useStore } from "vuex";
const store = useStore();
interface MenuObj {
  parentId: number;
  id: number;
  title: string;
  hidden:number
  name:string
  children?: MenuObj[];
}

interface NewMenus {
  [key: number]: MenuObj;
}

let newMenus = computed<NewMenus>(()=>store.getters.getMenus);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
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
  .homepage_content {
    position: absolute;
    top: 70px;
    left: 250px;
    bottom: 0;
    right: 0;
    background-color: skyblue;
  }
}
</style>
