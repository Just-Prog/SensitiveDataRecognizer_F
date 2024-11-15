<script setup>
import UserLayout1 from '@/layouts/UserLayout1.vue';
import RegisterComponent from '@/components/User/RegisterComponent.vue';
</script>

<template>
    <UserLayout1>
        <template #content>
            <RegisterComponent/>
        </template>
    </UserLayout1>
</template>

<style>

</style>