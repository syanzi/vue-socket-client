import http from "./http";
import config from "./config";
import util from "./utils/util";
import { getToken } from "../utils/auth";

/**
 * 参数md5加密转化
 * @param url  url
 * @param params 加密前的对象
 * @returns {string} 加密后的数据
 */
function paramsConvert(params) {
    return util.copyObject(params, config.defaultParams());
}

export default {
    get: (url, params) => {
        let urlParam = paramsConvert(params);
        return http({
            method: "get",
            url: config.baseUrl + url,
            params: urlParam
        });
    },

    post: (url, params, isQuery = false) => {
        let urlParam = paramsConvert(params);
        if (isQuery) {
            return http({
                method: "post",
                url: config.baseUrl + url,
                params: urlParam
            });
        }
        return http({
            method: "post",
            url: config.baseUrl + url,
            data: urlParam
        });
    },
    //书籍下载
    downloadBlob(url) {
        if (!window.XDomainRequest) {
            return http.get(url);
        }

        return new Promise((resolve, reject) => {
            let xdr = new XDomainRequest();
            xdr.open("get", url);
            xdr.onerror = function() {
                reject("timeout");
            };
            xdr.onload = function() {
                resolve(xdr.responseText);
            };
            setTimeout(function() {
                xdr.send();
            }, 0);
        });
    }
};
