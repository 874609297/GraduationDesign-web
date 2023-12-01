<template>
      <el-alert
      style="margin-bottom: 10px;"
      title="注：true为管理员权限"
      type="warning"
      show-icon
      />
  <!-- 用户数据表格 -->
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="isAdmin" label="角色身份" width="120" />
    <el-table-column prop="pic" label="头像" width="220" >
      <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.pic"
                        lazy 
                        fit="contain"
                        style="width: 100px; height: 100px;"
                        />
                    </div>
                </template>
    </el-table-column>
    <el-table-column prop="id" label="用户id" width="220" />
    <el-table-column prop="username" label="用户名" width="220" />
    <el-table-column prop="nickname" label="用户昵称" width="220" />
    <el-table-column prop="phone" label="手机号" width="220" />
    <el-table-column prop="email" label="邮箱" width="220" />
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button type="primary" @click="editUserData(scope.$index, scope.row)"
            >修改</el-button>
            <el-popconfirm title="确定删除?"
            @confirm="confirmEvent(scope.$index,scope.row)"
            >
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
            </el-popconfirm>
    </template>
    </el-table-column>
    </el-table>
<!-- 分页 -->
<div style="float: right;margin-top: 20px;margin-right: 20px;">
  <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    />
</div>

    <!-- 更改用户数据 -->
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>       
        <el-button type="primary" @click="ConfirmEdit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  </template>
  <script>
  import { ref,onMounted } from 'vue'
  import {getUser} from '../api/getUser'
  import {editUser,deleteUser} from '../api/changeUser'
  import { ElMessage } from 'element-plus'
export default {
    setup(){
        let tableData = ref([])
        onMounted(()=>{
          getUser().then((res)=>{
            tableData.value = res.data
            res.data.forEach((item)=>{
              item.isAdmin = item.isAdmin ? '管理员' : '普通用户'
            })
          })
        })
        //编辑用户信息
        let form = ref([])
        let dialogFormVisible=ref(false)
        const editUserData = (index,row) => {
          dialogFormVisible.value=true
          form.value = row
        }
        const ConfirmEdit=()=>{
          dialogFormVisible.value=false
          editUser(form.value).then((res)=>{
            if (res.status==0) {
              ElMessage({
                message: '修改成功.',
                type: 'success',
              })
            }
          })
        }
        //删除用户
        const confirmEvent = (index,row) => {
          let obj = {id:row.id}
          console.log(obj);
          deleteUser(obj).then((res)=>{
            console.log(res);
          })
        }
        return {
            tableData,
            confirmEvent,
            editUserData,
            dialogFormVisible,
            form,
            ConfirmEdit
        }
    }
}
</script>