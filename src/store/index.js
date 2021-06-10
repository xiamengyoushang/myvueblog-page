import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 保存全局属性
export default new Vuex.Store({
  state: {
    // property
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token",token);
    },
    SET_USERINFOR: (state, userInfo) => {
      state.userInfo = userInfo;
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
    },
    REMOVE_INFO: (state) => {
      state.token = "";
      state.userInfo = {};
      localStorage.setItem("token","");
      sessionStorage.setItem("userInfo",JSON.stringify(""));
    }
  },
  getters:{
    // get
    getToken: state => {
      return state.token;
    },
    getUser: state => {
      return state.userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
