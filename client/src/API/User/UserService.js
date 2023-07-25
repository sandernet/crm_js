// User
// Модуль с запросами  к серверу через API
// Процедуры:
// 1. регистрация
// 2. авторизация
// 3. Проверка авторизации


import { $authHost, $host } from "../config"

import jwt_decode from "jwt-decode"


// запрос на регистрацию
export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token) ////декодируем и возвращаем информацию о пользователе
}

export const login = async (email, password) => {

    // раз комментировать для авторизации на сервере и получения токена 

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.47CRhPULZXmzu7gkSSGsgJ9x38rUpgotPJuMKqIqUzw'
    localStorage.setItem('token', token)
    return jwt_decode(token) //декодируем и возвращаем информацию о пользователе
    // const { data } = await $host.post('api/user/login', { email, password })
    // localStorage.setItem('token', data.token)
    // return jwt_decode(data.token) //декодируем и возвращаем информацию о пользователе

}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth',)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token) //декодируем и возвращаем информацию о пользователе
}
