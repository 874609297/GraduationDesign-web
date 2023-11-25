<template>
 <el-row class="tac">
    <el-col :span="24">
      <div class="title-icon">
        <img src="../assets/logo.png" alt="" style="height: 40px;width: 40px;margin-left: 20px;margin-top: 10px;">
      <span style="font-weight:700;font-size: 15px;color: white;">
        Vue-Node-admin
      </span >
      </div>
    

      <!-- 导航栏 -->
      <el-menu
        :unique-opened	="true"
        :default-active='routerIndex'
        class="el-menu-vertical-demo"
      >
        <template v-for="(item,index) in routerOptions" :key="index">
          <template v-if="!item.children">
              <el-menu-item :index="item.path" @click="routerGoto(item)">
                <span>{{ item.name }}</span>
              </el-menu-item>
          </template> 
          <template v-else>
            <el-sub-menu :index="item.path">
              <template #title>
                <span>{{ item.name}}</span>
              </template>
              <el-menu-item :index="item.path" v-for="(item,index) in item.children" :key="index" @click="routerGoto(item)">
                {{ item.name }}
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
      
    </el-col>
 </el-row>
</template>
  
 <script>
 
import { onMounted, watch ,ref} from 'vue';
// import {routeList} from '../router/routeList'
import { useRouter, useRoute } from 'vue-router';
import useTabsStore from '../store/TabsStore'

 export default {
    setup() {
        const router = useRouter();
        let routerOptions = router.options.routes[1].children;
        let routerIndex = ref(router.currentRoute.value.path)
        watch(()=>router.currentRoute.value.path,(newVal)=>{
          routerIndex.value = newVal
        },{ immediate: true },{ deep: true })
        let tabsstore =useTabsStore()
        // 导航跳转
        const routerGoto = (item) => {
          tabsstore.addTabs(item.path,item.name)
          router.push(item.path);
        };
        return{
          routerOptions,
          routerGoto,
          routerIndex
        }
    },
 }
 </script>
  
  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
  .tac{
    height: 100%;
  }
  .title-icon{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .el-col{
    background-color: #191a23;;
  }
  .el-col ul{
    background-color: #191a23;
  }
  .el-col li{
    color: white;
  }
  .el-col li:hover{
    background-color:#191a23;
  }
  .el-sub-menu__title{
    color: white;
  }
  .el-sub-menu__title:hover{
    background-color: #4d70ff;
  }
  .el-menu {
  border-right:0!important;
}
  </style>