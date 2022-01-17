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
  <div>
    <div class="prog-main">
      <p class="title">容量使用:</p>
      <Progress :percent="((userInfo.user_size/userInfo.capacity).toFixed(0))*100"
        :stroke-color="['#10DA37', '#F92612']"  />
      <p>{{turnSize(userInfo.user_size)}} / {{turnSize(userInfo.capacity)}}</p>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import {
    toSize
  } from "@/utils/index"
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState(["userInfo"]),
      turnSize() {
        return (val) => {
          return toSize(val)
        };
      },
    },
    

    methods: {

    },
  };
</script>

<style lang="less" scoped>
  .prog-main {
    position: absolute;
    width: 220px;
    bottom: 115px;
    left: 0;
    margin: 10px;
    padding: 10px;
    background: rgba(241, 243, 250, .6);
    border-radius: 10px;

    p {
      font-size: 12px;
    }
  }
</style>