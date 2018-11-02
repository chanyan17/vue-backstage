<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-row class="user-info">
                        <el-col :span="12">
                            <div class="grid-content">
                                <img alt="" class="avatar" :src="defaultAvatar">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <div class="infos">
                                    <div class="username" v-text="username"></div>
                                    <div class="role" v-text="roleText"></div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="login-info">
                        <div class="login-time">
                            <div class="title">上次登录时间：</div>
                            <div class="value" v-text="lastLoginTime"></div>
                        </div>
                        <div class="login-place">
                            <div class="title">上次登录地点：</div>
                            <div class="value" v-text="lastLoginAddress"></div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card language-details">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    <div class="language-progress">
                        <div v-for="(value, key, index) in progressDatas" v-bind:key="index">
                            <span >{{ value.name }}</span>
                            <el-progress :percentage="value.percentage" :color="value.color"></el-progress>
                        </div>
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
                                    <div class="grid-num color-blue">{{summaryData.userAccess.count}}</div>
                                    <div>{{summaryData.userAccess.name}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-icon">
                                <i class="icon iconfont icon-remind bg-green"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num color-green">{{summaryData.systemMsg.count}}</div>
                                    <div>{{summaryData.systemMsg.name}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-icon">
                                <i class="icon iconfont icon-manage bg-red"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num color-red">{{summaryData.totalCount.count}}</div>
                                    <div>{{summaryData.totalCount.name}}</div>
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
                    <el-table :data="todoLists" :show-header="false" height="296" class="todo-list">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.is_done"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.is_done}">{{scope.row.content}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="70">
                            <template slot-scope="scope">
                                <i class="icon iconfont icon-editor" @click="openEditDialog(scope.$index)"></i>
                                <i class="icon iconfont icon-empty" @click="confirmDelete(scope.$index)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card user-access">
                    <div id="column_graph"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card access-trend">
                    <div id="line_graph"></div>
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
                <el-button type="primary" @click="addTodo">确 定</el-button>
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
                <el-button type="primary" @click="modifyTodo">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import G2 from '@antv/g2'
    import defaultAvatar from '@/assets/default_avatar.jpg'

    export default {
        data() {
            return {
                username: localStorage.getItem('bms_username'),
                role: '',
                defaultAvatar: defaultAvatar,
                lastLoginTime: '',
                lastLoginAddress: '',
                colors: ['#409eff', '#8e71c7', '#67c23a', '#f56c6c'],
                progressDatas: [],
                summaryData: {
                    userAccess: {},
                    systemMsg: {},
                    totalCount: {}
                },
                form: {
                    todo: ''
                },
                todoLists: [],
                addDialogVisible: false,
                editDialogVisible: false,
                formLabelWidth: '70px'
            };
        },
        methods: {
            openEditDialog(index) {
                this.form.todo = this.todoLists[index].content
                this.modifyIdx = index
                this.editDialogVisible = true
            },
            confirmDelete(index) {
                this.$confirm('此操作将永久删除该事项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.todoLists.splice(index, 1)
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
            },
            getInitData() {
                var url = '/v1/home-data';
                this.$axios.get(url).then((res)=> {
                    console.log(res);
                    this.lastLoginTime = res.data.user_info.last_login_time
                    this.lastLoginAddress = res.data.user_info.last_login_address
                    this.progressDatas = res.data.progress_datas
                    this.summaryData = {
                        userAccess: res.data.summary_data.user_access,
                        systemMsg: res.data.summary_data.system_msg,
                        totalCount: res.data.summary_data.total_count
                    }
                    this.columnData = res.data.column_data
                    this.lineData = res.data.line_data

                    this.renderColumn()
                    this.renderLine()
                });
            },
            getTodoList() {
                var url = '/v1/todo-list';
                this.$axios.get(url).then((res)=> {
                    console.log(res);
                    this.todoLists = res.data.rows
                });
            },
            renderColumn() {
                // Step 1: 创建 Chart 对象
                const chart = new G2.Chart({
                    container: 'column_graph', // 指定图表容器 ID
                    forceFit: true,
                    //width : 500, // 指定图表宽度
                    height : 300 // 指定图表高度
                });
                // Step 2: 载入数据源
                chart.source(this.columnData);
                // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                chart.interval().position('genre*sold').color('genre')
                // Step 4: 渲染图表
                chart.render();
            },
            renderLine() {
                var chart = new G2.Chart({
                    container: 'line_graph',
                    forceFit: true,
                    height: 300
                });
                chart.source(this.lineData);
                chart.scale('value', {
                    min: 0
                });
                chart.scale('year', {
                    range: [0, 1]
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.line().position('year*value');
                chart.point().position('year*value').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                chart.render();
            },
            addTodo() {
                if(this.form.todo.length) {
                    this.todoLists.push({
                        content: this.form.todo,
                        is_done: false
                    })
                    this.form.todo = ''
                }
                this.addDialogVisible = false
            },
            modifyTodo() {
                this.todoLists[this.modifyIdx].content = this.form.todo
                this.editDialogVisible = false
            }
        },
        computed: {
            roleText() {
                return this.role == 'admin' ? '超级管理员' : '管理员'
            }
        },
        created () {
            this.getInitData()
            this.getTodoList()
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
        height: 252px;
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
        height: 416px;
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
