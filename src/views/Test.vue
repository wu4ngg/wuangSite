<script>
import $ from 'jquery'
import Title from '../components/Title.vue'
    export default{
        components:{
            Title
        },
        data(){
            return {
                date: "",
                data: {} 
            }
        },
        mounted(){
                $( function() {
                $( "#datepicker" ).datepicker({
                    dateFormat: "dd-mm-yy"
                    ,duration: "fast"
                });
            } );
        },
        methods:{
            changeDate(el){
                let test = $("#datetest")
                let dt = document.getElementById("datepicker")
                const f = dt.files[0]
                this.readFile(f)
            },
            async readFile(file){
                const reader = new FileReader()
                reader.addEventListener('load', (e) => {
                    const res = e.target.result
                    const data = JSON.parse(res)
                    this.date = res[0].Activity
                    console.log(data)
                    console.log(data["Ads and data"])
                })
                reader.readAsText(file)
            }
        }
    }
</script>
<template>
    <Title text="UI Test Run" desc="Just some UI Testing" color="#fd7373"></Title>
    <div class="project_content">
        <div class="description_wrapper">
            <input type="file" id="datepicker" @change="changeDate(this)" class="generic_button"/>
            <h3>{{ date }}</h3>
        </div>
    </div>
</template>
<style scoped>

</style>