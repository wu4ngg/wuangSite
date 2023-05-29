<script>
    export default {
        props:
        [
            'list',
            'title',
            'subtitle',
            'mode',
        ],
    }
</script>
<template>
        <div class="info_wrapper">
            <div class="title_wrapper">
                <h3>{{ title }}</h3>
                <p v-if="subtitle">{{ subtitle }}</p>
            </div>
            <div v-if="!list.length" class="card_content">
                <progress></progress>
                <p>Loading</p>
            </div>
            <div v-if="!list || list.length == 0" class="card_content">
                <i class="ri-prohibited-line"></i>
                <p>Hmm, that's strange. Either you are not connected to the internet or the Dev has made a huge mistake somewhere in the code.</p>
            </div>
            <a v-if="!mode" v-for="item in list" :href="item.getLink()" class="card_content" target="_blank" rel="noopener noreferrer">
                <i :class="item.getIcon()"></i>
                <p>{{ item.getDescription() }}</p>
            </a>
            <router-link :to="'/projects/'+item.getId()" v-if="mode == 'project'" v-for="item in list" class="proj_content">
                <img :src="item.getIcon()" class="proj_img"/>
                <div>
                    <h3>{{ item.getName() }}</h3>
                    <p>{{ item.getDesc() }}</p>
                </div>
                
            </router-link>
        </div>
</template>
<style>
    .proj_img{
        height: 35px;
        width: max-content;
    }
    .proj_content{
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .card_content{
        text-decoration: none;
    }
</style>