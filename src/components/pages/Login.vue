<template>
    <div class="login-wrap">
        <div class="bms-login">
            <div class="bms-title">Backstage Manage System</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="bms-login-form" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="input your username">
                        <el-button slot="prepend">
                            <i class="icon iconfont icon-people"></i>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="input your password" @keyup.enter.native="submitForm('loginForm')">
                        <el-button slot="prepend">
                            <i class="icon iconfont icon-lock"></i>
                        </el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
                </div>
                <p class="login-tips">Tips : You can input at your will</p>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        localStorage.setItem('bms_username',this.loginForm.username);
                        console.log('ok!!');
                        this.$router.push('/home');
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-image: url('../../assets/bg_login.jpg');
    }
    .bms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -175px;
        margin-top: -145px;
        width: 350px;
        height: 290px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
    }
    .bms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .bms-login-form {
        padding: 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
