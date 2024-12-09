<script lang="ts" setup>

import {IJOBINTENTION} from "../../../interface/imaterialItems";
import IMaterialStyle from "../../../interface/IMaterialStyle";
import ModelTitle from "../../ModelTitle/ModelTitle1/index.vue"
import {computed} from "vue";

defineOptions({
  name: 'JOB_INTENTION_1'
});

const props = defineProps<{
  modelData: IJOBINTENTION; // 模块数据
  modelStyle: IMaterialStyle; // 模块样式
}>();

const left = computed(()=> (Number(props.modelStyle.pLeftRight.split('px')[0]))+ 23 + 'px');
</script>

<template>
  <div class="job-intention">
    <!-- 标题 -->
    <ModelTitle :title="modelData.title" :model-style="modelStyle"></ModelTitle>
    <slot name="ModelTitle"></slot>
    <!-- 求职意向 -->
    <!-- 求职类型 -->
    <div class="content">
      <a-flex justify="space-between">
        <a-typography-title v-show="modelData.isShow.jobSearchType" class="info">{{
            modelData.jobSearchType
          }}
        </a-typography-title>
        <!-- 意向岗位 -->
        <a-typography-title v-show="modelData.isShow.intendedPositions" class="info">{{
            modelData.intendedPositions
          }}
        </a-typography-title>
        <!-- 意向城市 -->
        <a-typography-title v-show="modelData.isShow.intendedCity" class="info">{{
            modelData.intendedCity
          }}
        </a-typography-title>
        <!-- 期望薪资 -->
        <a-typography-title v-show="modelData.isShow.expectSalary" class="info">{{
            modelData.expectSalary
          }}
        </a-typography-title>
        <!-- 求职状态 -->
        <a-typography-title v-show="modelData.isShow.jobStatus" class="info">{{
            modelData.jobStatus
          }}
        </a-typography-title>
      </a-flex>
    </div>
  </div>
</template>

<style scoped>
.job-intention {
  padding-top: v-bind('modelStyle.pTop');
  padding-bottom: v-bind('modelStyle.pBottom');
  padding-left: v-bind('modelStyle.pLeftRight');
  padding-right: v-bind('modelStyle.pLeftRight');
  margin-top: v-bind('modelStyle.mTop');
  margin-bottom: v-bind('modelStyle.mBottom');

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

.content{
  padding-left: 30px;
  padding-top: 8px;
}

.info {
  font-size: v-bind('modelStyle.textFontSize');
  color: v-bind('modelStyle.textColor');
  font-weight: v-bind('modelStyle.textFontWeight');
}
</style>