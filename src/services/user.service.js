import axios from 'axios';
import authHeader from './auth-header';
import API_URL from "@/plugins/constants";

async function getListUser() {
    return await axios.get(API_URL+'user/user',{headers: authHeader()});
}

async function createUser(user){
    console.log(API_URL+'user/create-user');
    console.log(user)
    return await axios.post(API_URL+'user/create-user',user)
        .then((response)=>{
            console.log(1)
            return response.data;
        })
        .catch((error)=>{
            console.log(2)
            return error.data;
        })
}

export {getListUser,createUser}
