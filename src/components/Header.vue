<script>
    export default{
        data(){
            return {
                isDark: false,
                icon: document.getElementById("icon"),
                logo: document.getElementById("logo")
            }
        },
        mounted(){
            var root = document.querySelector(":root")
            let mode = localStorage.getItem("mode")
            mode == "light" ? this.isDark = false : this.isDark = true
            this.isDark ? this.styleDark(root) : this.styleLight(root)
        },  
        methods:{
            darkmodetoggle(){
            var root = document.querySelector(":root")
            var res = getComputedStyle(root)
            if(this.isDark){
                this.styleLight(root)
            } else {
                this.styleDark(root)
            }
            },
            styleLight(res){
                localStorage.setItem("mode", "light")
                console.log("light")
                logo.src = '../../public/logo.svg'
                icon.classList.add("ri-moon-line")
                icon.classList.remove("ri-sun-line")
                res.classList.remove("darkmode")
                res.classList.add("lightmode")
                this.isDark = false;
            },
            styleDark(res){
                localStorage.setItem("mode", "dark")
                console.log("dark")
                icon.classList.remove("ri-moon-line")
                icon.classList.add("ri-sun-line")
                res.classList.remove("lightmode")
                res.classList.add("darkmode")
                logo.src = '../../public/logo_dark.svg'
                this.isDark = true;
            }
        }
        
    }
</script>
<template>
    <div class="header_wrapper">
        <div class="left">
            <img src="../../public/logo.svg" class="logo" id="logo"/>
            <button class="generic_button" id="dark_mode" @click="darkmodetoggle()">
                <i class="ri-moon-line" id="icon"></i>
                <p>Dark mode</p>
            </button>
        </div>
        <div class="right">
            <router-link to="/" class="link_entry">Home</router-link>
            <router-link to="/project" class="link_entry">Projects</router-link>
        </div>
    </div>
</template>
<style>
    @import url("../assets/main.css");
    .header_wrapper{
        background-color: var(--background);
        width: 100%;
        position:fixed;
        top: 0;
        left: 0;
        padding: 16px 18px;
        box-sizing: border-box;
        box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo{
        height: 32px;
    }
    .left{
        align-items: center;
        display: flex;
        gap: 30px;
    }
    .link_entry{
        color: var(--text);
        text-decoration: none;
    }
    .link_entry:hover{
        text-decoration:underline;
        text-decoration-color: var(--text);
        text-decoration-thickness: 2px;
    }
    .right{
        display: flex;
        gap: 15px;
    }
</style>
