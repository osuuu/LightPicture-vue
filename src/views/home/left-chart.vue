<template>
  <div class="card card-animate">
    <div class="card-body">
      <h4 class="card-title d-inline-block">
        近期动态
        <div class="menu">
          <Select v-model="read" style="width:100px" size="small" @on-change="onChange" v-if="userInfo.role.is_admin == 1">
            <Option v-for="item in userList" :value="item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
          <Select v-model="type" style="width:100px;margin-left:10px" @on-change="onChange" size="small">
            <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
        </div>
      </h4>

      <div style="height:380px">


        <div class="loading" v-if="loading">
          <div class="main">
            <span></span>
          </div>
          <div class="text">客官请稍后</div>
        </div>
        <List v-else>
          <Scroll height="380" :on-reach-bottom="handleReachBottom">
            <ListItem v-for="item in data" :key="item.id">
              <ListItemMeta :avatar="item.user.avatar"
                :title="`${item.content} ${item.operate_cont?' - '+item.operate_cont:''} ${item.operate_id?' （'+item.operate_id+'）':''} `"
                :description="`${item.create_time} - ${item.user.email} ${item.user.username?' ('+item.user.username+')':''}`" />
            </ListItem>
          </Scroll>
        </List>

      </div>
    </div>
  </div>
</template>
<script>
  import {
    getHomeLog
  } from "@/api/index";
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        data: [],
        page: 1,
        size: 10,
        read: 1,
        userList: [{
            key: 1,
            name: "只看我的"
          },
          {
            key: 2,
            name: "全部成员"
          },

        ],
        type: 1,
        typeList: [{
            key: 1,
            name: "全部动态"
          },
          {
            key: 2,
            name: "图片操作"
          }, {
            key: 3,
            name: "系统操作"
          }
        ],
        loading: true,

      };
    },
    created() {
      this._getData();
    },
    computed: {
      ...mapState(["userInfo", "config"]),
    },

    methods: {
      _getData() {
        getHomeLog({
          page: this.page,
          size: this.size,
          read: this.read,
          type: this.type,
        }).then((res) => {
          res.data.data.map((item) => {
            this.data.push(item)
          })
          this.loading = false
        });
      },
      onChange() {
        this.loading = true
        this.page = 1
        this.data = []
        this._getData();
      },
      handleReachBottom() {
        return new Promise(resolve => {
          setTimeout(() => {
            this.page++
            this._getData();
            resolve();
          }, 2000);
        });
      }

    },

  };
</script>
<style scoped lang="less">
  /deep/.ivu-scroll-container::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  /deep/.ivu-scroll-container::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgb(204, 204, 204);
    border-radius: 9px;
  }

  /deep/.ivu-scroll-container::-webkit-scrollbar-track {
    background-color: rgb(238, 238, 238);
    border-radius: 9px;
  }

  .menu {
    float: right;
    font-weight: normal;
  }

  .card-title {
    margin-bottom: 20px;
  }

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .text {
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }

    .main {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      position: relative;
      border: 5px solid lightgreen;
      -webkit-animation: turn 2s linear infinite;
    }

    .main span {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: lightgreen;
      position: absolute;
      left: 50%;
      margin-top: -15px;
      margin-left: -15px;
      -webkit-animation: changeBgColor 2s linear infinite;
    }

    @-webkit-keyframes changeBgColor {
      0% {
        background: lightgreen;
      }

      100% {
        background: lightblue;
      }
    }

    @-webkit-keyframes turn {
      0% {
        -webkit-transform: rotate(0deg);
        border-color: lightgreen;
      }

      100% {
        -webkit-transform: rotate(360deg);
        border-color: lightblue;
      }
    }
  }
</style>