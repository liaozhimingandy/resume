<script lang="ts" setup>
import {ref} from 'vue';
import MEditor from "@/components/MEditor.vue";

const data = ref(null)
</script>

<template>
  <a-layout>
    <div v-html="data"></div>
    <a-layout-content>
      <MEditor v-model:data="data"/>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>