import api from "../ppSwallow/ppSwallow";

/**
 * 获取用户列表
 * @param params
 * @returns {*|AxiosPromise}
 */
export function getUserList(params) {
    return api.get("account/", params);
}
/**
 * 冻结
 * @param params
 */

export function postFreezeUser(params) {
    return api.get("account/freeze", params);
}

export function postUnfreezeUser(params) {
    return api.get("account/unfreeze", params);
}

/**
 * 获取金币列表
 * @param params
 */
export function getCoinList(params) {
    return api.get("coin/accounts", params);
}

/**
 * 赠送金币
 * @param params
 */
export function postSendCoin(params) {
    return api.post("coin/sendCoin", params, true);
}

/**
 * 赠送金币
 * @param params
 */
export function getMerchantList(params) {
    return api.get("merchant/all", params);
}

/**
 * 赠送金币
 * @param params
 */
export function getCoinDetailInfo(params) {
    return api.get("account/coinDetailInfo", params);
}



export default {
    getUserList,
    getCoinList,
    postSendCoin
};
