<script>
    import Title from '../components/Title.vue'
    import Footer from '../components/Footer.vue'
    import Project from '../model/project'
    import Card from '../components/ProjectCard.vue'
    export default{
        components:{
            Title, Footer, Card
        },
        mounted(){
            this.list.push(new Project("https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", "For making testing, building websites and installing 3rd party libraries easy. ", "Node.js", "https://nodejs.org/en"))
            this.list.push(new Project("https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg", "For this website to exist at all.", "Vue.js", "https://vuejs.org/"))
            this.list.push(new Project("https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg", "For the database and APIs that it provides.", "Firebase", "https://firebase.google.com/"))
            this.list.push(new Project("https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg", "For providing the service of hosting this website.", "Vercel", "https://vercel.com/"))
        },
        data(){
            return {
                list: []
            }
        },

    }
</script>
<template>
    <div class="parent_wrapper">
        <Title text="Credits" color="#72B2FE"></Title>
        <div class="project_content">
            <div class="description_wrapper">
                <h2 class="light">THANK YOU</h2>
                <p>Making a full web-app is not easy, it takes time and efforts. So I would like to give these projects a big thank you for making my life so easy.</p> 
                <div class="project_cards">
                    <Card v-for="item in list" :object="item" :customlink="item.id"></Card>
                </div>
            </div>
        </div>
        <div class="footer_wrapper">
            <Footer></Footer>
        </div>
    </div>
</template>
<style scoped>
    .parent_wrapper{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .project_content{
        height: 100%;
    }
    .project_card img{
        border-radius: 0;
    }
    @media only screen and (max-width: 1200px) {
        .project_cards{
            
            flex-wrap: wrap;
        }
    }
    @media only screen and (max-width: 600px) {
        .project_cards{
            flex-direction: column;
        }

    }
</style>