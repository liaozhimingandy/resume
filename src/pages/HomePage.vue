<script lang="ts" setup>
import {reactive, ref} from "vue";

import {AntDesignOutlined, MailOutlined, BugFilled} from '@ant-design/icons-vue';

import Default from "../templates/Default.vue";
import Footer from "@/components/Footer.vue";

const activeKey = ref('1');
const jobs = reactive([
      {
        "href": "https://www.51job.com/",
        "title": "前程无忧"
      },
      {
        "href": "https://www.liepin.com/",
        "title": "猎聘"
      },
      {
        "href": "https://www.zhaopin.com/",
        "title": "智联招聘"
      },
      {
        "href": "https://www.zhipin.com/",
        "title": "Boss直聘"
      }
    ]);

</script>

<template>
  <a-layout style="background-color: #E9EBEE; text-align: center">
    <a-layout-header :style="{'background-color': 'white'}">
      <a-flex justify="space-between" align="center">
        <div>好简历,伴一生</div>
        <a-menu mode="horizontal">
          <a-menu-item key="1">
            <a-button type="primary">
              <router-link :to="{name: 'setup'}">创建简历</router-link>
            </a-button>
          </a-menu-item>
        </a-menu>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 48, xl: 48, xxl: 48 }">
              <template #icon>
                <AntDesignOutlined/>
              </template>
            </a-avatar>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <MailOutlined/>
                <a href="mailto:liaozhimingandy@gg.com" style="margin-left: 4px">提供宝贵意见</a>
              </a-menu-item>
              <a-menu-divider/>
            </a-menu>
          </template>
        </a-dropdown>
      </a-flex>
    </a-layout-header>
    <a-layout-content style="min-height: 580px">
      <a-alert message="数据保持到你的电脑本地,请放心使用!" type="success" closable show-icon />
      <a-tabs v-model:activeKey="activeKey" centered size="large" animated>
        <a-tab-pane key="1" tab="我的简历">
          <a-row justify="center" style="margin: 8px">
            <a-col :span="8">
              <a-card hoverable style="width: 240px;">
                <template #cover>
                  <div class="cover-container">
                    <Default/>
                  </div>
                </template>
                <a-card-meta title="我的简历">
                  <template #description>
                    <a-button type="primary">
                      <router-link :to="{name: 'setup'}">继续编辑</router-link>
                    </a-button>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="求职信">
          <a-row justify="center">
            <a-col style="text-align: start" :xs="24" :sm="14" :md="8" :lg="8" :xl="8">
              <a-typography>
                <a-typography-title>为什么需要求职信？</a-typography-title>
                <a-typography-paragraph>
                  <ul>
                    <li>
                      <a-typography-text>求职信或动机信是附在或伴随其他文件（例如个人简历）的介绍信。</a-typography-text>
                    </li>
                    <li>
                      <a-typography-text>
                        求职者经常将求职信与简历或就业申请一起发送，作为向潜在雇主介绍自己并解释自己是否适合所需职位的一种方式。雇主可能会寻找个性化且经过深思熟虑撰写的求职信，作为筛选对自己的职位不够感兴趣或缺乏必要的基本技能的申请人的一种方法
                      </a-typography-text>
                    </li>
                  </ul>
                </a-typography-paragraph>
              </a-typography>
            </a-col>
            <a-col :xs="24" :sm="10" :md="4">
              <a-image
                  :width="300"
                  :height="300"
                  :preview="false"
                  src="https://resumedone.co/static/img/no_cover_letter.png"
                  fallback="data:image/png;base64,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"
              />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="招聘网站">
         <a-row justify="center">
           <a-col :xs="12" :sm="8" :md="2" :lg="2" :xl="2" v-for="job in jobs">
             <a-button type="text" :href="job.href" size="large" target="_blank">{{ job.title }}</a-button>
           </a-col>
         </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
  <a-float-button>
    <template #icon>
      <BugFilled/>
    </template>
    <template #tooltip>
      <div>给我们提出宝贵的意见或建议,我们非常关注你的建议</div>
      <b>liaozhimingandy@qq.com</b>
    </template>
  </a-float-button>

</template>
<style scoped>

.cover-container{
  height: 220px;
}
.cover-container > * {
  width: 500%; /* 确保内容宽度填满容器 */
  height: auto; /* 确保内容高度填满容器 */
  transform: scale(0.2);
  transform-origin: top left;
  overflow: hidden; /* 确保内容不会超出容器 */
}
</style>