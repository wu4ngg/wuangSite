<script>
import { RouterLink } from 'vue-router';

    export default {
    props: [
        'item'
    ],
    methods: {
        getIcon(type) {
            switch (type) {
                case "Web App":
                    return 'ri-global-line';
                case "Android App":
                    return 'ri-android-line';
                case "iOS App":
                    return 'ri-apple-line';
                case "macOS App":
                    return 'ri-command-line';
                case "Database App":
                    return 'ri-database-2-line';
                default:
                    return 'ri-code-line';
            }
        },
        getStatusIcon(status) {
            switch (status) {
                case 'Failed':
                    return 'ri-close-circle-line';
                case 'Success':
                    return 'ri-check-line';
                default:
                    return 'ri-loader-line';
            }
        }
    },
    components: { RouterLink }
}
</script>
<template>
    <div :to="'/projects/'+item.id" class="info_wrap">
        <div class="proj_title">
            <img v-if="item.image != ''" class="proj_img" :src="item.image"/>
            <h3>{{ item.name }}</h3>
        </div>
        <div class="info_title">
            <div class="info">
                <i class="ri-group-line"></i>
                <p>{{ item.credits.length }}</p>
            </div>
            <div class="info">
                <i :class="getIcon(item.type)"></i>
                <p>{{ item.type }}</p>
            </div>
            <div class="info">
                <i :class="getStatusIcon(item.status)"></i>
            </div>
            <div class="info">
                <i class="ri-time-line"></i>
                <p>{{ item.time }} months</p>
            </div>
        </div>
        <p>{{ item.desc }}</p>
        <div class="lang_wrapper">
            <img v-for="obj in item.lang_frontend" :src="obj.img"/>
            <hr>
            <img v-for="obj in item.lang_backend" :src="obj.img"/>
        </div>
        <button class="manage_btn">
            <p>Edit</p>
            <i class="ri-arrow-right-s-line"></i>
        </button>
        <button class="manage_btn red" @click="() => {this.$emit('delete', item)}">
            <p>Delete</p>
            <i class="ri-delete-bin-line"></i>
        </button>
    </div>
</template>
<style scoped>
    
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
    .info_wrap{
        box-sizing: border-box;
        overflow: auto;
        height: fit-content;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 25px;
        background-color: var(--card);
        border-radius: 15px;
        text-decoration: none;
    }
    .lang_wrapper{
        display: flex;
        gap: 10px;
    }
    .red{
        background-color: #FE7272;
        box-shadow: 0px 4px 18px 0px #FE7272;
    }
    .red:hover{
        background-color: #FE7272;
        box-shadow: 0px 0px 0px 0px #FE7272;
    }
    .lang_wrapper img{
        height: 24px;
    }
    .proj_title{
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-direction: column;
    }
    .info_title{
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }
    .info{
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .info i{
        font-size: 24px;
    }
</style>