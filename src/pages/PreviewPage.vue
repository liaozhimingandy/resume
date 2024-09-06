<script setup>
import {ref, computed} from 'vue';

import {v4 as uuidv4} from 'uuid';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Default from "../templates/Default.vue";

const pdfContent = ref(null);

const exportPDF = async () => {
  const content = pdfContent.value;
  if (!content) return;

  // 使用html2canvas将内容渲染为canvas
  const canvas = await html2canvas(content);
  const imgData = canvas.toDataURL('image/png');

  // 使用jsPDF生成PDF
  const pdf = new jsPDF();
  const imgWidth = 210; // A4纸的宽度（单位：mm）
  const pageHeight = 295; // A4纸的高度（单位：mm）
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // 如果内容超出一页，添加分页
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  let file_name = 'resume-' + uuidv4() + '.pdf';
  // 保存PDF
  pdf.save(file_name);
};

const version = computed(() => `version:${import.meta.env.VITE_APP_VERSION}`);
</script>

<template>
  <div style="background-color: #E9EBEE; text-align: center">
    <a-layout>
      <a-layout-header style="background-color: #E9EBEE; text-align: center; width: 100%">
        <a-button type="primary" @click="exportPDF">保存到本地用于打印</a-button>
      </a-layout-header>
      <a-layout-content>
        <div ref="pdfContent" class="pdf-preview">
          <Default/>
        </div>
      </a-layout-content>
       <a-layout-footer style="width: 100%">{{ version }}</a-layout-footer>
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