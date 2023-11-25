<template>
    <div class="header-box">
        <div class="header-left">
            仪表盘
        </div>
        <div class="header-right">
            <span>
                <i><img :src="imgSrc" alt="" style="width: 40px;height: 40px;" class="photo"></i><span>{{ nickname }}</span>
            </span>
        </div>
    </div>
    <div class="routerTab">
        <el-tabs
        v-model="tabsstore.$state.editableTabsValue"
        type="card"
        class="demo-tabs"
        closable
        @tab-click="tabClick"
        >
    <el-tab-pane
      v-for="item in tabsstore.fillterTabs"
      :key="item.path"
      :label="item.name"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
    </div>
</template>


<script>
import useTabsStore from '../store/TabsStore'
import { useRouter } from 'vue-router';
import { ref ,onMounted} from 'vue';
import {getUserInfo} from '../api/getUser'

export default {
    name:'cheader',
    setup(){
        let tabIndex = 2
        let tabsstore =useTabsStore()
        const router = useRouter()
        let routerIndex = ref(router.currentRoute.value.path)
        const tabClick = (tab) => {
        let path = tab.paneName;
        router.push(path)
       }

       //获取头像用户名
       let imgSrc=ref('')
       let nickname = ref('')
       getUserInfo().then((res)=>{
           imgSrc.value = res.data[0].pic
           nickname.value = res.data[0].nickname
       })

        return {
            tabIndex,
            tabsstore,
            tabClick,
            routerIndex,
            imgSrc,
            nickname
        }
    }
}
</script>

<style>
.header-box{
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
}
.header-right{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.photo{
    position: absolute;
    top: 10px;
    right: 70px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs {
    background-color:white ;
}
</style>