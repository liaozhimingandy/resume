<script lang="ts" setup>
import Default from "../templates/Default.vue";

</script>

<template>
  <a-layout>
    <a-layout-content>
      <a-row justify="center" style="margin: 8px">
        <a-col :span="8">
          <a-card hoverable style="width: 240px;">
            <template #cover>
              <div class="cover-container">
                 <Default />
              </div>
            </template>
            <a-card-meta title="我的简历">
              <template #description>
                <a-button type="primary">
                  <router-link :to="{name: 'setup'}">继续编辑</router-link>
                </a-button>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.cover-container{
  height: 240px;
}
.cover-container > * {
  width: 500%; /* 确保内容宽度填满容器 */
  height: auto; /* 确保内容高度填满容器 */
  transform: scale(0.2);
  transform-origin: top left;
  overflow: hidden; /* 确保内容不会超出容器 */
}
</style>