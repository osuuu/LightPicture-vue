<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">软件更新</div>
          <div class="card-body">
             <Alert show-icon>为较好的体验感，系统不会自动检测新版本，需点击“检测更新”手动获取</Alert>
            <div class="auth">
              <div class="title" v-if="isUpdate"> 发现新版本啦</div>
              <div class="title" v-else>
                <Icon type="md-thumbs-up" color="#ff5473" />
                当前已是最新版啦</div>
              <div class="version"> 当前程序版本：{{config.version}} （{{config.time}}）</div>

              <div class="version" v-if="isUpdate"> 最新程序版本：{{data.version}} （{{data.time}}） </div>



              <Button v-if="!isUpdate" type="primary" @click="_getData" :loading="loading">检测更新</Button>



              <p style="margin:5px 0 15px 0" v-if="isUpdate" v-html="data.info"></p>
              <Button v-if="isUpdate" type="success" @click="_postUpdate" :loading="editload">立即更新</Button>



            </div>

            <Divider />
            <div class="auth" v-if="speedload">
              <div class="speed" v-if="!error">
                <span class="loader-77"> </span>
              </div>
              <div class="speed-sm">
                {{explain}}
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal" title="数据库更新" class-name="vertical-center-modal" footer-hide>
      <iframe src="/admin/home/update" frameborder="0"></iframe>
    </Modal>
  </div>
</template>

<script>
  import {
    getUpdate,
    postUpdate,
  } from "@/api/index";
  import {
    mapState,
  } from 'vuex'
  export default {
    data() {
      return {
        data: {},
        loading: false,
        isUpdate: false,
        editload: false,
        speedload: false,
        error: false,
        explain: "",

        file: ""
      };
    },
    computed: {
      ...mapState(['config']),
    },

    methods: {
      // 获取更新
      _getData() {
        this.loading = true
        getUpdate().then((res) => {
          this.loading = false
          if (res.code == 1001) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
          }
          if (res.code == 1002) {
            this.data = res.data
            this.isUpdate = true
          }
        });
      },

      // 更新
      _postUpdate() {
        this.editload = true
        this.speedload = true
        this.explain = "程序更新中...请不要返回和关闭页面，请保持网络通畅"
        postUpdate().then((res) => {
          if (res.code == 200) {
            this.error = true
            this.editload = false
            this.explain = res.msg
          } else {
            this.error = true
            this.explain = '更新失败... '+res.msg
            this.editload = false
          }
        });

        // this.error = false
      },

    
    



    },
  };
</script>

<style lang="less" scoped>
  iframe {
    width: 100%;
    min-height: 200px;
  }

  .auth {
    padding: 12px;
    background-color: #fff;
    border: 1px solid #f7f7f7;
    border-left: 4px solid #339fd4;
    border-radius: 5px;
    position: relative;
    margin-bottom: 20px;

    .title {
      color: #ff5473;
      font-weight: 600;
      font-size: 18px;
    }

    .version {
      line-height: 35px;
    }

    .btn {
      margin: 10px 0;
    }
  }

  .speed-sm {
    margin: 5px 0;
    font-size: 14px;
    color: #1C1D1F;
  }

  .speed {


    .loader-77 {
      width: 100%;
      height: 8px;
      display: inline-block;
      position: relative;
      overflow: hidden;
    }

    .loader-77::before {
      content: "";
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.15);
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
      background-size: 15px 15px;
      z-index: 10;
    }

    .loader-77::after {
      content: "";
      width: 0%;
      height: 100%;
      background-image: linear-gradient(to right, rgb(16, 142, 233) 0%, rgb(135, 208, 104) 100%);
      position: absolute;
      border-radius: 0 4px 4px 0;
      top: 0;
      left: 0;
      -webkit-animation: animFw 10s ease-in infinite;
      animation: animFw 10s ease-in infinite;
    }

    @-webkit-keyframes animFw {
      0% {
        width: 0;
      }

      100% {
        width: 100%;
      }
    }

    @keyframes animFw {
      0% {
        width: 0;
      }

      100% {
        width: 100%;
      }
    }
  }
</style>