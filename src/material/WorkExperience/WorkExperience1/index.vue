<script lang="ts" setup>
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue";
import {computed} from "vue";

const props = defineProps<{
  modelData: IWORKEXPERIENCE;
  modelStyle: IMODELSTYLE; // 模块样式
}>();

const left = computed(() => (Number(props.modelStyle.pLeftRight.split('px')[0])) + 23 + 'px');
</script>

<template>
  <div class="work-experience" v-if="modelData.LIST.length > 0">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <div class="content">
      <div v-for="(item, index) in modelData.LIST" :key="index">
        <a-row>
          <a-col :span="6">
            <!-- 经历时间 -->
            <a-typography-text v-if="modelData.isShow.date" class="info">{{ item.date[0] }} - {{
                item.date[1]
              }}
            </a-typography-text>
          </a-col>
          <a-col :span="8">
            <!-- 公司名称 -->
            <a-typography-text v-if="modelData.isShow.companyName" class="info">{{
                item.companyName
              }}
            </a-typography-text>
          </a-col>
          <a-col :span="10">
            <!-- 主要职责 -->
            <a-typography-text v-if="modelData.isShow.posts" class="info">{{ item.posts }}</a-typography-text>
          </a-col>
        </a-row>
        <!-- 简述 -->
        <a-flex justify="flex-start" align="baseline">
          <a-typography-text class="info">工作内容</a-typography-text>
          <ul>
            <li v-for="(content, key) in item.jobContent" :key="key" class="info">{{ content.content }}</li>
          </ul>
        </a-flex>
        <a-divider v-if="index+1<modelData.LIST.length" class="divider" :dashed="true"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-experience {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  box-sizing: border-box;
  margin-bottom: v-bind('modelStyle.mBottom');
  margin-top: v-bind('modelStyle.mTop');

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: v-bind('modelStyle.themeColor');
    left: v-bind('left');
    top: 5px;
  }
}

.content {
  padding-left: 30px;
  padding-top: 8px;

}

.info {
  color: v-bind('modelStyle.textColor');
  font-size: v-bind('modelStyle.textFontSize');
  font-weight: v-bind('modelStyle.textFontWeight');
}

.divider {
  height: 1px;
  background-color: v-bind('modelStyle.themeColor');
  margin: 2px 0
}
</style>