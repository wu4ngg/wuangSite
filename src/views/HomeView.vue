<script setup>
    import Header from '../components/Header.vue'
    import Desc from '../model/desc'
    import MoreInfo from '../components/Card.vue'
    import Project from '../model/project'
    import Footer from '../components/Footer.vue'
    import { db } from '../../database/helper'
    import {collection, getDocs} from 'firebase/firestore'
    import {getFeaturedProjects} from '../../database/helper'
</script>
<script>
    let d = []
    let p = [
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test"),
        new Project('/logo.svg', "Test", "Test")
    ]
    function getIcon(type){
            switch(type){
                case "edu":
                    return "ri-graduation-cap-line";
                case "eng":
                    return "ri-global-line";
                case "goal":
                    return "ri-flag-2-line";
                default:
                    return "ri-thumb-up-line";
            }
        }
    function getType(type, value){
        switch(type){
                case "edu":
                    return value;
                case "eng":
                    return "IELTS Band " + value;
                case "goal":
                    return "Goal: " + value;
                default:
                    return "Interests: " + value;
            }
    }
    async function GetInfo(db){
        var l = [];
        const infoCollection = collection(db, 'info')
        const snapshot = await getDocs(infoCollection)
        const catelist = snapshot.docs.map(doc => doc.id)
        const list = snapshot.docs.map(doc => doc.data())
        for(var i = 0; i < list.length; i++){
            l.push(new Desc(getType(catelist[i], list[i].value), getIcon(catelist[i])))
        }
        console.log(l)
        return l;
    }
    d = await GetInfo(db)
    console.log(d)
    console.log(d)
    export default {
        data(){
            return {
                list: d,
                proj: getFeaturedProjects().then((e) => {this.proj = e})
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
        <div class="body_wrapper">
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
            
        </div>
        <div class="footer_wrapper">
            <Footer></Footer>
        </div>
</template>