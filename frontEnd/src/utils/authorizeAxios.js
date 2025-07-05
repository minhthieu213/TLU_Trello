import axios from "axios"
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from "./formatter"

let authorizedAxiosInstance = axios.create()

//Thoi gian cho toi da cua 1 request la : 10 p
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true


// Bo danh chan giua moi request

// request interceptor
authorizedAxiosInstance.interceptors.request.use( (config) => {
    interceptorLoadingElements(true)
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })

// response interceptor
authorizedAxiosInstance.interceptors.response.use( (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    interceptorLoadingElements(false)
    return response
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    interceptorLoadingElements(false)
    console.log(error)
    let errorMessage = error.message
    if(error.response?.data?.message){
        errorMessage = error.response?.data?.message
    }

    // Dung toastify hien thi loi ra man hinh tru ma 410 - gone phuc vu viec refresh token
    if(error?.response?.status !== 410){
        toast.error(errorMessage)
    }
    return Promise.reject(error)
  })

export default authorizedAxiosInstance