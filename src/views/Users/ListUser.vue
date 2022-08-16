<template>
  <Layout>
   <div id="app" class="container">
     <v-app>
       <v-btn @click="a()">clcik</v-btn>
       <v-card>
         <v-card-title>
           Danh sach nhan vien
           <v-spacer></v-spacer>
           <v-text-field
               v-model="search"
               append-icon="mdi-magnify"
               label="Search"
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
             <v-card-title class="text-h5">Bạn chắc chắn sẽ xóa phòng ban này?</v-card-title>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
               <v-btn color="blue darken-1" text @click="submitDelete()">OK</v-btn>
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

export default {
  data(){
    return {
      dialogEdit:false,
      dialogDelete:false,
      idDeletedUser:null,
      listUser : [],
      search:'',
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
          text: 'Phòng ban',
          value: 'department',
          sortable:false
        },
        {
          text:'Chức vụ',
          vale:'role',
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
    this.getListUser()
  },

  components:{
    Layout
  },

  methods:{
    handleEditUser(item){
      this.$router.push({name:'user-update',params:{id:item.id}})
    },
    getListUser(){
      getListUser()
          .then(response => {
            this.listUser = response.data;
          }).catch(()=>{
        console.log(333);
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
     console.log(this.listUser[0].roles[0].name);
   }
  },

  watch:{
    listUser(value) {
      this.users = value.map(item => ({
        id : item.id,
        name : item?.name,
        email: item?.email,
        department: item?.departments[0]?.name,
        address: item?.profile?.address,
        role: item?.roles[0]?.name,
        date_of_birth: item?.profile?.date_of_birth,
        phone : item?.profile?.phone,
      }))
    }
  }
}
</script>