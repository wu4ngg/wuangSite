<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Toast from './components/Toast.vue'
import Dropdown from './components/Dropdown.vue'
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
    
    mounted(){
      console.log(auth.currentUser)
    },
    methods: {
      checkAdmin(){
        var name = String(this.$route.name)
        console.log(name)
                if(name){
                  var namearr = name.split(' ')

                  return namearr[0] === "Admin"
                }
            },
      teleport(el){
        var e = document.getElementById('dropdown')
        console.log(e)
        e.style.top = el.offsetTop + el.offsetHeight + 'px'
        e.style.left = el.offsetLeft + 'px'
      }
    }
  }
</script>
<template>
  
  <Transition name="toast">
    <Toast :message="toastTitle" :type="toastType" v-if="toast" @toast-visible="e => toast = e"/>
  </Transition>
  <Header></Header>
  <Transition name="sidebar">
    <Sidebar @toast="e => {toast = true; toastTitle = e.message; toastType = e.type}" v-if="checkAdmin($route.name)" class="content_wrapper" ref="sidebar" @sidebar="e => { if(auth.currentUser && checkAdmin()){sidebarWidth = 20; console.log(e)}else{sidebarWidth = 0}}"/>
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
    .teleport{
        position: absolute;
    }
</style>