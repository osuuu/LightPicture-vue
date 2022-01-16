<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">存储桶</div>
          <div class="card-body">
            <div class="demo-spin-container" v-if="loading">
                <Spin fix size="large"></Spin>
              </div>
            <Row :gutter="24" v-else>
              <Col :xxl="6" :xl="8" :lg="12" :md="12" :sm="24" :xs="24" class="ivu-mb" v-if="userInfo.role.is_admin == 1">
              <Card class="list-goods-list-item">
                <div class="main" @click="addClick">
                  <Icon type="ios-add" size="18" /> 新建桶
                </div>
              </Card>
              </Col>
              <Col :xxl="6" :xl="8" :lg="12" :md="12" :sm="24" :xs="24" class="ivu-mb" v-for="item in data"
                :key="item.id">
              <Card class="list-goods-list-item">
                <div style="padding: 16px;height:110px">
                  <div class="name">
                    {{ item.name }}
                    <Tag color="green" style="float: right">{{
                        getName(item.type)
                      }}</Tag>
                  </div>
                  <div class="explain">
                    <Tag color="default">图片数量：{{ item.imgCount}}</Tag><br />
                    <Tag color="default">占用存储：{{ turnSize(item.imgSize)}}</Tag>
                  </div>
                </div>
                <div class="btn-main" v-if="userInfo.role.is_admin == 1">
                  <div class="btn" @click="editClick(item)">编辑</div>
                  <div class="btn" @click="del(item.id)">删除</div>
                  <div style="clear: both"></div>
                </div>
              </Card>
              </Col>
            </Row>
            <div class="paging">
              <Page :total="Number(total)" :current="page" :page-size="size" :simple="$store.state.isMobile"
                @on-change="pageChange" @on-page-size-change="pageSizeChange" show-total show-sizer show-elevator />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showCreate" :width="600" :title="edit ? '编辑桶' : '新增桶'" :loading="creating"
      @on-ok="edit ? editSave() : addSave()" class-name="vertical-center-modal">
      <Form ref="create" :model="createData" :label-width="130">
        <FormItem label="存储源">
          <Select v-model="createData.type" style="width: 200px" placeholder="请选择存储源" :disabled="edit">
            <Option v-for="(val, key,index) in sourceList" :value="key" :key="index">{{ val }}</Option>
          </Select>
          <p style="font-size:12px;color:red" v-show="!edit">
            * 添加成功后存储源不可修改
          </p>
        </FormItem>
        <FormItem label="桶名称">
          <Input v-model="createData.name" placeholder="请输入自定义名称" />
        </FormItem>
        <FormItem label="空间域名" v-show="createData.type != 'local'">
          <Input v-model="createData.space_domain" placeholder="请输入空间域名" />
        </FormItem>

        <FormItem :label="getLabel('AccessKey')" v-show="createData.type != 'local'">
          <Input v-model="createData.AccessKey" :placeholder="'请输入' + getLabel('AccessKey')" />
        </FormItem>
        <FormItem :label="getLabel('SecretKey')" v-show="createData.type != 'local'">
          <Input v-model="createData.SecretKey" :placeholder="'请输入' + getLabel('AccessKey')" />
        </FormItem>

        <FormItem label="所属地域" v-show="createData.type == 'cos' || createData.type == 'oss'">
          <Input v-model="createData.region" placeholder="请输入所属地域" />
        </FormItem>
        <FormItem label="空间名称" v-show="createData.type != 'local'">
          <Input v-model="createData.bucket" placeholder="请输入空间名称 bucket" />
        </FormItem>

      </Form>
    </Modal>

    <Modal v-model="showDel" width="360">
      <p slot="header" style="color: #f60">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div>
        <p>
          为安全起见，删除桶会删除系统内此桶的所有数据，但不会删除此桶内已有的图片文件；通俗的讲就是删除桶后不会影响之前上传的图片链接，但系统将会无法管理之前的图片，仍可以前往服务器图片文件所在文件夹或所属对象存储控制台管理
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
    getStorage,
    postStorage,
    putStorage,
    delStorage,
    getStorageType
  } from "@/api/index";
  import {
    toSize
  } from "@/utils/index"
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        showCreate: false,
        showDel: false,
        creating: true,
        loading: true,
        modal_loading: false,
        edit: false,
        createData: {},
        sourceList: {},
        data: [],
        page: 1,
        size: 10,
        total: "",
        delId: "",
      };
    },
    computed: {
      ...mapState(["userInfo"]),
      getLabel() {
        return (value) => {
          if (value == "AccessKey") {
            if (this.createData.type == "oss") {
              return "AccessKey ID";
            }
            if (this.createData.type == "cos") {
              return "secretId";
            }
            if (this.createData.type == "kodo") {
              return "AccessKey";
            }
          } else {
            if (this.createData.type == "oss") {
              return "AccessKey Secret";
            }
            if (this.createData.type == "cos") {
              return "secretKey";
            }
            if (this.createData.type == "kodo") {
              return "SecretKey";
            }
          }
        };
      },
      turnSize() {
        return (val) => {
          return toSize(val)
        };
      },
      getName() {
        return (value) => {
          for (let key in this.sourceList) {
            if (value == key) {
              return this.sourceList[key]
            }
          }
        };
      },
    },
    created() {
      this._getData();
      this._getStorageType();
    },

    methods: {
      del(id) {
        this.delId = id;
        this.showDel = true;
      },
      // 删除方法
      delFunction() {
        this.modal_loading = true
        delStorage({
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
          this.showDel = false
        });
      },
      //  新增按钮
      addClick() {
        this.edit = false;
        this.showCreate = true;
        this.createData = {
          name: "",
          type: "local",
          space_domain: "",
          AccessKey: "",
          SecretKey: "",
          region: "",
          bucket: "",
        };
      },
      // 获取列表
      _getData() {
        this.loading = true
        getStorage({
          page: this.page,
          size: this.size,
        }).then((res) => {
          this.loading = false
          this.data = res.data.data;
          this.total = res.data.total;
        });
      },
      _getStorageType() {
        getStorageType().then((res) => {
          this.sourceList = res.data
        });
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
        postStorage({
          name: this.createData.name,
          type: this.createData.type,
          space_domain: this.createData.space_domain,
          AccessKey: this.createData.AccessKey,
          SecretKey: this.createData.SecretKey,
          region: this.createData.region,
          bucket: this.createData.bucket,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this.showCreate = false;
            this._getData();
          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
          }
          this.nextTick()
        });
      },

      //  编辑按钮
      editClick(row) {
        this.edit = true;
        this.showCreate = true;
        this.createData = {
          ...row,
        };
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
        putStorage({
          id: this.createData.id,
          name: this.createData.name,
          type: this.createData.type,
          space_domain: this.createData.space_domain,
          AccessKey: this.createData.AccessKey,
          SecretKey: this.createData.SecretKey,
          region: this.createData.region,
          bucket: this.createData.bucket,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this.showCreate = false;
            this._getData();
          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
          }
          this.nextTick()
        });
      },

      // 分页跳转
      pageChange(val) {
        this.page = val;
        this._getData();
      },
      pageSizeChange(val) {
        this.page = 1;
        this.size = val;
        this._getData();
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
  .list-goods-list-item {
    margin-bottom: 20px;
    // height: 156px;

    .main {
      line-height: 151px;
      text-align: center;
      cursor: pointer;
    }

    .main:hover {
      color: #2d8cf0;
      background: rgba(25, 129, 243, 0.07);
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }

    .btn-main {
      border-top: 1px solid #e5e9f3;

      .btn {
        width: 50%;
        float: left;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        position: relative;
      }

      .btn:hover {
        color: red;
      }
    }

    .btn-main .btn:first-child {
      border-right: 1px solid #e5e9f3;
    }

    .btn-main .btn:first-child:hover {
      color: #2d8cf0;
    }

    .explain {
      font-size: 14px;
      color: #000000;
      margin-top: 5px;
    }

    /deep/.ivu-card-body {
      padding: 0 !important;
    }
  }

 
</style>