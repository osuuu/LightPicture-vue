<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">图库
            <div class="search-input">
              <Input v-model="name" size="small" placeholder="请输入名称搜索" search />
            </div>
          </div>
          <div class="card-body padding-top0">
            <div class="card-menu">
              <Row>
                <Col :xs="{ span: 24 }" :lg="{ span: 12 }" style="margin: 5px 0">
                <RadioGroup v-model="type" type="button" button-style="solid">
                  <Radio :label="2">全部</Radio>
                  <Radio :label="1">只看我的</Radio>
                </RadioGroup>
                </Col>
                <Col :xs="{ span: 24 }" :lg="{ span: 12 }" style="margin: 5px 0"
                  :class="{right:!$store.state.isMobile}">
                <Button type="primary" icon="md-checkbox-outline" @click="allClick">全选</Button>
                <Button type="error" icon="md-trash" style="margin-left:10px" @click="allDel" :loading="loading2"
                  :disabled="selectList.length==0?true:false">删除所选</Button>
                </Col>
              </Row>

            </div>
            <div v-if="data.length == 0 && !loading">
              <Empty :text="'暂无数据'"></Empty>
            </div>
            <Row :gutter="24" v-viewer>
              <div class="demo-spin-container" v-if="loading">
                <Spin fix size="large"></Spin>
              </div>
              <Col :xxl="3" :xl="4" :lg="6" :md="8" :sm="8" :xs="12" class="ivu-mb " v-for="item in data"
                :key="item.id">
              <Card class="list-goods-list-item" :class="{active:selectList.indexOf(item.id) != -1}">

                <div class="img-main">
                  <img v-lazy="item.url" :src="item.url" alt="">
                </div>


                <Tooltip :content="item.name" placement="top">
                  <div class="name">
                    {{item.name}}
                  </div>
                </Tooltip>
                <div class="btn-main">
                  <Button type="info" ghost @click="select(item)">选择</Button>
                  <Button type="success" ghost @click="details(item)">详情</Button>
                </div>
              </Card>
              </Col>
            </Row>
            <div class="paging">
              <Page :total="Number(total)" :current="page" :page-size="size" :page-size-opts="[12, 24, 36, 48]"
                :simple="$store.state.isMobile" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-total
                show-sizer show-elevator />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :title="'图片ID:'+detailsItem.id" v-model="modal" class-name="vertical-center-modal">
      <List border size="small">
        <ListItem>链接：
          <Input v-model="detailsItem.url" style="width:85%">
          <Button slot="append" type="primary" v-clipboard:copy="detailsItem.url" v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制</Button>
          </Input>

        </ListItem>
        <ListItem>位置：
          <Input v-model="detailsItem.path" style="width:85%"> </Input>
        </ListItem>
        <ListItem>大小：{{turnSize(detailsItem.size)}} </ListItem>
        <ListItem>类型：{{detailsItem.mime}}</ListItem>
        <ListItem>时间：{{detailsItem.create_time}}</ListItem>
        <ListItem>所属：{{detailsItem.user_email}} （{{detailsItem.user_name}}）</ListItem>

      </List>
      <div slot="footer">
        <Button type="error" @click="del(detailsItem.id)">删除</Button>
        <Button type="primary" @click="saveTx(detailsItem.url)">设为头像</Button>
        <Button type="success" @click="goImg">打开链接</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    getImages,
    delImages,
    putUpdate
  } from "@/api"
  import {
    toSize
  } from "@/utils/index"
  export default {
    data() {
      return {
        page: 1,
        size: 12,
        name: "",
        type: 1,
        total: "",
        loading: true,
        loading2: false,
        data: [],
        selectList: [],
        detailsItem: {},
        modal: false,
        all: true,
        delLength: 0
      };
    },
    watch: {
      name(newVal, oldVal) {
        if (newVal != oldVal) {
          this.page = 1
          this.loading = true
          this._getData();
        }
      },
      type(newVal, oldVal) {
        if (newVal != oldVal) {
          this.page = 1
          this.loading = true
          this._getData();
        }
      },
    },
    created() {
      this._getData()
    },
    computed: {
      turnSize() {
        return (val) => {
          return toSize(val)
        };
      },
    },

    methods: {
      // 获取列表
      _getData() {
        this.selectList = []
        this.data = []
        this.loading = true
        getImages({
          page: this.page,
          size: this.size,
          name: this.name,
          type: this.type,
        }).then((res) => {
          this.data = res.data.data;
          this.total = res.data.total;
          this.loading = false

        });
      },
      // 详情
      details(item) {
        this.detailsItem = {
          ...item
        }
        this.modal = true
      },
      // 打开图片
      goImg() {
        window.open(this.detailsItem.url);
      },
      select(item) {
        let e = this.selectList.indexOf(item.id)
        if (e == -1) {
          this.selectList.push(item.id)
        } else {
          this.selectList.splice(e, 1)
        }
      },
      onCopy(e) {
        this.$Message.success({
          background: true,
          content: '复制成功'
        });
      },
      onError(e) {
        this.$Message.error({
          background: true,
          content: '复制失败'
        });
      },
      // 全选
      allClick() {
        let _this = this
        this.data.map(function (item) {
          let e = _this.selectList.indexOf(item.id)
          if (_this.all) {
            if (e == -1) {
              _this.selectList.push(item.id)
            }
          } else {
            if (e != -1) {
              _this.selectList.splice(e, 1)
            }
          }
        })
        this.all = !this.all
        console.log(this.selectList)
      },
      // 删除
      del(id) {
        this.$Modal.confirm({
          title: "删除确认",
          content: "删除后无法恢复，是否继续？",
          onOk: () => {
            this.modal = false
            this.delFunction(id);
          },
        });
      },
      // 删除所选
      allDel() {
        this.$Modal.confirm({
          title: "删除确认",
          content: "删除后无法恢复，是否继续？",
          onOk: () => {
            this.modal = false
            let _this = this
            this.delLength = this.selectList.length
            this.selectList.map(function (item) {
              _this.delFunction(item);
            })
          },
        });
      },
      // 删除方法
      delFunction(id) {
        this.loading2 = true
        this.load = true
        delImages({
          id: id,
        }).then((res) => {
          if (res.code == 200) {
            this.$Notice.success({
              title: res.msg,
              desc: res.data
            });

          } else {
            this.$Notice.error({
              title: res.msg,
              desc: res.data
            });
          }
          if (this.delLength <= 1) {
            this.page = 1
            this._getData();
          }else{
            this.delLength--
          }
          this.loading2 = false
        });
      },
      // 设为头像
      saveTx(url) {
        putUpdate({
          avatar: url,
        }).then((res) => {
          this.modal = false
          this.$Message.success({
            background: true,
            content: res.msg,
          });
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
    },
  };
</script>

<style lang="less" scoped>
  .ivu-mb {
    margin-bottom: 15px;

    .list-goods-list-item {
      .img-main {
        height: 150px;

        img {
          max-height: 100%;
        }
      }

      .ivu-tooltip {
        display: block;

        /deep/.ivu-tooltip-rel {
          display: block;
        }
      }

      .name {
        text-align: center;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10px;
        cursor: pointer;
      }

      .btn-main {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        button {
          width: 48%;
        }

        .ivu-btn {
          padding: 0;
        }
      }
    }

    .active {
      background: rgba(204, 232, 255, 0.5);
      border: 1px solid rgba(153, 209, 255, 0.57);
    }
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

  /deep/ .ivu-radio-wrapper-checked {
    background: #2d8cf0;
    color: #fff;
  }


  .right {
    text-align: right;
  }
</style>