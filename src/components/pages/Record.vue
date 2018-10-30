<template>
    <div class="table">
        <el-breadcrumb separator="/" class="title">
            <el-breadcrumb-item><i class="icon iconfont icon-createtask"></i> 基础表格</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="record_list" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址"> <!--:formatter="formatter" -->
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                record_list: [],
                select_cate: '',
                select_word: ''
            }
        },
        methods: {
            getData() {
                this.url = '/v1/login-record';
                this.$axios.get(this.url, {
                    page: this.current_page
                }).then((res)=> {
                    console.log(res);
                    this.record_list = res.data.rows;
                });
            },
            formatter() {},
            delAll() {},
            search() {},
            handleSelectionChange() {},
            handleEdit() {},
            handleDelete() {},
            handleCurrentChange() {}
        },
        created() {
            this.getData();
        }
    }
</script>
<style lang="less" scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.pagination {
    margin: 20px 0;
    text-align: right;
}
</style>
