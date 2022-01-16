import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由数据
import routes from './routes';
import store from '@/store'

Vue.use(VueRouter)

//解决点击相同路由报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new VueRouter({
  routes,
  // mode: "history",  // 路由模式，可选值为 history 或 hash
  // base: Setting.routerBase,  // 应用的基路径
});

/**
 * 路由拦截
 * 权限验证
 */

 router.beforeEach((to, from, next) => {
  // 判断是否需要登录才可以进入
  if (to.matched.some(_ => _.meta.auth)) {
      // 这里依据 token 判断是否登录，可视情况修改
      const token = localStorage.getItem('lp_token');

      if (token && token !== 'undefined') {
          next();
      } else {
          // 没有登录的时候跳转到登录界面
          // 携带上登陆成功之后需要跳转的页面完整路径
          store.state.isAccount = 1
      }
  } else {
      // 不需要身份校验 直接通过
      next();
  }
});



export default router;
