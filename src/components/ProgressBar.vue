<script>
    export default {
        props: [
            "progress"
        ]
    }
</script>
<template>
    <div class="progress_wrapper">
       <div class="progress" :style="{'width': progress+'%'}"></div>
    </div>
    <p>{{ progress }}%</p>
</template>
<style scoped>
    .progress_wrapper, .loading_progress{
        width: 100%;
        height: 6px;
        background-color: var(--background);
        border-radius: 16px;
    }
    @keyframes loading{
        from {
            width: 25%;
            left: -25%;
        }
        to {
            width: 25%;
            left: 100%;
        }
        
        
    }
    .progress{
        transition: width 0.2s;
        width: 0;
        height: 100%;
        background-color: var(--primary);
        border-radius: 16px;
    }
</style>