<script>
    import { db, getSingleProject, convertInfo, getCredits } from '../../database/helper';
    import Title from '../components/Title.vue'
    import Desc from '../model/desc'
    import MoreInfo from '../components/Card.vue'
    var d = await getSingleProject("0gV2wAXOaCq89vnZ5vHG")

    export default{
        components:{
            Title,
            MoreInfo
        },
        data(){
            return {
                list: getSingleProject(this.$route.params.id).then((e) => {this.list = e}),
                width: 0,
                height: 0,
                ext: '',
                more_info: convertInfo(this.$route.params.id).then((e) => {this.more_info = e}),
                credits: getCredits(this.$route.params.id).then((e) => {this.credits = e}),
                
                
            }
        },
        created(){
            console.log(this.list)
        },
        mounted(){
            
            getSingleProject(this.$route.params.id).then((e) => {this.getImgInfo(e.image)})
        },
        methods:{
            getColor(v){
                const root = document.querySelector(":root");
                const style = getComputedStyle(root)
                const pro = style.getPropertyValue(v)
                return pro
            },
            getImgInfo(img){
                var i = new Image()
                i.src = img 
                i.onload = () => {
                    this.width = i.width
                    console.log(i.width)
                    this.height = i.height
                    this.ext = img.split(/[#?]/)[0].split('.').pop().trim()
                }
                
            },
            getMoreInfo(c){
                
            }
        }
    }
</script>
<template>
    <Title :color="getColor('--secondary')" :repo="list.github" :text="list.name" :desc="list.desc" :tag="list.type"></Title>
    <div class="project_content">
        <div class="description_wrapper">
            <h2 class="light">BRAND LOGO</h2>
            <img :src="list.image" id="image"/>
            <p>{{ `${ext.toUpperCase()}, ${width} x ${height}` }}</p>
            <h2 class="light">BRIEF SUMMARY</h2>
            <p>{{ list.detailed_desc }}</p>
            <p>Below is some information of this project.</p>
            <div class="more_info">
               <MoreInfo :list="more_info" title="Project Information"></MoreInfo> 
               <MoreInfo :list="credits" title="Credits" :subtitle="`People who worked on this project`"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .description_wrapper{
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-radius: 20px;
        background-color: var(--background);
        padding: 20px;
    }
    .description_wrapper img{
        width: max-content;
        height: 72px;
    }
</style>