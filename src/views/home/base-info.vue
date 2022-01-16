<template>
  <Row :gutter="24">
    <Col v-bind="grid" class="ivu-mb">
    <div class="card card-animate">
      <div class="card-body">
        <div class="avatar-sm float-right">
          <span class="avatar-title bg-soft-primary rounded-circle">
            <span class="osuu-net geek-chengyuan"></span>
          </span>
        </div>
        <h6 class="text-muted text-uppercase mt-0">成员总数</h6>

        <h3 class="my-3">
          <span v-if="!loading">{{data.userCount}}</span>
          <Icon custom="osuu-net geek-jiazai" v-else />
        </h3>

      </div>
    </div>
    </Col>
    <Col v-bind="grid" class="ivu-mb">
    <div class="card card-animate">
      <div class="card-body">
        <div class="avatar-sm float-right">
          <span class="avatar-title bg-soft-primary rounded-circle">
            <span class="osuu-net geek-cunchushebei"></span>
          </span>
        </div>
        <h6 class="text-muted text-uppercase mt-0">占用存储</h6>
        <h3 class="my-3">
          <span v-if="!loading">{{turnSize(data.imgSize)}}</span>
          <Icon custom="osuu-net geek-jiazai" v-else />
        </h3>
      </div>
    </div>
    </Col>
    <Col v-bind="grid" class="ivu-mb">
    <div class="card card-animate">
      <div class="card-body">
        <div class="avatar-sm float-right">
          <span class="avatar-title bg-soft-primary rounded-circle">
            <span class="osuu-net geek-duosucai"></span>
          </span>
        </div>
        <h6 class="text-muted text-uppercase mt-0">图片总数</h6>
        <h3 class="my-3">
          <span v-if="!loading">{{data.imgCount}}</span>
          <Icon custom="osuu-net geek-jiazai" v-else />
        </h3>

      </div>
    </div>
    </Col>
    <Col v-bind="grid" class="ivu-mb">
    <div class="card card-animate">
      <div class="card-body">
        <div class="avatar-sm float-right">
          <span class="avatar-title bg-soft-primary rounded-circle">
            <span class="osuu-net geek-ai-img"></span>
          </span>
        </div>
        <h6 class="text-muted text-uppercase mt-0">我的图片</h6>
        <h3 class="my-3">
          <span v-if="!loading">{{data.imgMyCount}}</span>
          <Icon custom="osuu-net geek-jiazai" v-else />
        </h3>
      </div>
    </div>
    </Col>
  </Row>
</template>
<script>
  import {
    getUserHome
  } from "@/api/index";
  import {
    toSize
  } from "@/utils/index"
  export default {
    data() {
      return {
        grid: {
          xl: 6,
          lg: 12,
          md: 12,
          sm: 12,
          xs: 24,
        },
        data: {},
        loading:true
      };
    },

    computed: {
      turnSize() {
        return (val) => {
          return toSize(val)
        };
      },
    },
    created() {
      this._getHome();
    },
    methods: {
      _getHome() {
        getUserHome().then((res) => {
          this.data = res.data;
          this.loading = false
        });
      },
    },
  };
</script>
<style scoped>
  .avatar-title .osuu-net {
    font-size: 25px;
    color: #2d8cf0;

  }

  .geek-jiazai {
    -webkit-animation: turn 2s linear infinite;
  }

  @-webkit-keyframes turn {
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>