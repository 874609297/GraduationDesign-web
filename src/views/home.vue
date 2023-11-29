<template>
    <div>
        <div class="header">
            <div class="header-left">
                <p style="font-size: 1.875rem;color:rgb(75, 85, 99)">早安,管理员,请开始一天的工作吧</p>
                <br>
                <p style="font-size: 1.125rem;">
                    今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。
                </p>
                <br>
                <div class="text-box" style="height: 60px;">
                    <span>
                        <el-icon color="cornflowerblue"><Sort /></el-icon>
                        今日流量(59924)</span>
                    <span>
                        <el-icon color="cornflowerblue"><User /></el-icon>
                        总用户数(20041)
                    </span>
                    <span>
                        <el-icon color="cornflowerblue"><ChatDotSquare /></el-icon>
                        好评率(99%)
                    </span>
                </div>
                <br>
                <p style="font-size: 14px;color: rgb(75, 85, 99,0.5);">
                    使用教学： 
                    <a href="https://cn.vuejs.org/" style="color: rgb(64, 158, 255);">https://cn.vuejs.org/</a>
                </p>
                <br>
                <p style="font-size: 14px;color: rgb(75, 85, 99,0.5);">
                    插件仓库： 
                    <a href="https://element-plus.gitee.io/zh-CN/" style="color: rgb(64, 158, 255);">https://plugin.gin-vue-admin.com</a>
                </p>
            </div>
            <div class="header-right">
                <img src="../assets/bg.png" alt="">
            </div>
        </div>
        <div class="mid">
            <p style="font-size: 14px;">快捷入口</p>
            <div class="ul-box">
                <div v-for="(item,index) in list" :key="index">
                    <div class="li-box">
                        <el-icon size="30" :color="item.color">
                            <component v-if="item.icon" :is='item.icon'/>
                        </el-icon>                        
                    </div>
                    <span style="font-size: 14px;">{{ item.label }}</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <!-- <p style="font-size: 14px;">数据统计</p> -->
            <div class="charts-box" id="charts"></div>
            <div class="list-box">
                <p style="font-weight: 600;font-size: 14px;">更新日志</p>
                <ul>
                    <li v-for="(item,index) in logList" :key="index" style="font-size: 13px;list-style: none;margin-top: 10px;">
                        <span>
                            {{ index+1 }}
                        </span>
                        <span style="margin-left: 10px;">
                            {{ item.title }}
                        </span>
                        <span style="margin-left: 10px;">
                            {{ item.time }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import {ref,onMounted} from 'vue'
export default {
    name:'commonmain',
    setup(){
        const list = ref([
        {
            path:'/index',
            label:'用户管理',
            icon:'Monitor',
            url:'',
            color:'orange'
          },
          {
            path:'/index',
            label:'角色管理',
            icon:'Setting',
            url:'',
            color:'deepskyblue'
          },
          {
            path:'/index',
            label:'用户管理',
            icon:'Grid',
            url:'',
            color:'hotpink'
          },
          {
            path:'/index',
            label:'表单生成',
            icon:'Goods',
            url:'',
            color:'khaki'
          },
          {
            path:'/index',
            label:'媒体库',
            icon:'ShoppingTrolley',
            url:'',
            color:'peachpuff'
          },
          {
            path:'/index',
            label:'个人中心',
            icon:'Monitor',
            url:'',
            color:'teal'
          },
        ])
        let logList=ref([
            {
                time:'2023-10-26',
                title:'添加分配菜单和分配api的滚动条'
            },
            {
                time:'2023-11-6',
                title:'SelectFile组件建议添加limit和acc'
            },
            {
                time:'2023-1-26',
                title:'优化打包'
            },
            {
                time:'2024-6-26',
                title:'修复UI BUG #1562'
            },
            {
                time:'2023-5-26',
                title:'修复富文本bug，调整日志输出'
            }
            ,{
                time:'2002-8-26',
                title:'feature: mongoDB 支持 (#1565)'
            }
            ,{
                time:'2023-5-16',
                title:'解决打包错误的bug'
            },
            {
                time:'2023-3-29',
                title:'修复字典展示bug 修复自动化代码'
            },
            {
                time:'2023-4-12',
                title:'字典使用模式调整'
            },
            {
                time:'2023-6-26',
                title:'增加package为空判断'
            }
        ]);
        // 图表
        onMounted(()=>{
            init();
        })
        const init = function(){
            var myChart = echarts.init(document.getElementById('charts'));
        // 指定图表的配置项和数据
            var option = {
                title: {
                text: '销售趋势'
            },
            tooltip: {},
            legend: {
            },
            xAxis: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {},
            series: [
            {
                type: 'bar',
                data: [200, 360, 100, 102, 205, 364, 105, 514, 334, 125, 498,531]
            }
            ]
        };
        myChart.setOption(option);
                }
        return{
            list,
            logList
        }
    }
}
</script>

<style>
.header{
    padding: 30px;
    background-color: white;
    height: 300px;
    display: flex;
    justify-content: space-between;
}
.text-box{
    display: flex;
    align-items: center;
}
.text-box span{
    font-size: 14px;
    margin-right: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
    color: gray;
}
.mid{
    margin-top: 20px;
    padding: 30px;
    background-color: white;
    height: 100px;
}
.ul-box{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-content: center;
    width: 100%;
}
.ul-box div{
    width: 60px;
    height: 60px;
    cursor:pointer
}
.li-box{
    border-radius: 5px;
    /* background-color:red ; */
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer{
    background-color: white;
    padding: 20px;
    margin-top: 30px;
    height: 350px;
    display: flex;
    justify-content: space-between;
}
.charts-box{
    flex: 7;
}
.list-box{
    flex: 3;
    padding: 20px;
}
</style>