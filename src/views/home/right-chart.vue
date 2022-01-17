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
  <div class="card card-animate">
    <div class="card-body">
      <h4 class="card-title d-inline-block">存储桶概况</h4>
      <div class="content" ref="visitChart">
        <div class="loading">
          <div class="main">
            <span></span>
          </div>
          <div class="text">客官请稍后</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require('echarts');

  import {
    getHomeStorsge
  } from "@/api";

  export default {
    data() {
      return {
        Data: [],
        y1Data: [],
        y2Data: [],
      };
    },
    created() {
      this._getRightChart();
    },
    methods: {
      _getRightChart() {
        getHomeStorsge().then((res) => {
          this.Data = res.data;
          this.handleSetVisitChart();

        });
      },

      handleSetVisitChart() {
        this.visitChart = echarts.init(this.$refs.visitChart);
        this.visitChart.setOption({


          tooltip: {
            trigger: 'item'
          },
        
          series: [{
            name: '存储量/MB',
            type: 'pie',
            radius: '50%',
            data: this.Data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        });

      },
      handleResize() {
        this.visitChart.resize();
      },
    },
    mounted() {},
    beforeDestroy() {
      if (this.visitChart) {
        this.visitChart.dispose();
        this.visitChart = null;
      }
    },
  };
</script>
<style scoped lang="less">
  .content {
    height: 400px;
    margin-top: 0;
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