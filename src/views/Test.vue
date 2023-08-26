<script>
import {uploadFile, auth, uploadLang, getLang, delLang, delFile} from '../../database/helper'
import $ from 'jquery'
import Title from '../components/Title.vue'
import { uploadString, getDownloadURL } from 'firebase/storage'
import { OperationType } from 'firebase/auth'
    export default{
        components:{
    Title,
    OperationType
},
        data(){
            return {
                date: "",
                data: "",
                progress: 0,
                time: "",
                lang: {
                    img: '',
                    name: '',
                    type: 'lang',
                    file_name: ''
                },
                langlist: getLang().then(e => this.langlist = e),
                isBeingDeleted: false
            }
        },
        mounted(){
            if(!auth.currentUser){
                this.$router.push('/unauthorized')
            }
                var d = new Date()
                console.log(d)
                this.time = d.getTime()

        },
        methods:{
            changeDate(){
             
                let dt = document.getElementById("datepicker")
                const f = dt.files[0]
                if(!f){
                    this.progress = 0
                    this.data = ''
                }
                if(f)
                    this.readFile(f)
            },
            async readFile(file){
                this.date = file
                
                this.upload(file)
                

                
            },
            showpreview(){
                let dt = document.getElementById("datepicker")
                const file = dt.files[0]
                
                console.log(file.name)
                
                const preview = new FileReader()
                preview.onload = e => {
                    this.data = e.target.result
                }
                preview.readAsDataURL(file)
            },
            upload(url){
                var task = uploadFile(url, snapshot => {
                    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + this.progress + '% done');
                })
                task.then(e => {
                    if(e.state == 'success'){
                        console.log(e.ref.name)
                        this.lang.file_name = e.ref.name
                        getDownloadURL(e.ref).then(e => {
                            console.log(e)
                            this.lang.img = e
                            this.date = e
                            uploadLang(this.lang).then(e => {
                                this.langlist = []
                                getLang().then(e => this.langlist = e)
                                this.lang = {
                                    img: '',
                                    name: '',
                                    type: 'lang',
                                    file_name: ''
                                }
                                this.$emit('toast', {message: 'Upload complete!', type: 0})
                            }).catch(e => {
                                this.$emit('toast', {message: `Upload failed: ${e.message}`, type: 1})
                            })
                        })
                    }
                })
            },
            deleteLang(name, id, index){
                this.langlist[index].isBeingDeleted = true
                delFile(name).then(() => {
                    delLang(id).then(() => {
                        this.langlist[index].isBeingDeleted = false
                        this.langlist.splice(index, 1)
                    })
                })
                
            }
        }
    }
</script>
<template>
    <Title text="Feature Test Run" desc="Just some UI Testing" color="#fd7373"></Title>
    <div class="project_content">
        <div class="description_wrapper">
            <p>Preview</p>
            <img :src="data"/>
            <p>Actually uploaded</p>
            <img :src="date"/>
            <input type="file" id="datepicker" @change="showpreview()" class="generic_button"/>
            <div class="progress_wrapper">
                <div class="progress" :style="{'width': progress+'%'}"></div>
            </div>
            <p>{{ progress }}%</p>
            <input placeholder="name" v-model="lang.name"/>
            <select v-model="lang.type">
                <option value="lang">lang</option>
                <option value="db">db</option>
            </select>
            <p>{{ lang }}</p>
            <button @click="changeDate()">Upload</button>
            <div v-if="false" class="loading_progress">
                <div class="progress"></div>
            </div>
            <table>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>File name</th>
                <th>Action</th>
                <tr v-for="(lg,index) in langlist" :class="lg.isBeingDeleted ? 'dim' : ''">
                    <td>{{ lg.id }}</td>
                    <td><img :src="lg.img"/></td>
                    <td>{{ lg.name }}</td>
                    <td>{{ lg.type }}</td>
                    <td>{{ lg.file_name }}</td>
                    <td><button @click="deleteLang(lg.file_name, lg.id, index)">Delete</button></td>
                </tr>
            </table>
        </div> 
    </div>
</template>
<style scoped>
    .progress_wrapper, .loading_progress{
        width: 100%;
        height: 6px;
        background-color: var(--card);
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
    .loading_progress{
        overflow: hidden;
        position: relative;
    }
    .loading_progress .progress{
        animation: loading 2s;
        animation-iteration-count: infinite;
        position: absolute;
        width: 15%;
    }
    img{
        height: 128px;
    }
    table{
        border: 2px black solid;
        border-spacing: 0;
    }
    td, th{
        text-align: start;
        border: 1px black solid;
    }
    .dim{
        opacity: 50%;
    }
</style>