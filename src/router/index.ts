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

    }

]

const router = createRouter({

   

    history: createWebHashHistory(),
    routes
})
export const initRouter= (app:App<Element>)=>{
    app.use(router)
}
// export default router