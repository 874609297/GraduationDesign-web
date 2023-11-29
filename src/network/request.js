import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'

let loadingInstance;

const request = axios.create({
    // baseURL:process.env.VUE_APP_API_URL,
    baseURL:'http://127.0.0.1:3007/',
    timeout:9999,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})
request.interceptors.request.use(
    config => {
          // 封装token鉴权
          loadingInstance  = ElLoading.service({ //加载loading
            fullscreen: true, 
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)' 
      });
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    err => Promise.reject(err)
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(
    res => {
        loadingInstance.close();
        // 过滤数据
        return res.data
    },
    err => {
        const { response } = err
        if (response) {
            const status = response.status
            switch (status) {
                case 404:
                    ElMessage.error('资源不存在 404')
                    break;
                case 403:
                    ElMessage.error('拒绝访问 403')
                    break;
                case 401:
                    ElMessage.error('身份凭证确实 401')
                    break;
                case 500:
                    ElMessage.error('服务器错误 500')
                    break;
                default:
                    ElMessage.error('出现意想不到的错误')
                    break;
            }
        }else {
            // 服务器崩溃问题或是网络问题
            if(!window.navigator.onLine) {
                ElMessage.error('当前网络不可用,请检查你的网络连接')
                return
            }else {
                ElMessage.error('连接服务器错误'+err?.message)
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    }
)

export default request
