<template>
  <div class="page-container">
    <div class="page-close" @click="switchAccount(0)">
      <img src="../assets/imgs/icon_close.png" alt="" />
    </div>
    <div class="page-container-top">
      <div class="page-container-top-logo">
        <img src="../assets/imgs/logo.jpg" alt="logo" />
      </div>
    </div>
    <div class="ivu-login">
      <Form ref="create" :model="formValidate" :rules="ruleValidate">
        <FormItem label="" prop="username">
          <Input prefix="ios-mail-outline" type="text" v-model="formValidate.username" size="large" clearable
            placeholder="邮箱/账号"></Input>
        </FormItem>
        <FormItem label="" prop="password">
          <Input prefix="ios-lock-outline" v-model="formValidate.password" size="large" type="password" clearable
            placeholder="密码"></Input>
        </FormItem>

        <FormItem>
          <Checkbox v-model="formValidate.single" style="float: left">记住我</Checkbox>
          <a href="javascript:;" style="float: right;margin-left:10px" v-if="config.is_reg == 1" @click="switchAccount(2)">注册账号</a> 
          <a href="javascript:;" style="float: right" @click="switchAccount(3)">忘记密码</a>
          <div style="clear: both"></div>
        </FormItem>
      </Form>

      <Button type="primary" long size="large" @click="toLogin" :loading="loading">立即登录</Button>
    </div>
  </div>
</template>

<script>
  import {
    postLogin
  } from "@/api/index";
  import cookie from "@/utils/store/cookie";
  import {
    mapMutations,
    mapState
  } from "vuex";

  export default {
    data() {
      return {
        formValidate: {
          username: "",
          password: "",
          single: false,
        },
        ruleValidate: {
          username: [{
            required: true,
            message: "请输入邮箱或账号",
            trigger: "blur",
          }, ],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur",
          }, ],
        },
        loading: false,
      };
    },
    computed: {
      ...mapState(["config"]),
    },
    created() {
      if (cookie.getCookie()) {
        this.username = cookie.getCookie().username;
        this.password = cookie.getCookie().password;
        this.single = cookie.get("single");
      }
    },

    methods: {
      ...mapMutations(["switchAccount"]),
      // 登录方法
      toLogin() {
        this.$refs.create.validate((valid) => {
          if (valid) {
            this.loading = true;
            postLogin({
              username: this.formValidate.username,
              password: this.formValidate.password,
            }).then((res) => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });

                if (this.formValidate.single) {
                  cookie.setCookie(
                    this.formValidate.phone,
                    this.formValidate.password,
                    7
                  );
                  cookie.set("single", "true", 30);
                } else {
                  cookie.clearAll();
                }
                this.switchAccount(0);
                localStorage.setItem("lp_token", res.data);

                // if (this.redirect) {
                //   this.$router.push(this.redirect);
                // }
                location.reload();
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
              this.loading = false;
            });
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .page-container {
    padding: 32px 0;
    text-align: center;
    width: 420px;
    margin: auto;
    background: #fff;
    box-shadow: 0 0 8px #eee;
    padding: 20px 30px;
    border-radius: 10px;
    position: relative;

    .page-close {
      position: absolute;
      right: -15px;
      top: -15px;

      img {
        width: 45px;
        border-radius: 50%;
        box-shadow: 0 0 8px #eee;
      }
    }

    .page-container-top {
      padding: 10px 0;

      .page-container-top-logo {
        margin-bottom: 20px;

        img {
          width: 60%;
          margin: 0 auto;
        }
      }
    }

    /deep/.ivu-login {
      margin-bottom: 30px;

      a {
        color: #3ca5f6;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .page-container {
      width: 95% !important;
    }
  }
</style>