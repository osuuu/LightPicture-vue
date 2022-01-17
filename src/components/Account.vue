<!-- 
// +----------------------------------------------------------------------
// | LightPicture [ 图床 ]
// +----------------------------------------------------------------------
// | 企业团队图片资源管理系统
// +----------------------------------------------------------------------
// | Github: https://github.com/osuuu/LightPicture
// +----------------------------------------------------------------------
// | Copyright © http://picture.h234.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Team <admin@osuu.net>
// +---------------------------------------------------------------------- 
-->
<template>
  <div class="page-content">
    <Login v-if="isAccount == 1"> </Login>
    <Register v-if="isAccount == 2"> </Register>
    <Forget v-if="isAccount == 3"> </Forget>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Login from "./Login.vue";
import Register from "./Register.vue";
import Forget from "./Forget.vue";
export default {
  data() {
    return {};
  },
  components: {
    Login,Register,Forget
  },
  computed: {
    ...mapState(["isAccount"]),
  },
};
</script>

<style lang="less" scoped>
.page-content {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(34, 42, 62, 0.5);
  z-index: 1005;
  background-position: 50%;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
</style>