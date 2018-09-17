<template>
    <div>
        <!-- <el-row :gutter="20">
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
                <el-card class="box-card">
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
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="icon iconfont icon-people"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="icon iconfont icon-remind"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="icon iconfont icon-manage"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <div class="todo-list">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-checkbox v-model="checked">早起</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <span class="icon">
                                    <i class="iconfont icon-editor"></i>
                                </span>
                                <span class="icon">
                                    <i class="iconfont icon-empty"></i>
                                </span>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row> -->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content">
                    <div id="c1"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">

                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import G2 from '@antv/g2';
    export default {
        data() {
            return {
                checked: false
            };
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
                width : 600, // 指定图表宽度
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