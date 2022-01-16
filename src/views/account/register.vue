<template>
  <div class="page-content">
    <div class="page-container">
      <div class="page-container-top">
        <div class="page-container-top-logo">
          <img src="../../assets/images/login-logo.jpg" alt="logo" />
          <h2>会员注册</h2>
        </div>
      </div>
      <div class="ivu-login">
        <Form ref="create" :model="formValidate" :rules="ruleValidate">
          <FormItem label="" prop="phone">
            <Input prefix="ios-contact-outline" type="tel" v-model="formValidate.phone" size="large" clearable placeholder="手机号"></Input>
          </FormItem>
          <FormItem label="" prop="password">
            <Input prefix="ios-lock-outline" v-model="formValidate.password" size="large" type="password" clearable
              placeholder="密码（6-10位字母或数字）"></Input>
          </FormItem>
          <FormItem label="" prop="password2">
            <Input prefix="ios-lock-outline" size="large" v-model="formValidate.password2" type="password" clearable
              placeholder="确认密码（6-10位字母或数字）"></Input>
          </FormItem>
          <FormItem label="" prop="captcha">
            <Input prefix="ios-lock-outline" type="text" v-model="formValidate.captcha" size="large" placeholder="验证码">
            <Button slot="append" type="primary" @click="getCode" :disabled="disabled">{{ codeBtn }}</Button>
            </Input>
          </FormItem>
          
          <FormItem>
            <Checkbox v-model="formValidate.single" style="float: left">我同意 <a href="/items.html"
                target="_blank">服务条款</a></Checkbox>
            <a href="javascript:;" style="float: right" @click="$router.push('/login')">返回登录</a>
            <div style="clear: both"></div>
          </FormItem>
        </Form>

        <Button type="primary" long size="large" @click="toReg" :loading="loading">{{ loginText }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    postLogin,
    getCellphone,
    postCode,
    postReg
  } from "@/api/index";
  import cookie from "@/utils/store/cookie";

  export default {
    data() {
      return {
        formValidate: {
          phone: "",
          captcha: "",
          password: "",
          password2: "",
          single: false
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
          captcha: [{
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }, ],
          password2: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          }, ],

        },
        codeBtn: "获取验证码",
        countdown: 60,
        disabled: false,
        loading: false,
        loginText: "注册",
      };
    },
    created() {
      if (cookie.getCookie()) {
        this.username = cookie.getCookie().username;
        this.password = cookie.getCookie().password;
        this.single = cookie.get("single");
      }
    },

    methods: {
      //获取验证码
      getCode() {
        var reg = /^1[3456789]\d{9}$/;
        var user = reg.test(this.formValidate.phone);
        if (!user) {
          return this.$Message.warning({
            background: true,
            content: "请填写正确的手机号",
          });
        }
        this.$Message.loading({
          content: "获取中...",
          duration: 2,
        });
        getCellphone({
          phone: this.formValidate.phone,
        }).then((res) => {
          if (res.code == 200) {
            console.log(111);
            // 发送短信验证码
            postCode({
              phone: this.formValidate.phone,
            }).then((res) => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });
                this.settime(60);
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
            });
          } else {
            this.$Message.warning({
              background: true,
              content: res.msg,
            });
          }
        });
      },

      //验证码
      settime(e) {
        //验证码动态
        if (this.countdown == 0) {
          (this.codeBtn = "重新发送"),
          (this.countdown = "60"),
          (this.disabled = false);
          return;
        } else {
          (this.codeBtn = "重新发送(" + this.countdown + ")"),
          (this.disabled = true);
          this.countdown--;
        }
        setTimeout(() => {
          this.settime(60);
        }, 1000);
      },

      // 注册方法
      toReg() {
        if (!this.formValidate.single) {
          return this.$Message.warning({
            background: true,
            content: "请阅读并同意服务条款",
          });
        }
        if (this.formValidate.password != this.formValidate.password2) {
          return this.$Message.warning({
            background: true,
            content: "两次密码不一致",
          });
        }
        this.$refs.create.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.loginText = "注册中...";
            postReg({
              phone: this.formValidate.phone,
              password: this.formValidate.password,
              code: this.formValidate.captcha,
            }).then((res) => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });
                this.$router.push('/login');
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
              this.loading = false;
              this.loginText = "注册";
            });
          }
        });


      },
    },
  };
</script>

<style lang="less" scoped>
  .ivu-input-group-append button {
    cursor: pointer;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    .page-container {
      padding: 32px 0;
      text-align: center;
      width: 384px;
      margin: auto;
      background: #fff;
      box-shadow: 0 0 8px #eee;
      padding: 20px;
      border-radius: 10px;

      .page-container-top {
        padding: 10px 0;

        .page-container-top-logo {
          img {
            width: 100px;
            margin: 0 auto;
          }
        }
      }

      .ivu-login {
        margin-bottom: 30px;

        a {
          color: #3ca5f6
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .page-content {
      background-image: url("../../assets/img/body.svg");
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .page-container {
      width: 95% !important;
    }

    .page-content {
      background: #f5f7f9;
    }
  }
</style>