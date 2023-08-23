<script>
    export default {
        props: [
            "message",
            "type"
        ],
        mounted(){
            setInterval(() => {
               this.$emit('toast-visible', false); 
            }, 2000);
        }
    }
</script>
<template>
    <div class="toast_wrapper">
        
            <div class="toast">
                <i v-if="type == 0" class="ri-check-line"></i>
                <i v-if="type == 1" class="ri-close-circle-line"></i>
                <p><b>{{ message }}</b></p>
            </div>

    </div>
</template>
<style scoped>
    .toast_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: none;
        padding-bottom: 16px;
    }
    .toast{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 3rem;
        background-color: var(--background);
        padding: 16px 24px;
        border-radius: 50px;
        box-shadow: 0px 4px 54px rgba(0, 0, 0, 0.166);
    }
    .toast i{
        font-size: 24px;
    }
   
</style>