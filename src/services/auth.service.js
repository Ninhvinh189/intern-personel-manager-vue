import axios from 'axios';
import {API_URL} from "@/plugins/constants";
import authHeader from "@/services/auth-header";

class AuthService {
    // async login(user) {
    //     return await  axios
    //         .post(API_URL + 'auth/login', {
    //             email: user.email,
    //             password: user.password
    //         })
    //         .then(response => {
    //             if (response.data.access_token) {
    //                 localStorage.setItem('token', response.data.access_token);
    //             }
    //             return response.data;
    //         })
    //         .catch((err)=>{
    //             return err.response.data;
    //         });
    // }

    async login(user){
        return await axios.post(API_URL+'auth/login',user);
    }


    logout() {
        console.log("local")
        localStorage.clear();
    }

    async register(user) {
        return await axios.post(API_URL + 'register', user)
    }

    async getMe(){
        return await axios.get(API_URL+'auth/me',{headers: authHeader()});
    }
}

export default new AuthService();