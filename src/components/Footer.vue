<script>
import { RouterLink } from 'vue-router';
import { getFeaturedProjects, getAllData, getProjects } from '../../database/helper';
import { getUsersWithId } from '../../database/helper';

    export default{
    data() {
        return {
            list: getAllData().then(e => this.list = e),
            usrs: getUsersWithId().then(e => this.usrs = e)
        };
    },
    components: { RouterLink }
}
</script>
<template>
    <div class="footer">
        <div class="about_section">
            <div>
                <img src="/logo.svg"/>
                <p>Yes, I know it's a typo, I did it intentionally</p>
               
            </div>
            <div class="socials">
                <a href="https://github.com/fowardslash"><i class="ri-github-fill"></i></a>
                <a href="https://twitter.com/quangrain69"><i class="ri-twitter-fill"></i></a>
                <a href="mailto://quangrain2014@gmail.com"><i class="ri-mail-fill"></i></a>
            </div>
        </div>
        <div class="bottom_section">
            <div class="links_section" id="one">
                <h3>Projects</h3>
                <div class="links">
                    <RouterLink v-for="i in list" :to="`/projects/${i.id}`">{{ i.name }}</RouterLink>
                </div>
            </div>
            <div class="links_section" id="two">
                <h3>Contributors</h3>
                <div class="links">
                    <a v-for="i in usrs" :href="i.github">{{ i.fullname }}</a>
                </div>
            </div>
            <div class="links_section" id="three">
                <h3>Links</h3>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/credits">Credits</RouterLink>
                <RouterLink to="/project">Projects</RouterLink>
                <RouterLink to="/admin">🤫</RouterLink>
            </div>
        </div>
        <div class="links_section">
            <p>Copyright 2023 Quang, This project and its design is created and owned by Quang. Icons used are from <a href="https://remixicon.com/">Remix Icon</a>, database and cloud storage services are provided by <a href="https://firebase.google.com/">Firebase</a>. All logos used belong to its owners.</p>
        </div>
    </div>
</template>
<style scoped>
    .footer{
        display: flex;
        flex-direction: column;
        gap: 25px;
        border-radius: 0px;
        padding: 25px;
        background-color: var(--background);
        border-top: 5px var(--text) solid;
    }
    #one{
        border-top: 5px var(--primary) solid;
    }
    #two{
        border-top: 5px var(--secondary) solid;
    }
    #three{
        flex: 0;
    }
    .links_section{
        padding: 15px;
        border-top: var(--text) 5px solid;
        border-radius: 0;
        flex: 1;
        display: flex;
        gap: 15px;
        flex-direction: column;
    }
    .links{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: inherit;
    }
    .links_section a{
        color: var(--text);
        text-decoration-thickness: 2px;
    }
    .about_section{
        display: flex;
        justify-content: space-between;
        gap: 0px;
    }
    .footer img{
        width: max-content;
        height: 32px;
    }
    .email_section{
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .email_section i{
        font-size: 24px;
    }
    .social_section{
        display: flex;
        flex-direction: column;
    }
    .social{
        font-size: 24px;
        text-decoration: none;
        color: var(--text)
    }
    .socials{
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .socials i{
        font-size: 32px;
    }
    .socials a{
        text-decoration: none;
    }
    .generic_button{
        outline: none !important
    }
    .bottom_section{
        display: flex;
        gap: 15px;
    }
    @media only screen and (max-width: 600px) {
        .footer{
            flex-direction: column;
            justify-content: flex-start;
            gap: 10px;
        }
        .bottom_section{
            flex-direction: column;
        }
        .about_section p{
            text-align: left !important;
        }
        .about_section{
            flex-direction: column;
            gap: 5px;
        }
        .socials{
            justify-content: baseline !important;
        }
        .links{
            grid-template-columns: 1fr;
        }
        .links_section{
            max-height: 10rem;
            overflow: auto;
        }
        .footer p{
            text-align: center;
        }
        .socials{
            margin-top: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
            widows: 100%;
            justify-content: baseline;
        }
        .email_section{
            flex-direction: column;
        }
    }
</style>