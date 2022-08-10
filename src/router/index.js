import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home/Home";
import ListUser from "@/views/Users/ListUser";
import CreateUser from "@/views/Users/CreateUser";
import Login from "@/views/Login/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,

  },
  {
    path:'/danh-sach-nhan-vien',
    name:'list-user',
    component: ListUser
  },
  {
    path:'/them-moi-nhan-vien',
    name:'create-user',
    component: CreateUser
  },
  {
    path:'/login',
    name:'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/danh-sach-nhan-vien', '/them-moi-nhan-vien'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (!authRequired && loggedIn==null) {
    next('/login');
  } else {
    next();
  }
});


export default router
