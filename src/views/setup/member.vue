<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">
            团队成员

            <div class="search-input">
              <Input v-model="name" size="small" placeholder="请输入邮箱搜索" search />
            </div>
          </div>
          <div class="card-body padding-top0">
            <div class="card-menu">
              <Button v-if="userInfo.role.is_admin == 1" type="primary" icon="md-add" @click="addClick" style="margin-right: 10px">新增</Button>
            </div>
            <Table border :loading="load" :columns="columns" :data="data">
              <template slot-scope="{ row }" slot="avatar">
                <Avatar :src="row.avatar" />
              </template>
              <template slot-scope="{ row }" slot="capacity">
                <span>{{(row.capacity/1024/1024/1024).toFixed(2)}} G</span>
              </template>
              <template slot-scope="{ row }" slot="user_size">
                <span>{{(row.user_size/1024/1024/1024).toFixed(2)}} G</span>
              </template>

              <template slot-scope="{ row }" slot="state">
                <Badge v-if="row.state === 0" status="error" text="已停用" />
                <Badge v-if="row.state === 1" status="success" text="已启用" />
                <Badge v-if="row.state === 2" status="warning" text="待审核" />
              </template>

              <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="editClick(row)">编辑</Button>
                <Button type="error" size="small" @click="del(row.id)">删除</Button>
              </template>
            </Table>
            <div class="paging">
              <Page :total="Number(total)" :current="page" :page-size="size" :simple="$store.state.isMobile"
                @on-change="pageChange" @on-page-size-change="pageSizeChange" show-total show-sizer show-elevator />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="modal2" :width="600" :title="edit ? '编辑成员' : '新增成员'" :loading="creating"
      @on-ok="edit ? editSave() : addSave()" class-name="vertical-center-modal">
      <Form ref="create" :model="createData" :rules="createRules" :label-width="100">
        <FormItem label="邮箱/账号" prop="email">
          <Input v-model="createData.email" placeholder="请输入邮箱" />
        </FormItem>
        <FormItem label="角色组" prop="role_id">
          <Select v-model="createData.role_id" style="width: 200px" placeholder="请选择角色组">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="总配额/G" prop="capacity">
          <InputNumber v-model="createData.capacity" :min="0" style="width: 70%">
          </InputNumber>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="createData.username" placeholder="请输入姓名" />
        </FormItem>
        <FormItem label="联系电话">
          <Input v-model="createData.phone" placeholder="请输入联系电话" />
        </FormItem>

        <FormItem label="重置密码" prop="pwd" v-show="edit">
          <i-switch v-model="createData.pwd" :true-value="1" :false-value="0" />
          <p style="font-size:12px;color:red" v-show="createData.pwd == 1">
            * 密码将会重置为：123456
          </p>
        </FormItem>
        <FormItem label="状态" prop="state">
          <i-switch v-model="createData.state" :true-value="1" :false-value="0" />
        </FormItem>


      </Form>
    </Modal>

    <Modal v-model="modal3" width="360">
      <p slot="header" style="color: #f60">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div>
        <p>删除用户不会删除此用户之前上传的图片，可通过新增相同邮箱恢复用户，是否删除？
        </p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="delFunction">确认删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    getMember,
    getRole,
    postMember,
    putMember,
    delMember
  } from "@/api/index";
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        name: "",
        total: "",
        load: true,
        data: [],
        roleInfo: {},
        modal2: false,
        modal3: false,
        edit: false,
        columns: [{
            title: "ID",
            key: "id",
            align: "center",
            minWidth: 80,
            fixed: 'left'
          },
          {
            title: "头像",
            align: "center",
            slot: "avatar",
            minWidth: 70,
          },
          {
            title: "邮箱/账号",
            key: "email",
            align: "center",
            minWidth: 200,
            fixed: 'left'
          },
          {
            title: "姓名",
            key: "username",
            align: "center",
            minWidth: 120,
          },
          {
            title: "联系电话",
            key: "phone",
            align: "center",
            minWidth: 130,
          },
          {
            title: "角色组",
            key: "role_name",
            align: "center",
            minWidth: 130,
          },
          {
            title: "创建时间",
            key: "create_time",
            align: "center",
            minWidth: 180,
          },

          {
            title: "总配额",
            align: "center",
            slot: "capacity",
            minWidth: 100,
          },
          {
            title: "已用容量",
            align: "center",
            slot: "user_size",
            minWidth: 100,
          },

          {
            title: "状态",
            minWidth: 130,
            align: "center",
            slot: "state",
          },
          {
            title: "操作",
            minWidth: 150,
            align: "center",
            slot: "action",
            fixed: 'right'
          },
        ],
        roleList: [],
        createData: {},
        createRules: {
          email: [{
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }],
          role_id: [{
            required: true,
            message: "请选择角色组",
          }],
          capacity: [{
            required: true,
            message: "请输入总配额",
          }],
        },
        creating: true,
        delId: "",
        modal_loading: false,
      };
    },
    created() {
      this._getData();
      this._getRole();
      if (this.userInfo.role.is_admin != 1) {
        this.columns.pop()
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    watch: {
      name(newVal, oldVal) {
        if (newVal != oldVal) {
          this.page = 1
          this.load = true
          this._getData();
        }
      },
    },

    methods: {
      // 获取列表
      _getData() {
        getMember({
          page: this.page,
          size: this.size,
          name: this.name,
        }).then((res) => {
          this.data = res.data.data;
          this.total = res.data.total;
          this.load = false;
        });
      },

      editClick(row) {
        this.createData = {}
        this.edit = true;
        this.modal2 = true;
        this.createData = {
          ...row,
          pwd: 0
        };

        this.createData.capacity = this.createData.capacity > 0 ? this.createData.capacity / 1024 / 1024 / 1024 : this
          .createData.capacity
      },
      addClick() {
        this.edit = false;
        this.modal2 = true;
        this.createData = {
          email: "",
          role_id: "",
          username: "",
          phone: "",
          capacity: 0,
          state: 1,
          avatar: "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg",
        };
      },
      // 新增
      addSave() {
        this.$refs.create.validate((valid) => {
          if (valid) {
            postMember({
              email: this.createData.email,
              role_id: this.createData.role_id,
              username: this.createData.username,
              phone: this.createData.phone,
              capacity: this.createData.capacity * 1024 * 1024 * 1024,
              state: this.createData.state,
              avatar: this.createData.avatar,
            }).then((res) => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });
                this._getData();
                this.modal2 = false;
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
            });

            this.creating = false;
            this.$nextTick(() => {
              this.creating = true;
            });
          } else {
            this.creating = false;
            this.$nextTick(() => {
              this.creating = true;
            });
          }
        });

      },
      // 编辑
      editSave() {
        this.$refs.create.validate((valid) => {
          if (valid) {
            putMember({
              id: this.createData.id,
              email: this.createData.email,
              role_id: this.createData.role_id,
              username: this.createData.username,
              phone: this.createData.phone,
              capacity: this.createData.capacity * 1024 * 1024 * 1024,
              state: this.createData.state,
              pwd: this.createData.pwd,
            }).then((res) => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });
                this._getData();
                this.modal2 = false;
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
            });

            this.creating = false;
            this.$nextTick(() => {
              this.creating = true;
            });
          } else {
            this.creating = false;
            this.$nextTick(() => {
              this.creating = true;
            });
          }
        });
      },


      // 删除
      del(id) {
        this.delId = id;
        this.modal3 = true
      },
      // 删除方法
      delFunction() {
        this.modal_loading = true
        delMember({
          id: this.delId,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this._getData();
          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
          }
          this.modal_loading = false
          this.modal3 = false
        });
      },

      // 分页跳转
      pageChange(val) {
        this.page = val;
        this.load = true;
        this._getData();
      },
      pageSizeChange(val) {
        this.load = true;
        this.page = 1;
        this.size = val;
        this._getData();
      },
      // 获取存储桶列表
      _getRole() {
        getRole({
          page: 1,
          size: 100,
          name: ""
        }).then((res) => {
          this.roleList = res.data.data;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  /deep/.ivu-badge-status-dot {
    width: 10px;
    height: 10px;
  }
</style>