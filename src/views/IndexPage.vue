<template>
    <div id="index" :style="{ backgroundImage: DOMCSS.bgc }">
        <!-- 加载页面 -->
        <LoadingPage @imgArr="imgArr" v-show="LoadingPageShow" />
        <!-- <TopNav /> -->
        <div class="mainCard" v-show="!LoadingPageShow">
            <!-- 文字 -->
            <div class="text" :style="{ left: DOMCSS.left, opacity: DOMCSS.opacity }">
                <span class="textItem">YJXS</span>
                <span class="textItem">HomePage</span>
                <!-- 语言 -->
                <div class="language">
                    <div class="languageTxt">Languages</div>
                    <div class="proportion">
                        <div
                            class="proportionItem"
                            v-for="(item, index) of proportionArr"
                            :key="index"
                            :style="{ backgroundColor: item.color, width: item.width }"
                        ></div>
                    </div>
                    <div class="languageBox">
                        <div class="languageItem" v-for="(item, index) of proportionArr" :key="index">
                            <div class="origin" :style="{ backgroundColor: item.color }"></div>
                            {{ item.name }} {{ item.proportion }}
                        </div>
                    </div>
                </div>
                <!-- 提交记录 -->
                <div class="commit">
                    <div class="commitTxt">CommitRecord</div>
                    <div class="commitBox" @mouseenter="stopTimer4()" @mouseleave="continueTimer4()">
                        <div class="scrollBox" :style="{ top: topScroll + 'px' }">
                            <div class="commitItem" v-for="(item, index) of commitsArr" :key="index">
                                <div class="commitName" :title="item.name">{{ item.name }}</div>
                                <div class="commitmessage" :title="item.message">{{ item.message }}</div>
                                <div class="commitTime" :title="item.date">{{ item.date }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    @click="goTo(item.src, item.target, item.txt)"
                >
                    <img class="linkItemImg" :src="item.img" alt="" srcset="" />
                    <div class="linkItemTxt">{{ item.txt }}</div>
                </div>
            </div>
            <!-- 时间 -->
            <div class="time" :style="{ right: DOMCSS.right, opacity: DOMCSS.opacity }" @click="comeBakc()">
                <span class="timeItem">{{ time }}</span>
            </div>
            <!-- 项目 -->
            <ProjectPage v-show="projectState" />
            <!-- 题库 -->
            <QuestionBankPage v-show="questionBankState" />
        </div>
        <!-- 图片 -->
        <div class="mainPng" v-show="!LoadingPageShow">
            <img
                v-for="(item, index) of indexPngArr"
                :key="index"
                :src="item"
                v-show="index == showIndex"
                @mousemove="moveEvent"
                @mouseleave="mouseleave"
                @click="imgToggle()"
                class="indexPng"
                :style="{ transform: DOMCSS.transform, filter: DOMCSS.filter, opacity: DOMCSS.opacity2 }"
            />
        </div>
    </div>
</template>

<script>
// import TopNav from '../components/TopNavPage.vue';
import LoadingPage from '@/components/LoadingPage';
import ProjectPage from '@/components/ProjectPage';
import QuestionBankPage from '@/components/QuestionBankPage';
import axios from 'axios';

export default {
    components: {
        // TopNav,
        LoadingPage,
        ProjectPage,
        QuestionBankPage,
    },
    data() {
        return {
            indexPngArr: [
                // require('../static/images/carousel0.png'),
                // require('../static/images/carousel1.png'),
                // require('../static/images/carousel2.png'),
                // require('../static/images/carousel3.png'),
            ],
            linkSrcArr: [
                {
                    img: require('../static/images/github.png'),
                    txt: 'GitHub',
                    src: 'https://github.com/YJXS-J',
                    target: '_blank',
                },
                {
                    img: require('../static/images/object.png'),
                    txt: '项目',
                    src: '/project',
                    target: '_self',
                },
                {
                    img: require('../static/images/question.png'),
                    txt: '题库',
                    src: 'https://github.com/YJXS-J',
                    target: '_self',
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
            topScroll: 0,
            playBtnImg: require('../static/images/playBtn.png'),
            playRotate: 0,
            transform2: 'rotate(0deg)',
            playState: true,
            blurRadius: 3,
            enlarge: true,
            timer1: null,
            timer2: null,
            timer3: null,
            timer4: null,
            // 时间
            time: 'yyyy-mm-dd hh:mm:ss',
            LoadingPageShow: true,
            screenWidth: document.documentElement.clientWidth, //屏幕宽度
            projectState: false,
            questionBankState: false,
            itemActive: 'home',
            proportionArr: [],
            commitsArr: [],
            isDown: true,
            scrollTop: 0,
        };
    },
    created() {
        // 语言颜色处理
        function colorFUN(value) {
            var color = '';
            if (value == 'Vue') {
                color = '#41b883';
            }
            if (value == 'JavaScript') {
                color = '#f1e05a';
            }
            if (value == 'HTML') {
                color = '#e34c26';
            }
            if (value == 'CSS') {
                color = '#563d7c';
            }
            return color;
        }
        // 读取缓存，如果有则不再请求（语言）
        if (sessionStorage.getItem('language')) {
            var res = JSON.parse(sessionStorage.getItem('language'));
            var values = Object.values(res);
            var total = 0;
            values.forEach(item => {
                total += item;
            });
            for (const key in res) {
                this.proportionArr.push({
                    name: key,
                    value: res[key],
                    proportion: ((res[key] / total) * 100).toFixed(2) + '%',
                    color: colorFUN(key),
                    width: 'calc(' + ((res[key] / total) * 100).toFixed(2) + '% - 1px)',
                });
            }
        } else {
            axios({
                url: 'https://api.github.com/repos/YJXS-J/YJXS_Home_Page/languages',
                params: {},
            }).then(
                data => {
                    var res = data.data;
                    // 数据保存到本地缓存中
                    sessionStorage.setItem('language', JSON.stringify(res));
                    var values = Object.values(res);
                    var total = 0;
                    values.forEach(item => {
                        total += item;
                    });
                    for (const key in res) {
                        this.proportionArr.push({
                            name: key,
                            value: res[key],
                            proportion: ((res[key] / total) * 100).toFixed(2) + '%',
                            color: colorFUN(key),
                            width: 'calc(' + ((res[key] / total) * 100).toFixed(2) + '% - 1px)',
                        });
                    }
                },
                // eslint-disable-next-line no-unused-vars
                err => {
                    this.proportionArr = [
                        {
                            name: 'Vue',
                            value: 30860,
                            proportion: '89.33%',
                            color: '#41b883',
                            width: 'calc(89.33% - 1px)',
                        },
                        {
                            name: 'JavaScript',
                            value: 3094,
                            proportion: '8.96%',
                            color: '#f1e05a',
                            width: 'calc(8.96% - 1px)',
                        },
                        {
                            name: 'HTML',
                            value: 591,
                            proportion: '1.71%',
                            color: '#e34c26',
                            width: 'calc(1.71% - 1px)',
                        },
                    ];
                }
            );
        }
        // 读取缓存，如果有则不再请求（提交记录）
        if (sessionStorage.getItem('commits')) {
            // eslint-disable-next-line no-redeclare
            var res = JSON.parse(sessionStorage.getItem('commits'));
            for (let i = 0; i < res.length; i++) {
                this.commitsArr.push(res[i].commit.committer);
                this.commitsArr[i].message = res[i].commit.message;
            }
            this.commitsArr.forEach(item => {
                item.date = this.UTC_to_BJtime(item.date);
            });
        } else {
            axios({
                url: 'https://api.github.com/repos/YJXS-J/YJXS_Home_Page/commits',
                params: {},
            }).then(
                data => {
                    var res = data.data;
                    // 数据保存到本地缓存中
                    sessionStorage.setItem('commits', JSON.stringify(res));
                    // eslint-disable-next-line no-redeclare
                    var res = res;
                    for (let i = 0; i < res.length; i++) {
                        this.commitsArr.push(res[i].commit.committer);
                        this.commitsArr[i].message = res[i].commit.message;
                    }
                    this.commitsArr.forEach(item => {
                        item.date = this.UTC_to_BJtime(item.date);
                    });
                },
                // eslint-disable-next-line no-unused-vars
                err => {}
            );
        }

        // 获取页面高度
        var height = (document.documentElement.clientHeight - 88 * 2) / 2;
        var height2 = this.linkSrcArr.length * 72;
        for (let i = 0; i < this.linkSrcArr.length; i++) {
            this.linkSrcArr[i].right = '-50%';
            this.linkSrcArr[i].top = height - height2 + i * 72 + height2 / 2;
        }
    },
    mounted() {
        // 获取时间
        this.getTime();
        setInterval(() => {
            this.getTime();
        }, 1000);
        var that = this;
        window.addEventListener('resize', function () {
            that.screenWidth = document.body.offsetWidth;
        });
    },
    watch: {
        screenWidth: function () {
            // 窗口变化直接刷新页面
            window.location.reload();
        },
        // 监听this.topScroll只执行一次
        scrollTop: {
            // eslint-disable-next-line no-unused-vars
            handler: function (oldValue, newValue) {
                if (newValue == 0) {
                    var scrollBox = document.querySelector('.scrollBox');
                    var commitItem = document.querySelectorAll('.commitItem');
                    for (let i = 0; i < commitItem.length; i++) {
                        commitItem[i].style.marginRight = 'calc(100%' + ' - ' + scrollBox.clientWidth + 'px)';
                    }
                    scrollBox.style.overflowY = 'auto';
                    scrollBox.style.overflowX = 'hidden';
                    document.querySelector('.scrollBox').addEventListener('scroll', this.scrool);
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        imgArr(imagesItem) {
            this.LoadingPageShow = false;
            var images = JSON.parse(imagesItem);
            this.indexPngArr = [];
            images.forEach(item => {
                if (item.name.slice(0, -1) == 'carousel') {
                    this.indexPngArr.push(item.src);
                }
            });
            this.showIndex = Math.floor(Math.random() * (this.indexPngArr.length - 1));
            var mainCard = document.querySelector('.mainCard');
            var mainPng = document.querySelector('.mainPng');
            var playBtn = document.querySelector('.playBtn');
            //  延迟加载
            setTimeout(() => {
                mainPng.style.bottom = '50%';
                // 图片放大
                setTimeout(() => {
                    this.DOMCSS.transform = 'scale(2)';
                }, 100);
                // 允许滑动
                setTimeout(() => {
                    this.DOMCSS.slide = true;
                }, 3000);
                setTimeout(() => {
                    mainCard.style.bottom = '0';
                    this.DOMCSS.transform = 'scale(0.8)';

                    this.timerFun();
                    var scrollBox = document.querySelector('.scrollBox');
                    this.topScroll = scrollBox.clientHeight;
                    // 文字移入
                    setTimeout(() => {
                        this.DOMCSS.opacity = 0.3;
                        this.DOMCSS.left = '22%';
                        this.DOMCSS.right2 = '16%';
                        this.DOMCSS.right = '16px';
                        setTimeout(() => {
                            this.DOMCSS.opacity = 1;
                            playBtn.style.left = mainCard.offsetWidth - playBtn.offsetWidth - 16 + 'px';

                            setTimeout(() => {
                                this.DOMCSS.opacity = 1;
                                playBtn.style.left = 'auto';
                                playBtn.style.right = '16px';
                            }, 1000);
                        }, 500);
                    }, 1000);
                    // 倒for循环
                    for (let i = this.linkSrcArr.length - 1; i >= 0; i--) {
                        setTimeout(() => {
                            this.linkSrcArr[i].right = '16%';
                        }, 1000 + (1000 / 30) * (this.linkSrcArr.length - i));
                    }
                }, 1000);
            }, 100);
        },
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
            // 文字滚动播放
            this.timer4 = setInterval(() => {
                var scrollBox = document.querySelector('.scrollBox');
                if (this.topScroll == 0) {
                    // 操控滚动条

                    if (this.isDown) {
                        //下降
                        this.scrollTop++;
                        scrollBox.scrollTop = this.scrollTop;
                        //如果滚动条超过100的话，就往上
                        //可以修改这个条件，作为折返的前提
                        if (scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.offsetHeight) {
                            this.isDown = false;
                        }
                    } else {
                        //上升
                        this.scrollTop--;
                        scrollBox.scrollTop = this.scrollTop;
                        //到达顶部的话，就下降
                        if (scrollBox.scrollTop == 0) {
                            this.isDown = true;
                        }
                    }
                } else {
                    this.topScroll -= 1;
                }
            }, 1000 / 30);
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
                clearInterval(this.timer4);
                this.playState = false;
            } else if (!this.playState) {
                this.timerFun();
                this.playState = true;
            }
        },
        // 链接跳转
        goTo(src, target, name) {
            if (target == '_blank') {
                window.open(src, target);
            } else {
                this.DOMCSS.left = '-100%';
                var project = document.querySelector('.project');
                var questionBank = document.querySelector('.questionBank');
                // 延迟执行
                setTimeout(() => {
                    if (name == '项目') {
                        this.projectState = true;
                        questionBank.style.left = '-100%';
                        setTimeout(() => {
                            project.style.left = '16px';
                            this.itemActive = name;
                        }, 100);
                    } else if (name == '题库') {
                        this.questionBankState = true;
                        project.style.left = '-100%';
                        setTimeout(() => {
                            questionBank.style.left = '16px';
                            this.itemActive = name;
                        }, 100);
                    }
                }, 100);
            }
        },
        // 获取时间
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
        // UTC时间转北京时间
        UTC_to_BJtime(utc_datetime) {
            // 转为正常的时间格式 年-月-日 时:分:秒
            var T_pos = utc_datetime.indexOf('T');
            var Z_pos = utc_datetime.indexOf('Z');
            var year_month_day = utc_datetime.substr(0, T_pos);
            var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
            var new_datetime = year_month_day + ' ' + hour_minute_second; // 2017-03-31 08:02:06

            // 处理成为时间戳
            timestamp = new Date(Date.parse(new_datetime));
            timestamp = timestamp.getTime();
            timestamp = timestamp / 1000;

            // 增加8个小时，北京时间比utc时间多八个时区
            var timestamp = timestamp + 8 * 60 * 60;

            // 时间戳转为时间
            var beijing_datetime = new Date(parseInt(timestamp) * 1000);
            var year = beijing_datetime.getFullYear();
            var month = ('0' + (beijing_datetime.getMonth() + 1)).slice(-2);
            var day = ('0' + beijing_datetime.getDate()).slice(-2);
            var hour = ('0' + beijing_datetime.getHours()).slice(-2);
            var minute = ('0' + beijing_datetime.getMinutes()).slice(-2);
            var second = ('0' + beijing_datetime.getSeconds()).slice(-2);
            var datetime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            return datetime; // yyyy-mm-dd hh:mm:ss
        },
        // 返回首页
        comeBakc() {
            if (this.itemActive == '项目') {
                var project = document.querySelector('.project');
                project.style.left = '-100%';
                setTimeout(() => {
                    this.projectState = false;
                    setTimeout(() => {
                        this.DOMCSS.left = '22%';
                        this.itemActive = 'home';
                    }, 100);
                }, 100);
            } else if (this.itemActive == '题库') {
                var questionBank = document.querySelector('.questionBank');
                questionBank.style.left = '-100%';
                setTimeout(() => {
                    this.questionBankState = false;
                    setTimeout(() => {
                        this.DOMCSS.left = '22%';
                        this.itemActive = 'home';
                    }, 100);
                }, 100);
            }
        },
        // 停止定时器4
        stopTimer4() {
            clearInterval(this.timer4);
        },
        continueTimer4() {
            // 文字滚动播放
            if (this.playState) {
                this.timer4 = setInterval(() => {
                    var scrollBox = document.querySelector('.scrollBox');
                    if (this.topScroll == 0) {
                        // 操控滚动条
                        if (this.isDown) {
                            //下降
                            this.scrollTop++;
                            scrollBox.scrollTop = this.scrollTop;
                            //如果滚动条超过100的话，就往上
                            //可以修改这个条件，作为折返的前提
                            if (scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.offsetHeight) {
                                this.isDown = false;
                            }
                        } else {
                            //上升
                            this.scrollTop--;
                            scrollBox.scrollTop = this.scrollTop;
                            //到达顶部的话，就下降
                            if (scrollBox.scrollTop == 0) {
                                this.isDown = true;
                            }
                        }
                    } else {
                        this.topScroll -= 1;
                    }
                }, 1000 / 30);
            }
        },
        scrool() {
            let scrolled = document.querySelector('.scrollBox').scrollTop;
            this.scrollTop = scrolled;
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
    transition: all 1s;
    bottom: -200%;
}

.text {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    /* 过渡效果 */
    transition: all 0.5s;
    z-index: 1;
    width: 33%;
}

.textItem {
    font-size: 72px;
    color: #fff;
    font-family: fantasy, Monospace;
    font-style: italic;
    letter-spacing: 12px;
}

.mainPng {
    height: 100%;
    /* width: 30%; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    bottom: -200%;
    padding: 88px;
    box-sizing: border-box;
    transform: translate(-50%, 50%);
    transition: all 1s;
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
    left: -100%;
    top: 16px;
    z-index: 999;
    transition: all 1s;
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
    letter-spacing: 6px;
    line-height: 1;
}

.time {
    /* width: 350px; */
    position: absolute;
    bottom: 16px;
    /* right: 16px; */
    color: #fff;
    font-size: 24px;
    font-family: fantasy, Monospace;
    letter-spacing: 3px;
    transition: all 0.5s;
    cursor: pointer;
}

.proportion {
    width: 100%;
    height: 10px;
    /* background-color: #0d1117; */
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
}

.proportionItem {
    height: 100%;
}

.languageTxt {
    font-size: 24px;
    color: #00ffff;
    font-family: fantasy, Monospace;
    font-style: italic;
    margin: 12px 0;
    letter-spacing: 5px;
}
.languageBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.origin {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 12px;
}
.languageItem {
    display: flex;
    align-items: center;
    color: #fff;
    width: 50%;
    line-height: 1;
    margin-bottom: 12px;
}
.commitItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.commitmessage {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.commitTxt {
    font-size: 24px;
    color: #82ff86;
    font-family: fantasy, Monospace;
    font-style: italic;
    margin: 12px 0;
    letter-spacing: 5px;
}
.commitBox {
    height: 138px;
    overflow: hidden;
    position: relative;
}
.scrollBox {
    position: absolute;
    width: 99%;
    bottom: 0;
    box-sizing: border-box;
}

.scrollBox::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.scrollBox::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #eaeaea;
    border-radius: 10px;
}

.scrollBox::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #747474;
    border-radius: 10px;
}
</style>
