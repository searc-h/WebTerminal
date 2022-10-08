import axios from 'axios'

const myAxios = axios.create({
    baseURL:"http://localhost:7345/api",
    timeout:5000
})

myAxios.defaults.withCredentials = true;

myAxios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
    }
)

myAxios.interceptors.response.use(
    function (response) {
        console.log(response);
        // 对响应数据做点什么
        return response.data;
    },
    function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
    }
)
export default myAxios