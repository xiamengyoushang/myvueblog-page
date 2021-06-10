<template>
    <div>
        <Header></Header>
        <div class="m-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="ruleForm.content"></mavon-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存博客</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name:"BlogEdit",
        components: {Header},
        data() {
            return {
                ruleForm: {
                    id: null,
                    title: '',
                    description: '',
                    content: ''
                },
                rules: {
                    // 触发方式，blur失去焦点，change数据改变
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入摘要', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            // 编辑模式下需要先获取id
            /*
            * router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，
            * 例如history对象。。。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。。。
            * this.$router.push会往history栈中添加一个新的记录
            *
            * route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等。。
            * */
            const blogId = this.$route.params.blogId;
            if (blogId) {
                this.$axios.get("/blog/detail/"+blogId).then(res=>{
                    if (res.data.code == 200) {
                        const blog = res.data.data;
                        this.ruleForm.id = blog.id;
                        this.ruleForm.title = blog.title;
                        this.ruleForm.description = blog.description;
                        this.ruleForm.content = blog.content;
                    }
                });
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('保存博客？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$axios.post("/blog/edit",this.ruleForm,{
                                headers: {
                                    "Authorization": this.$store.getters.getToken
                                }
                            }).then(res=>{
                                if (res.data.code == 200){
                                    this.$message({type: 'success', message: '保存成功'});
                                    this.$router.push("/blogs");
                                } else {
                                    this.$message({type: 'warning', message: '博客保存失败'});
                                }
                            });
                        }).catch(() => {
                            this.$message({type: 'warning', message: '已取消'});
                        });
                    } else {
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
    .m-content{
        width: 80%;
        margin: 0 auto;
    }
</style>
