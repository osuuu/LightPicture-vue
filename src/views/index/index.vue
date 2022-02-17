<!-- 
// +----------------------------------------------------------------------
// | LightPicture [ 图床 ]
// +----------------------------------------------------------------------
// | 企业团队图片资源管理系统
// +----------------------------------------------------------------------
// | Github: https://github.com/osuuu/LightPicture
// +----------------------------------------------------------------------
// | Copyright © http://picture.h234.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Team <admin@osuu.net>
// +---------------------------------------------------------------------- 
-->
<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">

        <Row :gutter="24">
          <Col :xxl="imgInfo.id == 0?24:12" :xl="imgInfo.id == 0?24:12" :lg="imgInfo.id == 0?24:12"
            :md="imgInfo.id == 0?24:12" :sm="24" :xs="24">
          <div :class="['card',{w100:imgInfo.id == 0}]">
            <div class="card-body">
              <Upload multiple type="drag" :action="action" :show-upload-list="false" :format="config.upload_rule"
                :max-size="config.upload_max" paste :on-success="onSuccess" :on-error="onError"
                :on-format-error="onFormatError" :on-exceeded-size="onExceededSize" :before-upload="beforeUpload"
                :data="data">
                <div :class="['p50',{p100:imgInfo.id == 0}]">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点此上传图片，支持拖拽上传</p>
                </div>
              </Upload>
            </div>
          </div>
          </Col>
          <Col v-if="imgInfo.id != 0" :xxl="12" :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <div class="card">
            <div class="card-body">
              <Tabs value="URL" :animated="false">
                <TabPane v-for="(item,key,index) in TabsList" :key="index" :label="key" :name="key">
                  <div class="pre" v-clipboard:copy="item" v-clipboard:success="onCopy" v-clipboard:error="onError">
                    {{item}}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          </Col>
        </Row>



        <div class="card" v-if="imgList.length > 0">
          <div class="card-body">
            <Row :gutter="24">

              <Col :xxl="3" :xl="4" :lg="6" :md="8" :sm="8" :xs="12" class="ivu-mb " v-for="item in imgList"
                :key="item.id">
              <Card class="list-goods-list-item" :class="{active:item.id == imgInfo.id}">
                <div class="img-main" @click="imgClick(item)">
                  <img :src="item.url" alt="">
                </div>
                <Tooltip :content="item.name" placement="top">
                  <div class="name">
                    {{item.name}}
                  </div>
                </Tooltip>
              </Card>
              </Col>
            </Row>
          </div>
        </div>

      </div>
    </div>
    <Notice :success="success" :all="all"></Notice>
  </div>
</template>

<script>
  import {
    postUpload
  } from "@/api"
  import Notice from '../../components/Notice.vue';
  import {
    mapState
  } from "vuex";
  export default {
    components: {
      Notice
    },
    data() {
      return {
        action: process.env.VUE_APP_BASE_API + "/api/upload",
        data: {
          key: ""
        },
        imgInfo: {
          id: 0
        },
        imgList: [],
        TabsList: {
          URL: "",
          HTML: "",
          CSS: "",
          BBCode: "",
          Markdown: "",
        },
        success: 0,
        all: 0,
      };
    },
    created(){
      this.data.key = this.userInfo.Secret_key
    },

    watch: {
      userInfo: {
        handler: function (val, oldVal) {
          if (this.userInfo.Secret_key) {
            this.data.key = this.userInfo.Secret_key
          }
        },
        // 深度观察监听
        deep: true,
      },
    },
    computed: {
      ...mapState(["userInfo", "config"]),
    },

    methods: {
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
      imgClick(item) {
        this.imgInfo = {
          ...item
        }
        for (let key in this.TabsList) {
          switch (key) {
            case 'URL':
              this.TabsList[key] = this.imgInfo.url
              break;
            case 'HTML':
              this.TabsList[key] = '<img src="' + this.imgInfo.url + '" alt="' + this.imgInfo.name + '">'
              break;
            case 'CSS':
              this.TabsList[key] = 'background: url(' + this.imgInfo.url + ') no-repeat; \n background-size: 100% 100%;'
              break;
            case 'BBCode':
              this.TabsList[key] = '[img]' + this.imgInfo.url + '[/img]'
              break;
            case 'Markdown':
              this.TabsList[key] = '![' + this.imgInfo.name + '](' + this.imgInfo.url + ')'
              break;
            default:
              this.TabsList[key] = "error";
          }
        }
      },
      //  上传成功钩子
      onSuccess(res, file, fileList) {
        if (res.code == 200) {
          this.imgList.unshift(res.data)
          this.imgClick(res.data)

          this.success++
          setTimeout(() => {
            if (this.success == this.all) {
              this.success = 0
              this.all = 0
            }
          }, 2000)
        } else {
          if (this.success > 0) this.success--
          if (this.all > 0) this.all--
          this.$Message.error({
            background: true,
            content: res.msg,
          });
        }

      },
      // 上传失败钩子
      onError(error, file, fileList) {
        this.$Message.error({
          background: true,
          content: "上传失败 - " + file.name,
        });
      },
      // 上传之前钩子
      beforeUpload(res, file, fileList) {
        this.all++
      },
      // 文件格式验证失败时的钩子
      onFormatError(file) {
        this.$Message.error({
          background: true,
          content: "不支持此格式上传",
        });
      },
      // 文件超出指定大小限制时的钩子
      onExceededSize(file) {
        this.$Message.error({
          background: true,
          content: "文件超出指定大小限制",
        });
      }

    },
  };
</script>

<style lang="less" scoped>
  .list-goods-list-item {
    margin-bottom: 15px;

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


  }

  .active {
    background: rgba(204, 232, 255, 0.5);
    border: 1px solid rgba(153, 209, 255, 0.57);
  }

  .pre {
    height: 123px;
    padding: 10px 15px;
    overflow-y: scroll;
    border: 1px solid #dadada;
    background-color: #f7f7f7;
    font-size: 14px;
    color: #555;
    border-radius: 3px;
    cursor: pointer;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  .w100 {
    width: 100%;
  }

  .p50 {
    padding: 50px 0;
  }

  .p100 {
    padding: 150px 0;
  }
</style>