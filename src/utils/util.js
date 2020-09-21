//获得随机字母
export function getRandomValue() {
    let result = [];
    for (let i = 0; i < 6; i++) {
        let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
        let item = {
            value: String.fromCharCode(65 + ranNum),
            ranNum: Math.ceil(ranNum / 2)
        };
        result.push(item);
    }
    return result;
}
//动态位置插入字符串
export function insertFlag(str, value, index) {
    let char = str.substr(index, 1);
    return str.replace(char, char + value);
}

//动态设置macId
export function setMacId() {
    let time = new Date().getTime();
    let result = getRandomValue();
    result.forEach(item => {
        if (item.ranNum > time.length - 1) {
            item.ranNum = time.length - 1;
        }
        time = insertFlag(time + "", item.value, item.ranNum);
    });
    return time;
}

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

/**
 * 判断浏览器是不是ie
 * @returns {boolean}
 */
function isIE() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

////判断是否IE的Edge浏览器
const isEdge = () => {
    return navigator.userAgent.indexOf("Edge") > -1;
};

//关闭当前页
export const closeWin = () => {
    if (!isIE() && !isEdge()) {
        window.location.href = "about:blank";
        window.close();
    }
};

//是否微信
export const isWx = () => {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("micromessenger") !== -1;
};
//是否QQ
export const isQQ = () => {
    var ua = navigator.userAgent.toLowerCase();
    return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
};

/**
 * json对象转url prarams参数
 * @param json
 * @returns {string}
 */
export const json2params = json => {
    let str = [];
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            str.push(key + "=" + json[key]);
        }
    }
    return str.join("&");
};

/**
 * 获取浏览器的type
 * @return {string}
 */
export function BrowserType() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    let isIE = window.ActiveXObject || "ActiveXObject" in window;
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器
    let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome浏览器

    if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if (userAgent.indexOf("MSIE 6.0") !== -1) {
            return "IE6";
        } else if (fIEVersion === 7) {
            return "IE7";
        } else if (fIEVersion === 8) {
            return "IE8";
        } else if (fIEVersion === 9) {
            return "IE9";
        } else if (fIEVersion === 10) {
            return "IE10";
        } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            return "IE11";
        } else {
            return "0";
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}
