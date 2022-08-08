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
                        <div class="title">{{ item.title }}</div>
                        <div class="toolbarBox">
                            <div class="preview" title="预览"></div>
                            <div class="closure" title="关闭" @click="showState(item.show, index)"></div>
                        </div>
                    </div>
                    <div class="Introduction">
                        <div>
                            <span class="smallTitle">类型：</span>
                            <span>{{ item.type }}</span>
                        </div>
                        <div>
                            <span class="smallTitle">功能：</span>
                            <span>时间选择器</span>
                        </div>
                        <div>
                            <span class="smallTitle">适用平台：</span>
                            <span>{{ item.platform }}</span>
                        </div>
                        <div>
                            <span class="smallTitle">简介：</span>
                            <span>{{ item.introduction }}</span>
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
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
                    show: true,
                    transform: 'scale(1)',
                    url: '',
                },
                {
                    title: '时间选择器',
                    type: 'JavaScript',
                    platform: 'PC & Mobile',
                    introduction: '滚轮选择时间(yyyy-mm-dd||hh:mm:ss,日历选择)',
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
    },
    created() {
        //
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
    margin-bottom: 12px;
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
}

.Introduction {
    width: 100%;
    height: 180px;
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
}

.projectItemDiv {
    box-sizing: border-box;
    position: relative;
    transition: all 0.5s;
}
</style>
