# vue-backstage

> 后台系统 [参考项目](https://github.com/lin-xin/vue-manage-system/blob/master/src%2Fcomponents%2Fcommon%2FHeader.vue) [线上地址](http://blog.gdfengshuo.com/example/work/#/dashboard)

## 步骤

``` bash
# 初始化
vue init webpack vue-backstage

# 进入目录
cd vue-backstage

# 安装npm包
npm install

# 安装element-ui
npm i element-ui -S

# 安装babel-polyfill， ES6->ES5
npm install babel-polyfill -S

# 安装axio,一个基于 promise 的 HTTP 库
npm install axios -S

# 本地开发
npm run dev
```
## 待处理的功能点
[ ] utls/validate.js定义全局验证规则

## 相关资料文档
### element-ui
[input-slots](http://element-cn.eleme.io/#/zh-CN/component/input#input-slots)

### vue
[如何使用rules对表单字段进行校验](http://www.cnblogs.com/luoxuemei/p/9295506.html)
[使用Event Bus进行兄弟组件之前的通信](https://www.w3cplus.com/vue/component-communication.html)

### ES6
[array.some()](http://www.runoob.com/jsref/jsref-some.html)
[array.filter()](http://www.runoob.com/jsref/jsref-filter.html)