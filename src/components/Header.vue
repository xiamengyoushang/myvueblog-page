<template>
    <div class="m-content">
        <h3>欢迎来到我的博客</h3>
        <div class="block">
            <el-avatar :size="50" :src="user.avatar" alt="头像"></el-avatar>
            <div>{{user.username}}</div>
        </div>
        <div class="m-action">
            <span>
                <el-link href="/blogs">主页</el-link>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span>
                <el-link type="success" href="/blog/add">发表文章</el-link>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span v-if="!hashLogin">
                <el-link type="primary" @click="login()">登录</el-link>
            </span>
            <span v-if="hashLogin">
                <el-link type="danger" @click="logout()">退出</el-link>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            // 属性定义层
            return {
                user: {
                    username:"请先登录",
                    avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                },
                hashLogin: false
            }
        },
        created() {
            // 初始化方法
            if (this.$store.getters.getUser.username != "" &&
                this.$store.getters.getUser.username != null) {
                this.user.username = this.$store.getters.getUser.username;
                this.hashLogin = true;
            } else {
                this.user.username = "请先登录";
                this.hashLogin = false;
            }
        },
        methods:{
            // 执行方法层
            login(){
                this.$router.push("/login");
            },
            logout(){
                // post请求注意传参
                this.$axios.post("/logout",null,{
                    headers: {
                        "Authorization": this.$store.getters.getToken
                    }
                }).then(res=>{
                    if (res.data.code == 200) {
                        // 清除用户信息
                        this.$store.commit("REMOVE_INFO");
                        // 路由跳转
                        this.$router.push("/login");
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .m-content{
        /*居中显示*/
        margin: 0 auto;
        width: 100%;
        text-align: center;
    }

    .m-action{
        margin: 10px 0;
    }
</style>
