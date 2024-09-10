<script setup>
import {computed} from "vue";

const version = computed(() => `version:${import.meta.env.VITE_APP_VERSION}`);
</script>

<template>
{{ version }}
</template>

<style scoped>

</style>