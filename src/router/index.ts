import { App } from 'vue';
import {createRouter,createWebHashHistory,createWebHistory,RouteRecordRaw} from 'vue-router';


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
export const store= (app:App<Element>)=>{
    app.use(router)
}
// export default router