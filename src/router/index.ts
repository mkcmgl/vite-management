import Cookies from 'js-cookie';
import { App } from 'vue';
import {createRouter,createWebHashHistory,createWebHistory,RouteRecordRaw} from 'vue-router';
import store from '../store';
const routes:RouteRecordRaw[]=[
    {
        path:'/login',
        name:'login',
        component:()=>import("../views/login/login.vue"),
       
    },
    {
        path:'/',
        redirect:'/login'

    },
    {
        path:'/home',
        name:'home',
        component:()=>import("../views/home/home.vue"),

    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to,from,next)=>{

    const token=Cookies.get('token');
    
    if(token && store.state.menus.length==0){
        store.dispatch('getInfo')
    }
    next()
})

export const initRouter= (app:App<Element>)=>{
    app.use(router)
}
// export default router