<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">
            角色组

            <div class="search-input">
              <Input v-model="name" size="small" placeholder="请输入名称搜索" search />
            </div>
          </div>
          <div class="card-body padding-top0">
            <div class="card-menu" >
              <Button v-if="userInfo.role.is_admin == 1" type="primary" icon="md-add" @click="addClick" style="margin-right: 10px">新增</Button>
            </div>
            <Table border :loading="load" :columns="columns" :data="data">
              <template slot-scope="{ row }" slot="power">
                <Button @click="read(row)">查看</Button>
              </template>
              <template slot-scope="{ row }" slot="default">
                <i-switch v-model="row.default" @on-change="onChange(row)" :true-value="1" :false-value="0" />
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
    <Modal v-model="modal1" width="360">
      <p slot="header" style="color: #2d8cf0">
        <Icon type="md-checkbox" />
        <span>权限列表</span>
      </p>
      <div style="text-align: center">
        <Tag color="success" v-if="roleInfo.is_admin">管理员权限</Tag>
        <Tag color="success" v-if="roleInfo.is_add && roleInfo.is_admin == 0">允许其成员上传图片</Tag>
        <Tag color="success" v-if="roleInfo.is_del_own && roleInfo.is_admin == 0">允许其成员删除自己上传的图片</Tag>
        <Tag color="success" v-if="roleInfo.is_read && roleInfo.is_admin == 0">允许其成员查看所在存储桶其他人上传的图片</Tag>
        <Tag color="success" v-if="roleInfo.is_del_all && roleInfo.is_admin == 0">允许其成员删除所在存储桶其他人上传的图片</Tag>
        <Tag color="success" v-if="roleInfo.is_read_all && roleInfo.is_admin == 0">允许其成员查看系统全部图片</Tag>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="modal1 = false">我知道了</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" :width="600" :title="edit ? '编辑分组' : '新增分组'" :loading="creating"
      @on-ok="edit ? editSave() : addSave()" class-name="vertical-center-modal">
      <Form ref="create" :model="createData" :label-width="100">
        <FormItem label="分组名称">
          <Input v-model="createData.name" placeholder="请输入分组名称" />
        </FormItem>
        <FormItem label="存储桶">
          <Select v-model="createData.storage_id" style="width: 200px" placeholder="请选择存储桶">
            <Option v-for="item in storageList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="分组权限">
          <p>
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_admin">设置其成员权限为管理员</Checkbox>
          </p>
          <p v-show="createData.is_admin == 0">
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_add">允许其成员上传图片</Checkbox>
          </p>
          <p v-show="createData.is_admin == 0">
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_read">允许其成员查看所在存储桶其他人上传的图片
            </Checkbox>
          </p>
          <p v-show="createData.is_admin == 0">
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_read_all">允许其成员查看系统全部图片</Checkbox>
          </p>
          <p v-show="createData.is_admin == 0">
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_del_own">允许其成员删除自己上传的图片</Checkbox>
          </p>
          <p v-show="createData.is_admin == 0">
            <Checkbox border :true-value="1" :false-value="0" v-model="createData.is_del_all">允许其成员删除所在存储桶其他人上传的图片
            </Checkbox>
          </p>
        </FormItem>
        <FormItem label="注册默认">
          <i-switch v-model="createData.default" :true-value="1" :false-value="0" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal3" width="360">
      <p slot="header" style="color: #f60">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div>
        <p>至少保留一个默认角色组，请确保当前删除的角色组不是注册默认角色组，角色组删除后，该组下面的用户将重置默认角色组。
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
    getRole,
    getStorage,
    postRole,
    putRole,
    delRole
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
        modal1: false,
        modal2: false,
        modal3: false,
        edit: false,
        columns: [{
            title: "ID",
            key: "id",
            align: "center",
            minWidth: 80,
          },
          {
            title: "名称",
            key: "name",
            align: "center",
            minWidth: 120,
          },
          {
            title: "存储桶",
            key: "storage_name",
            align: "center",
            minWidth: 130,
          },
          {
            title: "成员数",
            key: "user_num",
            align: "center",
            minWidth: 80,
          },

          {
            title: "权限",
            align: "center",
            slot: "power",
            minWidth: 100,
          },
          {
            title: "注册默认",
            align: "center",
            slot: "default",
            minWidth: 100,
          },
          {
            title: "操作",
            minWidth: 150,
            align: "center",
            slot: "action",
          },
        ],
        storageList: [],
        createData: {},
        creating: true,
        delId: "",
        modal_loading: false,
      };
    },
    created() {
      this._getData();
      this._getStorage();
      if(this.userInfo.role.is_admin != 1){
        this.columns.pop()
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
        getRole({
          page: this.page,
          size: this.size,
          name: this.name,
        }).then((res) => {
          this.data = res.data.data;
          this.total = res.data.total;
          this.load = false;
        });
      },
      read(row) {
        this.roleInfo = row;
        this.modal1 = true;
      },
      editClick(row) {
        this.createData = {}
        this.edit = true;
        this.modal2 = true;
        this.createData = {
          ...row,
        };
      },
      addClick() {
        this.edit = false;
        this.modal2 = true;
        this.createData = {
          name: "",
          storage_id: "",
          is_admin: 0,
          is_add: 0,
          is_read: 0,
          is_read_all: 0,
          is_del_own: 0,
          is_del_all: 0,
          default: 0,
        };
      },
      // 新增
      addSave() {
        if (!this.createData.name) {
          this.nextTick()
          return this.$Message.error({
            background: true,
            content: "名称不能为空",
          });
        }
        if (!this.createData.storage_id) {
          this.nextTick()
          return this.$Message.error({
            background: true,
            content: "请选择存储桶",
          });
        }
        postRole({
          name: this.createData.name,
          storage_id: this.createData.storage_id,
          is_admin: this.createData.is_admin,
          is_add: this.createData.is_add,
          is_read: this.createData.is_read,
          is_read_all: this.createData.is_read_all,
          is_del_own: this.createData.is_del_own,
          is_del_all: this.createData.is_del_all,
          default: this.createData.default,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this.modal2 = false;
            this._getData();
          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
            this.load = false
          }
          this.nextTick()
        });
      },
      // 编辑
      editSave() {
        if (!this.createData.name) {
          this.nextTick()
          return this.$Message.error({
            background: true,
            content: "名称不能为空",
          });
        }
        if (!this.createData.storage_id) {
          this.nextTick()
          return this.$Message.error({
            background: true,
            content: "请选择存储桶",
          });
        }
        this.load = true
        putRole({
          id: this.createData.id,
          name: this.createData.name,
          storage_id: this.createData.storage_id,
          is_admin: this.createData.is_admin,
          is_add: this.createData.is_add,
          is_read: this.createData.is_read,
          is_read_all: this.createData.is_read_all,
          is_del_own: this.createData.is_del_own,
          is_del_all: this.createData.is_del_all,
          default: this.createData.default,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this.modal2 = false;
            this._getData();
          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
            this.load = false
          }
          this.nextTick()
        });
      },
      onChange(row) {
        this.createData = {
          ...row,
        };
        this.editSave()
      },

      // 删除
      del(id) {
        this.delId = id;
        this.modal3 = true
      },
      // 删除方法
      delFunction() {
        this.modal_loading = true
        delRole({
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
      _getStorage() {
        getStorage({
          page: 1,
          size: 100,
        }).then((res) => {
          this.storageList = res.data.data;
        });
      },

      nextTick() {
        this.creating = false;
        this.$nextTick(() => {
          this.creating = true;
        });
      }
    },
  };
</script>

<style lang="less" scoped>
  .ivu-checkbox-wrapper {
    margin-bottom: 5px;
  }
</style>