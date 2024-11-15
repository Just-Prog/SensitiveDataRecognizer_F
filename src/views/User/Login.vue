<script setup>
import UserLayout1 from '@/layouts/UserLayout1.vue';
import LoginComponent from '@/components/User/LoginComponent.vue'
</script>

<template>
    <UserLayout1>
        <template #content>
            <LoginComponent/>
        </template>
    </UserLayout1>
</template>

<style>

</style>