<script>
    import { logOut } from '../../database/helper'
    export default {
        mounted(){
            const width = this.$refs.sidebar.offsetWidth
            console.log(width)
            this.$emit('sidebar', width)
        },
        unmounted(){
            this.$emit('sidebar', 0)
        },
        methods:{
            checkRoute(route){
                return this.$route.path == route
            },
            signOut(){
                logOut().then(e => {
                    this.$emit('toast', {message: `Signout success!`, type: 0})
                    this.$router.push('/')
                    
                }).catch(e => {
                    this.$emit('toast', {message: `Signout failed: ${error.message}!`, type: 1})
                    console.log(`Error: ${e.message}`)
                })
            }
        },
        data(){
            return{
                userMenu: false,
                logoutMenu: false,
            }
        }
    }
</script>
<template>
    <div class="sidebar_wrapper" ref="sidebar">
        <div class="route_wrapper">

            <router-link to="" :class="checkRoute('/admin/home') ? 'home_entry active' : 'home_entry'">
                <i class="ri-shield-line"></i>
                <p>Dashboard</p>
            </router-link>
            <div class="other_routes">
                <router-link to="" :class="checkRoute('/admin/blogs') ? 'home_entry active' : 'home_entry'">
                    <i class="ri-article-line"></i>
                    <p>Blogs</p>
                </router-link>
                <router-link to="" :class="checkRoute('/admin/proj') ? 'home_entry active' : 'home_entry'">
                    <i class="ri-code-line"></i>
                    <p>Projects</p>
                </router-link>
                <router-link to="" :class="checkRoute('/admin/contrib') ? 'home_entry active' : 'home_entry'">
                    <i class="ri-user-line"></i>
                    <p>Contributors</p>
                </router-link>
    
            </div>
        </div>
        <div class="route_wrapper">
            <Transition name="menu">
                <div class="other_routes" v-if="userMenu">
                    <button class="home_entry" @click="logoutMenu = !logoutMenu">
                        <i class="ri-logout-box-r-line"></i>
                        <p>Logout</p>
                    </button>
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
                    <button class="home_entry">
                        <i class="ri-pencil-line"></i>
                        <p>Edit</p>
                    </button>
                </div>
            </Transition>
            <button class="home_entry" @click="userMenu = !userMenu">
                    <i class="ri-user-line"></i>
                    <p>User</p>
            </button>
        </div>
       
    </div>
</template>
<style scoped>
    *{
        font-family: Inter;
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

    .active{
        background-color: var(--primary);
    }
    .active p, .active i{
        color: var(--on-bright-color);
    }
    i{
        font-size: 1.25rem;
    }
    .sidebar_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-top-right-radius: 16px;
        position: fixed;
        margin-top: 76.5px;
        width: 20%;
        height: 100%;
        
        box-sizing: border-box;
        padding: 20px;
        padding-bottom: 96.5px;
        box-shadow: 4px 0px 21px 0px rgba(0, 0, 0, 0.25) inset;
        background-color: var(--card);
    }
    .route_wrapper{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .other_routes{
        display: flex;
        gap: 5px;
        flex-direction: column;
        border-radius: 16px;
        overflow: hidden;
    }
    .other_routes .home_entry{
        border-radius: 5px;
    }
    .vertical{
        flex-direction: column;
        align-items: baseline;
    }
    .btn{
        background-color: var(--card);
    }
    .horizontal{
        flex-direction: row;
        width: 100%;
        flex: 1;
    }
    .horizontal button{
        flex: 1;
    }
</style>