<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title + ' - LightPicture'"></router-view>
    <Account v-if="isAccount"></Account>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import {
    getUserInfo,
    getIndex
  } from "@/api/index";
  export default {
    name: "app",
    computed: {
      ...mapState(["isAccount"]),
    },
    created() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign({},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });

      // 判断设备
      if (document.body.clientWidth < 992) {
        this.$store.state.isMobile = true;
      } else {
        this.$store.state.isMobile = false;
      }
      this.getUser()
    },
    methods: {
      ...mapMutations(["addUserInfo", "addConfig"]),
      getUser() {
        let token = localStorage.getItem('lp_token')
        if (token) {
          getUserInfo().then((res) => {
            this.addUserInfo(res.data)
          });
        }

        getIndex().then((res) => {
          this.addConfig(res.data)
        });
      }
    }
  };
</script>

<style>
  @import url("//at.alicdn.com/t/font_3014911_7ludbk3wejq.css");
</style>