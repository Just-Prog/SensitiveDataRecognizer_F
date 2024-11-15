<script setup>

</script>

<template>
    <a-card id="user_card">
        <template #title>
            <!-- <img src="@/assets/logo.png" height="70px"/> -->
            <span>Sensitive Data Recognizer</span>
        </template>
        <slot name="content"/>
    </a-card>
</template>

<style>
#user_card{
    width: 80%;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(3px);
}
</style>