import axios from "axios"
import { Cookies } from "./Cookies"

export class ServerCall {
    static sendGetReq(url) {
        return axios.get(process.env.NEXT_PUBLIC_BASE_URL + url, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendPostReq(url, data) {
        return axios.post(process.env.NEXT_PUBLIC_BASE_URL + url, data, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendPutReq(url, data) {
        return axios.put(process.env.NEXT_PUBLIC_BASE_URL + url, data, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendDeleteReq(url, data) {
        return axios.delete(process.env.NEXT_PUBLIC_BASE_URL + url,{
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
}