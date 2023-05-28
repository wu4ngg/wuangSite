<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
<template>
  <Header></Header>
    <RouterView/>
</template>
<style>
  @keyframes fadeout{
    from {
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }
  @keyframes movein{
    from{
      opacity: 0;
      transform: translate(0, 50px);
    }
    to{
      transform: translate(0,0);
      opacity: 1;
    }
  }
  .page-enter-active{
    animation: movein 0.2s cubic-bezier(.17,.67,.5,.97)
  }
  .page-leave-active{
    animation: fadeout 0.2s
  }
</style>