import AuthService from "@/services/auth.service";
import authService from "@/services/auth.service";
import {IMG_URL} from "@/plugins/constants";

const user = localStorage.getItem('token');
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};
export const auth = {
    namespaced: true,
    state: {
        initialState,
        me:{},
        roleMe:'',
        id:''
    },
    actions: {
        login({commit}, user) {
           return AuthService.login(user).then(
                user => {
                    localStorage.setItem('token', user.data.access_token);
                    console.log("token")
                    commit('loginSuccess', user);
                    commit('getMe');
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        logout({commit}) {
            console.log("logout")
            AuthService.logout();
            commit('logout');
        },

        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },

    mutations: {
        getMe(state){
            authService.getMe().then(res =>{
                state.me = res.data
                console.log("stateMe")
                localStorage.setItem('avatar', IMG_URL+ res.data?.profile?.avatar)
                localStorage.setItem('roleMe',res.data?.roles[0]?.name);
                console.log("roleMe")
                localStorage.setItem('myId', res.data.id);
            }).catch((err)=>{
                return err;
            })
        },
        loginSuccess(state, user) {
            state.initialState.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.initialState.status.loggedIn = false;
        },
        logout(state) {
            state.initialState.status.loggedIn = false;
        },
        registerSuccess(state) {
            state.initialState.status.loggedIn = false;
        },
        registerFailure(state) {
            state.initialState.status.loggedIn = false;
        }

    }
};


export default auth;