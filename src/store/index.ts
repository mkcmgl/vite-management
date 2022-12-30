import { createStore } from "vuex"
import { App } from 'vue';
import { getAdminInfo } from "../request/api";

interface MenuObj {
    parentId: number
    id: number
    children?: MenuObj[]
}

interface State {
    menus:
    MenuObj[]
}
interface NewMenus {
    [key: number]: MenuObj
}
const store = createStore<State>({
    state() {
        return {

            menus: []
        }
    },

    mutations: {
        updateMenu(state, menus) {
            state.menus = menus
        }
    },
    actions: {
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getAdminInfo().then(res => {
                    if (res.code === 200) {
                        commit('updateMenu', res.data.menus)
                        resolve(res.data)
                    }
                    else {
                        reject(res)
                    }
                });
            })

        }
    },
    modules: {},
    getters: {
        getMenus(state) {
            const menus = state.menus;
            const newMenus: NewMenus = {};
            //找出newMenu第一层
            // for(let i of menus){
            //     if(i.parentId==0){
            //         newMenus[i.id] = { ...i };
            //     }
            // }

            // for(let i in newMenus){
            //     newMenus[i].children = []
            //     for(let j of menus){
            //         if(j.parentId==Number(i)){
            //             newMenus[i].children?.push(j)
            //         }
            //     }
            // }
            // return newMenus
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].parentId === 0) {
                    newMenus[menus[i].id] = { ...menus[i], children: newMenus[menus[i].id]?.children || [] };
                } else {
                    let parentId = menus[i].parentId;
                    newMenus[parentId] = newMenus[parentId] || {}
                    newMenus[parentId].children = newMenus[parentId].children || [];
                    newMenus[parentId].children?.push(menus[i]);
                }
            }

            return newMenus;

            // for (let i = 0; i < menus.length; i++) {
            //     if (menus[i].parentId === 0) {
            //         newMenus[menus[i].id] = { ...menus[i] };
            //     }
            // }
            // console.log(newMenus, '13');
            // for (let i = 0; i < menus.length; i++) {
            //     let parentId = menus[i].parentId;
            //     if(parentId !== 0) {
            //         newMenus[parentId].children = newMenus[parentId].children || [];
            //         newMenus[parentId].children?.push(menus[i]);
            //     }
            // }
            // return newMenus;

        }
    },

})
export const initStore = (app: App<Element>) => {
    app.use(store)

}
export default store