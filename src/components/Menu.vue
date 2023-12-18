<script>
    import Header from './Header.vue'
    import { auth, GetInfo, logOut } from '../../database/helper'
import { onAuthStateChanged } from 'firebase/auth'
    export default{
        data(){
            return {
                items: [],
                isMenu: Header.isMenu,
                user: auth.currentUser,
                logoutMenu: false
            }
        },
        created(){
            onAuthStateChanged(auth, (u) => {
                this.user = u
            })
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
            signOut(){
                logOut().then(e => {
                    this.$emit('toast', {message: `Signout success!`, type: 0})
                    this.$router.push('/')
                    this.closeMenu()
                }).catch(e => {
                    this.$emit('toast', {message: `Signout failed: ${error.message}!`, type: 1})
                    console.log(`Error: ${e.message}`)
                })
            }
        }
        
    }
</script>
<template>
    <div class="menu_wrapper">
        <div class="menu_dialog">
            <router-link v-for="route in items" :to="route.path" :class="this.$route.name != route.name ? 'link_entry' : 'link_entry selected'" @click="closeMenu()">
                <p>{{ route.name }}</p>
            </router-link>
            <hr v-if="user"/>
            <router-link v-if="user" to="/admin/home" :class="'link_entry'" @click="closeMenu()">
                <p>Dashboard</p>
            </router-link>
            <router-link v-if="user" to="/admin/proj" :class="'link_entry'" @click="closeMenu()">
                <p>Projects</p>
            </router-link>
            <router-link v-if="user" to="/admin/blogs" :class="'link_entry'" @click="closeMenu()">
                <p>Blogs</p>
            </router-link>
            <router-link v-if="user" to="/admin/contrib" :class="'link_entry'" @click="closeMenu()">
                <p>Contributor</p>
            </router-link>
            <Transition name="menu">
                <div class="home_entry vertical" v-if="logoutMenu">
                    <h3>Log out</h3>
                    <p>Do you want to log out? You will lose access to the Admin page</p>
                    
                    <div class="btn_wrapper">
                        <div class="other_routes horizontal">
                            <button class="home_entry active" @click="signOut()">
                                <p>Yes</p>
                            </button>
                            <button class="home_entry btn" @click="logoutMenu = false">
                                <p>No</p>
                            </button>
                        </div>
                    </div>
                </div>                            
            </Transition>
            <button v-if="user" @click="logoutMenu = true" class="link_entry">
                <p>Log out</p>
            </button>
            <hr/>
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
    .home_entry{
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        gap: 15px;
        align-items: center;
        text-decoration: none;
        padding: 15px;
        background-color: var(--background);
        border-radius: 10px;
        border: none;
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