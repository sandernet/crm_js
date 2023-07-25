import axios from "axios";


const $host = axios.create({
    baseURL: process.env.CRM_API_URL

})


const $authHost = axios.create({
    baseURL: process.env.CRM_API_URL
})


const authInterceptor = config => {
    // получаем из локального хранилища токен авторизации
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}


$authHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost
}
