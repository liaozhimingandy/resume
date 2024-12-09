<script lang="ts" setup>
import {COMPONENTS} from "@/constants";
import {useOptionDisplay} from "@/hooks/useOptionDisplay.ts";
const { modelItem } = useOptionDisplay(COMPONENTS.BASE_INFO.ID);

// 设置组件属性
withDefaults(defineProps<{
  is_editor: Boolean, // is_editor: 是否处于编辑状态
}>(), {
  is_editor: false, // 默认值为 false
});

</script>

<template>
  <a-form style="padding: 8px;">
    <a-row :gutter="20">
      <a-col :xs="12" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="姓名">
          <a-input v-model:value="modelItem.data.name"/>
        </a-form-item>
      </a-col>
      <a-col :xs="12" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="年龄">
          <a-fex>
            <a-input-number v-model:value="modelItem.data.age" :max="100" :min="14" style="width: 100%;"/>
            <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.age"/>
          </a-fex>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="所在地址">
          <a-fex>
            <a-input v-model:value="modelItem.data.address" style="width: 100%;"/>
            <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.address"/>
          </a-fex>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="工作年限">
          <a-fex>
            <a-input-number v-model:value="modelItem.data.workService" :max="100" :min="0" style="width: 100%;"/>
            <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.workService"/>
          </a-fex>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="联系电话">
          <a-fex>
            <a-input v-model:value="modelItem.data.phoneNumber" style="width: 100%;"/>
            <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.phoneNumber"/>
          </a-fex>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item label="电子邮箱">
          <a-fex>
            <a-input v-model:value="modelItem.data.email" style="width: 100%;"/>
            <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.email"/>
          </a-fex>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="简介">
      <a-textarea v-model:value="modelItem.data.abstract"
                  show-count allow-clear :maxlength="255"
                  :auto-size="{ minRows: 2, maxRows: 5 }"/>
      <a-switch v-show="is_editor" v-model:checked="modelItem.data.isShow.abstract"/>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>