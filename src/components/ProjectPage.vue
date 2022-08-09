<template>
    <div class="project">
        <div class="projectBox">
            <div
                class="projectItemDiv"
                v-for="(item, index) of projectArr"
                :key="index"
                v-show="item.show"
                :style="{ width: '33%', transform: item.transform }"
            >
                <div class="projectItem">
                    <div class="toolbar">
                        <div class="title" :title="item.title">{{ item.title }}</div>
                        <div class="toolbarBox">
                            <div class="preview" title="预览"></div>
                            <div class="closure" title="关闭" @click="showState(item.show, index)"></div>
                        </div>
                    </div>
                    <div class="Introduction">
                        <div>
                            <span class="smallTitle">技术栈：</span>
                            <span>{{ item.type }}</span>
                        </div>
                        <div>
                            <span class="smallTitle">类型：</span>
                            <span>{{ item.functionTxt }}</span>
                        </div>
                        <div>
                            <span class="smallTitle">适用平台：</span>
                            <span>{{ item.platform }}</span>
                        </div>
                        <div class="introductionTxt">
                            <span class="smallTitle">简介：</span>
                            <span :title="item.introduction">{{ item.introduction }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //
            projectArr: [
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    functionTxt: '时间日历选择器',
                    platform: 'PC & Mobile',
                    introduction: 'yyyy-mm-dd||hh:mm:ss,滚轮选择时间，日历选择',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '粤港澳大湾区气象监测预警预报中心',
                    functionTxt: '官网',
                    type: 'JavaScript',
                    platform: 'PC',
                    introduction: '粤港澳大湾区气象监测预警预报中心官网介绍',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '天文日历',
                    type: 'JavaScript',
                    functionTxt: '时间日历选择器',
                    platform: 'Mobile',
                    introduction: '移动版日历，日期推算，干支计算',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '抚州雷电预警',
                    type: 'uni-app(Vue2)',
                    functionTxt: '官网',
                    platform: 'PC & Mobile',
                    introduction: '抚州雷电预警信息查看，自适应设备',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '深圳市国家气候观象台数字服务平台',
                    type: 'JavaScript',
                    functionTxt: '官网',
                    platform: 'PC',
                    introduction: '深圳市国家气候观象台数字服务平台数据查看，通过一个iframe标签来切换显示不同的页面',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '深圳市大鹏新区南澳街道南隆社区气象监测预警',
                    type: 'JavaScript',
                    functionTxt: '官网',
                    platform: 'PC',
                    introduction: '深圳市大鹏新区南澳街道南隆社区气象监测预警信息查看，页面模块可全屏显示',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '野行海钓',
                    type: 'uni-app(Vue2)',
                    functionTxt: '微信小程序',
                    platform: 'Mobile',
                    introduction: '自定义日历组件',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
            ],
        };
    },
    methods: {
        //
        showState(state, index) {
            this.projectArr[index].transform = 'scale(0)';
            // 延迟执行
            setTimeout(() => {
                this.projectArr[index].show = !state;
            }, 500);
        },
    },
    mounted() {
        //
        var height3 = document.documentElement.clientHeight;
        var projectBox = document.querySelector('.projectBox');
        projectBox.style.height = height3 - 88 * 2 - 16 * 2 + 'px';
    },
    created() {
        // 根据type值排序
        this.projectArr.sort((a, b) => {
            return a.type.localeCompare(b.type);
        });
    },
};
</script>

<style>
body {
    background-color: #24175b;
}
</style>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.project {
    transition: all 0.5s;
    position: absolute;
    top: 16px;
    left: -100%;
    z-index: 1;
}

.projectItem {
    width: 200px;
    height: 98%;
}

.toolbar {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: rgb(226, 226, 226, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px 6px 0 0;
}

.toolbarBox {
    display: flex;
    align-items: center;
}

.preview,
.closure {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.preview {
    background-color: #ffbd05;
}

.closure {
    background-color: #ff0000;
    margin-left: 16px;
}

.title {
    font-family: monospace;
    font-weight: bold;
    font-size: 16px;
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.Introduction {
    width: 100%;
    height: 80%;
    padding: 12px;
    box-sizing: border-box;
    background-color: #ffffff;
    font-size: 12px;
    line-height: 2;
    letter-spacing: 2px;
}

.smallTitle {
    font-weight: bold;
}

.projectBox {
    width: 620px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    overflow: hidden;
    overflow-y: auto;
}

.projectBox::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.projectBox::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #747474;
}

.projectBox::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #eaeaea;
}

.projectItemDiv {
    box-sizing: border-box;
    position: relative;
    transition: all 0.5s;
    height: 33.33%;
}

.introductionTxt {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
