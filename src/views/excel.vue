<template>
    <el-table :data="tableData" stripe  style="width: 100%" id="tableid">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-button type="success" icon="Upload"  style="margin-left:10px" @click="exportToExcel()">导出</el-button>

  </template>
  
  
<script>
import { exportJsonToExcel } from '../utils/Export2Excel.js'
import {reactive} from "vue";
export default {
    setup(){

        const data = reactive({ arr: [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
            });//这里用四个对象来模拟接口中得到的object型数据

            const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
        let data2=[]//设置一个一级列表来接收二级列表，因为data里面要用[[]]的形式
          //如果直接让data等于接口中的object数据，会卡住，所以转换为两层列表来传递给数据表
            for (const key in data.arr) {
                let data1=[]//设置一个二级列表，导出的表格每一行为一个二级列表
                data1.push(data.arr[key].date,data.arr[key].name,
            //循环把接口中需要用到的数据加入二级列表
                data.arr[key].address)
                data2.push(data1)//把二级列表塞入一级列表
            }
        const exportToExcel=function(){// @click传递的函数
            exportJsonToExcel({ 
                // 这里用到了Export2Excel.js
                header: ["日期", "姓名","地址"],//表名个数可以不等于数据每一行的列数
                data:data2//把data2传递给数据表，或者不用data2，用自己设置的数据来代替
                //如：[[1,1,1],[2,2,2],[3,3,3]] 就是导出三行，以此类推
            })
        }
        return{exportToExcel,tableData,data}
    }

}
</script>
