<script>
    import {updateInfo} from '../../database/helper'
    export default {
        props:
        [
            'list',
            'title',
            'subtitle',
            'mode',
            'admin'
        ],
        data(){
            return {
                isEditing: false,
                uneditable: '',
                editable: '',
                edt: []
            }
        },
        mounted(){
            
        },
        methods:{
            startEdit(){
                this.isEditing = true;
                this.getEditable()
               
            },
            stopEdit(){
                this.isEditing = false
            },
            getEditable(){
                for(var val of this.list){
                    const e = val.getDescription().split(':')
                    console.log(e)
                    if(e.length > 1){
                        this.edt.push({
                            uneditable: e[0] + ':',
                            editable: e[1],
                            id: ''
                        })
                    } else {
                        this.edt.push({
                            uneditable: '',
                            editable: e[0],
                            id: ''
                        })
                    }
                }

            },
            completeEdit(){
                this.edt[0].id = 'edu';
                this.edt[1].id = 'eng';
                this.edt[2].id = 'goal';
                this.edt[3].id = 'interest';
                console.log(this.edt)
                updateInfo(this.edt).then(e => {
                    this.$emit('edit-complete')
                    this.isEditing = false
                }).catch(e => {
                    console.log(`Failed: ${e.message}`)
                }) 
            }
        }
    }
</script>
<template>
        <div class="info_wrapper">
            <div class="title_wrapper">
                <div class="title_edit">
                    <h3>{{ title }}</h3>
                    <i v-if="admin && !isEditing" @click="startEdit()" class="ri-pencil-line click"></i>
                    <i v-if="isEditing" @click="stopEdit()" class="ri-close-line click"></i>
                    <i v-if="isEditing" @click="completeEdit()" class="ri-check-line click"></i>
                </div>
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
            <a v-if="!mode" v-for="(item,index) in list" :href="item.getLink()" class="card_content" target="_blank" rel="noopener noreferrer">
                <div class="card_msg">
                    <i :class="item.getIcon()"></i>
                    <p v-if="!isEditing">{{ item.getDescription() }}</p>
                    <p v-if="isEditing">{{ edt[index].uneditable }}</p>
                    <textarea v-model="edt[index].editable" v-if="isEditing" class="normalEdt"/>
                </div>
                

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
        width: auto;
        align-self: baseline;
    }
    .proj_content{
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .card_content{
        text-decoration: none;
        justify-content: space-between;
    }
    .card_msg{
        display: flex;
        gap: 10px;
        flex: 1;
        align-items: center;
    }
    .manage_btn{
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        padding: 15px;
        display: flex;
        justify-content: space-between;
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
    .manage_btn:active{
        transform: scale(95%);
    }
    .manage_btn i{
        font-size: 24px;
        color: var(--on-bright-color);
    }
    .manage_btn p{
        color: var(--on-bright-color);
    }
    .click{
        cursor: pointer;
    }
    .normalEdt{
        padding: 10px;
        border: none;
        background-color: var(--background);
        border-radius: 50px;
        flex: 1;
        
        color: var(--text);
        font-family: Inter;
    }
    .title_edit{
        display: flex;
        gap: 15px;
        align-items: center;
    }
    .title_edit i{
        font-size: 24px;
    }
</style>