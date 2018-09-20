<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-row class="user-info">
                        <el-col :span="12">
                            <div class="grid-content">
                                <img src="../../assets/default_avatar.jpg" alt="" class="avatar">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <div class="infos">
                                    <div class="username">admin</div>
                                    <div class="role">超级管理员</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="login-info">
                        <div class="login-time">
                            <div class="title">上次登录时间：</div>
                            <div class="value">2018-01-01</div>
                        </div>
                        <div class="login-place">
                            <div class="title">上次登录地点：</div>
                            <div class="value">东莞</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card language-details">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <div class="language-progress">
                        <span>Vue</span>
                        <el-progress :percentage="0" color="#409eff"></el-progress>
                        <span>JavaScript</span>
                        <el-progress :percentage="70" color="#8e71c7"></el-progress>
                        <span>CSS</span>
                        <el-progress :percentage="80" color="#67c23a"></el-progress>
                        <span>HTML</span>
                        <el-progress :percentage="80" color="#f56c6c"></el-progress>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20 data-card">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-icon">
                                <i class="icon iconfont icon-people bg-blue"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num color-blue">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-icon">
                                <i class="icon iconfont icon-remind bg-green"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num color-green">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-icon">
                                <i class="icon iconfont icon-manage bg-red"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num color-red">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card class="box-card todo-something">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="addDialogVisible = true">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="296" class="todo-list">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="70">
                            <template slot-scope="scope">
                                <i class="icon iconfont icon-editor" @click="editDialogVisible = true"></i>
                                <i class="icon iconfont icon-empty" @click="open2"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card user-access">
                    <div id="c1"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card access-trend">
                    <div style="height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
            title="添加待办事项"
            :visible.sync="addDialogVisible"
            width="50%">
            <el-form :model="form">
                <el-form-item label="待办事项" :label-width="formLabelWidth">
                <el-input v-model="form.todo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
                <el-dialog
            title="编辑待办事项"
            :visible.sync="editDialogVisible"
            width="50%">
            <el-form :model="form">
                <el-form-item label="待办事项" :label-width="formLabelWidth">
                <el-input v-model="form.todo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import G2 from '@antv/g2';
    export default {
        data() {
            return {
                checked: false,
                todoList: [{
                        title: '今天要修复100个bug',
                        status: false,
                    },{
                        title: '今天要修复100个bug',
                        status: true,
                    }],
                addDialogVisible: false,
                editDialogVisible: false,
                formLabelWidth: '70px',
                form: {
                    todo: ''
                }
            };
        },
        methods: {
            open2() {
                this.$confirm('此操作将永久删除该事项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 },
                { genre: 'Shooter', sold: 350 },
                { genre: 'Other', sold: 150 }
            ]; 
            // Step 1: 创建 Chart 对象
            const chart = new G2.Chart({
                container: 'c1', // 指定图表容器 ID
                width : 400, // 指定图表宽度
                height : 300 // 指定图表高度
            });
            // Step 2: 载入数据源
            chart.source(data);
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
            // Step 4: 渲染图表
            chart.render();
        }
    }
</script>
<style lang="less" scoped>
.user-info {
    display: flex;
    align-items: center;
    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .infos {
        width: 100px;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
    }
    .username {
        font-size: 32px;
        font-weight: bold;
    }
}
.login-info {
    margin-top: 20px;
    border-top: 2px solid #ccc;
    .title,
    .value {
        flex: 1;
    }
}
.login-time,
.login-place {
    display: flex;
    margin-top: 10px;
    color: #ccc;
    font-size: 14px;
}
.language-details {
    margin-top: 20px;
}
.data-card {
    .grid-icon {
        display: flex;
        align-items: center;
        height: 100px;
        font-size: 14px;
        color: #999;
        text-align: center;
    }
    .grid-cont-right {
        flex: 1;
    }
    .grid-icon .icon {
        flex: 1;
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
    .grid-num {
        font-size: 30px;
        font-weight: 700;
    }
}
.bg-blue {
    background-color: #2d8cf0;
}
.bg-green {
    background-color: #64d572;
}
.bg-red {
    background-color: #f25e43;
}
.color-blue {
    color: #2d8cf0;
}
.color-green {
    color: #64d572;
}
.color-red {
    color: #f25e43;
}
.todo-something {
    margin-top: 20px;
    height: 394px;
    .icon {
        font-size: 20px;
        cursor: pointer;
    }
    .item {
        box-sizing: border-box;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
    }
    .todo-item-del {
        text-decoration: line-through;
        color: #ccc;
    }
}
.user-access,
.access-trend {
    margin-top: 20px;
}

</style>
