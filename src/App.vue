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
  }
</script>
