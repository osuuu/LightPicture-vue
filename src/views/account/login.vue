<template>
  <div class="login_bg">
    <div class="login_container">
      <div class="login_body">

        <div class="login-form">
          <div class="login-logo">
            <img class="logo" src="../../assets/images/login-logo.jpg">
            <h2>会员登录</h2>
          </div>
          <div class="ivu-login">
            <Form ref="create" :model="formValidate" :rules="ruleValidate">
              <FormItem label="" prop="phone">
                <Input prefix="ios-contact-outline" placeholder="手机号" type="tel" style="width: 100%" size="large"
                  v-model="formValidate.phone" clearable />
              </FormItem>
              <FormItem label="" prop="password">
                <Input prefix="ios-lock-outline" type="password" password placeholder="密码" style="width: 100%"
                  v-model="formValidate.password" size="large" @on-enter="toLogin" />
              </FormItem>

              <div class="page-account-auto-login">
                <Checkbox v-model="formValidate.single">自动登录</Checkbox>
                <!-- <a href="javascript:;" style="float: right" @click="$router.push('/forget')">忘记密码</a>
                <a href="javascript:;" style="float: right;margin-right:10px"
                  @click="$router.push('/register')">注册账号</a> -->
                  <span style="float: right;margin-right:10px"> 因相关政策关闭注册功能</span>
              </div>
            </Form>
            <Button type="primary" long size="large" @click="toLogin" :loading="loading">{{ loginText }}</Button>
          </div>

          <p class="copy">
            版权所有 © <a href="https://h234.cn">极客实验室</a>
          </p>

        </div>
        <div class="login-sidebox">
          <div class="login-sidebox__title">
            <h2>易邮云短信</h2>
            <h4>三网合一 / 5秒即达 / 高性价比</h4>
            <p>一站式短信验证码、通知短信解决方案。</p>
          </div>
          <img src="../../assets/images/loginbg.svg" />
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {
    postLogin
  } from "@/api/index";
  import cookie from "@/utils/store/cookie";

  export default {
    data() {
      return {
        formValidate: {
          phone: "",
          password: "",
          single: false,
        },
        ruleValidate: {
          phone: [{
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
        },

        loginText: "登录",
        loading: false,
        redirect: "",
      };
    },
    created() {
      if (cookie.getCookie()) {
        this.formValidate.phone = cookie.getCookie().username;
        this.formValidate.password = cookie.getCookie().password;
        this.formValidate.single = cookie.get("single");

        // if (this.formValidate.phone && this.formValidate.password) {
        //   this.$Message.loading({
        //     content: '您已登录，正在跳转',
        //     duration: 2
        //   });
        //   this.toLogin()
        // }

      }

      if (this.$route.query.redirect) {
        this.redirect = this.$route.query.redirect;
      }

    },

    methods: {
      // 登录方法
      toLogin() {
        this.$refs.create.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.loginText = "登录中...";
            postLogin({
              phone: this.formValidate.phone,
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
                this.$store.state.phone = this.formValidate.phone;
                this.$store.state.auth = res.data.auth;
                sessionStorage.setItem("token", res.data.token);

                if (this.redirect) {
                  this.$router.push(this.redirect);
                } else {
                  this.$router.push({
                    name: "home"
                  });
                }
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
              this.loading = false;
              this.loginText = "登录";
            });
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  @import url('@/assets/css/account.less');
</style>