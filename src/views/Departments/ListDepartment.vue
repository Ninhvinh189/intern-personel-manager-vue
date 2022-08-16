<template>
  <Layout>
    <div id="app" class="container">
      <v-app>
        <v-card>
          <v-card-title>
            Danh sách phòng ban
            <v-dialog v-model="dialog" max-width="500" max-height="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Them phong ban
                </v-btn>
              </template>
              <v-form class="white">
                <v-container class="pa-7">
                  <v-app-bar-title>
                    Thêm phòng ban
                  </v-app-bar-title>
                  <v-row>
                    <v-col
                    cols="12"
                    class="pt-4"
                    >
                      <v-text-field
                      v-model="form.name"
                      label="Tên phòng ban"
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
            >
            </v-text-field>
          </v-card-title>

          <v-data-table
              :headers="headers"
              :items="listDepartment"
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

          <v-dialog v-model="dialogEdit" max-width="500" max-height="500">
            <v-form class="white">
              <v-container class="pa-7">
                <v-app-bar-title>
                  Thay đổi thông tin phòng ban
                </v-app-bar-title>
                <v-row>
                  <v-col
                      cols="12"
                      class="pt-4"
                  >
                    <v-text-field
                        v-model="formEdit.name"
                        label="Tên phòng ban"
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                  >
                    <v-textarea
                        solo
                        v-model="formEdit.description"
                        label="Mô tả"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="submitEdit">Save</v-btn>
                </v-card-actions>
              </v-container>
            </v-form>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Bạn chắc chắn sẽ xóa phòng ban này?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="submitDelete">OK</v-btn>
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
import {getListDepartment} from "@/services/department";
import {createDepartment} from "@/services/department";
import {editDepartment} from "@/services/department";
import {deleteDepartment} from "@/services/department";

export default {
  data(){
    return {
      dialog:false,
      dialogEdit:false,
      dialogDelete:false,
      status:false,
      message:null,
      idItemDeleted:null,
      form:{
        name:'',
        description:'',
      },

      formEdit:{
        id:'',
        name:'',
        description: ''
      },

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
        {
          text: 'Hành động',
          value: 'actions'
        }
      ],
    }
  },

  created() {
    this.getListDepartment();
  },

  components:{
    Layout
  },

  methods:{
    getListDepartment() {
      getListDepartment().then(response=>{
        this.listDepartment = response.data;
      }).catch(()=>{
        this.listDepartment=[];
      })
    },
    handleEditItem(item){
      this.dialogEdit = true;
      this.formEdit.id = item.id;
      this.formEdit.name = item.name;
      this.formEdit.description = item.description;
    },
    handleDeleteItem(item){
      this.dialogDelete=true;
      this.idItemDeleted = item.id;
    },
    slotAction(){
      return `item.actions`;
    },

    close(){
      this.dialog = false;
      this.dialogEdit=false;
      this.dialogDelete=false;
    },

    save(){
      this.dialog = false;
      createDepartment(this.form)
          .then(res=>{
            this.message = res.data.message;
            this.status = true;
            this.$toast.success(this.message);
            console.log(this.message)
            this.getListDepartment();
          }).catch(error=>{
            console.log(error.response.data.message)
            this.status = true;
            this.$toast.error(error.response.data.message);
      })
    },
    submitEdit(){
      this.dialogEdit = false;
      editDepartment(this.formEdit)
          .then(res=>{
            this.message = res.data.message;
            this.status = true;
            this.$toast.success(this.message);
            this.getListDepartment();
          })
          .catch(error=>{
            this.message = error.response.data.message;
            this.status = true;
          })
    },
    submitDelete(){
      this.dialogDelete=false;
      deleteDepartment(this.idItemDeleted)
          .then(res=>{
            this.message = res.data.message;
            this.status = true;
            this.$toast.success(this.message);
            this.getListDepartment();
          })
          .catch(error=>{
            this.message = error.response.data.message;
            this.status = true;
          })
    }
  },

}
</script>