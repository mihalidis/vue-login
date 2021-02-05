import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
import { router } from "./router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token : "",
        fbAPIKey : "AIzaSyAZ8coPq5MFnI_OxEiB9hlKib7_5i8bhsM",
    },
    mutations: {
        setToken(state, token){
            state.token = token
        },
        clearToken(state){
            state.token = ""
        },
    },
    actions: {
        // sayfa başladığında çalışacak bir action
        initAuth({commit, dispatch}){
            const token = localStorage.getItem("token")
            if(token){
                commit("setToken", token)
                router.push("/")
            }else{
                router.push("/auth")
            }
        },
        // Login işlemi auth.vue
        login({commit, dispatch, state}, authData){
            console.log(authData);
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            if(authData.isUser){
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            }
            axios.post( authLink + "AIzaSyAZ8coPq5MFnI_OxEiB9hlKib7_5i8bhsM",
                {email: authData.email, password: authData.password, returnSecureToken: true}
                ).then(response => {
                        commit("setToken", response.data.idToken)
                        // sayfa yenilendiğinde token'ı tutmak için
                        localStorage.setItem("token", response.data.idToken)
                    })
                },
        //logout işlemi auth.vue
        logout({commit, dispatch, state}){
            commit("clearToken");
            localStorage.removeItem("token")
        }
    },
    getters: {
        // çıkış yap buttonu sadece giriş yapıldığında ortaya çıksın. 
        // Token'ın var olup olmadığını kontrol edicek
        isAuthenticated(state){
            // token'ın var ise true , yok ise false return eder
            return state.token !== ""
        }
    },
})

export default store