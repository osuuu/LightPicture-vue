<template>
    <div>
        <div class="pages">
            <div class="pages-img">
                <div class="pages-img-element">
                </div>
            </div>
            <div class="pages-content">
                <h1>404</h1>
                <div class="pages-content-desc">抱歉，你访问的页面不存在</div>
                <Button type="primary" @click="$router.push('/')">返回首页</Button>
                <Button style="margin-left:10px" @click="$router.go(-1)">返回上一页</Button>
            </div>
        </div>
    </div>
</template>
<script>

</script>

<style lang="less" scoped>
    .pages {
        display: -webkit - box;
        display: -ms - flexbox;
        display: flex;
        webkit-box-align: center;
        ms-flex-align: center;
        align-items: center;
        height: 80%;
        min-height: 500 px;

        .pages-img {
            padding-right: 88px;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 62.5%;
            flex: 0 0 62.5%;
            width: 62.5%;
            padding-right: 152px;
            zoom: 1;

            .pages-img-element {
                float: right;
                width: 100%;
                max-width: 430px;
                height: 360px;
                background-image: url('../../../assets/imgs/404.png');
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background-size: contain;
            }
        }

        .pages-content {
            -webkit-box-flex: 1;
            -ms-flex: auto;
            flex: auto;

            h1 {
                margin-bottom: 24px;
                color: #515a6e;
                font-weight: 600;
                font-size: 72px;
                line-height: 72px;
            }

            .pages-content-desc {
                margin-bottom: 16px;
                color: #808695;
                font-size: 20px;
                line-height: 28px;
            }
        }
    }

    @media screen and (max-width: 576px) {
        .pages {
            display: block;
            text-align: center;

            .pages-img {
                margin: 0 auto 24px;
                padding-right: 0;
            }
        }
    }

    @media screen and (max-width: 480px) {
        .pages-img {
            margin-bottom: -24px;
            overflow: hidden;
        }
    }
</style>