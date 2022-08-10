import axios from 'axios';
import API_URL from "@/plugins/constants";
class AuthService {
    async login(user) {
        return await  axios
            .post(API_URL + 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                }
                return response.data;
            })
            .catch(()=>{
                this.$router.push('/auth/login')
            });
    }

    logout() {
        localStorage.clear();
    }

    async register(user) {
        return await axios.post(API_URL + 'register', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }

}

export default new AuthService();