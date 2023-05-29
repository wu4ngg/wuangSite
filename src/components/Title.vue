<script>
    export default{
        props:[
            "color",
            "text",
            "desc",
            "tag",
            "repo"
        ],
        data(){
            return {
                icon: 'ri-global-line',
                txt: 'Repository'
            }
        },
        mounted(){
            
            console.log(this.repo)
            this.icon = this.getIcon(this.repo)
        },
        methods:{
            getIcon(link){
                if(!link){
                    console.log("No link found!")
                    return;
                }
                if(this.repo == "private"){
                    this.txt = "Repo is currently private."
                    return 'ri-indeterminate-circle-line'
                }
                console.log("link: " + link)
                const domain = new URL(link)
                let res = domain.hostname
                console.log(res)
                switch(res){
                    case 'github.com':
                        return 'ri-github-line'
                    case 'gitlab.com':
                        return 'ri-gitlab-line'
                    default:
                        return 'ri-global-line'
                }
            }
        }
    }
</script>
<template>
    <div class="page_wrapper" :style="{'background-color': color}">
        <h1>{{ this.text }}</h1>
        <p v-if="desc">{{ desc }}</p>
            <div class="tag_wrapper">
                <p class="tag" v-if="tag">{{ tag }}</p>
            <a :href="repo" :class="repo != 'private' ? 'tag clickable' : 'tag disabled'" v-if="repo">
                <i :class="getIcon(repo)"></i>
                <p>{{ txt }}</p>
            </a>
        </div>
        
    </div>
</template>
<style>
    @import url('../assets/var.css');
    body{
        padding: 0
    }
    .clickable:hover{
        background-color: var(--on-color);
    }
    .clickable:hover p, .clickable:hover i{
        color:#fff;
    }
    .tag{
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: fit-content;
        padding: 10px 20px;
        border-radius: 50px;
        border: 2px var(--on-color) solid
    }
    .page_wrapper{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 50px;
        padding-top: 100px;
        padding-bottom: 75px;
        border-radius: 50px;
    }
    .page_wrapper h1, .page_wrapper p{
        color: var(--on-color);
    }
    .tag_wrapper{
        text-decoration: none;
        display: flex;
        gap: 15px;
        align-items: center;
    }
    .tag_wrapper i{
        color: var(--on-color);
        font-size: 20px;
    }
    .disabled{
        pointer-events: none;
    }
    @media only screen and (max-width: 600px) {
        .page_wrapper{
            border-radius: 20px;
            padding: 25px;
            padding-top: 100px;
            padding-bottom: 50px;
        }
    }
</style>