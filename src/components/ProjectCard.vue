<script>
    export default{
        props:[
            "object",
            "customlink"
        ]
    }
</script>
<template>
    <a v-if="customlink" :href="customlink" class="project_card">
        <img :src="object.getIcon()"/>
        <h3>{{ object.getName() }}</h3>
        <p>{{ object.getDesc() }}</p>
    </a>
    <router-link v-if="!customlink" :to="'/projects/'+object.getId()" class="project_card">
        <img :src="object.getIcon()"/>
        <h3>{{ object.getName() }}</h3>
        <p>{{ object.getDesc() }}</p>
    </router-link>
</template>
<style>
    @import url('../assets/var.css');
    .project_card{
        text-decoration: none;
        transition: box-shadow 0.2s, background-color 0.2s;
        cursor: pointer;
        border-radius: 20px;
        width: 100%;
        padding: 35px;
        background-color: var(--background);
        box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.25);
    }
    .project_card img{
        height: 48px;
    }
    .project_card:hover{
        outline: 2px var(--card) solid;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    }
</style>