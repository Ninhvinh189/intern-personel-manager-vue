<template>
  <Layout>
    <div id="app" class="container">
      <v-app>
        <v-card>
          <v-card-title>
            Danh sách phòng ban
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
              :items="listDepartment"
              :search="search"
          ></v-data-table>
        </v-card>
      </v-app>
    </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import getListDepartment from "@/services/department";

export default {
  data(){
    return {
      listDepartment : [],
      search:'',
      headers:[
        {
          text:'Tên phòng ban',
          value:'name',
          sortable:false
        },
        {
          text: 'Số lượng nhân viên',
          value:'number_of_member',
          sortable:false
        },
        {
          text: 'Mô tả phòng ban',
          value:'description',
          sortable:false
        },
      ],
    }
  },

  created() {
    getListDepartment().then(response=>{
      this.listDepartment = response.data;
    }).catch(()=>{
      this.listDepartment=[];
    })
  },

  components:{
    Layout
  },

  methods:{
    a(){
      console.log(this.listUser);
    }
  },

}
</script>