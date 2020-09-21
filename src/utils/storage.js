/**
 * 存储Storage
 * @param key key值
 * @param content value 可以是对象,或字符串
 * @param type 无参数时默认 使用localStorage
 */
export const set = (key, content, type) => {
    if (!key) return;
    if (typeof content !== "string" || typeof content !== "number") {
        content = JSON.stringify(content);
    }
    if (type) {
        sessionStorage.setItem(key, content);
        return;
    }
    localStorage.setItem(key, content);
};

/**
 * 获取storage
 * @param key
 * @param type 不传则localStorage
 * @returns Object 或者String
 */
export const get = (key, type) => {
    if (!key) return null;
    let content;
    if (type) {
        content = sessionStorage.getItem(key);
    } else {
        content = localStorage.getItem(key);
    }
    try {
        content = JSON.parse(content);
        return content;
    } catch (e) {
        return content;
    }
};

/**
 * 删除storage
 */
export const remove = (key, type) => {
    if (!key) return;
    if (type) {
        sessionStorage.removeItem(key);
    } else {
        localStorage.removeItem(key);
    }
};

/**
 * 删除所有storage
 */
export const clear = type => {
    if (type) {
        sessionStorage.clear();
    } else {
        localStorage.clear();
    }
};

export default {
    set,
    get,
    remove,
    clear
};
