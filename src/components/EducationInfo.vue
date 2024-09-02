<script setup>
import {ref, onMounted} from 'vue';
// 表单数据
import {DeleteOutlined} from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const educations = defineModel("educationInfos");
const formRefs = ref([]);
const activeKey = ref(['0']);

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

// 添加元素
const addItem = () => {
  educations.value.push(
      {
        edu_unit: "",
        edu_desc: "",
        certificate: "",
        gmt_edu_start: "",
        gmt_edu_end: ""
      }
  );
}
// 校验规则
const rules = {
  edu_unit: [
    {required: true, message: '请填写教育单位/机构', trigger: 'blur'},
    {min: 1, max: 36, message: '长度必须介于1和36之间', trigger: ['blur', 'change']},
  ],
  certificate: [
    {required: true, message: '请填写获取的证书名称', trigger: 'blur'},
    {min: 1, max: 36, message: '长度必须介于1和36之间', trigger: ['blur', 'change']},
  ],
  edu_desc: [
    {required: true, message: '请填写教育描述', trigger: 'blur'},
    {min: 1, max: 255, message: '长度必须介于1和255之间', trigger: ['blur', 'change']},
  ],
  gmt_edu_start: [
    {required: true, message: '工作开始时间不能为空', trigger: 'blur'}
  ]

};

// 删除元素
const delItem = (index) => {
  educations.value.splice(index, 1)
}

// 校验表单
const validateForm = async () => {
  let isValid = true;
  for (let index in formRefs.value) {
    let isValidT = await formRefs.value[index].validate();
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
  <h2>增加您的教育信息</h2>
  <h4>首先输入你最后的文凭</h4>
  <a-divider/>
  <a-collapse v-if="educations.length>0" expand-icon-position="start" v-model:activeKey="activeKey">
    <a-collapse-panel v-for="(education, index) in educations" :key="index"
                      :header="`${education.edu_unit}-${education.gmt_edu_start}`"
    >
      <template #extra>
        <DeleteOutlined @click="() => delItem(index)"/>
      </template>
      <a-form :rules="rules" :model="education" ref="formRefs">
        <a-row :span="24">
          <a-col :span="11">
            <a-form-item label="学校/机构" name="edu_unit">
              <a-input placeholder="在此处输入你的学校/机构" v-model:value="education.edu_unit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="证书名称" name="certificate">
              <a-input placeholder="在此处您获取的证书名称" v-model:value="education.certificate"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
            <el-col :span="11">
              <a-form-item label="开始日期" name="gmt_edu_start">
                <a-date-picker v-model:value="education.gmt_edu_start" value-format="YYYY-MM-DD" :locale="locale"/>
              </a-form-item>
            </el-col>
            <a-col :span="2" style="text-align: center">
              -
            </a-col>
            <a-col :span="11">
              <el-form-item label="结束日期">
                <a-date-picker v-model:value="education.gmt_edu_end" value-format="YYYY-MM-DD" :locale="locale"/>
              </el-form-item>
            </a-col>
        </a-row>
        <a-form-item label="教育描述" name="desc">
          <div style="width:100%;">
            <ckeditor v-if="isLayoutReady" v-model="education.desc" :editor="editor" :config="config"/>
          </div>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
  <a-divider/>
  <a-button type="primary" @click="addItem">添加教育信息</a-button>
  <a-divider/>
</template>

<style scoped>

</style>