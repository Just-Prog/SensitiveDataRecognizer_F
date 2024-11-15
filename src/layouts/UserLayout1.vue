<script setup>

</script>

<template>
    <div id="userLayout">
        <div id="userLayoutL"/>
        <div id="userLayoutR">
            <slot name="content"/>
        </div>
    </div>
</template>

<style>
#userLayout{
    width: 100%;
    height: 100%;
}
#userLayoutL{
    position: absolute;
    left: 0%;
    height: 100%;
    width: 45%;
    background: center / cover no-repeat url('@/assets/img/hp_bg.png');
}
#userLayoutR{
    position:absolute;
    right: 0%;
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right,#e799b0,#fc996e);
    /* backdrop-filter: blur(1.5px); */
    padding: 25px 35px;
}
@media screen and (max-width: 1152px) {
    #userLayoutL{
        display: none;
    }
    #userLayoutR{
        width: 100%;
    }
}
</style>