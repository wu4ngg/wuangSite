<script>
    import { login, auth } from '../../database/helper';
    export default {
        data(){
            return {
                email: "",
                password: ""
            }
        },
        mounted(){
            if(auth.currentUser){
                this.$router.push('/admin/home')
                this.$emit('toast', {message: 'You are already registered.', type: 0})
            }
            document.title = 'Login'
        },
        methods: {
            login(){
                const mail = this.email
                const pass = this.password
                login({
                    email: mail,
                    password: pass
                }).then((e) => {
                    console.log(e)
                    this.$router.push('/admin/home')
                    this.$emit('toast', {message: 'Login successful!', type: 0})
                }).catch((error) => {
                    this.$emit('toast', {message: `Login failed: ${error.message}!`, type: 1})
                    console.log(`Error, ${error.message}`)
                })
            }
        }
    }
</script>
<template>
    <div class="project_wrapper">
        <div class="left">
            <h1>Admin login</h1>
            <div class="login_wrapper">
                <input v-model="email" class="login_edt" placeholder="Email"/>
                <input v-model="password" class="login_edt" type="password" placeholder="Password"/>
                <button class="login_btn" @click="login()">Login</button>
            </div>
        </div>
        <div class="right">
            <div class="whereami">
                <h1 class="huge">🤔</h1>
                <h1>Where am I?</h1>
                <p>You are at the Admin login page, you’ve probably got lost and ended up here. If you are not the Admin, please 
                    <router-link to="/" >go back</router-link>, if you are an Admin, please login.</p>
            </div>
            
        </div>
    </div>
</template>
<style scoped>
    @import url('../assets/loginpage.css');
    h1{
        font-size: 3rem;
    }
    .huge{
    font-size: 5rem;
    }
    .whereami{
        width: 75%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 15px;
        border: 5px solid #A2A2A2;
        border-radius: 16px;
    }
    .left, .right{
        flex-direction: column;
        gap: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
    .project_wrapper{
        padding: 10rem;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media only screen and (max-width: 600px) {
        .project_wrapper{
            padding: 7rem 0rem;
            flex-direction: column;
            box-sizing: border-box;
            gap: 15px;
        }
        .login_wrapper{
            width: 75%;
        }
        .left, .right{
            display: flex !important;
            justify-content: flex-start;
        }
        h1{
            font-size: 2rem;
        }
        .huge{
            font-size: 2rem;
        }
        p{
            font-size: 1rem;
        }
    }
</style>