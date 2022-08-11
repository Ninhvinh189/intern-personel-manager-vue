<template>
  <Layout>
    <div id="app" class="container">
      <v-app>
        <v-card>
          <v-card-title>
            Danh sách chức vụ
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
              :items="listRole"
              :search="search"
          ></v-data-table>
        </v-card>
      </v-app>
    </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import getListRole from "@/services/role";

export default {
  data(){
    return {
      listRole : [],
      search:'',
      headers:[
        {
          text:'Tên chức vụ',
          value:'name',
          sortable:false
        },
        {
          text: 'Mô tả',
          value:'description',
          sortable:false
        },
      ],
    }
  },

  created() {
    getListRole().then(response=>{
      this.listRole = response.data;
    }).catch(()=>{
      this.listRole=[];
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