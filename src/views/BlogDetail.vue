<template>
    <div>
        <Header></Header>
        <div class="m-blog">
            <h2>{{blog.title}}</h2>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name:'BlogAdd',params:{blogId:blog.id}}">
                    编辑
                </router-link>
            </el-link>
            <el-link icon="el-icon-delete" v-if="ownBlog" style="margin-left: 15px" @click="deleteBlog()">删除</el-link>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import "github-markdown-css/github-markdown.css"
    export default {
        name:"BlogDetail",
        components: {Header},
        data(){
            return {
              blog:{
                  id:null,
                  title:"",
                  content:""
              },
              ownBlog:false,  // 判断是否是自己的博客
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
                        this.blog.id = blog.id;
                        this.blog.title = blog.title;

                        // 如果博客是自己发表的则显示编辑按钮
                        var userId = blog.userId;
                        if (this.$store.getters.getUser.id == userId) {
                            this.ownBlog = true;
                        }

                        var MarkdownIt = require("markdown-it");
                        var md = new MarkdownIt();
                        this.blog.content = md.render(blog.content);

                    }
                });
            }
        },
        methods: {
            deleteBlog(){
                // 删除博客
                this.$confirm('删除博客？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 注意POST传的都是JSON格式
                    this.$axios.post("/blog/delete",{id:this.blog.id},{
                        headers: {
                            "Authorization": this.$store.getters.getToken
                        }
                    }).then(res=>{
                        if (res.data.code == 200){
                            this.$message({type: 'success', message: '删除成功'});
                            this.$router.push("/blogs");
                        } else {
                            this.$message({type: 'warning', message: '删除失败'});
                        }
                    });
                }).catch(() => {
                    this.$message({type: 'warning', message: '已取消'});
                });
            }
        }
    }
</script>

<style scoped>
    .m-blog{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        width: 80%;
        height: 700px;
        margin: 0 auto;
        padding: 20px 15px;
    }
</style>
