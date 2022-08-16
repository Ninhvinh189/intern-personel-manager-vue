import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home/Home";
import ListUser from "@/views/Users/ListUser";
import CreateUser from "@/views/Users/CreateUser";
import Login from "@/views/Login/Login";

import ListDepartment from "@/views/Departments/ListDepartment";
import ListRole from "@/views/Roles/ListRole";
import CreateDepartment from "@/views/Departments/CreateDepartment";
import MyProfile from "@/views/Users/MyProfile";
import ProfileUser from "@/views/Users/ProfileUser";
import EditUser from "@/views/Users/EditUser";

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
  },
  {
    path:'/danh-sach-phong-ban',
    name:'list-departments',
    component: ListDepartment
  },
  {
    path:'/danh-sach-chuc-vu',
    name:'list-role',
    component: ListRole
  },
  {
    path:'/them-moi-phong-ban',
    name:'create-department',
    component: CreateDepartment
  },
  {
    path:'/thong-tin-ban-than',
    name:'my-profile',
    component: MyProfile
  },
  {
    path:'/thong-tin-nhan-vien/:id',
    name:'user-profile',
    component: ProfileUser
  },
  {
    path:'/cap-nhat-thong-tin/:id',
    name:'user-update',
    component: EditUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = [
      '/','/danh-sach-nhan-vien'
    , '/them-moi-nhan-vien','/danh-sach-phong-ban'
    ,'/danh-sach-chuc-vu','/them-moi-phong-ban'
    ,'/thong-tin-ban-than','/thong-tin-nhan-vien'
    ,'/cap-nhat-thong-tin'

  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (!authRequired && loggedIn==null) {
    next('/login');
  } else {
    next();
  }
});


export default router
