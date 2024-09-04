<script setup>
import {ref, onMounted, computed} from "vue";
import {DeleteOutlined} from "@ant-design/icons-vue";
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

import {v4 as uuidv4} from "uuid";

import {WorkStore} from "../stores/index.js";


// 富文本编辑器配置
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import translations from 'ckeditor5/translations/zh-cn.js';

const isLayoutReady = ref(false);
let config = ref(null);
const editor = ClassicEditor;
onMounted(() => {
  config = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'selectAll',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertTable',
        'blockQuote',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
        '|',
        'accessibilityHelp'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo
    ],
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    language: 'zh-cn',
    placeholder: 'Type or paste your content here.',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    translations: [translations]
  };
  isLayoutReady.value = true;
})

// -------------------------
// 当前激活项
const activeKey = ref(null);

// 基本数据
const formRefs = ref([]);
const workStore = WorkStore();
const experiences = computed(() => workStore.works);

// 校验规则
const rules = {
  firm: [
    {required: true, message: '请填写公司名称', trigger: 'blur'},
    {min: 1, max: 36, message: '长度必须介于1和16之间', trigger: ['blur', 'change']},
  ],
  title: [
    {required: true, message: '请填写岗位名称', trigger: 'blur'},
    {min: 1, max: 32, message: '长度必须介于1和32之间', trigger: ['blur', 'change']},
  ],
  gmt_start: [
    {required: true, message: '工作开始时间不能为空', trigger: 'blur'}
  ],
  desc: [
    {required: true, message: '请填写工作描述', trigger: 'blur'},
    {min: 1, max: 512, message: '长度必须介于1和512之间', trigger: ['blur', 'change']},
  ]
};

// 增加工作经验
const addItem = () => {
  experiences.value.push({
    id: uuidv4(),
    firm: "",
    title: "",
    gmt_start: "",
    gmt_end: "",
    is_doing: false,
    desc: ""
  });
  activeKey.value = experiences.value.at(-1)['id']
};

// 删除元素
const delItem = (index) => {
  experiences.value.splice(index, 1);
};

// 校验表单
const validateForm = async () => {
  let isValid = true;
  for (let index in formRefs.value) {
    try {
      await formRefs.value[index].validate();
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }
  return isValid;
}

// 暴露方法
defineExpose({validateForm})
</script>

<template>
  <h4>告诉我您的工作经验</h4>
  <h6>在此部分中，列出您过去 10 年的相关工作经历以及日期。首先提及最近的工作经历。</h6>
  <a-divider/>
  <a-form v-for="(model, index) in experiences" :model="model" :rules="rules" ref="formRefs">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel :header="`${model.firm}-${model.title}`" :key="model.id">
        <template #extra>
          <DeleteOutlined @click="() => delItem(index)"/>
        </template>
        <a-row :span="24">
          <a-col :span="11">
            <a-form-item label="公司名称" name="firm">
              <a-input placeholder="XXX科技有限公司" v-model:value="model.firm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="职位" name="title">
              <a-input placeholder="首席执行官" v-model:value="model.title"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!--    工作时间 -->
        <a-row>
          <a-col :span="11">
            <a-form-item label="开始日期" name="gmt_start">
              <a-date-picker v-model:value="model.gmt_start" value-format="YYYY-MM-DD" :locale="locale"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="2" style="text-align: center">
            -
          </a-col>
          <a-col :span="11">
            <a-form-item label="结束日期" name="gmt_end">
              <a-date-picker v-model:value="model.gmt_end" value-format="YYYY-MM-DD" :locale="locale"
                             style="width: 100%"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="我还在这儿工作" name="is_doing">
          <a-checkbox value="true" name="type" v-model:value="model.is_doing">
            目前仍然在职
          </a-checkbox>
        </a-form-item>
        <a-form-item label="工作描述" name="desc">
          <ckeditor v-if="isLayoutReady" v-model="model.desc" :editor="editor" :config="config"/>
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
    <a-divider/>
  </a-form>
  <a-divider/>
  <a-button type="primary" @click="addItem">添加工作经验</a-button>
  <a-divider/>

</template>

<style>
.ck-content {
  min-height: 130px;
}
</style>