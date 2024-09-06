<script lang="ts" setup>
import {ref} from 'vue'
import Tags from "../components/Tags.vue";

const tags = ref([
  '1', '2'
])

</script>

<template>
  <a-space>
    <span v-for="item in tags">{{item}}</span>
  </a-space>
  <a-layout>
    <a-layout-content>
      <Tags v-model:tags="tags" tips="填值"/>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>