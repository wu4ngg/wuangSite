<script>
    export default{
        data(){
            return {
                items: [],
                isDark: false,
                icon: document.getElementById("icon"),
                logo: document.getElementById("logo")
            }
        },
        created(){
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    name: route.name,
                    path: route.path
                })
            })
        },
        mounted(){
            var root = document.querySelector(":root")
            let mode = localStorage.getItem("mode")
            if(!mode){
                this.styleLight(root)
                return;
            }
            mode == "dark" ? this.isDark = true : this.isDark = false
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
            <router-link v-for="route in items" :to="route.path" class="link_entry">
                <p>{{ route.name }}</p>
                <div :class="this.$route.name == route.name ? 'indicator active' : 'indicator'"></div>
            </router-link>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--text);
        text-decoration: none;
    }
    .link_entry:hover .indicator{
        width: 100%;
    }
    .link_entry:active .indicator{
        width: 75%;
    }
    .indicator{
        transition: width 0.2s;
        width: 0;
        border-bottom: 5px var(--primary) solid;
    }
    .active{
        width: 100%;
    }
    .right{
        display: flex;
        gap: 25px;
    }
</style>
