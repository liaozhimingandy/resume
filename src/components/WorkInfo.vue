<script setup>
// 引入图标
import {Delete, Plus} from '@element-plus/icons-vue';
import {ref, onMounted} from "vue";

import locale from "element-plus/dist/locale/zh-cn.mjs"

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
};

// 增加工作经验事件
const addWorkInfo = () => {
  console.info(formRefs.value);
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
  <el-divider border-style="dashed"/>
  <el-collapse accordion v-if="models.length>0">
    <div v-for="(model, index) in models" :key="index">
      <el-form :rules="rules" status-icon :model="model" ref="formRefs">
        <el-collapse-item :name="index">
          <template #title>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ model.firm }}-{{ model.title }}</span>
              <el-button @click="()=>{ delWorkInfo(index) }" :icon="Delete" text/>
            </div>
          </template>
          <el-row>
            <el-col :span="11">
              <el-form-item label="公司名称" prop="firm">
                <el-input placeholder="XXX科技有限公司" v-model="model.firm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="职位" prop="title">
                <el-input placeholder="首席执行官" v-model="model.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--    工作时间 -->
          <el-config-provider :locale="locale">
            <el-row>
              <el-col :span="11">
                <el-form-item label="开始日期" prop="gmt_start">
                  <el-date-picker
                      v-model="model.gmt_start"
                      type="date"
                      aria-label="开始日期"
                      placeholder="开始日期"
                      style="width: 100%"
                  />

                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">
                -
              </el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                      v-model="model.gmt_end"
                      aria-label="结束日期"
                      placeholder="结束日期"
                      style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-config-provider>
          <el-form-item label="我还在这儿工作">
            <el-checkbox value="online" name="type" v-model="model.is_doing">
              目前仍然在职
            </el-checkbox>
          </el-form-item>
          <el-form-item label="工作描述" prop="desc">
            <div style="width:100%;">
              <ckeditor v-if="isLayoutReady" v-model="model.desc" :editor="editor" :config="config"/>
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-form>
      <el-divider border-style="dashed"/>
    </div>
  </el-collapse>
  <el-button type="primary" :icon="Plus" @click="addWorkInfo">添加工作经验</el-button>
  <el-divider border-style="dashed"/>

</template>

<style>
.ck-content {
  min-height: 130px;
}
</style>