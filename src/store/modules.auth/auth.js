import AuthService from "@/services/auth.service";
import authService from "@/services/auth.service";

const user = localStorage.getItem('token');
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};
export const auth = {
    namespaced: true,
    state: {
        initialState,
        me:{}
    },
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
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
                console.log(res.data);
                state.me = res.data
            }).catch(()=>{
                console.log("loi");
            })
        },
        loginSuccess(state, user) {
            state.initialState.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }

    }
};


export default auth;