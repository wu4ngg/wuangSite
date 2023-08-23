<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Toast from './components/Toast.vue'
</script>
<script>
  import { auth } from '../database/helper'
  export default {
    data(){
      return {
        auth: auth,
        sidebarWidth: 0,
        routeName: this.$route.name,
        toast: false,
        toastTitle: '',
        toastType: -1,
      }
    },
    watch: {
      routeName(){
        console.log('Changed')
        if(this.routeName != 'Admin'){
          this.sidebarWidth = 0
        }
      }
    },
    mounted(){
      console.log(auth.currentUser)
    }
  }
</script>
<template>
  <Transition name="toast">
    <Toast :message="toastTitle" :type="toastType" v-if="toast" @toast-visible="e => toast = e"/>
  </Transition>
  <Header></Header>
  <Transition name="sidebar">
    <Sidebar @toast="e => {toast = true; toastTitle = e.message; toastType = e.type}" v-if="$route.name == 'Admin'" class="content_wrapper" ref="sidebar" @sidebar="e => { if(auth.currentUser && $route.name == 'Admin'){sidebarWidth = 20; console.log(e)}else{sidebarWidth = 0}}"/>
  </Transition>
    <div class="div_wrap" :style="{'padding-left': sidebarWidth + '%'}">
      <RouterView @toast="e => {toast = true; toastTitle = e.message; toastType = e.type}"/>
    </div>
  
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
  .div_wrap{
    transition: padding-left 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
  }
  .sidebar-enter-active, .sidebar-leave-active{
    transition: transform 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), opacity 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), filter 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
  }
  .sidebar-enter-from, .sidebar-leave-to{
    transform: translate(-100px, 0);
    opacity: 0;
    filter: blur(50px);
  }
  .toast-enter-active .toast, .toast-leave-active .toast{
        transition: transform 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), opacity 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), filter 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
    }
    .toast-enter-from .toast, .toast-leave-to .toast{
        transform: translate(0px, -10px);
        opacity: 0;
    }
</style>