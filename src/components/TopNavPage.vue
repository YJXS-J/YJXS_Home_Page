<template>
    <div id="topNav">
        <div class="topNavContent">
            <div class="logo">
                <img class="logoImg" :src="logoArc" alt="" @click="goTo(goToSrc)" />
            </div>
            <div class="navIBox">
                <div
                    class="navItem"
                    v-for="(item, index) of navItemArr"
                    :key="index"
                    :src="item.src"
                    @click="goTo(item.src)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logoArc: require('../assets/logo.png'),
            goToSrc: '/index',
            navItemArr: [
                {
                    name: '首页',
                    src: '/index',
                },
                {
                    name: '项目',
                    src: '/project',
                },
                {
                    name: '题库',
                    src: '/questionBank',
                },
            ],
        };
    },
    methods: {
        goTo(src) {
            this.$router.push(src);
        },
    },
};
</script>

<style scoped>
#topNav {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    /* background-color: rgba(255, 255, 255, 0.5); */
    color: #fff;
    display: flex;
}

.topNavContent {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    width: 50px;
    height: 50px;
}

.logoImg {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.navIBox {
    display: flex;
}

.navItem {
    height: 60px;
    line-height: 60px;
    margin-left: 30px;
    text-align: right;
    cursor: pointer;
}
</style>
