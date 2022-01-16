<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-head">系统设置</div>
          <div class="card-body">
            <div class="demo-spin-container" v-if="loading">
              <Spin fix size="large"></Spin>
            </div>
            <Tabs type="card" :animated="false" v-else>
              <TabPane label="基础配置">
                <Form :label-width="140">
                  <FormItem v-for="item in basicsList" :key="item.id" :label="item.title">
                    <i-switch v-if="item.attr == 'switch'" v-model="item.value" true-value="1" false-value="0" />
                    <InputNumber v-if="item.attr == 'number'" v-model="item.value" :min="0" style="width: 70%">
                    </InputNumber>
                    <Input v-if="item.attr == 'input'" v-model="item.value" :placeholder="item.title"></Input>
                    <RadioGroup v-if="item.attr == 'radio'" v-model="item.value">
                      <Radio v-for="(items, ind) in item.extend" :key="ind" :label="items">{{ items }}</Radio>
                    </RadioGroup>
                    <p style="font-size:12px;color:#999" v-if="item.des">
                      * {{item.des}}
                    </p>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="Save(basicsList,true)" :loading="creating">保存</Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane label="邮箱配置">
                <Form :label-width="120">
                  <FormItem v-for="item in emailList" :key="item.id" :label="item.title">
                    <Input v-if="item.attr == 'input'" v-model="item.value" :placeholder="item.title"></Input>
                    <RadioGroup v-if="item.attr == 'radio'" v-model="item.value">
                      <Radio v-for="(items, ind) in item.extend" :key="ind" :label="items">{{ items }}</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="Save(emailList)" :loading="creating">保存</Button>
                    <Button type="warning" @click="sendTest" :loading="creating2">发送测试邮件</Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getSetup,
    putSetup,
    postSendMail,
    getIndex
  } from "@/api";
  import {
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        emailList: [],
        basicsList: [],
        sms: {},
        creating: false,
        creating2: false,
        loading: true
      };
    },
    created() {
      this._getData();
    },

    methods: {
      ...mapMutations(["addConfig"]),
      // 获取列表
      _getData() {
        getSetup("basics").then((res) => {
          this.basicsList = res.data;
          this.loading = false
        });
        getSetup("email").then((res) => {
          this.emailList = res.data;
          this.loading = false
        });
      },
      // 基础配置
      Save(arr, reload) {
        this.creating = true;
        putSetup({
          createData: arr,
        }).then((res) => {
          if (res.code == 200) {
            this.$Message.success({
              background: true,
              content: res.msg,
            });
            this._getData();

            if (reload == true) {
              getIndex().then((res) => {
                this.addConfig(res.data)
                location.reload();
              });
            }

          } else {
            this.$Message.error({
              background: true,
              content: res.msg,
            });
          }
          this.creating = false;
        });
      },
      // 测试邮件
      sendTest() {
        this.$Modal.confirm({
          title: "发送测试邮件",
          content: "请确保当前设置已配置完毕且已保存，当前登录用户邮箱是否能接收邮件，是否发送测试？",
          onOk: () => {
            this.creating2 = true
            postSendMail().then(res => {
              if (res.code == 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg,
                });
              } else {
                this.$Message.error({
                  background: true,
                  content: res.msg,
                });
              }
              this.creating2 = false
            })
          },
        });

      }
    },
  };
</script>

<style lang="less" scoped>
  .card-body {
    min-height: 435px;
  }

  .ivu-radio-wrapper {
    margin-right: 20px;
  }

  .ivu-btn {
    margin-right: 10px;
  }
</style>