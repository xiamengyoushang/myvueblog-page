<template>
    <div>
        <el-container>
            <el-header>
                <img class="mlogo" src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png" alt="">
            </el-header>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name:"Login",
        data() {
            return {
                ruleForm: {
                    username: 'peng.lei',
                    password: '123456',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请选择密码', trigger: 'change' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*
                        * const等于于let
                        * _this缓存全局地址，如果$axios下再使用this作用域只限于$axios内，
                        * 当前使用了箭头函数其实也可以直接使用this
                        * */
                        const _this = this;
                        this.$axios.post("/login",this.ruleForm).then(res=>{
                            // console.log(res.headers);
                            if (res.data.code == 200) {
                                const token = res.data.data.token;
                                const userInfo = res.data.data;
                                // 保存全局属性
                                _this.$store.commit("SET_TOKEN",token);
                                _this.$store.commit("SET_USERINFOR",userInfo);
                                // 获取全局属性
                                // console.log(_this.$store.getters.getToken);
                                // console.log(_this.$store.getters.getUser);
                                // 路由跳转
                                _this.$router.push("/blogs");
                            } else {
                                alert(res.data.message);
                            }
                        }).catch(e=>{
                            console.log(e);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .mlogo{
        height: 60%;
        margin-top: 10px;
    }

    .demo-ruleForm{
        max-width: 500px;
        margin: 0 auto;
    }

</style>
