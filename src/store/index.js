import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        isMobile: document.body.clientWidth < 768 ? true : false,//设备类型
        isAccount: 0,
        userInfo:{},
        config:{},
        isMenu:false

    },
    mutations: {
        switchAccount(state, param) {
            state.isAccount = param;
            if(param == 0){
                router.push({name:"index"})
            }
        },
        addUserInfo(state, param) {
            state.userInfo = param;
        },
        addConfig(state, param) {
            state.config = param;
            state.config.upload_rule =  param.upload_rule.split(",");
        },

    },
    actions: {

    },

})
