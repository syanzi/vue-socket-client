/**
 * 获取当前操作系统
 */
export const getOS = () => {
    let os;
    if (navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1) {
        os = "Android";
    } else if (navigator.userAgent.indexOf("iPhone") > -1) {
        os = "iOS";
    } else if (navigator.userAgent.indexOf("Windows Phone") > -1) {
        os = "WP";
    } else if (window.navigator.userAgent.indexOf("Windows NT 10.0") !== -1) {
        os = "Windows 10";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) {
        os = "Windows 8";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) {
        os = "Windows 7";
    } else if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1) {
        os = "Windows Vista";
    } else if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1) {
        os = "Windows XP";
    } else if (window.navigator.userAgent.indexOf("Mac") !== -1) {
        os = "Mac/iOS";
    } else {
        os = "other";
    }
    return os;
};

/**
 * 获取操作系统版本
 */
export const getOSVersion = () => {
    let OSVision = "";
    let u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //Android
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        OSVision = navigator.userAgent.split(";")[1].match(/\d+\.\d+/g)[0];
    }
    if (isIOS) {
        OSVision = navigator.userAgent.split(";")[1].match(/(\d+)_(\d+)_?(\d+)?/)[0];
    }
    return OSVision;
};


export const getDeviceType = () => {
    //获取设备类型
    let deviceType;
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/(ipad)/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        deviceType = "PC"; //pc
    } else if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        deviceType = "Phone"; //phone
    } else if (bIsIpad) {
        deviceType = "ipad"; //ipad
    } else {
        deviceType = "其他";
    }
    return deviceType;
};

export const getNetWork = () => {
    let netWork;
    if (!navigator.connection) {
        return "";
    }
    switch (navigator.connection.effectiveType) {
        case "wifi":
            netWork = "wifi"; // wifi
            break;
        case "4g":
            netWork = "4G"; // 4g
            break;
        case "2g":
            netWork = "2G"; // 2g
            break;
        case "3g":
            netWork = "3G"; // 3g
            break;
        case "ethernet":
            netWork = "以太网"; // ethernet
            break;
        case "default":
            netWork = "未知"; // 未知
            break;
    }
    return netWork;
};

export const deviceInfoObj = () => {
    return {
        deviceType: getDeviceType(), // 设备类型
        os: getOS(), // 操作系统
        osVersion: getOSVersion(), // 操作系统版本
        userAgent: navigator.userAgent, // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
        appVersion: navigator.appVersion, // 浏览器的版本号
        screenHeight: window.screen.height, // 屏幕高
        screenWidth: window.screen.width, // 屏幕宽
        language: navigator.language, // 当前使用的语言-国家
        netWork: getNetWork(), // 联网类型
    };
};
