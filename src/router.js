import Vue from "vue"
import VueRouter from "vue-router"

import About from "./pages/About.vue"
import Homepage from "./pages/Homepage.vue"
import Auth from "./pages/auth/Auth.vue"

import store from "./store"

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Homepage,
            // Bu componente girmeden önce çalışacak olan aksiyonu belirler
            beforeEnter(to, from, next){
                // next bu componente girmemizi engelleyen ya da engellemeyen function
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next("/auth")
                }
            }
        },
        {
            path: "/about",
            component: About,
            beforeEnter(to, from, next){
                
                if(store.getters.isAuthenticated){
                    next();
                }else{
                    next("/auth")
                }
            }
        },
        {
            path: "/auth",
            component: Auth,
        },
    ],
    // diyez işaretini adres çubuğunda görmemek için
    mode: "history"
})