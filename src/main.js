import Vue from 'vue'
import App from './App.vue'
// const import edildiği için süslü parantez içerisine alındı
import { router } from "./router"
// defaultu export edildiği için süslü parantez içinde kullanılmaz
import store from "./store"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
