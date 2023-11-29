<template>
    <div>
        <el-alert
        style="margin-bottom: 10px;"
        title="点击“图片”可以放大进行浏览。"
        type="warning"
        show-icon
        />
    </div>
    <!-- 上传按钮 查询按钮 -->
    <div class="uploadBox">
        <div class="uploadLeft">
            <el-upload
                class="upload-demo"
                multiple
                :limit="3"
                :headers="headers"
                :on-change="onChange"
                :before-upload="beforeUpload"
            >           
            <el-tooltip
                class="box-item"
                effect="dark"
                content="上传的jpeg/png格式图片大小不超过40kb"
                placement="top-start"
                >
                <el-button type="primary">点击上传</el-button>
            </el-tooltip>
        </el-upload>
        </div>
        <div class="uploadmid">
            <el-input v-model="inputValue" placeholder="请输入文件名或备注" />
        </div>
        <div class="uploadRight">
            <el-button type="primary" :icon="Search" @click="serchPhoto">搜索</el-button>
        </div>
    </div>
    <!-- 图片展示 -->
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="浏览" width="280">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.photo"
                        lazy 
                        fit="contain"
                        style="width: 100px; height: 100px;"
                        :preview-src-list="srcList"
                        :zoom-rate="1.2"
                        :max-scale="7"
                        :min-scale="0.2"
                        preview-teleported	
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="300" />
            <el-table-column prop="fileName" label="文件名/备注" width="180"/>
            <el-table-column prop="link" label="链接" width="180"/>
            <el-table-column prop="tag" label="标签" width="120" >
                <template #default="scope">
                    <el-tag class="ml-2" type="success">
                        {{ scope.row.tag }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="180" >
                <template #default="scope">
                    <el-text class="mx-1" type="primary" style="cursor: pointer;" @click="downLoad(scope.$index,scope.row)"><el-icon><Download /></el-icon>下载</el-text>                 
                    <el-popconfirm title="此操作不可逆，确定删除？"
                    @confirm="confirmEvent(scope.$index,scope.row)"
                    >
                    <template #reference>
                        <el-text 
                            class="mx-1" 
                            type="primary" 
                            style="margin-left: 20px;cursor: pointer;" 
                            ><el-icon><DeleteFilled />
                            </el-icon>删除</el-text>
                    </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div style="float: right;margin-top: 20px;margin-right: 20px;">
  <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    />
</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import {  Search } from '@element-plus/icons-vue'
import {getPhoto} from '../api/getPhoto'
import {addPhoto} from '../api/addPhoto'
import { ElMessage } from 'element-plus'
import {deleteImgByid} from '../api/deleteImg'
export default{
    name:'media',
    setup(){
        //搜索文件
        let inputValue = ref('')
        const serchPhoto = ()=>{
            tableData.value= tableData.value.filter((item)=>{
                return item.fileName.includes(inputValue.value)
            })
        }
        /**
         * base64ImgtoFile 图片转为base64格式
         * @param {*图片rul} dataurl 
         * @param {*文件名} filename 
         */
        const  base64ImgtoFile=function (dataurl, filename = 'file') {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const suffix = mime.split('/')[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        })
        }
         //图片获取
         let tableData = ref([])
         let srcList  = ref([])
        onMounted(()=>{
            getPhoto().then((res)=>{
                res.data.forEach((item,index)=>{
                    srcList.value.push(item.base64_data)
                    tableData.value.push({
                        id:res.data[index].id,
                        photo:res.data[index].base64_data,
                        date:base64ImgtoFile(res.data[index].base64_data).lastModifiedDate,
                        fileName:res.data[index].name,
                        link:base64ImgtoFile(res.data[index].base64_data).type,
                        tag:base64ImgtoFile(res.data[index].base64_data).name.slice(base64ImgtoFile(res.data[index].base64_data).name.indexOf('.')+1),
                    })
                })
            })
        })
        /**
         * 上传图片
         */
        let headers= ref({Authorization:localStorage.getItem("token")})
        //校验图片是否合法
        const beforeUpload = function(file){
            const isLt2M = file.size / 1024  < 4;
            if (!isLt2M) {
                ElMessage({message:'上传成功!',type: 'success'})
            }
                return isLt2M;
        }
        const onChange =(file)=>{
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = () => {
            addPhoto({base64_data:reader.result,name:file.name}).then((res)=>{
                tableData.value.push({
                    photo:reader.result,
                    date:file.raw.lastModifiedDate,
                    fileName:file.name,
                    link:file.raw.type,
                    tag:'png'
                })
                console.log("sss");
                console.log(file);
            })
        };
            reader.onerror = function(error) {
            console.log("Error: ", error);
            };
        }

        /**
         * 下载图片函数
         * 
         */
         const downLoadBlob = (blob,filename)=>{
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
        const downLoad = (index,row)=>{
            let imgFile = base64ImgtoFile(row.photo)
            downLoadBlob(imgFile,row.fileName)
        }

         /**
          * 删除图片函数
          */
            const confirmEvent = function(index,row){
                deleteImgByid({id:row.id}).then((res)=>{
                    tableData.value.splice(index,1)
                    ElMessage({message:'删除成功.',type: 'success'})
                })
            }
         
        return{
            inputValue,
            Search,
            tableData,
            headers,
            serchPhoto,
            beforeUpload,
            onChange,
            confirmEvent,
            downLoad,
            srcList
        }
    }
}
</script>

<style>
.uploadBox{
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.uploadmid{
    flex: 1;
}
</style>