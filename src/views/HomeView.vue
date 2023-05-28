<script setup>
    import Header from '../components/Header.vue'
    import Desc from '../model/desc'
    import MoreInfo from '../components/Card.vue'
    import Project from '../model/project'
</script>
<script>
    let d = 
    [
        new Desc("Sophomore Software Engineering Undergraduate @ HUFLIT", "ri-graduation-cap-line"),     
        new Desc("IELTS Band 6.5", "ri-global-line"),
        new Desc("Goal: Become an accomplished Front-end developer", "ri-flag-2-line"),
        new Desc("Interests: UI Design, Front-end development. I also like to learn new JS Frameworks.", "ri-thumb-up-line")
    ]
    let p = [
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test")
    ]
    export default {
        
        data(){
            return {
                list: d,
                proj: p
            }
        }
    }
</script>
<style>
    .desc_user{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
<template>
        
        <div class="body_top">
            <div>
                <h1 class="light">Welcome to my page</h1>
                <h1>My name is <span style="color: var(--primary)">Quang</span></h1>
                <div class="desc_user">
                    <p>Just a university student who likes to code.</p>
                    <router-link to="/project" class="generic_button">
                        <i class="ri-code-s-slash-line"></i>
                        <p>My projects</p>
                    </router-link>
                </div>
            </div>
            <div class="more_info">
                <MoreInfo :list=list title="About me"></MoreInfo>
                <MoreInfo mode="project" :list=proj title="Projects" subtitle="Here are some of my best projects. Click on one to go to its project page."></MoreInfo>
            </div>
        </div>
        <div class="footer">

        </div>
        
    
</template>