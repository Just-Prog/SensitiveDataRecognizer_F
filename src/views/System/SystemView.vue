<script setup>
import { RouterView } from 'vue-router';
import SystemDefault from '@/layouts/SystemDefault.vue';

</script>

<template>
    <SystemDefault>
        <template #content>
            <RouterView />
        </template>
    </SystemDefault>
</template>

<style>

</style>
