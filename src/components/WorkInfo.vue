<script setup>
// 引入图标
import {ref, onMounted} from "vue";
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';


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
import {DeleteOutlined} from "@ant-design/icons-vue";

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
// 表单数据
const models = defineModel("workInfos");
const formRefs = ref([]);

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

// 增加工作经验事件
const addWorkInfo = () => {
  models.value.push({
    firm: "",
    title: "",
    gmt_start: "",
    gmt_end: "",
    is_doing: false,
    desc: ""
  })
};

// 删除元素
const delWorkInfo = (index) => {
  models.value.splice(index, 1);
};

// 校验表单
const validateForm = async () => {
  let isValid = true;
  for (let index in formRefs.value) {
    let isValidT = await formRefs.value[index].validate(((valid, fields) => {
    }));
    if (!isValidT) {
      isValid = false;
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
  <a-collapse accordion v-if="models.length>0">
    <a-collapse-panel v-for="(model, index) in models" :key="index" :header="`${model.firm}-${model.title}`">
      <template #extra>
        <DeleteOutlined @click="() => delWorkInfo(index)"/>
      </template>
      <a-form :rules="rules" :model="model" ref="formRefs">
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
            <a-form-item label="开始日期" prop="gmt_start">
              <a-date-picker v-model:value="model.gmt_start" value-format="YYYY-MM-DD" :locale="locale"/>
            </a-form-item>
          </a-col>
          <a-col :span="2" style="text-align: center">
            -
          </a-col>
          <a-col :span="11">
            <a-form-item label="结束日期" name="gmt_end">
              <a-date-picker v-model:value="model.gmt_end" value-format="YYYY-MM-DD" :locale="locale"/>
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
      </a-form>
    </a-collapse-panel>
  </a-collapse>
  <a-divider/>
  <a-button type="primary" @click="addWorkInfo">添加工作经验</a-button>
  <a-divider/>

</template>

<style>
.ck-content {
  min-height: 130px;
}
</style>