
<script>
    import { collection, query, where, getDocs, getDoc } from 'firebase/firestore'
    import { db } from '../../database/helper'
    import Title from '../components/Title.vue'
    import ProjectCard from '../components/ProjectCard.vue'
    import Project from '../model/project'
    
    export default{
        components:{
            Title,
            ProjectCard
        },
        methods: {
            async getData(db){
                var l = []
                const col = collection(db, 'projects')
                const q = query(col, where('isfeatured', '==', true))
                const snap = await getDocs(q)
                const list = snap.docs.map(doc => doc.data())
                const idList = snap.docs.map(doc => doc.id)
                list.forEach((e, index) => {
                    l.push(new Project(e.image, e.desc, e.name, idList[index]))
                })
                console.log(list)
                return l
        },
            async getAllData(db){
                var l = []
                var col = collection(db, 'projects')
                const snap = await getDocs(col)
                const list = snap.docs.map(doc => doc.data())
                const idList = snap.docs.map(doc => doc.id)
                list.forEach((e, index) => {
                    l.push(new Project(e.image, e.desc, e.name, idList[index]))
                })
                console.log(list)
                return l
            },
            showMore(){
                this.getAllData(db).then(e => {this.list = e})
            }
        },
        created(){
            var real;
            var res = this.getData(db)
        },
        data(){
            return {
                list: this.getData(db).then((e) => {this.list = e})
            }
        }
    }
</script>
<template>
    <div class="project_wrapper">
        <Title color="#FEAD72" desc="Some project that I made in my free time" :text="this.$route.name"></Title>
        <div class="project_content">
            <div class="project_cards">
                <div class="loading_wrapper" v-if="!list.length">
                    <progress class="large" ></progress>
                    <p>Loading, please wait</p>
                </div>
                <ProjectCard v-for="item in list" :object="item"/>
            </div>
            <div @click="showMore()" to="/project" class="more_btn">
                <p>See more projects</p>
                <i class="ri-arrow-right-line"></i>
            </div>
            <p>
                I did a lot of projects during college and the numbers of projects is expected to grow more overtime, from simple mobile apps to compex systems.
                <br/>
                Some of these projects have a more profound impacts in my way to discover more about myself and gave me a way to improve my skills for jobs later.
            </p>
        </div>
        
    </div>
    
</template>