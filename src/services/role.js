import API_URL from "@/plugins/constants";
import authHeader from "@/services/auth-header";
import axios from "axios";

async function getListRole()
{
    return await axios.get(API_URL+'role/roles',{headers: authHeader()});
}

export default getListRole;

