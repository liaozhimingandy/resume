<script setup>
import {ref, onMounted, computed} from 'vue';

import {AboutMeStore} from "../stores/index.js";

// 基本信息
const aboutMeStore = AboutMeStore();
const aboutMeInfo = computed(() => aboutMeStore);
const formRef = ref(null);

// 校验规则
const rules = {
  profile: [
    {required: true, message: '写一段你的职业总结', trigger: 'blur'},
    {min: 1, max: 1024, message: '长度必须介于1和1024之间', trigger: ['blur', 'change']},
  ],
  desc: [
    {required: true, message: '请填写名', trigger: 'blur'},
    {min: 1, max: 1024, message: '长度必须介于1和024之间', trigger: ['blur', 'change']},
  ],
};

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

// 表单校验
const validateForm = async () => {
  try {
    // 调用 validate 方法，该方法返回 Promise
    await formRef.value.validate();
    return true;
    // 处理表单提交逻辑，例如发送表单数据到服务器
  } catch (errors) {
    return false;
    // 处理表单校验失败的逻辑，例如显示错误信息给用户
  }
};

// 暴露方法
defineExpose({
  validateForm
})
</script>

<template>
  <h2>写下你的职业总结</h2>
  <a-form :model="aboutMeInfo" :rules="rules" ref="formRef">
    <a-form-item label="自我描述" name="profile" has-feedback>
      <div style="width:100%;">
        <ckeditor v-if="isLayoutReady" v-model="aboutMeInfo.profile" :editor="editor" :config="config"/>
      </div>
    </a-form-item>
    <a-divider/>
    <a-form-item label="兴趣爱好" name="desc" has-feedback>
      <ckeditor v-if="isLayoutReady" v-model="aboutMeInfo.desc" :editor="editor" :config="config"/>
    </a-form-item>
    <a-divider/>
  </a-form>
</template>

<style scoped>

</style>