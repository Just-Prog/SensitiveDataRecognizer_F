<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const user = storeToRefs(useUserStore())
const name = user.username
</script>

<template>
    <div id="system_hp_main">
        <div>欢迎：<b> {{ name }} </b></div>
    </div>
</template>

<style scoped>
#system_hp_main{
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
}
</style>
