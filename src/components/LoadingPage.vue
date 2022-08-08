<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="loader">
        <div class="loading_box">
            <div class="symbol">
                <p>Loading...</p>
                <div class="symbolDiv"></div>
                <div class="success">
                    <img class="successImg" :src="success" alt="" />
                </div>
                <p>{{ percent }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            percent: '0%',
            imgsLength: 0,
            imgSrcArr: [],
            success: require('@/static/images/success.png'),
        };
    },
    mounted: function () {
        this.preload();
    },
    methods: {
        preload: function () {
            let imgs = [];
            // 遍历@/static/images文件夹，获取图片名称

            const files = require.context('@/static/images', true, /\.*\.png$/).keys();

            files.forEach(item => {
                imgs.push({
                    src: require('../static/images/' + item.slice(2)),
                    name: item.slice(2, -4),
                });
            });
            this.imgsLength = imgs.length;

            for (let img of imgs) {
                let image = new Image();
                image.name = img.name;
                image.src = img.src;
                this.imgSrcArr.push({
                    src: img.src,
                    name: img.name,
                });
                image.onload = () => {
                    this.count++;
                    // 计算图片加载的百分数，绑定到percent变量
                    let percentNum = Math.floor((this.count / imgs.length) * 100);
                    this.percent = `${percentNum}%`;
                };
            }
        },
    },

    watch: {
        count: function (val) {
            if (val === this.imgsLength && this.imgsLength != 0) {
                // 暂停动画
                var symbolDiv = document.querySelector('.symbolDiv');
                var success = document.querySelector('.success');
                var successImg = document.querySelector('.successImg');
                var loader = document.querySelector('.loader');
                var loading_box = document.querySelector('.loading_box');
                symbolDiv.classList.add('paused');
                success.style.display = 'block';
                // 延迟执行
                setTimeout(() => {
                    successImg.style.transform = 'scale(1)';
                }, 100);
                setTimeout(() => {
                    loader.style.left = '-100%';
                    loading_box.style.left = '-100%';
                }, 1000);

                this.percent = '数据加载完毕！';
                this.imgSrcArr = JSON.stringify(this.imgSrcArr);
                // 图片加载完成后跳转页面
                // this.$router.push({
                //     path: '/index',
                //     name: 'index',
                //     params: {
                //         imgSrcArr: JSON.stringify(this.imgSrcArr),
                //     },
                // });
                // 延迟执行
                setTimeout(() => {
                    this.$emit('imgArr', this.imgSrcArr);
                }, 2000);
            }
        },
    },
};
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

body {
    font-size: 15px;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
html {
    font-family: 'Roboto', sans-serif;
}

.loader {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    margin: 0;
    background: #34495d;
    z-index: 1000;
    transition: all 1s;
    overflow: hidden;
}
.loader .loading_box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 350px;
    height: 300px;
    padding: 50px;
    border: 2px solid #9febe0;
    border-radius: 100px;
    background: #34495d;
    box-shadow: 5px 5px 50px 15px rgba(0, 255, 235, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s;
}
.loader .loading_box .symbol {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.loader .loading_box .symbol p {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    line-height: 1;
    /* margin: 30px 0; */
}
.loader .loading_box .symbol .symbolDiv {
    width: 50px;
    height: 50px;
    /* margin: 0px auto; */
    border-radius: 50%;
    border-top: 5px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    background: rgba(255, 255, 255, 0);
    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
.paused {
    animation-play-state: paused;
    display: none;
}
.success {
    width: 60px;
    height: 60px;
    margin: 30px 0;
    display: none;
}
.successImg {
    width: 100%;
    height: 100%;
    transform: scale(0);
    transition: all 1s;
}
.symbolDiv {
    margin: 30px;
}
</style>
