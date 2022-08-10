import router from "@/router";


export default function auth() {
    if (!localStorage.getItem('accessToken')) {
        return router.push({ name: 'login' });
    }
    return 2;
}
