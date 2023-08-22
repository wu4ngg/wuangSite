<script>
    export default {

    }
</script>
<template>
    <div class="project_wrapper">
        <div class="left">
            <h1>Admin login</h1>
            <div class="login_wrapper">
                <input class="login_edt" placeholder="Email"/>
                <input class="login_edt" placeholder="Password"/>
                <button class="login_btn">Login</button>
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
    
</style>