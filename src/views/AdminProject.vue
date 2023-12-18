<script>
import { getAllData } from '../../database/helper';
import {deleteProject} from '../../database/helper'
import ProjCard from '../components/ProjCard.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
    export default{
        data(){
            return{
                projCount: 0,
                proj: [],
                data: undefined,
                isShowDialog: false
            }
        },
        mounted(){
            getAllData().then(e => {
                console.log(e)
                this.projCount = e.length
                this.proj = e
            })
        },
        components: {
            ProjCard,
            ConfirmDialog
        },
        methods: {
            deleteConfirm(d){
                this.isShowDialog = true;
                this.data = d
            },
            beginDelete(d){
                const index = this.proj.indexOf(d)
                this.isShowDialog = false
                const tmp = this.proj[index]
                this.proj[index] = {
                    tmp,
                    isBeingDeleted: true
                }
                deleteProject(d).then(() => {
                    this.proj.splice(index, 1)
                }).catch(e => {
                    alert(e)
                })
            }
        }
    }
</script>
<template>
    <ConfirmDialog @confirm="(e) => {beginDelete(e)}" @cancel="() => {isShowDialog = false}" :data="data" :visible="isShowDialog"/>
    <div class="project_wrapper">
        <div class="top_wrapper">
            <div>
                <h1>{{ projCount }} Projects</h1>
            </div>
            <div>[graph goes here]</div>
        </div>
        <div class="content">
            <div class="sorter">
                <button class="border_btn">
                    <p>Sort</p>
                    <i class="ri-sort-asc"></i>
                </button>
                <div class="border_btn stretch">
                    <input class="search_edt" placeholder="Search"/>
                    <i class="ri-search-line"></i>
                </div>
            </div>
            <div></div>
            <div class="sorter right">
                <router-link to="/admin/proj/publish" class="manage_btn">
                    <p>Publish</p>
                    <i class="ri-add-line"></i>
                </router-link>
            </div>
        </div>
     
            <TransitionGroup name="grid" tag="div" class="projects">
                <ProjCard @delete="(e) => {deleteConfirm(e)}" :item="item" :key="item.id" :style="`opacity: ${item.isBeingDeleted ? 0.7 : 1};`" v-for="item in proj"/>
            </TransitionGroup>
    </div>
</template>
<style scoped>
    .grid-move{
        transition: all 0.5s cubic-bezier(0.74, 0.15, 0.24, 0.97);
    }
    .grid-enter-active, .grid-leave-active{
        transition: all 0.2s cubic-bezier(0.74, 0.15, 0.24, 0.97);
    }
    .grid-leave-active{
        position: absolute;
    }
    .grid-enter-from, .grid-leave-to{
        transform: scale(80%);
        filter: blur(20px);
        opacity: 0;
    }
    *{
        font-family: Inter;
    }
    .projects{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px
    }
    .manage_btn{
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        padding: 5px 15px;
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
    .manage_btn:active{
        transform: scale(95%);
    }
    .manage_btn i{
        font-size: 20px;
        color: var(--on-bright-color);
    }
    .manage_btn p{
        color: var(--on-bright-color);
    }
    
    .pagers{
        width: 100%;
        gap: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    h1{
        font-size: 35px;
    }
    .project_wrapper{
        padding: 96.5px 2rem;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 25px;
        height: 100vh;
        box-sizing: border-box;
    }
    hr{
        align-self: center;
        height: 100%;
        border: 2px var(--card) solid;
    }
    .left{
        align-items: baseline;
        flex-direction: column;
        flex: 1;
    }
    .info_wrapper{
        flex: 1 auto;

    }
    .top_wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .content{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
    }
    .sorter{
        display: flex;
        gap: 15px;
    }
    .border_btn{
        display: flex;
        gap: 10px;
        align-items: center;
        border: 2px var(--text) solid;
        padding: 5px 15px;
        background: none;
        border-radius: 50px;
    }
    .border_btn p{
        font-size: 1rem;
    }
    .border_btn i{
        font-size: 20px;
    }
    .stretch{
        flex: 1;
        justify-content: space-between;
    }
    .search_edt{
        flex: 1;
        border: none;
        background-color: none;
        font-family: Inter;
        font-size: 1rem;
        outline: none;
    }
    .right{
        justify-content: flex-end;
    }
    @media only screen and (max-width: 600px) {
        .projects{
            grid-template-columns: 1fr;
        }
        .content{
            display: flex;
            flex-direction: column;
        }
        .sorter{
            flex-direction: column;
            justify-content: baseline;
            align-items: baseline;
        }
        .right{
            display: flex !important;
        }
    }
</style>