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

          <div class="pl-3 pb-8 pt-1" v-show="roleMe==='admin'">
            <v-dialog v-model="dialog" max-width="500" max-height="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Thêm mới
                </v-btn>
              </template>
              <v-form class="white">
                <v-container class="pa-7">
                  <v-app-bar-title>
                    Nhập thông tin chức vụ
                  </v-app-bar-title>
                  <v-row>
                    <v-col
                        cols="12"
                        class="pt-4"
                    >
                      <v-text-field
                          v-model="form.name"
                          label="Tên chức vụ"
                          :rules="nameRules"
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
                    <v-btn color="blue darken-1" text @click="close">Hủy bỏ</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Gưi</v-btn>
                  </v-card-actions>
                </v-container>
              </v-form>
            </v-dialog>
          </div>

          <v-data-table
              :headers="headers"
              :items="listRole"
              :search="search"
          >
            <template v-slot:[slotAction()] = "{item}">
              <v-icon
                  class="mr-2"
                  @click="handleEditItem(item)"
                  :disabled="roleMe === 'leader'"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  @click="handleDeleteItem(item)"
                  :disabled="roleMe === 'leader'"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>

          <v-dialog v-model="dialogEdit" max-width="500" max-height="500">
            <v-form class="white">
              <v-container class="pa-7">
                <v-app-bar-title>
                  Thay đổi thông tin chức vụ
                </v-app-bar-title>
                <v-row>
                  <v-col
                      cols="12"
                      class="pt-4"
                  >
                    <v-text-field
                        v-model="formEdit.name"
                        label="Tên chức vụ"

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
                  <v-btn color="blue darken-1" text @click="close">Hủy bỏ</v-btn>
                  <v-btn color="blue darken-1" text @click="submitEdit">Gửi</v-btn>
                </v-card-actions>
              </v-container>
            </v-form>
          </v-dialog>
        </v-card>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Bạn chắc chắn sẽ xóa chức vụ này?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Hủy bỏ</v-btn>
              <v-btn color="blue darken-1" text @click="submitDelete">Thực hiện</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-app>
    </div>
  </Layout>
</template>

<script>

import Layout from "@/layout/layout";
import {deleteRole, getListRole} from "@/services/role";
// import {deleteRole} from "@/services/role";
import {createRole} from "@/services/role";
import {editRole} from "@/services/role";

export default {
  data(){
    return {
      dialog:false,
      listRole : [],
      search:'',
      dialogEdit:false,
      dialogDelete:false,
      idRoleDeleted:'',
      roleMe:localStorage.getItem('roleMe'),
      formEdit:{
        id:'',
        name:'',
        description:''
      },
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

      nameRules: [
        v => !!v || 'Tên chức vụ chưa được nhập !',
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

    submitDelete(){
      this.dialogDelete=false;
      deleteRole(this.idRoleDeleted).then(res => {
        this.$toast.success(res.data.message);
        this.getListRole();
      }).catch(err => {
        this.$toast.error(err.response.data.message);
        this.getListRole();
      })
    },

    handleDeleteItem(item){
      this.dialogDelete=true;
      this.idRoleDeleted = item.id;
    },

    submitEdit() {
      editRole(this.formEdit).then(res=>{
        console.log(res.data);
        this.dialogEdit = false;
        this.getListRole();
        this.$toast.success(res.data.message)
      }).catch(err=>{
        this.dialogEdit = false;

        if (err.response.status === 500){
          this.$toast.error(err.response.data.message);
        }
        let errs = err.response.data.errors;
        for (let item in errs){
          this.$toast.warning(errs[item][0]);
        }
      })
    },

    handleEditItem(item) {
      this.dialogEdit = true;
      this.formEdit.id = item.id;
      this.formEdit.name = item.name;
      this.formEdit.description = item.description;
    },

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
      }).catch(err=>{
        console.log(err);
        if (err.response.status === 500){
          this.$toast.error(err.response.data.message);
        }
        let errs = err.response.data;
        for (let item in errs){
          this.$toast.warning(errs[item][0]);
        }

      })
    },

    close(){
      this.dialog=false
      this.dialogEdit = false
      this.dialogDelete=false
    },

    slotAction(){
      return `item.actions`;
    },
  },

}
</script>