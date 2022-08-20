import {API_URL} from "@/plugins/constants";
import authHeader from "@/services/auth-header";
import axios from "axios";

async function getListRole()
{
    return await axios.get(API_URL+'role/roles',{headers: authHeader()});
}

async function createRole(role)
{
    return await axios.post(API_URL+'role/create',role,{headers:authHeader()});
}

async function deleteRole(id)
{
    return await axios.delete(API_URL+'role/delete/' +id,{headers: authHeader()})
}

async  function editRole(role)
{
    return await axios.post(API_URL+'role/update/'+role.id, role, {headers:authHeader()})
}

export {getListRole, createRole, deleteRole, editRole};

