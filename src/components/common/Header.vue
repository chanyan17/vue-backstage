<template>
    <div class="header">
        <el-row>
            <el-col :span="12">
                <div class="grid-content header-left" @click="handleCollapse">
                    <span class="logo"><i class="icon iconfont icon-manage"></i></span>
                    <span class="name">Backstage Manage System</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content header-right">
                    <div class="fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen ? `取消全屏`: `全屏`" placement="bottom">
                            <i class="icon iconfont icon-fullscreen"></i>
                        </el-tooltip>
                    </div>
                    <router-link class="message" to="message">
                        <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                            <i class="icon iconfont icon-remind"></i>
                        </el-tooltip>
                        <em class="unread-point" v-if="message"></em>
                    </router-link>
                    <div class="user">
                        <img class="avatar" src="../../assets/default_avatar.jpg"/>
                        <span class="name">{{ username }}</span>
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link action"><i class="icon iconfont icon-switch"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>github地址</el-dropdown-item>
                                <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import { eventBus } from '../../main';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                message: 2,
                name: 'admin'
            };
        },
        computed: {
            username() {
                let username = localStorage.getItem('bms_username');
                return username ? username : this.name;
            }
        },
        methods: {
            handleCollapse() {
                this.collapse = !this.collapse;
                // 使用Event Bus进行兄弟组件之前的通信
                eventBus.$emit('collapse', this.collapse);
            },
            handleFullScreen() {
                let element = document.documentElement;
                this.fullscreen = !this.fullscreen;
                if(this.fullscreen) {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }else{
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            },
            handleCommand(command) {
                if(command == 'loginout') {
                    localStorage.removeItem('bms_username');
                    this.$router.push('/login');
                }
            }
        },
        mounted() {
            if(document.body.clientWidth < 1500) {
                this.handleCollapse();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 18px;
        color: #fff;
    }
    .icon {
        font-size: 28px;
        color: #fff;
    }
    .header-left {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
    .logo {
        padding: 0 5px 0 20px;
        height: 60px;
        line-height: 60px;
    }
    .header-right {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        height: 60px;
        line-height: 60px;
    }
    .fullscreen {
        padding: 0 10px;
        cursor: pointer;
    }
    .message {
        position: relative;
        padding: 0 10px;
        cursor: pointer;
    }
    .user {
        display: flex;
        align-items: center;
        padding: 0 20px 0 10px;
        height: 60px;
        line-height: 60px;
    }
    .avatar {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
    }
    .name {
        padding: 0 5px;
    }
    .action {
        cursor: pointer;
    }
    .unread-point {
        position: absolute;
        right: 10px;
        top: 15px;
        width: 6px;
        height: 6px;
        line-height: 5px;
        border-radius: 50%;
        background-color: red;
    }
    .el-dropdown {
        height: 60px;
    }
</style>

