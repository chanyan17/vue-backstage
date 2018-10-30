<template>
    <div>
        <el-breadcrumb separator="/" class="title">
            <el-breadcrumb-item><i class="icon iconfont icon-dynamic"></i> 数据分析</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <div class="g2-demo">更多例子可移步：<a href="https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html">G2 Demo</a></div>
            <el-tag>柱形图</el-tag>
            <div id="graph_column"></div>
            <el-tag>折线图</el-tag>
            <div id="graph_line"></div>
            <el-tag>饼状图</el-tag>
            <div id="graph_pie"></div>
            <el-tag>环形图</el-tag>
            <div id="graph_donut"></div>
        </div>
    </div>
</template>
<script>
    import G2 from '@antv/g2';
    export default {
        data() {
            return {};
        },
        methods: {
            renderColumn() {
                var data = [{
                    year: '1951 年',
                    sales: 38
                }, {
                    year: '1952 年',
                    sales: 52
                }, {
                    year: '1956 年',
                    sales: 61
                }, {
                    year: '1957 年',
                    sales: 145
                }, {
                    year: '1958 年',
                    sales: 48
                }, {
                    year: '1959 年',
                    sales: 38
                }, {
                    year: '1960 年',
                    sales: 38
                }, {
                    year: '1962 年',
                    sales: 38
                }];
                var chart = new G2.Chart({
                    container: 'graph_column',
                    forceFit: true,
                    height: 500
                });
                chart.source(data);
                chart.scale('sales', {
                    tickInterval: 20
                });
                chart.axis('sales', {
                    label: {
                        offset: [-10, 10]
                    }
                });
                chart.interval().position('year*sales');
                chart.render();
            },
            renderLine() {
                var data = [{
                    "month": "Jan",
                    "city": "Tokyo",
                    "temperature": 7
                }, {
                    "month": "Jan",
                    "city": "London",
                    "temperature": 3.9
                }, {
                    "month": "Feb",
                    "city": "Tokyo",
                    "temperature": 6.9
                }, {
                    "month": "Feb",
                    "city": "London",
                    "temperature": 4.2
                }, {
                    "month": "Mar",
                    "city": "Tokyo",
                    "temperature": 9.5
                }, {
                    "month": "Mar",
                    "city": "London",
                    "temperature": 5.7
                }, {
                    "month": "Apr",
                    "city": "Tokyo",
                    "temperature": 14.5
                }, {
                    "month": "Apr",
                    "city": "London",
                    "temperature": 8.5
                }, {
                    "month": "May",
                    "city": "Tokyo",
                    "temperature": 18.4
                }, {
                    "month": "May",
                    "city": "London",
                    "temperature": 11.9
                }, {
                    "month": "Jun",
                    "city": "Tokyo",
                    "temperature": 21.5
                }, {
                    "month": "Jun",
                    "city": "London",
                    "temperature": 15.2
                }, {
                    "month": "Jul",
                    "city": "Tokyo",
                    "temperature": 25.2
                }, {
                    "month": "Jul",
                    "city": "London",
                    "temperature": 17
                }, {
                    "month": "Aug",
                    "city": "Tokyo",
                    "temperature": 26.5
                }, {
                    "month": "Aug",
                    "city": "London",
                    "temperature": 16.6
                }, {
                    "month": "Sep",
                    "city": "Tokyo",
                    "temperature": 23.3
                }, {
                    "month": "Sep",
                    "city": "London",
                    "temperature": 14.2
                }, {
                    "month": "Oct",
                    "city": "Tokyo",
                    "temperature": 18.3
                }, {
                    "month": "Oct",
                    "city": "London",
                    "temperature": 10.3
                }, {
                    "month": "Nov",
                    "city": "Tokyo",
                    "temperature": 13.9
                }, {
                    "month": "Nov",
                    "city": "London",
                    "temperature": 6.6
                }, {
                    "month": "Dec",
                    "city": "Tokyo",
                    "temperature": 9.6
                }, {
                    "month": "Dec",
                    "city": "London",
                    "temperature": 4.8
                }];

                var chart = new G2.Chart({
                    container: 'graph_line',
                    forceFit: true,
                    height: 500
                });
                chart.source(data, {
                    month: {
                        range: [0, 1]
                    }
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.axis('temperature', {
                    label: {
                        formatter: function formatter(val) {
                        return val + '°C';
                        }
                    }
                });
                chart.line().position('month*temperature').color('city');
                chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                chart.render();
            },
            renderPie() {
                var data = [{
                    item: '事例一',
                    count: 40,
                    percent: 0.4
                }, {
                    item: '事例二',
                    count: 21,
                    percent: 0.21
                }, {
                    item: '事例三',
                    count: 17,
                    percent: 0.17
                }, {
                    item: '事例四',
                    count: 13,
                    percent: 0.13
                }, {
                    item: '事例五',
                    count: 9,
                    percent: 0.09
                }];
                var chart = new G2.Chart({
                    container: 'graph_pie',
                    forceFit: true,
                    height: 500
                });
                chart.source(data, {
                percent: {
                    formatter: function formatter(val) {
                    val = val * 100 + '%';
                    return val;
                    }
                }
                });
                chart.coord('theta', {
                    radius: 0.75
                });
                chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                chart.intervalStack().position('percent').color('item').label('percent', {
                    formatter: function formatter(val, item) {
                        return item.point.item + ': ' + val;
                    }
                }).tooltip('item*percent', function(item, percent) {
                    percent = percent * 100 + '%';
                    return {
                        name: item,
                        value: percent
                    };
                }).style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
                chart.render();
            },
            renderDonut() {
                var data = [{
                    item: '事例一',
                    count: 40,
                    percent: 0.4
                }, {
                    item: '事例二',
                    count: 21,
                    percent: 0.21
                }, {
                    item: '事例三',
                    count: 17,
                    percent: 0.17
                }, {
                    item: '事例四',
                    count: 13,
                    percent: 0.13
                }, {
                    item: '事例五',
                    count: 9,
                    percent: 0.09
                }];
                var chart = new G2.Chart({
                    container: 'graph_donut',
                    forceFit: true,
                    height: 500,
                    animate: false
                });
                chart.source(data, {
                    percent: {
                        formatter: function formatter(val) {
                        val = val * 100 + '%';
                        return val;
                        }
                    }
                });
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6
                });
                chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                // 辅助文本
                chart.guide().html({
                    position: ['50%', '50%'],
                    html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
                    alignX: 'middle',
                    alignY: 'middle'
                });
                var interval = chart.intervalStack().position('percent').color('item').label('percent', {
                    formatter: function formatter(val, item) {
                        return item.point.item + ': ' + val;
                    }
                }).tooltip('item*percent', function(item, percent) {
                    percent = percent * 100 + '%';
                    return {
                        name: item,
                        value: percent
                    };
                }).style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
                chart.render();
                interval.setSelected(data[0]);
            }
        },
        mounted() {
            this.renderColumn();
            this.renderLine();
            this.renderPie();
            this.renderDonut();
        }
    }
</script>

<style lang="less" scoped>
.batch-action {
    margin-top: 20px;
}
.g2-demo {
    margin-bottom: 10px;
    font-size: 16px;
}
</style>