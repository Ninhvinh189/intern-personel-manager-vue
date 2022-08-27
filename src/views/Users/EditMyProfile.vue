<template>
  <Layout>
    <div class="container">
      <v-app outlined>
        <v-card>
          <v-card-title>Cập nhật thông tin bản thân </v-card-title>
        </v-card>
        <template >
          <v-progress-linear
              color="deep-purple"
              height="10"
              rounded
          ></v-progress-linear>
        </template>
        <v-row>
          <v-col>
            <v-col
                class="d-flex justify-center"
            >
              <v-avatar
                  class="profile"
                  color="grey"
                  size="164"
                  tile
              >
                <v-img :src="url_avatar"></v-img>
              </v-avatar>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <div style="position: absolute; padding-left: 157px;">
                    <v-btn
                        style="border-radius:50%; height: 50px; width: 50px"
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        tile
                        fab
                    >
                      <v-icon >mdi-camera</v-icon></v-btn>
                  </div>
                </template>

                <v-card>
                  <v-card-title>Tải ảnh lên</v-card-title>
                  <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Tải ảnh lên"
                      prepend-icon="mdi-camera"
                      @change="handleFileUpload($event)"
                  >
                  </v-file-input>
                  <v-img :src="url"></v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="dialog = false"
                    >
                      Hủy bỏ
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        depressed
                        @click="handleUpdateAvatar"
                    >
                      Lưu
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

          </v-col>
        </v-row>

        <v-form ref="form">
          <v-container style="max-width: 900px">
            <v-row>
              <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                    v-model="user.firstName"
                    :rules="nameRules"
                    :counter="10"
                    label="First name"

                >{{user.firstName}}</v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                    v-model="user.lastName"
                    :rules="nameRules"
                    :counter="10"
                    label="Last name"
                >{{user.lastName}}</v-text-field>
              </v-col>
            </v-row>

            <!--          Address/ phone-->
            <v-row>
              <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                    v-model="user.phone"
                    :rules="phoneRules"
                    label="Phone"
                    required
                >{{user.phone}}</v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                    v-model="user.address"
                    :rules="addressRules"
                    label="Address"
                    required
                >{{user.address}}</v-text-field>
              </v-col>
            </v-row>

            <v-col md="12">
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="user.date_of_birth"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="user.date_of_birth"
                      label="Ngày sinh"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  >{{user.date_of_birth}}</v-text-field>
                </template>
                <v-date-picker
                    v-model="user.date_of_birth"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(user.date_of_birth)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <!--Department and rule-->

            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-select
                    :items="listDepartment"
                    item-text="name"
                    item-value="id"
                    label="Department"
                    :rules="selectRule"
                    :readonly="roleMe==='leader'"
                    :disabled="roleMe==='leader'"
                    v-model="user.department"
                ></v-select>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
              >
                <v-select
                    :items="this.listRole"
                    item-text="name"
                    item-value="id"
                    label="Role"
                    :rules="selectRule"
                    v-model="user.role"
                    readonly
                    disabled
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <v-textarea
                    solo
                    label="Description"
                    v-model="user.description"
                >{{user.description}}</v-textarea>
              </v-col>
            </v-row>

            <v-btn type="submit" class="primary" @click.prevent="handleSubmit()">
              submit
            </v-btn>

            <v-dialog v-model="dialogSubmit" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Bạn chắc chắn với quyết định này chứ ? </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Hủy bỏ</v-btn>
                  <v-btn color="blue darken-1" text @click="submit">Gửi</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-form>
      </v-app>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";
import AuthService from "@/services/auth.service";
import {IMG_URL} from "@/plugins/constants";
import {updateAvatar, updateUser} from "@/services/user.service";
import {getListRole} from "@/services/role";
import {getListDepartment} from "@/services/department";

export default {
  data(){

    return{
      user: {
        id:'',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        date_of_birth: '',
        description: '',
        role: '',
        department: '',
      },
      roleMe:localStorage.getItem('roleMe'),
      myID: parseInt(localStorage.getItem('myId')),
      url_avatar:'',
      dialog:false,
      file:'',
      url:'',
      listRole:[],
      listDepartment:[],
      dialogSubmit: false,
      menu: false,
      modal: false,
      menu2: false,

      selectRule: [(v) => !!v || "Không được bỏ trống !"],
      nameRules: [
        v => !!v || 'Tên người dùng chưa được nhập !',
        v => v.length <= 10 || 'Cần nhỏ hơn 10 ký tự !',
      ],

      phoneRules: [
        v => !!v || 'Số điện thoại chưa được nhập !',
        v => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(v) || 'Số điện thoại chưa hợp lệ !'
      ],

      addressRules: [
        v => !!v || 'Địa chỉ chưa được nhập !',
      ],

    }
  },
  created() {
    this.getMe();

    getListRole().then(res=>{
      this.listRole = res.data
    }).catch(()=>{
      this.listRole = []
    })

    getListDepartment().then(res => {
      this.listDepartment = res.data
    }).catch(()=>{
      this.listDepartment = []
    })

  },

  components:{
    Layout
  },

  methods:{
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.dialogSubmit = true;
      }
    },

    handleSubmit(){
      this.validate();
    },

    close(){
      this.dialogSubmit=false;
    },

    submit(){
      updateUser(this.user, this.user.id).then(res=>{
        this.$router.push({name:'my-profile'},()=>{
          this.dialogSubmit=false;
          this.$toast.success(res.data.message);
        })
      }).catch(err => {
        this.dialogSubmit=false;
        if (err.response.status === 500){
          this.$toast.error(err.response.data.message);
        }
        let errs = err.response.data.errors;
        for (let item in errs){
          this.$toast.warning(errs[item][0]);
        }
      })
    },

    getMe(){
      AuthService.getMe().then(res => {
        this.user.id = res.data.id;
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.phone = res.data?.profile?.phone;
        this.user.address = res.data?.profile?.address;
        this.user.description = res.data?.profile?.description;
        this.user.date_of_birth = res.data?.profile?.date_of_birth;
        this.user.department = res.data?.departments[0]?.id;
        this.user.role = res.data?.roles[0]?.id;
        this.url_avatar = IMG_URL + res.data.profile.avatar
        localStorage.setItem('avatar',IMG_URL + res.data?.profile?.avatar);
      })
    },

    handleFileUpload(event) {
      this.file = event;
      if (this.file) {
        this.url = URL.createObjectURL(this.file);
        URL.revokeObjectURL(this.file);
      } else {
        this.url = null
      }
    },

    handleUpdateAvatar()
    {
      let form = new FormData();
      form.append('avatar',this.file);
      this.dialog=false;
      updateAvatar(form, this.user.id).then(res=>{
        this.getMe();
        this.url='';
        this.$toast.success(res.data.message);
      }).catch(error=>{
        this.$toast.error(error.response.data.message);
      })
    },
  },

}
</script>