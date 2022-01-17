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
    <Dropdown trigger="click">
      <a href="javascript:void(0)">
        <img :src="userInfo.avatar" class="avatar" alt="" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>
          <div @click="$router.push('/userInfo')" class="right-btn">
            <span class="osuu-net geek-geren"></span>
            个人资料
          </div>
        </DropdownItem>
        <DropdownItem>
          <div @click="$router.push('/userpwd')" class="right-btn">
            <span class="osuu-net geek-xiugaimima"></span>
            修改密码
          </div>
        </DropdownItem>
        <DropdownItem>
          <div @click="$router.push('/about')" class="right-btn">
            <span class="osuu-net geek-guanyu"></span>
            关于系统
          </div>
        </DropdownItem>
        <DropdownItem divided>
          <div @click="exit">
            <span class="osuu-net geek-zhuxiaodenglu"></span>
            退出登录
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import cookie from "@/utils/store/cookie";
  import {
    mapState,mapMutations
  } from "vuex";
  export default {

    data() {
      return {};
    },
    computed: {
      ...mapState(["userInfo"]),
    },

    methods: {
       ...mapMutations(["addUserInfo"]),
      // 退出登录
      exit() {
        this.$Modal.confirm({
          title: "退出确认",
          content: "即将退出登录，是否继续？",
          onOk: () => {
            // cookie.clearAll();
            
            
            this.$router.push({name:"index"});
            localStorage.removeItem("lp_token", true);
            this.addUserInfo({})
            location.reload();
          },
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

  .avatarList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    img {
      margin: 5px 0;
      width: 120px;
    }

    .active {
      border: 2px solid blue;
    }
  }

  p {
    text-align: center;
    color: #888;
    font-size: 12px;
  }

  @media (max-width: 767.98px) {
    .avatarList img {
      width: 100px;
    }
  }
</style>