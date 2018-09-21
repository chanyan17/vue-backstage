<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-menu></v-menu>
        <div class="content-wrapper" :class="{'content-collapse': collapse, 'content-none-tag': !tagsList.length}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import vHeader from './Header.vue';
    import vMenu from './Menu.vue';
    import vTags from './Tags.vue';
    import { eventBus } from '../../main';
    export default {
        data() {
            return {
                collapse: false,
                tagsList: []
            };
        },
        components: {
            vHeader,
            vMenu,
            vTags
        },
        created() {
            eventBus.$on('collapse', msg => {
                this.collapse = msg;
            })

            eventBus.$on('tags', msg => {
                let arr = [];

                for(let i=0, len=msg.length; i<len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }

                this.tagsList = arr;
            })
        },
        mounted() {
            window.vue = this;
        }
    }
</script>
<style scoped>
.content-wrapper {
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    padding-bottom: 40px;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}
.content-wrapper.content-collapse {
    left: 65px;
}
.content-wrapper.content-none-tag {
    padding-bottom: 0px;
}
.content {
     width: auto;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
}
</style>
