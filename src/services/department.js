import API_URL from "@/plugins/constants";
import authHeader from "@/services/auth-header";
import axios from "axios";

async function getListDepartment()
{
    return await axios.get(API_URL+'department/department',{headers: authHeader()});
}
async function createDepartment(department)
{
    return await  axios.post(API_URL+'department/create',department,{headers:authHeader()});
}

async function editDepartment(department)
{
    return await axios.post(API_URL+'department/update/'+department.id,department,{headers:authHeader()});
}

async function deleteDepartment(id)
{
    return await axios.delete(API_URL+'department/delete/' + id, {headers:authHeader()});
}
export {getListDepartment,createDepartment, editDepartment, deleteDepartment};
