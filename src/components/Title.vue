<script>
    export default{
        props:[
            "color",
            "text",
            "desc"
        ]
    }
</script>
<template>
    <div class="page_wrapper" :style="{'background-color': color}">
        <h1>{{ this.text }}</h1>
        <p v-if="desc">{{ desc }}</p>

    </div>
</template>
<style>
    @import url('../assets/var.css');
    body{
        padding: 0
    }
    .page_wrapper{
        padding: 50px;
        padding-top: 100px;
        padding-bottom: 75px;
        border-radius: 50px;
    }
</style>