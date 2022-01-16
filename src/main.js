import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

// 加载插件
import components from './components'
Vue.use(components)
// 点击复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 加载进度条
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});
router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

// 图片懒加载
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  // preLoad: 1.3, // 预加载高度的比例
  error: require("@/assets/imgs/error.png"), // 加载失败图片
  loading: require("@/assets/imgs/load.gif"), // 加载中图片
  attempt: 3, // 尝试加载次数
  // 不常用参数的一些说明
  // 懒加载模块，滚动到对应视图区域之前才加载该模块，模块内容较多时不推荐使用
  // 加载速度可能会为用户带来不好的体验，适用于一些信息模块，或者一些非主体模块，适用于少部分用户关注的模块
  lazyComponent: true,
  // 默认的方法有['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll'],
})


import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
