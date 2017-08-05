<template lang="pug">
h1 關於本網
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted (){
    //載入時自動回到網頁最上方
    $("html,body").animate({
    scrollTop:0
    },0);
  }
}
</script>


<style scoped>

</style>
