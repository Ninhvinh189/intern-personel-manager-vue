export default function authHeader() {
    let token =localStorage.getItem('token');
    if (token) {
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "multipart/form-data"
        };
    } else {
        return {};
    }
}