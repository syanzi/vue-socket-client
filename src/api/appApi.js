import api from "../ppSwallow/ppSwallow";

export function getMenuList(params) {
    return api.get("menu/list", params);
}

export default {
    getMenuList
};
