<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <base-info />
        <Row :gutter="24">
          <Col :lg="{ span: 16 }">
          <leftchart></leftchart>
          </Col>
          <Col :lg="{ span: 8 }">
          <rightchart></rightchart>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import baseInfo from "./base-info";
  import leftchart from "./left-chart";
  import rightchart from "./right-chart";

  import {
    getUser
  } from "@/api/index";

  export default {
    data() {
      return {
        user: {},

      };
    },
    created() {},

    components: {
      baseInfo,
      leftchart,
      rightchart
    },
    methods: {
      goLink(url) {
        var {
          href
        } = this.$router.resolve({
          path: url,
        });
        window.open(href);
      },

    },
  };
</script>

<style lang="less" scoped>
  @deep: ~">>>";

  .ivu-mb {
    width: 33.33%;
    position: relative;
    float: left;
    margin-bottom: 30px !important;
    text-align: center;
    cursor: pointer;

    .iconfont {
      margin-bottom: 10px;
    }

    p:hover {
      color: #2d8cf0
    }
  }

  .card-title {
    margin-bottom: 10px;
  }

  @{deep}.ivu-divider-inner-text {
    color: #999
  }

  .ivu-alert {
    padding-right: 8px;
  }
</style>