<template>
  <div class="common-layout">
    <el-container>
      <!-- <commonSide></commonSide> -->
      <el-aside width="220px">
        <commonSide></commonSide></el-aside>
      <el-container>
        <el-header>
          <commonHeader></commonHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  

<script>
import commonSide from '../layout/commonSideBar.vue'
import commonHeader from '../layout/cheader.vue';
import commonMain from './commonMain.vue';
import { ref } from 'vue'
export default{
  components: {
    commonSide,
    commonHeader,
    commonMain
  },
  setup(){

  }
}
</script>
<style>
.common-layout{
  height: 100vh;
}
.el-header{
  line-height: 60px;
}
.el-main{
  background-color: #eaedf1;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  margin-top: 50px;
}
.el-container{
  height: 100%;
}
</style>
