<template>
  <Layout>
    <div id="app" class="container">
      <v-app>
        <v-card>
          <v-card-title>
            Danh sách chức vụ

            <v-dialog v-model="dialog" max-width="500" max-height="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Thêm chức vụ
                </v-btn>
              </template>
              <v-form class="white">
                <v-container class="pa-7">
                  <v-app-bar-title>
                    Thêm chức vụ
                  </v-app-bar-title>
                  <v-row>
                    <v-col
                        cols="12"
                        class="pt-4"
                    >
                      <v-text-field
                          v-model="form.name"
                          label="Tên chức vụ"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          solo
                          v-model="form.description"
                          label="Mô tả"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-container>
              </v-form>
            </v-dialog>

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
          </v-data-table>


        </v-card>
      </v-app>
    </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import {getListRole} from "@/services/role";
// import {deleteRole} from "@/services/role";
import {createRole} from "@/services/role";

export default {
  data(){
    return {
      dialog:false,
      listRole : [],
      search:'',
      form:{
        name:'',
        description:''
      },
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
        {
          text:'Hành động',
          value:'actions',
          sortable: false
        }
      ],
    }
  },

  created() {
    this.getListRole();
  },

  components:{
    Layout
  },

  methods:{
    getListRole(){
      getListRole().then(response=>{
        this.listRole = response.data;
      }).catch(()=>{
        this.listRole=[];
      })
    },
    save(){
      this.dialog=false
      createRole(this.form).then(res=>{
        this.getListRole();
        this.$toast.success(res.data.message);
      }).catch(error=>{
        this.$toast.warning(error.response.data.message);
      })
    },
    close(){
      this.dialog=false
    },
    slotAction(){
      return `item.actions`;
    },
  },

}
</script>