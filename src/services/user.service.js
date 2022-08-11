import axios from 'axios';
import authHeader from './auth-header';
import API_URL from "@/plugins/constants";

async function getListUser() {
    return await axios.get(API_URL+'user/user',{headers: authHeader()});
}

async function createUser(user){
    return await axios.post(API_URL+'user/create-user',user,{headers: authHeader()})
        // .then((response)=>{
        //     return response.data;
        // })
        // .catch((error)=>{
        //     return error;
        // })
}

export {getListUser,createUser}
