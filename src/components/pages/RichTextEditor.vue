<template>
    <div>
        <el-breadcrumb separator="/" class="title">
            <el-breadcrumb-item><i class="icon iconfont icon-workbench"></i> 富文本编辑器</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
            <el-button class="submit-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>
<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

    export default {
        data() {
            return {
                content: '<h2>Hello World</h2>',
                editorOption: {
                    // some quill options
                }
            };
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorBlur(quill) {
                console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
                console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                console.log('editor ready!', quill)
            },
            onEditorChange({ quill, html, text }) {
                console.log('editor change!', quill, html, text)
                this.content = html
            },
            submit() {
                console.log(this.content);
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            console.log('this is current quill instance object', this.editor)
        }
    }
</script>
<style>
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 480px;
    padding-bottom: 16px;
}
.submit-btn {
    margin-top: 20px;
}
</style>