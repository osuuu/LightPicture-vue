<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">个人信息</div>
          <div class="card-body">
            <div class="demo-spin-container" v-if="loading2">
              <Spin fix size="large"></Spin>
            </div>
            <Form ref="create" :model="formValidate" :label-width="100" v-else>
              <FormItem label="头像">
                <div class="portrait">
                  <img v-lazy="formValidate.avatar" alt="LightPicture" />
                  <p class="btn" @click="isPortrait = true">修改</p>
                </div>
              </FormItem>
              <FormItem label="邮箱/账号">
                <Input v-model="formValidate.email" disabled></Input>
              </FormItem>


              <FormItem label="API秘钥">
                <Input v-model="formValidate.Secret_key" disabled>
                <Button slot="append" @click="resetKEY">重置</Button>
                </Input>
              </FormItem>

              <FormItem label="注册时间">
                <Input v-model="formValidate.create_time" disabled></Input>
              </FormItem>

              <FormItem label="角色组">
                <Input v-model="formValidate.role.name" disabled></Input>
              </FormItem>

              <FormItem label="角色权限">
                <Tag color="blue" v-if="formValidate.role.is_admin">管理员</Tag>
                <Tag color="blue" v-if="formValidate.role.is_add">上传图片</Tag>
                <Tag color="blue" v-if="formValidate.role.is_del_own">删除自己上传的图片</Tag>
                <Tag color="blue" v-if="formValidate.role.is_read">查看所在存储桶其他人上传的图片</Tag>
                <Tag color="blue" v-if="formValidate.role.is_del_all">删除所在存储桶其他人上传的图片</Tag>
                <Tag color="blue" v-if="formValidate.role.is_read_all">查看系统全部图片</Tag>
              </FormItem>


              <FormItem label="姓名">
                <Input v-model="formValidate.username" placeholder="请输入姓名"></Input>
              </FormItem>
              <FormItem label="联系电话">
                <Input v-model="formValidate.phone" placeholder="请输入联系电话"></Input>
              </FormItem>

              <FormItem>
                <Button type="primary" @click="edit()" :loading="loading">保存</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <PortraitSelect v-if="isPortrait" :avatar="formValidate.avatar" @close="close" @confirm="confirm"></PortraitSelect>


  </div>
</template>

<script>
  import {
    getUserInfo,
    putResetKey,
    putUpdate
  } from "@/api/index";
  import {
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        formValidate: {},
        isPortrait: false,
        modal: false,
        old_pwd: "",
        new_pwd: "",
        new_pwd2: "",
        loading: false,
        loading2: true,
      };
    },
    created() {
      this._getData();
    },

    methods: {
      ...mapMutations(["addUserInfo"]),
      close() {
        this.isPortrait = false;
      },
      confirm(e) {
        this.formValidate.avatar = e;
        this.isPortrait = false;
      },
      // 重置KEY
      resetKEY() {
        this.$Modal.confirm({
          title: "是否确认重置",
          onOk: () => {
            putResetKey().then((res) => {
              this.$Message.success({
                background: true,
                content: res.msg,
              });
              this._getData();
            });
          },
        });
      },

      // 获取列表
      _getData() {
        this.loading2 = true
        getUserInfo().then((res) => {
          this.formValidate = {...res.data};
          this.loading2 = false
          this.addUserInfo(res.data)
        });
      },

      // 更新信息
      edit() {
        this.loading = true;
        putUpdate({
          avatar: this.formValidate.avatar,
          username: this.formValidate.username,
          phone: this.formValidate.phone,
        }).then((res) => {
          this.$Message.success({
            background: true,
            content: res.msg,
          });
          this._getData();
          
          this.loading = false;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .portrait {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 120px;
      border-radius: 50%;
    }

    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0.75;
      background: rgb(24, 24, 24);
      color: #ffffff;
      width: 120px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>