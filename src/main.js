import { createApp } from "vue";
import ElementPlus from "element-plus";
import {
  QuestionFilled,
  CirclePlus,
  DocumentCopy,
  Delete,
  Refresh,
  Minus,
} from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

import './assets/js/common.js';
import './assets/js/rem.js';

import APP from "./App.vue";
import loadCompontents from "@/libs/UIComponentInit.js";

import LaCardVue from '@/components-base/LaCard.vue'
import Table from '@/components-base/table.vue'

/**
 * 创建实例基础方法
 * @param {*} renderComponent 
 * @param {*} loadFinished 
 * @returns 
 */
function loadTemplate(renderComponent, loadFinished = () => {}) {
  const app = createApp(renderComponent);
  app.use(ElementPlus);
  app.component('la-card', LaCardVue)
  app.component('la-table', Table)
  loadCompontents().then((modules) => {
    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      app.use(module);
      loadFinished(app);
    }
  });
  return app;
}

/**
 * 同步创建实例
 * @param {*} renderComponent 
 * @returns 
 */
function createBaseAppSync(renderComponent = {}) {
  return loadTemplate(renderComponent);
}

/**
 * 异步创建实例
 * @param {*} renderComponent 
 * @returns 
 */
function createBaseAppAsync(renderComponent = {}) {
  return new Promise((resolve, reject) => {
    loadTemplate(renderComponent, (app) => {
      resolve(app);
    });
  });
}

const app = createBaseAppSync(APP);

app.component("question-filled", QuestionFilled);
app.component("circle-plus", CirclePlus);
app.component("l-refresh", Refresh);
app.component("l-delete", Delete);
app.component("document-copy", DocumentCopy);
app.component("l-minus", Minus);

// app.component('lc-card', LaCardVue)


app.mount("#app");

// 内部需要同样配置的全局Vue
self.createBaseAppAsync = createBaseAppAsync;