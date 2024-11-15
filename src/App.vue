<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import zhCN from "ant-design-vue/es/locale/zh_CN";
onMounted(()=>{
    document.title = '文件信息脱敏系统'
})
</script>

<template>
    <a-config-provider :locale="zhCN" :theme="{
        token: {
            colorPrimary: '#fc996e',
        },
    }">
        <RouterView/>
    </a-config-provider>
</template>

<style>
html,body,#app{
    max-height: 100vh;
    min-height: 100vh;
    height: 100vh;
    background: #fff;
    margin:0;
    padding: 0;
}
</style>
