<template>
    <div id="index" :style="{ backgroundImage: DOMCSS.bgc }">
        <!-- <TopNav /> -->
        <div class="mainCard">
            <!-- 文字 -->
            <div class="text" :style="{ left: DOMCSS.left, opacity: DOMCSS.opacity }">
                <span class="textItem">YJXS</span>
                <span class="textItem">HomePage</span>
            </div>
            <!-- 播放按钮 -->
            <div class="playBtn" @click="play()">
                <img class="playBtnImg" :src="playBtnImg" :style="{ transform: transform2 }" alt="" />
            </div>
            <!-- 链接 -->
            <div class="linkBox">
                <div
                    class="linkItem"
                    :style="{ right: item.right, top: item.top + 'px', opacity: DOMCSS.opacity }"
                    v-for="(item, index) of linkSrcArr"
                    :key="index"
                    @click="goTo(item.src)"
                >
                    <img class="linkItemImg" :src="item.img" alt="" srcset="" />
                    <div class="linkItemTxt">{{ item.txt }}</div>
                </div>
            </div>
            <!-- 时间 -->
            <div class="time" :style="{ right: DOMCSS.right, opacity: DOMCSS.opacity }">
                <span class="timeItem">{{ time }}</span>
            </div>
        </div>
        <!-- 图片 -->
        <div class="mainPng">
            <img
                @mousemove="moveEvent"
                @mouseleave="mouseleave"
                @click="imgToggle()"
                class="indexPng"
                :src="indexPngArr[showIndex]"
                :style="{ transform: DOMCSS.transform, filter: DOMCSS.filter, opacity: DOMCSS.opacity2 }"
            />
        </div>
    </div>
</template>

