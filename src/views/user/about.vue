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
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">关于系统</div>
          <div class="card-body">
            <Alert type="success">
              LightPicture
              <span slot="desc">
                <Tag color="success">当前版本：{{config.version}} （{{config.time}}）</Tag>
                <p>一套轻量级企业团队图片资源管理系统、图床系统</p>
                <p>2021年底，苦于创作时没有一款方便快捷且适合需求的图床，在自己折腾下开发了LightPicture，本系统遵循GPL 3.0开源许可</p>
                <p>如果您认可我的作品，请为我点击一个star，你的支持也将帮助LightPicture变的更好</p>
                <p>
                  <a href="http://picture.h234.cn" target="_blank">官网</a>
                  <span class="line">-</span>
                  <a href="https://github.com/osuuu/LightPicture" target="_blank">Github</a></p>
                <p>
                  bug反馈请联系作者：admin@osuu.net
                </p>
              </span>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    mapState,
  } from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState(['config']),
    },


  };
</script>

<style lang="less" scoped>
  p {
    line-height: 30px;
  }

  a {
    color: blue;
  }

  .line {
    margin: 0 10px;
  }
</style>