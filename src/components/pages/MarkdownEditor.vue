<template>
    <div>
        <el-breadcrumb separator="/" class="title">
            <el-breadcrumb-item><i class="icon iconfont icon-workbench"></i> Markdown编辑器</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <div id="editor">
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            </div>
            <el-button class="submit-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>
<script>
    // Local Registration
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        data() {
            return {
                content:'',
                html:'',
                configs: {}
            };
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style>
#editor {
    margin: auto;
    width: 80%;
    height: 580px;
}
.submit-btn {
    margin-top: 20px;
}
</style>