<script>
// import TopNav from '../components/TopNavPage.vue';
export default {
    components: {
        // TopNav,
    },
    data() {
        return {
            indexPngArr: [
                require('../assets/carousel0.png'),
                require('../assets/carousel1.png'),
                require('../assets/carousel2.png'),
                require('../assets/carousel3.png'),
            ],
            linkSrcArr: [
                {
                    img: require('../assets/github.png'),
                    txt: 'GitHub',
                    src: 'https://github.com/YJXS-J',
                },
                {
                    img: require('../assets/github.png'),
                    txt: 'GitHub2',
                    src: 'https://github.com/YJXS-J',
                },
                {
                    img: require('../assets/github.png'),
                    txt: 'GitHub3',
                    src: 'https://github.com/YJXS-J',
                },
                {
                    img: require('../assets/github.png'),
                    txt: 'GitHub4',
                    src: 'https://github.com/YJXS-J',
                },
                {
                    img: require('../assets/github.png'),
                    txt: 'GitHub5',
                    src: 'https://github.com/YJXS-J',
                },
            ],
            showIndex: Math.floor(Math.random() * 3),
            DOMCSS: {
                // 背景色
                gradient: '#B10000, #500FC8, #005BFD',
                bgc: 'linear-gradient(45deg, #780000, #682254, #314264)',
                deg: 45,
                // 文字移入
                left: '-50%',
                right: '-50%',
                right2: '-50%',
                opacity: 0,
                // 图片放大切换
                transform: 'scale(0)',
                filter: 'drop-shadow(0 0 5px #fff)',
                opacity2: 1,
                imgState: true,
                // 是否可点击龙珠按钮
                slide: false,
            },
            playBtnImg: require('../assets/playBtn.png'),
            playRotate: 0,
            transform2: 'rotate(0deg)',
            playState: true,
            blurRadius: 3,
            enlarge: true,
            timer1: null,
            timer2: null,
            timer3: null,
            // 时间
            time: 'yyyy-mm-dd hh:mm:ss',
        };
    },
    created() {
        this.timerFun();
        // 获取页面高度
        var height = (document.documentElement.clientHeight - 88 * 2) / 2;
        var height2 = this.linkSrcArr.length * 72;

        console.log(height);
        for (let i = 0; i < this.linkSrcArr.length; i++) {
            this.linkSrcArr[i].right = '-50%';
            this.linkSrcArr[i].top = height - height2 + i * 72 + height2 / 2;
        }
    },
    mounted() {
        // 文字移入
        setTimeout(() => {
            this.DOMCSS.opacity = 0.3;
            this.DOMCSS.left = '25%';
            this.DOMCSS.right2 = '16%';
            this.DOMCSS.right = '16px';
            setTimeout(() => {
                this.DOMCSS.opacity = 1;
            }, 500);
        }, 1000 / 30);
        // 倒for循环
        for (let i = this.linkSrcArr.length - 1; i >= 0; i--) {
            setTimeout(() => {
                this.linkSrcArr[i].right = '16%';
            }, (1000 / 30) * (this.linkSrcArr.length - i));
        }
        // 图片放大
        setTimeout(() => {
            this.DOMCSS.transform = 'scale(0.8)';
        }, 100);
        // 允许滑动
        setTimeout(() => {
            this.DOMCSS.slide = true;
        }, 600);
        // 获取时间
        this.getTime();
        setInterval(() => {
            this.getTime();
        }, 1000);
    },
    methods: {
        // 定时器
        timerFun() {
            // 背景色滚动渐变
            this.timer1 = setInterval(() => {
                this.DOMCSS.bgc = 'linear-gradient(' + this.DOMCSS.deg + 'deg' + ', ' + this.DOMCSS.gradient;
                (')');
                if (this.DOMCSS.deg.toFixed(1) == 360) {
                    this.DOMCSS.deg = 0;
                } else {
                    this.DOMCSS.deg += 1;
                }
            }, 50);
            // 图片阴影循环
            this.timer2 = setInterval(() => {
                if (this.blurRadius <= 12 && this.enlarge) {
                    this.blurRadius += 0.5;
                } else {
                    this.enlarge = false;
                }
                if (this.blurRadius >= 3 && !this.enlarge) {
                    this.blurRadius -= 0.5;
                } else {
                    this.enlarge = true;
                }
                this.DOMCSS.filter = 'drop-shadow(0 0 ' + this.blurRadius + 'px #fff)';
            }, 100);
            // 龙珠按钮滚动
            this.timer3 = setInterval(() => {
                if (this.playRotate >= 360) {
                    this.playRotate = 0;
                } else {
                    this.playRotate += 1;
                }
                this.transform2 = 'rotate(' + this.playRotate + 'deg)';
            }, 1000 / 60);
        },
        // 监听鼠标
        moveEvent() {
            if (this.DOMCSS.slide) {
                this.DOMCSS.transform = 'scale(1.2)';
            }
        },
        mouseleave() {
            if (this.DOMCSS.slide) {
                this.DOMCSS.transform = 'scale(0.8)';
            }
        },
        // 图片切换
        imgToggle() {
            // 防止重复点击（还没切换完就点击）
            if (this.DOMCSS.imgState) {
                this.DOMCSS.opacity2 = 0;
                this.DOMCSS.imgState = false;
                setTimeout(() => {
                    if (this.showIndex == this.indexPngArr.length - 1) {
                        this.showIndex = 0;
                    } else {
                        this.showIndex += 1;
                    }
                    setTimeout(() => {
                        this.DOMCSS.opacity2 = 1;
                        this.DOMCSS.imgState = true;
                    }, 0);
                }, 500);
            }
        },
        // 龙珠播放按钮
        play() {
            if (this.playState && this.DOMCSS.slide) {
                clearInterval(this.timer1);
                clearInterval(this.timer2);
                clearInterval(this.timer3);
                this.playState = false;
            } else if (!this.playState) {
                this.timerFun();
                this.playState = true;
            }
        },
        // 链接跳转
        goTo(src) {
            window.open(src, '_blank');
        },
        getTime() {
            this.time = new Date().toLocaleString();
            var date = new Date();
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            var hour = ('0' + date.getHours()).slice(-2);
            var minute = ('0' + date.getMinutes()).slice(-2);
            var second = ('0' + date.getSeconds()).slice(-2);
            // 星期
            var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            var weekDay = week[date.getDay()];
            this.time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ' ' + weekDay;
        },
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#index {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 88px;
    /* 禁止选中 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.mainCard {
    width: 100%;
    height: 100%;
    border: 1px solid #2e28a5;
    border-radius: 8px;
    background-image: linear-gradient(to right, #241558, #20267b, #172761);
    position: relative;
    overflow: hidden;
}

.text {
    font-size: 72px;
    color: #fff;
    font-family: fantasy, Monospace;
    font-style: italic;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 12px;
    /* 过渡效果 */
    transition: all 0.5s;
}

.textItem {
}

.mainPng {
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 88px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    transition: all 0.1s;
}

.indexPng {
    height: 100%;
    transition: all 0.5s;
    cursor: pointer;
}

.playBtn {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 999;
}

.playBtnImg {
    width: 100%;
    height: 100%;
    cursor: pointer;
    filter: drop-shadow(rgb(255, 255, 255) 0px 0px 3px);
}

.linkBox {
    /* position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16%; */
    color: #fff;
}

.linkItem {
    position: absolute;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    transition: all 0.5s;
    width: 200px;
}

.linkItem:hover {
    /* 添加下划线 */
    text-decoration: underline;
}

.linkItemImg {
    width: 36px;
    height: 36px;
    margin-right: 16px;
}

.linkItemTxt {
    font-size: 28px;
    font-family: fantasy, Monospace;
    font-style: italic;
    letter-spacing: 6px;
    line-height: 1;
}

.time {
    width: 350px;
    position: absolute;
    bottom: 16px;
    /* right: 16px; */
    color: #fff;
    font-size: 24px;
    font-family: fantasy, Monospace;
    letter-spacing: 3px;
    transition: all 0.5s;
}
</style>
