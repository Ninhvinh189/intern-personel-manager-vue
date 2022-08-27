import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home/Home";
import ListUser from "@/views/Users/ListUser";
import CreateUser from "@/views/Users/CreateUser";
import Login from "@/views/Login/Login";

import ListDepartment from "@/views/Departments/ListDepartment";
import ListRole from "@/views/Roles/ListRole";
import MyProfile from "@/views/Users/MyProfile";
import ProfileUser from "@/views/Users/ProfileUser";
import EditUser from "@/views/Users/EditUser";
import EditMyProfile from "@/views/Users/EditMyProfile";
import Register from "@/views/Login/Register";
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
    path:'/register',
    name:'register',
    component: Register
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
  },
  {
    path: '/cap-nhat-thong-tin-ban-than',
    name:'update-me',
    component: EditMyProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const publicPages = [
      'list-user','home','create-user','list-departments','list-role','my-profile','user-profile','user-update','update-me',
  ]
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = localStorage.getItem('token');

  if (!authRequired && loggedIn==null) {
    next('/login');
  } else {
    next();
  }
});

router.beforeEach((to,from,next)=>{
  const adminPages = [
    'create-user'
  ]
  const adminRequired = !adminPages.includes(to.name);
  const roleMe = localStorage.getItem('roleMe');

  if (!adminRequired && roleMe !== 'admin') {
    alert('Bạn không có quyền vào trang này !');
    next('');
  } else {
    next();
  }
})


export default router
