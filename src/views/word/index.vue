<template>
  <div>
    <div class="page-content">
      <div class="container-fluid">
        <Row :gutter="24">
          <Col :xl="6" :lg="6" :md="0" :sm="0" :xs="0">
          <Card shadow title="接口文档" icon="md-book" :padding="0">
            <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
              <Cell v-for="(item,index) in menuList" :key="index" :title="item.title" :name="item.id"
                :label="item.label" :selected="currentType === item.id" />

            </CellGroup>
          </Card>
          </Col>
          <Col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
          <Card :bordered="false" dis-hover>
            <Row>
              <Col :xl="0" :lg="0" :md="24" :sm="24" :xs="24">
              <Tabs :value="currentType" @on-click="handleChangeCell">
                <TabPane v-for="(item,index) in menuList" :key="index" :name="item.id" :label="item.title" />

              </Tabs>
              </Col>
            </Row>
            <uploads v-if="currentType === 'uploads'" />
            <deletes v-if="currentType === 'deletes'" />
         
          </Card>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import uploads from "./upload";
  import deletes from "./delete";

  export default {
    components: {
      uploads,
      deletes,
    
    },
    data() {
      return {
        currentType: "uploads",
        menuList: [{
          id: "uploads",
          title: "上传图片",
          label: "上传图片接口说明",
        },{
          id: "deletes",
          title: "删除图片",
          label: "删除图片接口说明",
        }]
      };
    },
    methods: {
      handleChangeCell(name) {
        this.currentType = name;
      },
    },
  };
</script>

<style lang="less" scoped>
  @deep: ~">>>";

  @{deep}.ivu-cell-label {
    color: #999;
  }
  /deep/.ivu-card-shadow {
    border: 1px solid #ffffff;
  }
</style>