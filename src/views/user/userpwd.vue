<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">修改密码</div>
          <div class="card-body">
            <Form
              ref="create"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="100"
            >
              <FormItem label="当前密码" prop="old_pwd">
                <Input
                  v-model="formValidate.old_pwd"
                  placeholder="请输入当前密码"
                ></Input>
              </FormItem>
              <FormItem label="新密码" prop="new_pwd">
                <Input
                  v-model="formValidate.new_pwd"
                  type="password"
                  placeholder="请输入新密码"
                ></Input>
              </FormItem>
              <FormItem label="确认密码" prop="new_pwd2">
                <Input
                  v-model="formValidate.new_pwd2"
                  type="password"
                  placeholder="请再次输入新密码"
                ></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="edit()" :loading="loading"
                  >确认修改</Button
                >
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { putResetPwd } from "@/api/index";
export default {
  data() {
    return {
      formValidate: {
        old_pwd: "",
        new_pwd: "",
        new_pwd2: "",
      },
      ruleValidate: {
        old_pwd: [
          {
            required: true,
            message: "请输入当前密码",
            trigger: "blur",
          },
        ],
        new_pwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
        new_pwd2: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur",
          },
        ],
      },

      loading: false,
    };
  },

  methods: {
    // 更新信息
    edit() {
      this.$refs.create.validate((valid) => {
        if (valid) {
          if (this.formValidate.new_pwd != this.formValidate.new_pwd2) {
            return this.$Message.error({
              background: true,
              content: "两次密码输入不一致",
            });
          }

          this.loading = true;
          putResetPwd({
            oldPwd: this.formValidate.old_pwd,
            newPwd: this.formValidate.new_pwd,
          }).then((res) => {
            if (res.code == 200) {
              this.$Message.success({
                background: true,
                content: res.msg,
              });
              this.formValidate.old_pwd = ""
              this.formValidate.new_pwd = ""
              this.formValidate.new_pwd2 = ""
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

</style>