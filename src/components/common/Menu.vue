<template>
    <div class="menu">
        <el-menu
            :default-active="currentRouter"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#3b5079"
            text-color="#fff"
            active-text-color="#6aa3dc"
            unique-opened
            router>
            <template v-for="menu in menus">
                <template v-if="menu.subs">
                    <el-submenu :index="menu.index" :key="menu.index">
                        <template slot="title">
                            <i class="icon iconfont" :class="menu.icon"></i>
                            <span slot="title">{{ menu.title }}</span>
                        </template>
                        <template v-for="subMenu in menu.subs">
                            <el-submenu v-if="subMenu.subs" :index="subMenu.index" :key="subMenu.index">
                                <span slot="title">{{ subMenu.title }}</span>
                                <el-menu-item v-for="threeMenu in subMenu.subs" :key="threeMenu.index" :index="threeMenu.index">
                                    {{ threeMenu.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subMenu.index" :key="subMenu.index">
                                <span slot="title">{{ subMenu.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="menu.index" :key="menu.index">
                        <i class="icon iconfont" :class="menu.icon"></i>
                        <span slot="title">{{ menu.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <!-- <el-menu-item index="1">
                <i class="icon iconfont icon-homepage"></i>
                <span slot="title">系统首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="icon iconfont icon-createtask"></i>
                <span slot="title">登录记录</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="icon iconfont icon-message"></i>
                <span slot="title">消息中心</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="icon iconfont icon-dynamic"></i>
                <span slot="title">数据分析</span>
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title">
                    <i class="icon iconfont icon-workbench"></i>
                    <span slot="title">相关功能</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">基础表单</span>
                    <el-menu-item index="1-1">新建用户</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="文件上传">
                    <el-menu-item index="1-3">广告发布</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">编辑器</span>
                    <el-menu-item index="1-4-1">富文本编辑器</el-menu-item>
                    <el-menu-item index="1-4-2">markdown编辑器</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="6">
                <i class="icon iconfont icon-warning"></i>
                <span slot="title">错误处理</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
    import { eventBus } from '../../main';
    export default {
        data() {
            return {
                isCollapse: false,
                menus: [
                    {
                        icon: 'icon-homepage',
                        index: 'home',
                        title: '系统首页'
                    },
                    {
                        icon: 'icon-createtask',
                        index: 'record',
                        title: '登录记录'
                    },
                    {
                        icon: 'icon-message',
                        index: 'message',
                        title: '消息中心'
                    },
                    {
                        icon: 'icon-dynamic',
                        index: 'graph',
                        title: '数据分析'
                    },
                    {
                        icon: 'icon-workbench',
                        index: '5',
                        title: '表单创建',
                        subs: [
                            {
                                index: 'form',
                                title: '基础表单'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            },
                            {
                                index: '5-3',
                                title: '编辑器',
                                subs: [
                                    {
                                        index: 'richTextEditor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdownEditor',
                                        title: 'markdown编辑器'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'icon-warning',
                        index: '6',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }
                ]
            };
        },
        computed: {
            currentRouter() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            eventBus.$on('collapse', msg => {
                this.isCollapse = msg;
            });
        }
    }
</script>
<style scoped>
    .menu {
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        overflow-y: auto;
    }
    .icon {
        font-size: 24px;
        color: #FFF;
    }
    .el-menu-vertical-demo {
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        border: none;
    }
</style>