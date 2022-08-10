import UserService from "@/services/user.service";

export const user = {
    namespaced: true,
    state:{
      listUser: UserService.getListUser()
    },
    actions: {

    },
    mutations: {

    }
};


export default user;