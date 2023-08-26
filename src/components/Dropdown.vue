<script>

</script>
<template>
    <div class="dropdown_wrapper" id="dropdown" ref="teleport">
        <div class="option">
            <i class="ri-edit-circle-line"></i>
            <p>Opt</p>
        </div>
        <div class="option">
            <i class="ri-edit-circle-line"></i>
            <p>Opt 2</p>
        </div>
    </div>
</template>
<style>
    .dropdown_wrapper{
        margin-top: 10px;
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 2px;
        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.365);
        padding: 5px;
        background-color: var(--background);
        border-radius: 16px;
    }
    .option{
        cursor: pointer;
        border-radius: 10px;
        display: flex;
        gap: 15px;
        padding: 10px;
        align-items: center;
    }
    .option:hover{
        background-color: var(--card);
    }
    .option i{
        font-size: 24px;
    }
</style>