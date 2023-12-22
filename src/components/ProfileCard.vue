<script>
    export default{
        props: [
            'data'
        ]
    }
</script>
<template>
    <div class="profile_card">
        <img v-if="data.image" :src="data.image"/>
        <div class="profile_wrapper">
            <h2>{{ data.fullname }}</h2>
            <div class="social_wrapper">
                <a :href="data.facebook" v-if="data.facebook"><i class="ri-facebook-circle-fill"></i></a>
                <a :href="data.instagram" v-if="data.instagram"><i class="ri-instagram-fill"></i></a>
                <a :href="data.github" v-if="data.github"><i class="ri-github-fill"></i></a>
                <a :href="data.website" v-if="data.website"><i class="ri-links-fill"></i></a>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
    .profile_wrapper{
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .social_wrapper{
        display: flex;
        gap: 10px;
    }
    .social_wrapper a{
        text-decoration: none;
    }
    .social_wrapper a i{
        font-size: 24px;
    }
    .profile_card{
        overflow: hidden;
        display: flex;
        text-decoration: none;
        transition: box-shadow 0.2s, background-color 0.2s;
        border-radius: 20px;
        width: 100%;
        box-sizing: border-box;
        background-color: var(--background);
        box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.25);
    }
    .profile_card img{
        height: 150px;
        object-fit: cover;
        width: 200px;
    }
</style>