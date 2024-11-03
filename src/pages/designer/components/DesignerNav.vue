<script lang="ts" setup>
import {watch, ref, h} from "vue";
import appStore from '@/stores/app';
import {storeToRefs} from 'pinia';
import {cloneDeep, debounce} from "lodash";
import moment from 'moment';
import FileSaver from 'file-saver';
import {Modal} from 'ant-design-vue';
import {v4 as uuidv4} from 'uuid';

const [modal, contextHolder1] = Modal.useModal();
import {notification} from "ant-design-vue";
const [api, contextHolder] = notification.useNotification();
const {resumeJsonStore} = storeToRefs(appStore.useResumeJsonStore); // store里的模板数据
const draftTips = ref<string>('');
const emit = defineEmits(['generateReport', 'reset', 'saveDataToLocal']);
import {EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue';
import ImportJsonDialog from "../../../components/ImportJsonDialog/ImportJsonDialog.vue";
// 标题修改
const titleRef = ref<any>(null);
const isShowInput = ref<boolean>(false); //是否显示输入框
const updateTitle = () => {
  isShowInput.value = true;
  titleRef.value.focus();
};
const blurTitle = () => {
  isShowInput.value = false;
};

// 保存草稿
const saveDataToLocal = () => {
  localStorage.setItem("resume_data", JSON.stringify(resumeJsonStore.value));
  const time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
  draftTips.value = `草稿自动保存成功!${time}`;
  api.info({
    message: '温馨提示',
    description: draftTips.value
  })
};

// 自动保存草稿
const debounced = debounce(() => {
  saveDataToLocal();
}, 2000);

watch(
    () => resumeJsonStore.value, // JSON数据发生变化，则保存草稿
    () => {
      debounced();
    },
    {
      deep: true
    }
);

// 重置操作
const reset = () => {
  modal.confirm(
      {
        title: '警告',
        content: h('div', {style: 'color:red;'}, '此操作会重置简历至初始状态，是否继续?'),
        icon: h(ExclamationCircleOutlined),
        okText: '确认',
        cancelText: '取消',
        onOk() {
          emit('reset');
          draftTips.value = '';
        },
        onCancel() {
        }
      }
  )
}

// 导出JSON
const exportJSON = () => {
  let JSONData = cloneDeep(resumeJsonStore.value);
  JSONData.ID = uuidv4();
  const data = JSON.stringify(JSONData, null, 4);
  const blob = new Blob([data], {type: ''});
  FileSaver.saveAs(blob, resumeJsonStore.value.TITLE + '.json');
};

// 上传JSON弹窗
const dialogVisible = ref<boolean>(false);
const importJson = () => {
  dialogVisible.value = true;
};

// 取消上传JSON
const cancleJsonDialog = () => {
  dialogVisible.value = false;
  console.info("=>")
};
</script>

<template>
  <contextHolder/>
  <a-flex justify="space-between" align="center">
    <img src="@/assets/vue.svg" alt="logo"/>
    <div>
      <span v-show="!isShowInput">
      {{ resumeJsonStore.TITLE }}
      <a-button type="text" :size="24" @click="updateTitle">
        <template #icon>
          <EditOutlined/>
        </template>
      </a-button>
      </span>
      <a-input v-show="isShowInput"
               v-model:value="resumeJsonStore.TITLE"
               autofocus ref="titleRef"
               @blur="blurTitle"
               placeholder="请输入标题"></a-input>
    </div>
    <div>
      <a-space>
        <a-button @click="exportJSON" type="dashed">导出数据</a-button>
        <a-button @click="importJson" type="dashed">导入数据</a-button>
        <a-button @click="reset" type="dashed">重置</a-button>
      </a-space>
      <contextHolder1/>
    </div>
  </a-flex>
  <!-- 上传json代码编辑器 -->
  <ImportJsonDialog
      :dialog-visible="dialogVisible"
      @cancle="cancleJsonDialog"
  ></ImportJsonDialog>
</template>

<style scoped>
</style>