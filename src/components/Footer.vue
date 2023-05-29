<template>
    <div class="footer">
        <div class="about_section">
            <p class="bold">Copyright 2023 Quang, the design is made by me.</p>
            <p>This project is Open Source. Please see its project page <router-link to="/projects/0gV2wAXOaCq89vnZ5vHG">Here</router-link>.</p>
            <div class="socials">
                <a href="https://www.facebook.com/wuang.96/" class="ri-facebook-circle-fill social"></a>
                <a href="https://twitter.com/quangrain69" class="ri-twitter-fill social"></a>
                <a href="https://www.linkedin.com/in/quang-tr%C3%AD-5127b5222/" class="ri-linkedin-fill social"></a>
            </div>
        </div>
        
        <div class="email_section">
            <i class="ri-mail-line"></i>
            <p><b>Email</b><br/>quangrain2014@gmail.com</p>
            
        </div>
        <router-link to="/about" class="generic_button">
            <p>About me</p>
        </router-link>
        <router-link to="/project" class="generic_button">
            <p>Projects</p>
        </router-link>
        <router-link to="/blog" class="generic_button">
            <p>Blog</p>
        </router-link>
        <router-link to="/credits" class="generic_button">
            <p>Credits</p>
        </router-link>
        <img src="/logo.svg"/>

    </div>
</template>
<style scoped>
    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0px;
        padding: 25px;
        background-color: var(--background);
        border-top: 2px var(--foreground) solid;
    }
    .about_section{
        display: flex;
        flex-direction: column;
        gap: 0px;
    }
    .footer img{
        width: max-content;
        height: 24px;
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
    .generic_button{
        outline: none !important
    }
    @media only screen and (max-width: 600px) {
        .footer{
            flex-direction: column;
            justify-content: flex-start;
            gap: 10px;
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
            justify-content: center;
        }
        .email_section{
            flex-direction: column;
        }
    }
</style>