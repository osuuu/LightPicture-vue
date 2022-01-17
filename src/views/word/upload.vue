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
  <div class="setting-account-account">
    <h2>上传图片</h2>

    <div class="ivu-mt ivu-pl ivu-pr">
      <Divider orientation="left">请求接口</Divider>
      <Alert type="success">{{userInfo.scheme}}://{{userInfo.url}}/api/upload</Alert>
      <Divider orientation="left">请求方式</Divider>
      <Alert>POST</Alert>
      <Divider orientation="left">JSON 请求示例</Divider>
      <Table :columns="columns1" :data="data1" border> </Table>
      <json-viewer :value="jsonData1" :copyable="{ copyText: '复制', copiedText: '复制成功' }" preview-mode></json-viewer>
      <Divider orientation="left">JSON 响应示例</Divider>
      <Table :columns="columns2" :data="data2" border> </Table>

      <json-viewer :value="jsonData2" :copyable="{ copyText: '复制', copiedText: '复制成功' }" preview-mode></json-viewer>
    </div>
  </div>
</template>
<script>
  import JsonViewer from "vue-json-viewer";
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        jsonData1: {
          file: "(binary)",
          key: "0135b7d8cd98e4a8289be628ff35aab9",
        },
        jsonData2: {
          code: "200",
          msg: "成功",
          data: {
            create_time: "2022-01-08 23:23:39",
            id: "1083",
            ip: "192.168.1.3",
            md5: "123",
            mime: "image/gif",
            name: "202201082323395119.gif",
            path: "LightPicture/2022/01/202201082323395119.gif",
            size: 17887,
            storage_id: 1003,
            update_time: "2022-01-08 23:23:39",
            url: "https://geek-1252271632.cos.ap-chengdu.myqcloud.com/LightPicture/2022/01/202201082323395119.gif",
            user_id: 1
          }
        },
        columns1: [{
            title: "参数",
            align: "center",
            minWidth: 60,
            key: "param",
          },
          {
            title: "类型",
            align: "center",
            minWidth: 120,
            key: "type",
          },
          {
            title: "约束",
            align: "center",
            minWidth: 120,
            key: "restrain",
          },
          {
            title: "描述",
            align: "center",
            minWidth: 120,
            key: "des",
          },
          {
            title: "示例",
            align: "center",
            minWidth: 120,
            key: "example",
          },
        ],
        columns2: [{
            title: "参数",
            align: "center",
            minWidth: 80,
            key: "param",
          },
          {
            title: "类型",
            align: "center",
            minWidth: 120,
            key: "type",
          },
          {
            title: "描述",
            align: "center",
            minWidth: 120,
            key: "des",
          },
          {
            title: "示例",
            align: "center",
            minWidth: 120,
            key: "example",
          },
        ],
        data1: [{
            param: "file",
            type: "(binary)",
            restrain: "必填",
            des: "图片文件",
            example: "-",
          },
          {
            param: "key",
            type: "String",
            restrain: "必填",
            des: "用户API密钥",
            example: "-",
          },
        ],
        data2: [{
            param: "code",
            type: "String",
            des: "状态码",
            example: "200成功 400失败",
          },
          {
            param: "msg",
            type: "String",
            des: "对应状态码的信息",
            example: "例如：“发送成功”",
          },
          {
            param: "data",
            type: "Array",
            des: "图片信息",
            example: "-",
          },
        ],
      };
    },
    components: {
      JsonViewer,
    },
    computed: {
      ...mapState(["userInfo"]),
    },
  };
</script>
<style lang="less" scoped>
  .setting-account-account {
    h2 {
      font-size: 21px;
    }

    .ivu-col {
      h4 {
        span {
          margin-right: 8px;
        }
      }

      p {
        margin-top: 8px;
        color: #808695;
      }
    }
  }

  .jv-container.jv-light {
    outline: 1px solid #ccc;
    margin-top: 10px;
  }

  .string {
    color: green;
  }

  .number {
    color: darkorange;
  }

  .boolean {
    color: blue;
  }

  .null {
    color: magenta;
  }

  .key {
    color: red;
  }

  
</style>