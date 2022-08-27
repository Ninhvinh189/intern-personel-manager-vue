<template>
  <Layout>
   <div id="app" class="container">
     <v-app>
       <v-card>
         <v-card-title>
           Danh sách nhân viên
           <v-spacer></v-spacer>
           <v-text-field
               v-model="search"
               append-icon="mdi-magnify"
               label="Tìm kiếm"
               single-line
               hide-details
           ></v-text-field>
         </v-card-title>
         <v-data-table
             :headers="headers"
             :items="users"
             :search="search"
         >
           <template v-slot:[slotDetail()]="{item}">
             <v-icon
                 @click="handleDetail(item)"
             >
               mdi-account-box
             </v-icon>
           </template>

           <template v-slot:[slotAction()] = "{item}">
             <v-icon
                 class="mr-2"
                 @click="handleEditUser(item)"
             >
               mdi-pencil
             </v-icon>

             <v-icon
                 @click="handleDeleteUser(item)"
             >
               mdi-delete
             </v-icon>
           </template>
         </v-data-table >

         <v-dialog v-model="dialogDelete" max-width="500px">
           <v-card>
             <v-card-title class="text-h5">Bạn chắc chắn sẽ xóa người dùng này?</v-card-title>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="blue darken-1" text @click="close">Hủy bỏ</v-btn>
               <v-btn color="blue darken-1" text @click="submitDelete()">Thực hiện</v-btn>
               <v-spacer></v-spacer>
             </v-card-actions>
           </v-card>
         </v-dialog>

       </v-card>
     </v-app>
   </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import {getListUser} from "@/services/user.service";
import {deleteUser} from "@/services/user.service";
import {getListUserDepartment} from "@/services/user.service";

export default {
  data(){
    return {
      dialogEdit:false,
      dialogDelete:false,
      idDeletedUser:null,
      listUser : [],
      search:'',
      roleMe:localStorage.getItem('roleMe'),
      headers:[
        {
          text:'Họ tên',
          value:'name',
          sortable:false
        },
        {
          text: 'email',
          value:'email',
          sortable:false
        },
        {
          text: 'Ngày sinh',
          value:'date_of_birth',
          sortable:false
        },
        {
          text: 'Địa chỉ',
          value: 'address',
          sortable:false
        },
        {
          text: 'Số điện thoại',
          value:'phone',
          sortable: false
        },
        {
          text: 'Phòng ban',
          value: 'department',
          sortable:false
        },
        {
          text:'Chức vụ',
          value:'role',
          sortable: false
        },
        {
          text:'Chi tiet',
          value:'detail',
          sortable: false,
        },
        {
          text:'Hành động',
          value: 'actions',
          sortable:false
        }
      ],
      users:[],
    }
  },

  created() {
    if(this.roleMe==='admin'){
      this.getListUser();
    }else if (this.roleMe === 'leader'){
      this.getListUserDepartment();
    }
  },

  components:{
    Layout
  },

  methods:{
    getListUserDepartment(){
      getListUserDepartment(localStorage.getItem('myId')).then(res => {
        this.listUser = res.data;
      }).catch(()=>{
        console.log(2222);
      })
    },

    handleEditUser(item){
      if (item.id === parseInt(localStorage.getItem('myId'))){
        this.$router.push({name:'update-me'});
      }else{
        this.$router.push({name:'user-update',params:{id:item.id}})

      }
    },
    getListUser(){
      getListUser()
          .then(response => {
            this.listUser = response.data;
          }).catch(()=>{
            this.listUser = [];
      });
    },
    submitDelete(){
      this.dialogDelete=false;
      deleteUser(this.idDeletedUser).then((res)=>{
        this.getListUser();
        this.$toast.success(res.data.message);
      })
    },

    handleDeleteUser(item){
      this.dialogDelete=true;
      this.idDeletedUser = item.id
    },

    close(){
      this.dialogDelete=false;
    },

    handleDetail(item){
      this.$router.push({name:'user-profile', params:{id:item.id}})
    },

    slotDetail(){
      return `item.detail`;
    },

    slotAction(){
      return  `item.actions`;
    },
   a(){
     console.log(this.users);
   }
  },

  watch:{
    listUser(value) {
      console.log(value);
      this.users = value.map(item => ({
        id : item.id,
        name : item?.firstName + " " + item?.lastName,
        email: item?.email,
        department: item?.departments[0]?.name,
        address: item?.profile?.address,
        role: item?.roles[0]?.name,
        date_of_birth: item?.profile?.date_of_birth,
        phone : item?.profile?.phone,
      }))
      console.log(this.users)
    }
  }
}
</script>