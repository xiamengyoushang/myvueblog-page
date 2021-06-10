<template>
    <div class="m-content">
        <Header></Header>
        <div class="block">
            <el-timeline>
                <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in list">
                    <el-card>
                        <h4>
                            <router-link :to="{name:'BlogDetail',
                                               params:{blogId:blog.id}}">
                                {{blog.title}}
                            </router-link>
                        </h4>
                        <p>{{blog.description}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-pagination class="m-page"
                    background
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="page">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "Blogs",
        components: {Header},
        data(){
            return {
                list:[],
                currentPage:1,
                total:0,
                pageSize:5
            }
        },
        created() {
            this.page(this.currentPage);
        },
        methods:{
            page(currentPage){
                this.$axios.get("/blog/list?currentPage="+currentPage).then(res=>{
                    console.log(res);
                    this.list = res.data.data.records;
                    this.currentPage = res.data.data.current;
                    this.total = res.data.data.total;
                });
            }
        }
    }
</script>

<style scoped>
    .m-content{
        width: 80%;
        margin: 0 auto;
    }
    .m-page{
        margin: 0 auto;
        text-align: center;
    }
</style>
