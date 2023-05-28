
<script>
    import Title from '../components/Title.vue'
    import ProjectCard from '../components/ProjectCard.vue'
    import Project from '../model/project'
    let p = [
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
    ]
    export default{
        components:{
            Title,
            ProjectCard
        },
        data(){
            return {
                list: p
            }
        }
    }
</script>
<template>
    <div class="project_wrapper">
        <Title color="#FEAD72" desc="Here are some of my projects that I did during college." :text="this.$route.name"></Title>
        <div class="project_content">
            <div class="project_cards">
                <ProjectCard v-for="item in list" :object="item"/>
            </div>
            <router-link to="/project" class="more_btn">
                <p>See more projects</p>
                <i class="ri-arrow-right-line"></i>
            </router-link>
            <p>
                I did a lot of projects during college and the numbers of projects is expected to grow more overtime, from simple mobile apps to compex systems.
                <br/>
                Some of these projects have a more profound impacts in my way to discover more about myself and gave me a way to improve my skills for jobs later.
            </p>
        </div>
        
    </div>
    
</template>