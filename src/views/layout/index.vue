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
  <div :class="$store.state.isMenu ? 'enable-vertical-menu' : ''">
    <div id="layout-wrapper">
      <div class="vertical-menu mm-active">
        <div class="h-100">
          <div class="navbar-brand-box">
            <img :src="require('@/assets/imgs/logo.jpg')" />
          </div>

          <div id="sidebar-menu">
            <!-- 左侧导航 -->
            <Menu :open-names="openItem" :active-name="activeName" accordion>
              <div v-for="item in menuItem" :key="item.path">
                <div v-if="item.meta.isShow">
                  <Submenu v-if="item.meta.isFold" :name="item.name">
                    <template slot="title">
                      <span :class="item.meta.icon"></span>
                      {{ item.meta.title }}
                    </template>
                    <MenuItem v-for="list in item.children" v-show="list.meta.isShow" :key="list.path" :name="list.name"
                      :to="'/' + item.path + '/' + list.path">
                    {{ list.meta.title }}
                    </MenuItem>
                  </Submenu>
                  <MenuItem v-else :name="item.name" :to="'/' + item.path">
                  <span :class="item.meta.icon"></span>
                  {{ item.meta.title }}
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>

          <Capacity v-if="userInfo.capacity && !isMobile"></Capacity>

        </div>
      </div>

      <header id="page-topbar">
        <div class="navbar-header">
          <div class="d-flex align-items-left">
            <span class="osuu-net geek-caidan" @click="$store.state.isMenu = !$store.state.isMenu"></span>
            <div class="dropdown d-inline-block" @click="toGit">
              <Icon custom="osuu-net geek-github" size="26"></Icon>
            </div>
          </div>
          <div class="d-flex align-items-center" v-if="update">
            <div class="dropdown d-inline-block" @click="$router.push('/update')">
              <Tooltip content="版本更新" placement="bottom">
                <Icon custom="osuu-net geek-iconfontzhizuobiaozhun0254" size="26"></Icon>
              </Tooltip>
            </div>
          </div>

          <div class="d-flex align-items-center">

            <!-- 登录注册 -->
            <div class="dropdown d-inline-block" style="width:100px" @click="switchAccount(1)" v-if="!userInfo.avatar">
              <span style="font-size: 16px">登录/注册 </span>
            </div>
            <div class="dropdown d-inline-block" v-else>
              <UserFloat></UserFloat>
            </div>
          </div>
        </div>
      </header>

      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="menu-overlay" @click="$store.state.isMenu = false"></div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        menuItem: [],
        activeName: "",
        openItem: ["setup"],
        update: false
      };
    },
    computed: {
      ...mapState(["isAccount", "userInfo", "config", "isMobile"]),
    },

    methods: {
      ...mapMutations(["switchAccount"]),
      toGit() {
        window.open('https://github.com/osuuu/LightPicture');
      },
    },
    created() {
      this.menuItem = this.$router.options.routes[0].children;
      this.activeName = this.$route.name;
      if (this.$route.name.indexOf("-") != -1) {
        this.openItem.push(this.$route.name.split("-")[0]);
      }
    },
    watch: {
      // 监听路由刷新
      $route: {
        handler: function (val, oldVal) {
          if (this.isMobile) {
            this.$store.state.isMenu = false;
          }
        },
        // 深度观察监听
        deep: true,
      },
      userInfo: {
        handler: function (val, oldVal) {
          if (this.userInfo.role.is_admin == 1) {
            this.update = true
            this.menuItem[3]['children'][4]['meta']['isShow'] = true
          } else {
            if (this.config.is_show_storage == 0) {
              this.menuItem[3]['children'][1]['meta']['isShow'] = false
            }
            if (this.config.is_show_role == 0) {
              this.menuItem[3]['children'][2]['meta']['isShow'] = false
            }
            if (this.config.is_show_member == 0) {
              this.menuItem[3]['children'][3]['meta']['isShow'] = false
            }
          }
        },
        // 深度观察监听
        deep: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  @import url("../../assets/css/theme.min.css");
  @import url("../../assets/css/clean.css");
  @deep: ~">>>";

  @{deep}.ivu-dropdown,
  .ivu-icon {
    vertical-align: middle;
  }

  .align-items-left {
    width: 100%;
    height: 60px;
    // padding: 0 20px;
    text-align: center;
    line-height: 60px;

    span {
      width: 60px;
      font-size: 20px;
      vertical-align: middle;
    }
  }

  .badge-got {
    position: absolute;
    transform: translateX(-50%);
    transform-origin: 0 center;
    top: 12px;
    right: 5px;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    background: #ed4014;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
  }

  .navbar-brand-box {
    width: 240px;
    margin-top: 10px;

    img {
      margin: 0 auto;
      width: 80%;
    }
  }

  .right {
    float: right;
    color: #ff5656;
  }

  .hot {
    color: #ff5656;
  }

  .right-btn .iconfont {
    vertical-align: middle;
  }

  .h-100 {
    min-height: 100vh;
    position: relative;

    .over {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }

  @{deep}.ivu-menu-light:after {
    width: 0;
  }

  @{deep}.ivu-form-item-label {
    font-weight: 100;
    font-size: 14px;
  }
</style>