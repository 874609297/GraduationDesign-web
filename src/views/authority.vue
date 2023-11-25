<template>
    <div class="infoBox">
        <div class="infoLeft">
            <el-card shadow="hover" style="height: 450px;"> 
                <img style="width: 100px; height: 100px" :src="imgSrc"/>
                <p style="font-size: 1.675rem;margin-top: 20px;">
                    {{ userInfoList[0].value }}
                </p>
                <p style="color: rgb(107,114,128);margin-top: 20px;">这个家伙很懒，什么都没有留下</p>
                <el-text class="mx-1" v-for="item in userInfoList" :key="item.icon" tag="p" style="margin-top: 20px;" size="large">
                    <el-icon>
                        <component v-if="item.icon" :is='item.icon'/>
                    </el-icon>
                    {{ item.value }}
                </el-text>

            </el-card>
        </div>
        <div class="infoRight">
            <el-card shadow="hover" style="height: 450px;">
                <el-tabs v-model="activeName" class="demo-tabs">
                    <el-tab-pane label="账号绑定" name="first">
                        <template #default>
                            <div>
                                <ul style="list-style: none;">
                                    <li style="margin-top: 20px;">
                                        <div style="display: flex;justify-content: space-between;">
                                            <div>
                                                <el-text class="mx-1" tag="p">密保手机</el-text>
                                                <el-text class="mx-1" tag="p" size="small" style="margin-top: 10px;">已绑定手机: {{ phone }}</el-text>
                                            </div>
                                            <div style="display: flex;justify-content: center;align-items: center;">
                                                <el-text class="mx-1" tag="p" type="primary" style="cursor: pointer;">立即修改</el-text>
                                            </div>
                                        </div>
                                    </li>
                                    <li style="margin-top: 20px;">
                                        <div style="display: flex;justify-content: space-between;">
                                            <div>
                                                <el-text class="mx-1" tag="p">密保邮箱</el-text>
                                                <el-text class="mx-1" tag="p" size="small" style="margin-top: 10px;">已绑定邮箱: {{ email }}</el-text>
                                            </div>
                                            <div style="display: flex;justify-content: center;align-items: center;">
                                                <el-text class="mx-1" tag="p" type="primary" style="cursor: pointer;">立即修改</el-text>
                                            </div>
                                        </div>
                                    </li>
                                    <li style="margin-top: 20px;">
                                        <div style="display: flex;justify-content: space-between;">
                                            <div>
                                                <el-text class="mx-1" tag="p">密保问题</el-text>
                                                <el-text class="mx-1" tag="p" size="small" style="margin-top: 10px;">未设置问题</el-text>
                                            </div>
                                            <div style="display: flex;justify-content: center;align-items: center;">
                                                <el-text class="mx-1" tag="p" type="primary" style="cursor: pointer;">去设置</el-text>
                                            </div>
                                        </div>
                                    </li>
                                    <li style="margin-top: 20px;">
                                        <div style="display: flex;justify-content: space-between;">
                                            <div>
                                                <el-text class="mx-1" tag="p">修改密码</el-text>
                                                <el-text class="mx-1" tag="p" size="small" style="margin-top: 10px;">修改个人密码</el-text>
                                            </div>
                                            <div style="display: flex;justify-content: center;align-items: center;">
                                                <el-text class="mx-1" tag="p" type="primary" style="cursor: pointer;">修改密码</el-text>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-card>

        </div>
    </div>
</template>


<script>
import { onMounted, ref } from 'vue'
import {getUserInfo} from '../api/getUser'
export default {
    name:'authority',
    setup(){
        let userInfoList=ref([
            {icon:'User'},
            {icon:'School'},
            {icon:'HomeFilled'},
            {icon:'Grid'},
        ])
        let imgSrc=ref('')
        let email = ref('')
        let phone = ref('')
        const activeName = ref('first')

        //用户数据模型
        onMounted(()=>{
            getUserInfo().then(res=>{
                imgSrc.value=res.data[0].pic
                email.value=res.data[0].email
                phone.value=res.data[0].phone
                userInfoList.value[0].value = res.data[0].nickname
                userInfoList.value[1].value = res.data[0].school
                userInfoList.value[2].value = res.data[0].address
                userInfoList.value[3].value = res.data[0].technology
            })
        })
        return{
            userInfoList,
            activeName,
            imgSrc,
            email,
            phone
        }
    }
}
</script>


<style>
.infoBox{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.infoLeft{
    text-align: center;
    width: 30%;
    height: 520px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
.infoRight{
    width: 80%;
    height: 520px;
}
</style>