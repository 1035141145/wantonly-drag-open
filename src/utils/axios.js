import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: 'http://8.129.212.181:6166', // api的base_url
    timeout: 5000, // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('Token')) {
        config.headers = {
            token: window.sessionStorage.getItem('Token'), // 携带权限参数
            userName: window.sessionStorage.getItem('userName'),
        }
    }
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
    /**
     * code:200,接口正常返回;
     */
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000,
            })
            // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
            if (res.code === 502) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    router.replace('/login')
                })
            }
            return Promise.reject('error')
        } // res.code === 200,正常返回数据
        return response.data
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        })
        return Promise.reject(error)
    },
)

export default service
