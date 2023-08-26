<script>
import { remove } from 'firebase/database'
import { getDownloadURL } from 'firebase/storage'
import ProgressBar from '../components/ProgressBar.vue'
import { getUsersWithId, getLang, uploadFile, insertProject } from '../../database/helper'
 export default {
    components: {
        ProgressBar
    },
    data(){
        return {
            file: File,
            src: '/landscape-line.svg',
            nameProj: '',
            proj: {
                name: '',
                image: '',
                desc: '',
                detailed_desc: '',
                github: '',
                goal: '',
                status: 'Success',
                isFeatured: false,
                type: 'Web App',
                time: 0,
                credits: [],
                lang_frontend: [
                    
                ],
                lang_backend: [
                    
                ],
                
            },
            icon: '',
            add_lang: '',
            img_lang: '/landscape-line.svg',
            temp: [],
            isAddingLang: false,
            id: -1,
            usrs: [],
            tmpusrs: [],
            creds: [
                
            ],
            isAddingRole: false,
            uploadProg: 0
        }
    },
    mounted(){
        this.icon = this.getIcon()
        getUsersWithId().then(e => {
            this.usrs = e
            console.log(this.usrs)
        }).catch(e => {
            this.$emit('toast', {message: `Can't fetch users: ${e.message}`, type: 0})
        })
    },
    
    methods: {
        getFile(el){
            this.file = el.files[0]
            console.log(this.file)
            const reader = new FileReader()
            reader.onload = (e) => {
                this.src = e.target.result;
            }
            reader.readAsDataURL(this.file)
            this.nameProj = this.file.name
        },
        showPopup(el){
            this.$emit('combobox', el)
        },
        getIcon(){
          //  console.log(this.proj)
            switch(this.proj.type){
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
        getStatusIcon(){
            switch(this.proj.status){
                case "Success":
                    return 'ri-check-line'
                case "WIP":
                    return 'ri-loader-line'
                default:
                    return 'ri-close-circle-line'

            }
        },
        removeItem(index, type){
            console.log(index)
            switch(type){
                case 1:
                    this.proj.lang_frontend.splice(index, 1)
                    break
                case 2:
                    this.proj.lang_backend.splice(index, 1)
                    break
                case 3:
                    this.proj.credits.splice(index, 1)
                    this.creds.splice(index, 1)
                    break
                case 4:
                    if(this.temp.length == 1){
                        this.stopAddLang()
                    }
                    this.temp.splice(index, 1)
                    break
                default:
                    this.$emit('toast', {message: 'Invalid type', type: 1})
                    break
            }
        },
        startAddLang(){
            this.id++
            var identifier = this.id
            this.isAddingLang = true
            getLang().then((e) => {
                this.temp = e
            })
        },
        stopAddLang(){
            this.id = -1
            this.temp = []
            this.isAddingLang = false
        },
        addLang(){
            for(var item of this.temp){
                if(item.name == ''){
                    this.$emit('toast', {message: "Can't add Language: Name is empty", type: 1})
                    return
                }
                if(item.isSelected){
                    if(item.type == 'lang'){
                        this.proj.lang_frontend.push(
                            {
                                img: item.img,
                                name: item.name,
                                type: item.type,
                            }
                        )
                    } else {
                        this.proj.lang_backend.push(
                            {
                                img: item.img,
                                name: item.name,
                                type: item.type
                            }
                        )
                    }
                }
            }
            this.$emit('toast', {message: `Added ${this.temp.length} items.`, type: 0})
            this.stopAddLang()
        },
        getImgLang(el, item){
            var index = this.temp.indexOf(item)
            console.log(index)
            this.file = el.files[0]
            console.log(this.file)
            const reader = new FileReader()
            reader.onload = (e) => {
                this.temp[index].img = e.target.result;
            }
            reader.readAsDataURL(this.file)
        },
        startAddRole(){
            this.isAddingRole = true
            this.tmpusrs.push({
                id: 'choose',
                role: ''
            })
        },
        removetmprole(index){
            this.tmpusrs.splice(index, 1)
            if(this.tmpusrs.length == 0){
                this.stopAddRole()
            }
        },
        stopAddRole(){
            this.tmpusrs = []
            this.isAddingRole = false
        },
        addRole(){
            for(var item of this.tmpusrs){
                if(item.id == 'choose' || this.overlap(item.id)){
                    return
                }
                this.creds.push({
                    id: item.id,
                    fullname: this.searchUser(item.id).fullname,
                    role: item.role
                })
                this.proj.credits.push({
                    id: item.id,
                    role: item.role
                })
            }
            this.stopAddRole()
        },
        searchUser(id){
            for(var i of this.usrs){
                if(id == i.id){
                    return i
                }
            }
        },
        overlap(id){
            for(var i of this.creds){
                if(id == i.id){
                    return true
                }
            }
            return false
        },
        upload(){
            uploadFile(this.file, snapshot => {
                this.uploadProg = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }).then(e => {
                if(e.state == 'success'){
                    getDownloadURL(e.ref).then(
                        e => {
                            this.proj.image = e
                            insertProject(this.proj).then(() => {
                                this.$emit('toast', {message: 'Upload success!', type: 0})
                                this.proj = {
                                    name: '',
                                    image: '',
                                    desc: '',
                                    detailed_desc: '',
                                    github: '',
                                    goal: '',
                                    status: 'Success',
                                    isFeatured: false,
                                    type: 'Web App',
                                    time: 0,
                                    credits: [],
                                    lang_frontend: [
                                        
                                    ],
                                    lang_backend: [
                                        
                                    ],
                                }
                                
                                this.temp = []
                                this.tmpusrs = []
                                this.creds = []
                            })
                        }
                    )
                }
            })
            console.log(this.proj)
        }
    }
 }
</script>
<template>
    <div class="project_wrapper">
        <h1>Publish</h1>
        <div class="card">
            <div class="section">
                <ProgressBar :progress="uploadProg"/>
                <div class="title_part">
                    <div class="identifier">
                        <label for="image_picker" class="image_picker">
                            <img :src="src" height="32"/>
                        </label>
                        <input @change="getFile($event.target)" id="image_picker" type="file" accept=".png,.jpg,.svg"/>
                        <input v-model="proj.name" placeholder="Title" class="huge_edt"/>
                       
                        
                    </div>
                    <div class="action_button">
                        <button class="border_btn colored" @click="upload()">
                            <p>Save</p>
                        </button>
                        <button class="border_btn">
                            <p>Cancel</p>
                        </button>
                    </div>
                </div>
                <div class="brief_info">
                    <div class="dropdown" @click="showPopup($event.target)">
                        <i :class="getIcon()"></i>
                        <select v-model="proj.type" id="platform">
                            <option selected="selected" value="Web App">Web App</option>
                            <option value="Android App">Android App</option>
                            <option value="iOS App">iOS App</option>
                            <option value="macOS App">macOS App</option>
                            <option value="Database App">Database App</option>
                            <option value="Desktop App">Desktop App</option>
                        </select>
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                    <div class="dropdown" @click="showPopup($event.target)">
                        <i :class="getStatusIcon()"></i>
                        <select v-model="proj.status" id="platform">
                            <option selected="selected" value="Success">Success</option>
                            <option value="Failed">Failed</option>
                            <option value="WIP">WIP</option>
                            <option value="Abandoned">Abandoned</option>
                        </select>
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                    <div class="dropdown" @click="showPopup($event.target)">
                        <i class="ri-time-line"></i>
                        <input type="number" v-model="proj.time"/>
                        <p>Months</p>
                    </div>
                    <div class="dropdown">
                        <input type="checkbox" id="featured" v-model="proj.isFeatured"/>
                        <label for="featured">
                            <p>Featured</p>
                        </label>
                    </div>
                </div>
                <input class="transparent_edt" v-model="proj.github" placeholder="Website"/>
                <textarea class="transparent_edt" v-model="proj.desc" placeholder="Description"></textarea>
                <textarea class="transparent_edt" v-model="proj.detailed_desc" placeholder="Detailed description"></textarea>

            </div>
            <div class="split_section">
                <div class="left">
                    <p>Framework/Language</p>
                    <p v-if="proj.lang_frontend.length == 0">Nothing here yet</p>
                    <TransitionGroup name="list">
                        <div v-for="(item,index) in proj.lang_frontend" class="space_between fill_flex" :key="item">
                            <div class="identifier">
                                <img :src="item.img" height="32"/>
                                <p>{{ item.name }}</p>
                            </div>
                            <i class="ri-delete-bin-line clickable" @click="removeItem(index, 1)"></i>
                        </div>
                    </TransitionGroup>
                    <hr class="horizontal"/>
                    <p v-if="proj.lang_backend.length == 0">Nothing here yet</p>
                    <TransitionGroup name="list">
                        <div v-for="(item,index) in proj.lang_backend" class="space_between fill_flex" :key="item">
                            <div class="identifier">
                                <img :src="item.img" height="32"/>
                                <p>{{ item.name }}</p>
                            </div>
                            <i class="ri-delete-bin-line clickable" @click="removeItem(index, 2)"></i>
                        </div>
                    </TransitionGroup>
                    <hr class="horizontal" v-if="isAddingLang"/>
                    <TransitionGroup name="list">
                        <div v-for="(item,index) in temp" class="identifier fill_flex" :key="item">
                            <div class="identifier fill_flex">
                                <img :src="temp[index].img" height="32"/>
                                <p>{{ temp[index].name }}</p>
                            </div>
                            <select disabled class="sel" v-model="temp[index].type">
                                <option value="lang">Language / Framework</option>
                                <option value="db">Database / Back-end</option>
                            </select>
                            <input type="checkbox" v-model="temp[index].isSelected"/>

                        </div>
                    </TransitionGroup>
                    
                    <div class="split_section max_width">
                        <button v-if="!isAddingLang" @click="startAddLang()" class="border_btn center fill_flex">
                            <i class="ri-add-line"></i>
                            <p>Add</p>
                        </button>
                        <button @click="addLang()" v-if="isAddingLang" class="border_btn center fill_flex">
                            <i class="ri-check-line"></i>
                            <p>Done</p>
                        </button>
                        <button @click="stopAddLang()" v-if="isAddingLang" class="border_btn center fill_flex">
                            <i class="ri-close-line"></i>
                            <p>Cancel</p>
                        </button>
                    </div>
                </div>
                <hr/>
                <div class="left">
                    <p>Contributors</p>
                    <p v-if="creds.length == 0">Nothing here yet</p>
                    <TransitionGroup name="list">
                        <div v-for="(item,index) in creds" class="space_between max_width" :key="item">
                                <div class="identifier">
                                    <i class="ri-code-line"></i>
                                    <p>{{ item.fullname }} ({{item.role}})</p>
                                </div>
                                <i class="ri-delete-bin-line clickable" @click="removeItem(index, 3)"></i>
                        </div>
                    </TransitionGroup>
                    <hr class="horizontal"/>
                    <TransitionGroup name="list">
                        <div v-for="(item,index) in tmpusrs" class="space_between max_width" :key="item">
                            <div class="identifier fill_flex">
                                <select class="sel" v-model="tmpusrs[index].id">
                                    <option value="choose" disabled>Choose a contributor</option>
                                    <option v-for="e in usrs" :value="e.id">{{e.fullname}}</option>
                                </select>
                                <input class="transparent_edt" v-model="tmpusrs[index].role" placeholder="Role"/>
                            </div>
                            <i class="ri-delete-bin-line clickable"></i>
                        </div>
                    </TransitionGroup>
                    <div class="split_section max_width">
                        <button @click="startAddRole()" class="border_btn center fill_flex">
                            <i class="ri-add-line"></i>
                            <p>Add</p>
                        </button>
                        <button v-if="isAddingRole" @click="addRole()" class="border_btn center fill_flex">
                            <i class="ri-check-line"></i>
                            <p>Done</p>
                        </button>
                        <button v-if="isAddingRole" @click="stopAddRole()" class="border_btn center fill_flex">
                            <i class="ri-close-line"></i>
                            <p>Cancel</p>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style scoped>
*{
        font-family: Inter;
    }
    .split_section{
        display: flex;
        gap: 15px;
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
        border: 1px var(--text) solid;
    }
    .horizontal{
        height: 0;
        width: 100%;
        
    }
    .left{
        align-items: baseline;
        flex-direction: column;
        flex: 1;
        gap: 16px;
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
        cursor: pointer;
        display: flex;
        gap: 10px;
        align-items: center;
        border: 2px var(--text) solid;
        padding: 5px 15px;
        background: none;
        border-radius: 50px;
    }
    .border_btn:hover{
        background-color: var(--text);
    }
    .border_btn:hover p, .border_btn:hover i{
        color: var(--on-bright-color);
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
    .colored{
        background-color: var(--primary);
        border: none;
    }
    .colored p{
        color: var(--on-bright-color);
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
    .card{
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 25px;
        background-color: var(--card);
        border-radius: 16px;
    }
    .identifier{
        display: flex;
        gap: 15px;
        align-items: center;
        flex: 1;
    }
    .image_picker{
        cursor: pointer;
        height: fit-content;
        display: flex;
        align-items: center;
    }
    #image_picker, .img_picker{
        display: none;
    }
    .title_part{
        display: flex;
        justify-content: space-between;
    }
    .section{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .brief_info{
        display: flex;
        gap: 15px;
        align-items: center;
    }
    .dropdown{
        cursor: pointer;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .dropdown select{
        appearance: none;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
    }
    .dropdown input{
        appearance: none;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        width: 25px;
    }
    .dropdown i{ 
        font-size: 24px;
    }
    i{
        font-size: 24px;
    }
    
    .list-enter-from,
    .list-leave-to{
        opacity: 0;
        filter: blur(50px);
        translate: -20px 0;
    }
    .list-enter-active,
    .list-leave-active{
        transition: 0.3s;
    }
   
</style>
<style>
    .huge_edt{
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        font-weight: bold;
        outline: none;
        flex: 1;
    }
    .clickable{
        cursor: pointer;
    }
    .clickable:hover{
        background-color: transparent;
    }
    .action_button{
        display: flex;
        gap: 10px;
    }
    input[type=number] {
        appearance: textfield;
    }
    .transparent_edt{
        background-color: transparent;
       
        font-size: 1rem;
        font-family: Inter;
        color: var(--text);
        outline: none;
        resize: vertical;
        border: 2px var(--text) solid;
        padding: 10px;
        border-radius: 10px;
    }
    #featured{
        appearance: auto;
    }
    input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>