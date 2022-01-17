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
    <Modal
      title="修改头像"
      v-model="modal"
      width="430"
      @on-ok="confirm"
      @on-cancel="close"
    >
      <div class="avatarList">
        <img
          v-for="item in avatarList"
          :key="item"
          :src="item"
          :class="{ active: avatarItem == item }"
          @click="changeItem(item)"
        />
      </div>
      <p> * 以上头像素材取自阿里云，商用请留意版权</p>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
    },
  },
  data() {
    return {
      modal: true,
      avatarList: [
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_beauty.jpg",
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_colleagues.jpg",
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_family.jpg",
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_friend.jpg",
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg",
        "https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_trade.jpg",
      ],
      avatarItem: "",
    };
  },
  created() {
    this.avatarItem = this.avatar;
    this.modal = true;
  },
  methods: {
    changeItem(item) {
      this.avatarItem = item;
    },
    close() {
      this.$emit("close");
    },
    confirm(){
      this.$emit("confirm",this.avatarItem);
    }
  },
};
</script>

<style lang="less" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.avatarList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    margin: 5px 0;
    width: 120px;
  }
  .active {
    border: 2px solid blue;
  }
}
p{
  text-align: center;
  color: #888;
  font-size: 12px;
}
@media (max-width: 767.98px) {
  .avatarList img {
    width: 100px;
  }
}
</style>