<template>
  <div style="height: 100vh">
    <h2 v-html="data"></h2>
    <a-button type="link" @click="()=> open = !open">打开人工智能</a-button>
    <ModalAISuggest v-model:open="open" v-model:suggest="data" content="帮我写一份简历吧" v-if="open"/>
  </div>
</template>
<script lang="ts" setup>
import ModalAISuggest from "@/components/ModalAISuggest.vue";
import {ref} from "vue";

const open = ref<boolean>(false);
const data = ref(null);

</script>
<style scoped>

</style>
