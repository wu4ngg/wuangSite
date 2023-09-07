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
                <p>The logos used in projects are from: <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038360926.svg?alt=media&token=cd56e416-2291-4d03-ba51-8016f5e67020" height="24"/> <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038252843.svg?alt=media&token=46051cb9-259d-4b07-99b7-65dd8597c75c" height="24"/> <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038874266.svg?alt=media&token=284699e0-3fc5-4a11-8600-bed554727ca1" height="24"/> <a href="http://asp.net/">Microsoft Corporation</a>, <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038188359.png?alt=media&token=8493ce92-8a02-47d0-a1e5-a19afa8bf4fc" height="24"/> <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038554643.svg?alt=media&token=de1b922b-1ee0-4f05-8c19-ccd28a707b68" height="24"/> <a href="https://www.oracle.com/">Oracle Corporation</a>,<img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038436144.svg?alt=media&token=e6fef3a1-cdc4-4eb4-b5ce-00b990f78fa1" height="24"/><img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038971686.svg?alt=media&token=0bd1bcb5-aa60-4522-9c4f-87727d311240" height="24"/> <a href="https://firebase.google.com/">Google, LLC</a>, <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038643978.svg?alt=media&token=c8aac3bc-e0df-467e-b53e-22e1ea88ed51" height="24"/><a href="https://www.mongodb.com/">MongoDB, Inc</a>,<img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038704344.svg?alt=media&token=2f7f9b96-fd11-4d1b-b3c1-f6c7388dff8e" height="24"/> <a href="https://www.postgresql.org/">PostgreSQL</a>,<img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693038925871.svg?alt=media&token=4a5fe1ba-5036-4fcf-8557-20793f561365" height="24"/> <a href="https://vuejs.org/">Evan You</a> and <img src="https://firebasestorage.googleapis.com/v0/b/quangsite-5361e.appspot.com/o/images%2F1693048776458.svg?alt=media&token=aaf734b2-27a6-4d91-bbb2-1d3b6e3e6199" height="24"/> <a href="https://www.sqlite.org/index.html">SQLite</a></p>
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