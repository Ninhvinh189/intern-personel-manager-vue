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
           <template v-slot:[slotAction()] = "{item}">
             <v-icon
                 class="mr-2"
                 @click="handleEditItem(item)"
             >
               mdi-pencil
             </v-icon>
             <v-icon
                 @click="handleDeleteItem(item)"
             >
               mdi-delete
             </v-icon>
           </template>
         </v-data-table >

         <v-dialog v-model="dialogEdit">
           <v-form>
             <v-container>
             </v-container>
           </v-form>
         </v-dialog>
       </v-card>
     </v-app>
   </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import {getListUser} from "@/services/user.service";

export default {
  data(){
    return {
      dialogEdit:false,
      dialogDelete:false,
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
          text:'Hành động',
          value: 'actions'
        }
      ],
      users:[],
    }
  },

  created() {
    getListUser()
        .then(response => {
          this.listUser = response.data;
        }).catch(()=>{
          console.log(333);
    });
  },

  components:{
    Layout
  },

  methods:{
    slotAction(){
      return  `item.actions`;
    },
   a(){
     console.log(this.listUser);
   }
  },

  watch:{
    listUser(value) {
      this.users = value.map(item => ({
        name : item?.name,
        email: item?.email,
        department: item?.departments[0]?.name,
        address: item?.profile?.address,
        date_of_birth: item?.profile?.date_of_birth
      }))
    }
  }
}
</script>