<template lang="">
    <div class="main">
        <div class="login-box">
            <div>
                <div class="title-box">
                <img src="../assets/logo.png" alt="" style="height:100px;width:100px">
                <p>Node-Vue-Admin</p>
                <p class="info">
                    A management platform using Node and Vue
                </p>
            </div>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                status-icon
            >
            <el-form-item  prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" style="height:50px"/>
            </el-form-item>
            
            <el-form-item  prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" style="height:50px"/>
            </el-form-item>
            </el-form>
            <div class="btnBox" style="text-align: center;">
                <el-button type="primary" size="large" @click="LoginBtn">登录</el-button>
                <el-button type="primary" size="large">注册</el-button>
            </div>
            </div>
        </div>
        <div class="pic-box">
            <img src="../assets/banner.jpg" alt="" >
        </div>
    </div>
</template>
<script>
import {reactive} from 'vue'
import { login } from '../api/home'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        const ruleForm = reactive({
            username: '',
            password: '',
        })

        const rules = reactive({
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 8, message: '请输入正确用户名', trigger: 'blur' },
            ],
            password:[
                {},
                { min: 6, max: 11, message: '请至少输入6位密码', trigger: 'blur' }
            ]
        })
        const LoginBtn = ()=>{
            login(ruleForm).then((res)=>{
                localStorage.setItem('token',res.token)
                console.log(res);
                router.push('/main')
            })
        }
        return {
            rules,
            ruleForm,
            LoginBtn
        }
    }
}
</script>
<style>
.main{
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: space-between;
}
.login-box{
    padding: 20px;
    width: 300px;
    margin-left: 280px;
}
.title-box{
    margin-bottom: 20px;
    font-weight: 700!important;
    font-size: 1.5rem!important;
    text-align: center!important;
}
.pic-box img{
    height: 100vh;
}
.info{
    font-weight: 300!important;
    font-size: .875rem!important;
}
</style>