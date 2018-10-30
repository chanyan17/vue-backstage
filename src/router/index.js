import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Frame.vue'], resolve),
            meta: {title: '系统文件'},
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: resolve => require(['../components/pages/Home.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/record',
                    name: 'record',
                    component: resolve => require(['../components/pages/Record.vue'], resolve),
                    meta: {title: '登录记录'}
                },
                {
                    path: '/message',
                    name: 'message',
                    component: resolve => require(['../components/pages/Message.vue'], resolve),
                    meta: {title: '消息中心'}
                },
                {
                    path: '/graph',
                    name: 'graph',
                    component: resolve => require(['../components/pages/Graph.vue'], resolve),
                    meta: {title: '数据分析'}
                },
                {
                    path: '/form',
                    name: 'form',
                    component: resolve => require(['../components/pages/Form.vue'], resolve),
                    meta: {title: '基础表单'}
                },
                {
                    path: '/upload',
                    name: 'upload',
                    component: resolve => require(['../components/pages/Upload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    path: '/richTextEditor',
                    name: 'richTextEditor',
                    component: resolve => require(['../components/pages/RichTextEditor.vue'], resolve),
                    meta: {title: '富文本编辑器'}
                },
                {
                    path: '/markdownEditor',
                    name: 'markdownEditor',
                    component: resolve => require(['../components/pages/MarkdownEditor.vue'], resolve),
                    meta: {title: 'markdown编辑器'}
                },
                {
                    path: '/permission',
                    name: 'permission',
                    component: resolve => require(['../components/pages/Permission.vue'], resolve),
                    meta: {title: '权限测试'}
                },
                {
                    path: '/404',
                    name: '404',
                    component: resolve => require(['../components/pages/404.vue'], resolve),
                    meta: {title: '404页面'}
                },
                {
                    path: '/403',
                    name: '403',
                    component: resolve => require(['../components/pages/403.vue'], resolve),
                    meta: {title: '403页面'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/pages/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
