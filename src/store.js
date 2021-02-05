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
                const expirationDate = localStorage.getItem("expirationDate");
                const time = new Date().getTime()

                if(time >= +expirationDate){
                    dispatch("logout");
                }else {
                    commit("setToken", token)
                    //geçen zaman
                    const timerSecond = +expirationDate - time
                    dispatch("setTimeoutTimer", timerSecond)
                    router.push("/")
                }

            }else{
                router.push("/auth")
                return false
            }
        },
        // Login işlemi auth.vue
        login({commit, dispatch, state}, authData){
            
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
                    localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn*1000)

                    dispatch("setTimeoutTimer", +response.data.expiresIn*1000)
                    })
                },
        //logout işlemi auth.vue
        logout({commit}){
            commit("clearToken");
            localStorage.removeItem("token")
            localStorage.removeItem("expirationDate")
            router.replace("/auth");
        },
        setTimeoutTimer({dispatch}, expiresIn){
            setTimeout(() => {
                dispatch("logout");
            }, expiresIn)
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