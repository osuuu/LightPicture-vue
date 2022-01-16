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
        <FormItem label="" prop="email">
          <Input
            prefix="ios-mail-outline"
            type="tel"
            v-model="formValidate.email"
            size="large"
            clearable
            placeholder="邮箱"
          ></Input>
        </FormItem>
        <FormItem label="" prop="password">
          <Input
            prefix="ios-lock-outline"
            v-model="formValidate.password"
            size="large"
            type="password"
            clearable
            placeholder="密码（6-10位字母或数字）"
          ></Input>
        </FormItem>
        <FormItem label="" prop="username">
          <Input
            prefix="ios-contact-outline"
            size="large"
            v-model="formValidate.username"
            clearable
            placeholder="姓名"
          ></Input>
        </FormItem>
        <FormItem label="" prop="captcha">
          <Input
            prefix="ios-lock-outline"
            type="text"
            v-model="formValidate.captcha"
            size="large"
            placeholder="验证码"
          >
            <Button
              slot="append"
              type="primary"
              @click="getCode"
              :disabled="disabled"
              >{{ codeBtn }}</Button
            >
          </Input>
        </FormItem>
      </Form>

      <Button
        type="primary"
        long
        size="large"
        @click="toReg"
        :loading="loading"
        >{{ loginText }}</Button
      >
      <p class="goligin" @click="switchAccount(1)">已有账号？点此登录</p>
    </div>
  </div>
</template>

<script>
import {  postCode, postReg } from "@/api/index";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      formValidate: {
        email: "",
        captcha: "",
        password: "",
        username: "",
      },
      ruleValidate: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入邮箱验证码",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
      },
      avatar:"https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg",
      codeBtn: "获取验证码",
      countdown: 60,
      disabled: false,
      loading: false,
      loginText: "注册",
    };
  },

  methods: {
    ...mapMutations(["switchAccount"]),

    //获取验证码
    getCode() {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
      var user = reg.test(this.formValidate.email);
      if (!user) {
        return this.$Message.warning({
          background: true,
          content: "请填写正确的邮箱",
        });
      }
      this.$Message.loading({
        content: "获取中...",
        duration: 0,
      });
      postCode({
        email: this.formValidate.email,
      }).then((res) => {
        this.$Message.destroy()
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
      this.$refs.create.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loginText = "注册中...";
          postReg({
            email: this.formValidate.email,
            password: this.formValidate.password,
            username: this.formValidate.username,
            code: this.formValidate.captcha,
            avatar: this.avatar,
          }).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                background: true,
                content: res.msg,
              });
              this.switchAccount(1)
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
    margin-bottom: 20px;

    a {
      color: #3ca5f6;
    }
  }
  .goligin {
    color: #3ca5f6;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .page-container {
    width: 95% !important;
  }
}
</style>