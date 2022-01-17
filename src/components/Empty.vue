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
         <div class="empty" >
            <div class="empty-main">
              <img :src="require('../assets/images/empty.png')" alt class="empty-img" />
              <div class="text">{{name}}</div>
              
            </div>
          </div>
    </div>
</template>

<script>
export default {
    props:['text'],
    data() {
        return {
            name:this.text
        }
    },
}
</script>

<style lang="less" scoped>
 .empty {
      width: 100%;
      height: 50vh;
      font-size: 16px;
      position: relative;
      .empty-main {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        .empty-img {
          height: 200px;
          width: 200px;
        }
        .text{
          color: #707990;
        }
      }
    }
</style>