import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8099"

// 前置拦截
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
    let res = response.data;

    console.log("=================")
    console.log(res)
    console.log("=================")

    if (res.code === '200') {
      return response
    } else {

      ElMessage.error('错了哦，这是一条错误消息')

      return Promise.reject(response.data.msg)
    }
  },
  error => {
    console.log(error)
    if(error.response.data) {
      error.message = error.response.data.msg
    }

    if(error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login")
    }

    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
