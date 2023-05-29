<script setup>
    import Title from '../components/Title.vue'
    import Footer from '../components/Footer.vue'
</script>
<template>
    <Title text="About me" color="#72B2FE"></Title>
    <div class="project_content">
        <div class="description_wrapper">
            <h2 class="light">WHO AM I?</h2> 
            <p>Hi, my name is Quang, AKA Wuang and I'm an undergraduate at the Ho Chi Minh city University of Foreign language and Information Technology (that's a mouthful!) aka HUFLIT. I have a passion for coding, doing software development and UI design.</p>
            <p>I am 19 year old as of now and I am reaching 20 after 2 months, still have a very long and uncertain future ahead.</p>
            <p>I also have IELTS certification with a band score of 6.5 (I know, it's pretty mid) and I plan to renew it this year.</p>
            <p>My interests are coding, playing games and listening to music, you know, average IT student stuff</p>
            <h2 class="light">WHY DID I CREATE THIS WEBSITE?</h2>
            <p>I created this website to test myself of my coding skills and to gain some experiences that I need for future employment.</p>
            <p>The design of this website is made entirely by me and the framework that I use is Vue.js. It has gone through may iterations of change, from vanilla js to react to MVC and finally, Vue.js, with many design.</p>
            <img src="https://media.discordapp.net/attachments/716878834976161843/1112679758891855944/image.png?width=1402&height=671"/>
            <p>This is one of its design, as you can see, it's not that good with too many text. And I stuck with that design for 2-3 months when I finally decided that I'm gonna do a redesign.</p>
            <img src="https://media.discordapp.net/attachments/716878834976161843/1112680760479068231/Web_capture_10-1-2023_152146_127.0.0.1.jpeg?width=402&height=671"/>
            <p>This is also one of my earlier website design and it looked too much like a product page rather than a portfolio.</p>
            <p>The story of the development of this site is long and it will be included in the <router-link to="/blog">Blog</router-link> page, which is coming soon.</p>
        </div>
    </div>
    <div class="footer_wrapper">
        <Footer></Footer>
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
        border-radius: 16px;
        height: 720px;
        width: max-content;
    }
</style>