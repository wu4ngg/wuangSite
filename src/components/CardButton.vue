<script>
    export default {
        props:[
            "title",
            "icon",
            "subtitle"
        ]
    }
</script>
<template>
    <div class="card_wrapper">
        <i :class="icon" ></i>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
    </div>
</template>
<style scoped>
    .card_wrapper{
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 20px;
        background-color: var(--card);
        border-radius: 16px;
    }
    .card_wrapper i{
        font-size: 32px;
    }
</style>