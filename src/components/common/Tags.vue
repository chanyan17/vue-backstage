<template>
    <div class="tags" v-if="tagsList.length">
        <ul>
            <li class="tags-li" v-for="(item, index) in tagsList" :key="index" :class="{'active': isActive(item.path)}">
                <div class="tag-item">
                    <router-link :to="item.path" class="tags-li-title">
                        <i class="icon iconfont icon-label"></i>
                        <span>{{ item.title }}</span>
                    </router-link>
                    <i class="icon iconfont icon-close close-tag" @click="closeTag(index)"></i>
                </div>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-button-group>
                <el-button type="primary" size="mini" round @click="closeOther">关闭其他</el-button>
                <el-button type="primary" size="mini" round @click="closeAll">关闭所有</el-button>
            </el-button-group>
        </div>
    </div>
</template>
<script>
    import { eventBus } from '../../main';
    export default {
        data() {
            return {
                tagsList: []
            };
        },
        methods: {
            isActive(path) {
                return path == this.$route.fullPath;
            },
            setTags(route) {
                const isExist = this.tagsList.some(item => {
                    return item.path == route.fullPath;
                })
                if(!isExist) {
                    console.log(this.tagsList.length);
                    if(this.tagsList.length >= 6) {
                        this.tagsList.unshift();
                        console.log(this.tagsList.length);
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.name
                    });
                    eventBus.$emit('tags', this.tagsList);
                }
            },
            closeTag(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];

                if(item) {
                    // 如果当前路由就是点击删掉的tag，那就跳过去新tag;否则当前路由不用处理
                    delItem.path == this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
                eventBus.$emit('tags', this.tagsList);
            },
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
                eventBus.$emit('tags', this.tagsList);
            },
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
                eventBus.$emit('tags', this.tagsList);
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created() {
            this.setTags(this.$route)
        }
    }
</script>
<style scoped>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding: 5px 165px 5px 5px;
    box-shadow: 0 5px 5px #ddd;
}
.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #409eff;
    background: #fff;
    color: #409eff;
    vertical-align: middle;
    transition: all .3s ease-in;
}
.tags-li:not(.active):hover {
    background: #f8f8f8;
}
.tags-li.active {
    background-color: #409eff;
    color: #fff;
}
.tags-li-title {
    display: flex;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #409eff;
}
.tags-li.active .tags-li-title {
    color: #fff;
}
.tag-item {
    position: relative;
    padding: 0px 35px 0px 5px;
}
.tag-item span {
    margin-left: 2px;
}
.close-tag {
    position: absolute;
    right: 5px;
    top: 0px;
    height: 23px;
    line-height: 23px;
}
.tags-close-box {
    position: absolute;
    right: 5px;
    top: 5px;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 160px;
    height: 30px;
    background: #fff;
    z-index: 10;
}
</style>
