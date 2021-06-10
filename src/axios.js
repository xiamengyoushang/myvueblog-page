import axios from "axios"
import Element from "element-ui"

// 设置axios域名
axios.defaults.baseURL="http://127.0.0.1:8081"
//axios.defaults.baseURL="http://192.168.0.191:8081"

/*
  axios使用
  get请求 url+config
  this.$axios.get("url",{config});
  post请求 url+data+config
  this.$axios.post("url","data",{config});
*/

// 前置拦截
axios.interceptors.request.use(config => {
    console.log("========req========");
    console.log(config);
    console.log("========req========");
    return config;
});

// 后置拦截
axios.interceptors.response.use(response => {
   let res = response.data;
   console.log("========res========");
   console.log(res);
   console.log("========res========");
   if (res.code == 200) {
       return response;
   } else {
       Element.Message.error(res.msg, {duration: 3*1000})
   }
});
