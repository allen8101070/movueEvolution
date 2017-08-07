<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
import navbar from './components/navbar'
import myfooter from './components/myfooter'
import loading from './components/loading'
export default {
  name: 'app',
  components:{
    navbar,
    myfooter,
    loading
  }
  
}




</script>

<style>
a:hover{
  text-decoration: none
}
body {
  font-family: '微軟正黑體' !important;
  background-color: #0f2242 !important;
}
#app {
  
}
</style>
