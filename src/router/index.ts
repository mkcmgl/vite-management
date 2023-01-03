import Cookies from 'js-cookie';
import { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '../store';
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login/login.vue"),

    },
    // {
    //     path: '/',
    //     redirect: '/login'

    // },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import("../views/home/home.vue"),

    // },
    // {
    //     path: '/pms',
    //     name: 'pms',
    //     component: () => import("../views/home/home.vue"),
    //     children: [
    //         {
    //             path: 'product',
    //             name: 'product',
    //             component: () => import("../views/pms/product.vue")

    //         }
    //     ]

    // }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const genRouter = () => {
    const menu = store.getters.getMenus


    for (let key in menu) {
        const newRoute: RouteRecordRaw = {
            path: '/' + menu[key].name,
            name: menu[key].name,
            component: () => import("../views/home/home.vue"),
            redirect: '/' + menu[key].name + menu[key].children[0].name,

            children: [
            ],
        }

        for (let i = 0; i < menu[key].children.length; i++) {
            newRoute.children?.push({
                path: menu[key].children[i].name,
                name: menu[key].children[i].name,
                component: () => import(`../views/${menu[key].name}/${menu[key].children[i].name}.vue`)
            })
        }
        router.addRoute(newRoute)
    }
    router.addRoute({
        path: '/',
        name: 'home',
        component: () => import("../views/home/home.vue"),
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('../views/index/index.vue')
            }
        ]
    })
}

router.beforeEach((to, from, next) => {

    const token = Cookies.get('token');
    if(!token && to.path !== '/login'){
        next('/login')
    }
    if(token && to.path === '/login'){
        next(from)
    }
    if (token && store.state.menus.length === 0) {
        store.dispatch('getInfo').then(() => {
            genRouter()
            next(to)
        })
    } else if (token && store.state.menus.length !== 0 && from.path === '/login' && to.path === '/home') {
        genRouter()
        next('/index')
    } else {
        next()

    }
})

export const initRouter = (app: App<Element>) => {
    app.use(router)
}
// export default router