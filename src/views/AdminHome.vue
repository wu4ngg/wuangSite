<script>
    import { getProjects, getUsers, auth, GetInfo } from '../../database/helper';
    import CardButton from '../components/CardButton.vue'
    import MoreInfo from '../components/Card.vue'
    export default {
        components:{
            CardButton,
            MoreInfo
        },
        data(){
            return {
                projectCount: getProjects().then(e => this.projectCount = e.length).catch(e => {console.log(`error: ${e.message}`)}),
                userCount: getUsers().then(e => this.userCount = e.length),
                l: []
            }
        },
        mounted(){
            if(!auth.currentUser){
                this.$router.push('/unauthorized')
            } else {
                GetInfo().then(e => {
                    this.l = e
                }).catch(e => {
                    this.$emit('toast', {message: `Error: ${e.message}`, type: 1})
                })
                document.title = 'Admin Home'
            }
        },
        methods: {
            refreshView(){
                GetInfo().then(e => this.l = e)
                this.$emit('toast', {message: `Edit success!`, type: 0})
            }
        }
    }
</script>
<template>
    <div class="project_wrapper">
        <div class="left">
            <h1>Overview</h1>
            <div class="pagers">
                <CardButton icon="ri-code-line" subtitle="Projects" :title="projectCount"/>
                <CardButton icon="ri-article-line" :title="'WIP'" subtitle="Blogs"/>
                <router-link to="/admin/proj" class="manage_btn">
                    <p>Manage</p>
                    <i class="ri-arrow-right-line"></i>
                </router-link>
                <router-link to="/admin/blogs" class="manage_btn">
                    <p>Manage</p>
                    <i class="ri-arrow-right-line"></i>
                </router-link>
                <CardButton icon="ri-user-line" subtitle="Friends made along the way" :title="userCount"/>
                <CardButton icon="ri-check-line" subtitle="Average score of every projects" :title="0"/>
                <router-link to="/admin/users" class="manage_btn">
                    <p>Manage</p>
                    <i class="ri-arrow-right-line"></i>
                </router-link>
            </div>
        </div>
        <hr/>
        <div class="left" style="height: fit-content;">
            <h1>Home page</h1>
            <MoreInfo @edit-complete="() => refreshView()" :admin="true" :list=l title="About me"></MoreInfo>
        </div>
    </div>
  
</template>
<style scoped>
    *{
        font-family: Inter;
    }
    .manage_btn{
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--primary);
        border: none;
        box-shadow: 0px 4px 18px 0px var(--primary);
        border-radius: 16px;
        cursor: pointer;
    }
    .manage_btn:hover{
        box-shadow: 0px 0px 0px 0px var(--primary);
    }
    .manage_btn:active{
        transform: scale(95%);
    }
    .manage_btn i{
        font-size: 24px;
        color: var(--on-bright-color);
    }
    .manage_btn p{
        color: var(--on-bright-color);
    }
    
    .pagers{
        width: 100%;
        gap: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    h1{
        font-size: 35px;
    }
    .project_wrapper{
        padding: 96.5px 2rem;
        padding-bottom: 10px;
        display: flex;
        gap: 25px;
        height: 100vh;
        box-sizing: border-box;
    }
    hr{
        align-self: center;
        height: 100%;
        border: 2px var(--card) solid;
    }
    .left{
        align-items: baseline;
        flex-direction: column;
        flex: 1;
    }
    .info_wrapper{
        flex: 1 auto;

    }
    @media only screen and (max-width: 600px){
        .left{
            justify-content: flex-start;
        }
        .project_wrapper{
            flex-direction: column;
        }
    }
</style>