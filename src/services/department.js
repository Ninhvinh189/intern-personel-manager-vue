import API_URL from "@/plugins/constants";
import authHeader from "@/services/auth-header";
import axios from "axios";

async function getListDepartment()
{
    return await axios.get(API_URL+'department/department',{headers: authHeader()});
}

export default getListDepartment;
