<script>
    export default{
        props:[
            "color",
            "text",
            "desc",
            "tag"
        ]
    }
</script>
<template>
    <div class="page_wrapper" :style="{'background-color': color}">
        <h1>{{ this.text }}</h1>
        <p v-if="desc">{{ desc }}</p>
        <p class="tag" v-if="tag">{{ tag }}</p>
    </div>
</template>
<style>
    @import url('../assets/var.css');
    body{
        padding: 0
    }
    .tag{
        width: fit-content;
        padding: 10px 20px;
        border-radius: 50px;
        border: 2px var(--text) solid
    }
    .page_wrapper{
        padding: 50px;
        padding-top: 100px;
        padding-bottom: 75px;
        border-radius: 50px;
    }
    .page_wrapper h1, .page_wrapper p{
        color: var(--on-color);
    }
</style>