import {createStore} from "vuex"
import {App} from 'vue';

const store=createStore({
    state(){
        return {
            menu:[]
        }
    },
    getters:{},
    mutations:{},
    actions:{},
    modules:{},

})
export const initRouter=(app:App<Element>)=>{
    app.use(store)

}