import Vue from "vue"
import Vuex from "vuex"


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
        login({commit, dispatch, state}, authData){
            
        },
        logout({commit, dispatch, state}){
            
        }
    },
    getters: {
        // çıkış yap buttonu sadece giriş yapıldığında ortaya çıksın. Token'ın var olup olmadığını kontrol edicek
    },
})

export default store