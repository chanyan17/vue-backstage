<template>
    <div class="table">
        <el-breadcrumb separator="/" class="title">
            <el-breadcrumb-item><i class="icon iconfont icon-message"></i> 消息中心</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <el-tabs v-model="tabName" @tab-click="tabClick">
                <el-tab-pane label="未读消息(1)" name="unread-msg"></el-tab-pane>
                <el-tab-pane label="已读消息(2)" name="read-msg"></el-tab-pane>
                <el-tab-pane label="回收站(3)" name="recovery-msg"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="listData"
                :showHeader="false"
                style="width: 100%">
                <el-table-column
                    prop="msg"
                    width="560">
                </el-table-column>
                <el-table-column
                    prop="date"
                    width="180">
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        v-show="tabName == 'unread-msg'">标记已读</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-show="tabName == 'read-msg'">删除</el-button>
                    <el-button
                        size="mini"
                        v-show="tabName == 'recovery-msg'">还原</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="batch-action">
                <el-button type="primary" v-show="tabName == 'unread-msg'">标记全部已读</el-button>
                <el-button type="danger" v-show="tabName == 'read-msg'">删除全部</el-button>
                <el-button type="primary" v-show="tabName == 'recovery-msg'">还原全部</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabName: 'unread-msg',
                listData: [{
                    date: '2016-05-02',
                    msg: '王小虎'
                }, {
                    date: '2016-05-04',
                    msg: '王小虎'
                }, {
                    date: '2016-05-01',
                    msg: '王小虎'
                }, {
                    date: '2016-05-03',
                    msg: '王小虎'
                }]
            };
        },
        methods: {
            tabClick: function() {
                console.log(this.tabName);
            }
        }
    }
</script>
<style lang="less" scoped>

.batch-action {
    margin-top: 20px;
}
</style>