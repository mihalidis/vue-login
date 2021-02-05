<template>
  <div>
    <Header />
    <!-- router-view denilerek, aşağıdaki alan router'a göre değişecek demektir -->
      <router-view></router-view>
  </div>
</template>
<script>
  import Header from "./components/Header";
  
  export default {
    components: {
        Header,
    },
    // aplikasyon çalıştığında aşağıdakini çalıştırır, tutulan tokenı kullanabilmek içn
    created(){
      this.$store.dispatch("initAuth");
    }
  }
</script>
