<script>
    import { db, getSingleProject } from '../../database/helper';
    import Title from '../components/Title.vue'
    var d = await getSingleProject("0gV2wAXOaCq89vnZ5vHG")
    export default{
        components:{
            Title
        },
        data(){
            return {
                list: getSingleProject(this.$route.params.id).then((e) => {this.list = e}),
                width: 0,
                height: 0,
                ext: '',
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
                
            }
        }
    }
</script>
<template>
    <Title :color="getColor('--secondary')" :text="list.name" :tag="list.type"></Title>
    <div class="project_content">
        <div class="description_wrapper">
            <h2 class="light">BRAND LOGO</h2>
            <img :src="list.image" id="image"/>
            <p>{{ `${ext.toUpperCase()}, ${width} x ${height}` }}</p>
            <h2 class="light">DESCRIPTION</h2>
            <p>{{ list.desc }}</p>
        </div>
    </div>
</template>
<style scoped>
    .description_wrapper{
        border-radius: 20px;
        background-color: var(--background);
        padding: 20px;
    }
</style>