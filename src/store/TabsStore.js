import { defineStore } from 'pinia'
const useTabsStore = defineStore('tabStore', {
  state(){
    return{
      routerList:[{ path:'/main',title:'仪表盘',name:'仪表盘'}],
      editableTabsValue:'/main'
    }
  },
  getters:{
    fillterTabs(){
      return this.routerList.filter((item,index,arr)=>{
        return arr.findIndex(v=>v.path===item.path)===index
      })
    }
  },
  actions:{
    addTabs (path,name){
      this.$state.editableTabsValue = path
      this.routerList.push({ path:path,name:name,title:name })
    },
  },
  persist: {
    enabled: true
  }

})
export default useTabsStore