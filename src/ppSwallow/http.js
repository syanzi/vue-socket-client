import axios from "axios";
import {Message} from "element-ui";
import {getToken} from "../utils/auth";

const dev = process.env.NODE_ENV !== "production";

const http = axios.create({
    timeout: 50000
});

// 请求拦截拦截器
http.interceptors.request.use(
    config => {
        let token = getToken();
        if (token) {
            config.headers.common["authorization"] = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// respone拦截
http.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.errorMsg) {
            res.errorMsg = decodeURIComponent(res.errorMsg);
        }
        if (dev) {
            console.log(res);
        }
        if (res.code && res.code !== 0) {
            Message.error(res.message);
            return Promise.reject(res);
        } else {
            return res;
        }
    },
    error => {
        console.log(error);
    }
);

export default http;
