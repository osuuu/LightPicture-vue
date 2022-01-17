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
    <div class="geek-notice " :class="state">
      <div class="geek-notice-main">
        <div class="geek-notice-cont">
          <div class="geek-notice-cont-title">上传中 {{success}}/{{all}}</div>
          <div class="geek-notice-cont-html">

          </div>

          <Progress :percent="(success/all)*100" :stroke-color="['#108ee9', '#87d068']" />

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import cookie from "@/utils/store/cookie";
  export default {
    props: ['success', 'all'],
    data() {
      return {
        state: "hide"
      }
    },
    watch: {
      success(newVal) {
        if (newVal == this.all) {
          setTimeout(() => {
            this.state = "hide"
          }, 1500)

        }
      },
      all(newVal) {
        if (newVal > 0) {
          this.state = "show"
        } else {
          this.state = "hide"
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .geek-notice {
    padding: 16px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    background: #fff;
    line-height: 1;
    position: fixed;
    z-index: 1015;
    transition: all 0.5s;
    right: -400px;
    top: 24px;
    width: 335px;

    .geek-notice-main {
      position: relative;



      .geek-notice-main-icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 45px;
        height: 45px;
      }

      .geek-notice-cont {
        margin-left: 20px;

        .geek-notice-cont-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .geek-notice-cont-html {
          font-size: 16px;
          line-height: 20px;
        }


      }
    }

  }

  .show {
    right: 20px;
  }

  .hide {
    right: -400px;
  }
</style>