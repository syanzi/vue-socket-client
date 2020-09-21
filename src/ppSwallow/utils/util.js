/**
 * 复制对象
 * 从resource->target
 */
let copyObject = function copyObject(target, resource) {
    if (typeof target === "undefined") {
        return resource;
    }
    if (typeof resource === "undefined" || null === resource) {
        return target;
    }
    for (let key in resource) {
        if (resource.hasOwnProperty(key)) {
            if (null === resource[key] || "undefined" === resource[key]) continue;
            target[key] = resource[key];
        }
    }
    return target;
};

/**
 * md5加密前对参数的key进行排序
 * @param params
 */
let signConvert = params => {
    let signObj = {};
    let arr = [];
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            arr.push(key);
        }
    }
    arr.sort();
    let data = {};
    let signValue = "";
    arr.forEach(key => {
        data[key] = params[key];
        signValue += data[key];
    });
    signObj.data = data;
    signObj.signValue = signValue;

    return signObj;
};

/**
 * json对象转url prarams参数
 * @param json
 * @returns {string}
 */
let json2params = json => {
    let str = [];
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            str.push(key + "=" + json[key]);
        }
    }
    return str.join("&");
};

/**
 * 获取url的参数
 * @constructor
 * @return {{}}
 */
export const getUrlParams = () => {
    let url = window.location.href;
    if (!url.includes("?")) return null;
    let paramsStr = window.location.href.split("?")[1];
    let arr = paramsStr.split("&"); //各个参数放到数组里
    let obj = {};
    for (const item of arr) {
        if (!item.includes("=")) break;
        let keyArr = item.split("=");
        obj[keyArr[0]] = keyArr[1];
    }
    return obj;
};

export default {
    copyObject,
    signConvert,
    json2params,
    getUrlParams
};
