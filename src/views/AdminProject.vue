<script>
    export default{

    }
</script>
<template>
    <div class="project_wrapper">
        <div class="top_wrapper">
            <div>
                <h1>0 Projects</h1>
                <p><b>0 posted today</b></p>
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
    </div>
</template>
<style scoped>
    *{
        font-family: Inter;
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
</style>