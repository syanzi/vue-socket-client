import Cookies from "../../utils/storage";

const state = {
    sidebar: {
        opened: Cookies.get("sidebarStatus") ? !!+Cookies.get("sidebarStatus") : true,
        withoutAnimation: false
    },
    menuList: [],
    device: "desktop"
};

const mutations = {
    //切换菜单
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (state.sidebar.opened) {
            Cookies.set("sidebarStatus", 1);
        } else {
            Cookies.set("sidebarStatus", 0);
        }
    },
    //关闭菜单
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set("sidebarStatus", 0);
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device;
    },

    GET_MENU_LIST: (state, menuList) => {
        console.log(setTreeData(menuList));
        state.menuList = menuList;
    }
};

const actions = {
    toggleSideBar({commit}) {
        commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    toggleDevice({commit}, device) {
        commit("TOGGLE_DEVICE", device);
    },
};

//菜单分类整理
function setTreeData(source) {
    let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
    return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.menuId === child.parentId);
        branchArr.length > 0 ? (father.children = branchArr) : "";
        return father.parentId === 0; //返回第一层
    });
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
