<script>
    import Header from './Header.vue'
    export default{
        data(){
            return {
                items: [],
                isMenu: Header.isMenu
            }
        },
        created(){
            this.$router.options.routes.forEach(route => {
                if(route.name != 'Ignore' && route.name && !this.checkAdmin(route.name) && route.name != "Project Detail"){
                    this.items.push({
                        name: route.name,
                        path: route.path
                    })
                }
            })
        },
        methods:{
            closeMenu(){
                this.$emit('isMenu', false)
            },
            checkAdmin(name){
                if(name !== undefined){
                    var namearr = name.split(' ')
                    return namearr[0] == 'Admin'
                }
            },
        }
        
    }
</script>
<template>
    <div class="menu_wrapper">
        <div class="menu_dialog">
            <router-link v-for="route in items" :to="route.path" :class="this.$route.name != route.name ? 'link_entry' : 'link_entry selected'" @click="closeMenu()">
                <p>{{ route.name }}</p>
            </router-link>
            <button class="link_entry" @click="closeMenu()">
                <p>Close</p>
            </button>
        </div>
    </div>
</template>
<style>
    @import url("../assets/main.css");
    .menu_wrapper{
        top: 85px;
        left: 0;
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height: fit-content;
        padding: 0px 10px;
    }
    .menu_dialog{
        display: flex;
        flex-direction: column;
        gap: 5px;
        box-sizing: border-box;
        width: 100%;
        background-color: var(--background);
        box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.25);
        padding: 25px;
        border-radius: 16px;
    }
    .link_entry{

        font-family: 'Inter', sans-serif;
        font-weight: bold;
        background-color: var(--background);
        border: none;
        font-size: 1rem;
        justify-content:flex-start;
        border-radius: 16px;
        padding: 10px;
        transition: background-color 0.2s;
    }
    .link_entry:hover{
        background-color: var(--card);
    }
    .selected{
        background-color: var(--card);
    }
</style>