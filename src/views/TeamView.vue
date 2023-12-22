<script>
    import Title from '../components/Title.vue'
    import ProfileCard from '../components/ProfileCard.vue'
    import { getUsersWithId } from '../../database/helper';
    import Footer from '../components/Footer.vue'
    export default {
        components: {
            Title,
            ProfileCard,
            Footer
        },
        data(){
            return {
                users: []
            }
        },
        mounted(){
            getUsersWithId().then(e => this.users = e).catch(e => alert(e))
        }
    }
</script>
<template>
    <Title desc="The best one." text="Meet the team" color="#94C4FB"/>
    <div class="project_content">
        <img style="object-fit: cover; border-radius: 16px;" src="/crew.jpg"/>
        <h2 class="light">About the team</h2>
        <p>This team is created on Freshman year, we did countless of projects together. Through those projects, we learnt a lot of things from Software Engineering while tightening our friendship.</p>
        <p>Thank you you guys for working with me as a whole and to be the best of friends. Thank you for everything, you guys are the best!</p>
        <h2 class="light">Members</h2>
        <div class="members">
            <ProfileCard :data="u" v-for="u in users"/>
        </div>
        <Footer/>
    </div>
</template>
<style scoped>
    .members{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }
    .project_content img{
        aspect-ratio: 16/9;
        height: 690px;
    }
    @media only screen and (max-width: 1050px){
        .members{
            display: flex;
            flex-direction: column;
        }
    }
    @media only screen and (max-width: 1400px){
        .members{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    }
    @media only screen and (max-width: 1250px){
        .project_content img{
            height: auto;
        }
    }
    @media only screen and (max-width: 720px){
        .members{
            display: flex;
            flex-direction: column;
        }
        .project_content img{
            height: auto;
        }
    }
</style>