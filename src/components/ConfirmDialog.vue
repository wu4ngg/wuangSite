<script>
    export default {
        props: [
            'data',
            'visible',
            'title',
            'message'
        ],
    }
</script>
<template>
    <Transition name="dialog">
        <div class="dialog_wrapper" v-if="visible">
            <div class="info_wrap">
                <h3>Delete</h3>
                <p>Do you want to delete '{{ data.name }}'? This action cannot be undone</p>
                <button class="manage_btn red" @click="() => {this.$emit('confirm', data)}">
                    <p>Yes</p>
                    <i class="ri-delete-bin-line"></i>
                </button>
                <button class="manage_btn" @click="() => {this.$emit('cancel')}">
                    <p>No</p>
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
        </div>
    </Transition>
    
</template>
<style scoped>
    .dialog-enter-active, .dialog-leave-active{
        transition: all 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), opacity 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), backdrop-filter 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
    }
    .dialog-enter-from, .dialog-leave-to{
        opacity: 0;
        backdrop-filter: blur(0px);
    }
    .dialog-enter-active .info_wrap, .dialog-leave-active .info_wrap{
        transition: all 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), opacity 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97), filter 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
    }
    .dialog-enter-from .info_wrap{
        transform: scale(120%);
        opacity: 0;
    }
    .dialog-leave-to .info_wrap{
        transform: scale(80%);
        opacity: 0;
    }
    .dialog_wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00000038;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info_wrap{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 350px;
        background-color: var(--card-blur);
        backdrop-filter: blur(20px);
        padding: 20px;
        border-radius: 16px;
    }
    .manage_btn{
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        padding: 10px 15px;
        display: flex;
        gap: 15px;
        align-items: center;
        background-color: var(--primary);
        border: none;
        box-shadow: 0px 4px 18px 0px var(--primary);
        border-radius: 16px;
        cursor: pointer;
    }
    .manage_btn:hover{
        box-shadow: 0px 0px 0px 0px var(--primary);
    }
    .red{
        background-color: #FE7272;
        box-shadow: 0px 4px 18px 0px #FE7272;
    }
    .red:hover{
        background-color: #FE7272;
        box-shadow: 0px 0px 0px 0px #FE7272;
    }
</style>