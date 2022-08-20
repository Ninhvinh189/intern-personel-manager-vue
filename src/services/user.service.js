import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "@/plugins/constants";

async function getListUser() {
    return await axios.get(API_URL+'user/user',{headers: authHeader()});
}

async function createUser(user){
    console.log(user);
    return await axios.post(API_URL+'user/create-user',user,{headers: authHeader()})
}
async function findUser(id){
    return await axios.get(API_URL+'user/find-user/'+id,{headers: authHeader()})
}

async function deleteUser(id){
    return await axios.delete(API_URL+'user/destroy-user/'+ id,{headers: authHeader()})
}

async function updateAvatar(avatar,id){
    return await axios.post(API_URL+'user/update-avatar/'+ id, avatar,{headers:authHeader()});
}

async function updateUser(user, id){
    return await axios.post(API_URL+'user/update-user/'+id, user, {headers: authHeader()});
}

async function getListUserDepartment(id){
    return await axios.get(API_URL + 'user/list-user-department/'+id, {headers: authHeader()});
}

export {getListUser,createUser, findUser, deleteUser, updateAvatar, updateUser, getListUserDepartment}