import storage from "./storage";

const USER_ID = "userId";
const SESSION_ID = "sessionId";
const USER_INFO = "userInfo"; //用户信息

const TOKEN_KEY = "token";

export function getToken() {
    return get(TOKEN_KEY);
}

export function setToken(token) {
    return set(TOKEN_KEY, token);
}

export function removeToken() {
    return remove(TOKEN_KEY);
}

// 设置setSessionId
function setSessionId(sid) {
    set(SESSION_ID, sid);
}

// 设置UserId
function setUserId(id) {
    set(USER_ID, id);
}

// 设置userInfo
export function setUserInfo(userInfo) {
    setSessionId(userInfo.sessionToken);
    setUserId(userInfo.objectId);
    set(USER_INFO, userInfo);
}

/* *************************** get ********************************** */
// SESSION_ID
export function getSessionId() {
    return get(SESSION_ID);
}
// USER_ID
export function getUserId() {
    return get(USER_ID);
}

// USER_ID
export function getUserInfo() {
    return get(USER_INFO);
}

/* ****************************** remove ******************************* */

// 删除
export function removeSessionId() {
    remove(SESSION_ID);
}
// 删除
export function removeUserId() {
    remove(USER_ID);
}
// 删除
export function removeUserInfo() {
    remove(USER_INFO);
}

/* ****************************** remove ******************************* */

export function set(key, content, type) {
    return storage.set(key, content, type);
}
export function get(key, type) {
    return storage.get(key, type);
}
export function remove(key, type) {
    storage.remove(key, type);
}
export function clear() {
    storage.clear();
}
