<script setup>
import {ref, computed} from 'vue';

import {v4 as uuidv4} from 'uuid';

import {downloadPDF} from '@/utils/html2pdf.ts'
import Default from "../templates/Default.vue";
import Footer from "@/components/Footer.vue";

const pdfContent = ref(null);

const exportPDFv2 = () => {
  downloadPDF(pdfContent.value, 'resume-' + uuidv4(), false, ()=>{})
}

const version = computed(() => `version:${import.meta.env.VITE_APP_VERSION}`);
</script>

<template>
  <div style="background-color: #E9EBEE; text-align: center">
    <a-layout>
      <a-layout-header style="background-color: #E9EBEE; text-align: center; width: 100%">
        <a-button type="primary" @click="exportPDFv2">保存到本地用于打印</a-button>
      </a-layout-header>
      <a-layout-content>
        <div ref="pdfContent" class="pdf-preview">
          <Default/>
        </div>
      </a-layout-content>
       <a-layout-footer>
         <Footer />
       </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.pdf-preview {
  width: 210mm;
  min-height: 267mm;
  background-color: #fff;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>