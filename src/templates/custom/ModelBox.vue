<script lang="ts" setup>
import {IMATERIALITEM} from "../../interface/material";
import {ComponentPublicInstance, reactive, ref, watch} from "vue";
import appStore from "../../stores/app";
import {storeToRefs} from 'pinia';
import {CopyOutlined, DeleteOutlined} from '@ant-design/icons-vue';
import cloneDeep from "lodash/cloneDeep";
import {useDeleteModel} from '@/hooks/useDeleteModel';
import {v4 as uuidv4} from 'uuid';

// 需要传入的参数
const props = withDefaults(defineProps<{
  item: IMATERIALITEM;
  components: any;
  isPreview: Boolean;
}>(), {
  isPreview: false
});
const {resumeJsonStore} = storeToRefs(appStore.useResumeJsonStore);
// 模块ref
const modelObj = reactive<any>({});
const setRefItem = (el: ComponentPublicInstance | null | Element, keyId: string) => {
  if (el) {
    modelObj[keyId] = {
      id: keyId,
      el: el
    };
  }
};

// 锚点定位
const {cptKeyId} = storeToRefs(appStore.useSelectMaterialStore);
watch(
    () => cptKeyId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({behavior: 'smooth', block: 'center'}); // 该模块显示在可视区域内
      }
    },
    {
      deep: true
    }
);

// 点击选择模块
const {updateSelectModel} = appStore.useSelectMaterialStore;
const selectModel = () => {
  // 更新store
  updateSelectModel(
      props.item.model,
      props.item.cptOptionsName,
      props.item.cptTitle,
      props.item.keyId
  );
};

// 鼠标移入效果
const hoverId = ref<string>('');
const handleMouseover = () => {
  hoverId.value = props.item.keyId;
};
// 鼠标移出效果
const handleMouseleave = () => {
  hoverId.value = '';
};

// 复制当前模块
const addModel = () => {
  if (resumeJsonStore.value.LAYOUT === 'classical') {
    // 经典简历模式
    classicalAdd();
  }
}

//传统布局复制
const classicalAdd = () => {
  let index: number = resumeJsonStore.value.COMPONENTS.findIndex((item) => item.keyId === props.item.keyId);
  let insert = cloneDeep(props.item);
  insert.keyId = uuidv4();
  resumeJsonStore.value.COMPONENTS.splice(index, 0, insert);
}

// 添加样式
const getDynamicStyle = (item: IMATERIALITEM) => {
  return {
    width: item.cptWidth
  };
};
</script>

<template>
  <div v-show="item.show"
       :ref="(el) => setRefItem(el, item.keyId)"
       class="material-model-box"
       :class='{"is-have-border": item.keyId === appStore.useSelectMaterialStore.cptKeyId && !isPreview}'
       @click="selectModel"
       @mouseover="handleMouseover"
       @mouseleave="handleMouseleave">
    <!--    操作区域 暂时关闭服务操作区,模块不允许复制,只允许删除 -->
    <div v-if="hoverId === item.keyId && !isPreview" class="edit-box">
      <a-space wrap>
        <a-tooltip placement="top" class="box-item" v-if="false">
          <template #title>
            复制当前模块
          </template>
          <a-button type="primary" @click.stop="addModel">
            <CopyOutlined/>
          </a-button>
        </a-tooltip>
        <a-tooltip placement="top" class="box-item">
          <template #title>
            删除当前模块
          </template>
          <a-button type="primary" block danger @click.stop="useDeleteModel(item)">
            <DeleteOutlined/>
          </a-button>
        </a-tooltip>
      </a-space>
    </div>
    <component :is="components[item.cptName]"
               :model-data="item.data"
               :modelStyle="item.style"
               :class="{'mode-item': !isPreview, isHover: hoverId === item.keyId}"
               :style="getDynamicStyle(item)"
    />
  </div>
</template>

<style scoped>
.material-model-box {
  border: 1px dashed transparent;
  transition: all 0.3s;
  position: relative;

  .mode-item {
    border: 1px dashed transparent;
    position: relative;
    user-select: none;
    box-sizing: border-box;

    &:hover {
      border: 2px dashed red;
      cursor: move;
    }
  }

  .isHover {
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color:#000000, $alpha: 0.1);
    }
  }

  .edit-box {
    position: absolute;
    right: 0;
    top: -35px;
    display: flex;
  }
}

.is-have-border {
  border-color: #079cfa;
}
</style>