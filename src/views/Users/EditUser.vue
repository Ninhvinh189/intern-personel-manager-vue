<template>
  <Layout>
    <v-app class="inspire container">


      <v-card-title>Cập nhật thông tin nhân viên </v-card-title>

      <template >
        <v-progress-linear
            color="deep-purple"
            height="7"
            rounded
        ></v-progress-linear>
      </template>

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
                placeholder="Tải avatar lên"
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

      <v-progress-linear
          color="blue darken-2"
          rounded
          value="100"
          height="2"
      ></v-progress-linear>


      <v-form v-model="valid">
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
                  :value="user.firstName"
              ></v-text-field>
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
                  label="Số điện thoại"
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
                  label="Địa chỉ"
                  required
              >{{user.address}}</v-text-field>
            </v-col>
          </v-row>

          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
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
                  style="width: 800px"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="user.date_of_birth"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
          </v-menu>

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
                  label="Phòng ban"
                  :readonly="roleMe==='leader'"
                  :disabled="roleMe==='leader'"
                  :rules="selectRule"
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
                  label="Chức vụ"
                  :rules="selectRule"
                  v-model="user.role"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                  solo
                  label="Mô tả"
                  v-model="user.description"
              >{{user.description}}</v-textarea>
            </v-col>
          </v-row>

          <v-btn type="submit" class="primary" @click.prevent="handleSubmit">
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
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";
import {findUser, updateAvatar} from "@/services/user.service";
import {getListRole} from "@/services/role";
import {getListDepartment} from "@/services/department";
import {updateUser} from "@/services/user.service";
import {IMG_URL} from "@/plugins/constants";
export default {

  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      dataUser:[],
      dialog:false,
      dialogSubmit:false,
      url_avatar:'',
      activePicker: null,
      roleMe:localStorage.getItem('roleMe'),
      user: {
        id:'',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        date_of_birth: '',
        description: '',
        role: '',
        department: '',
      },
      file: '',
      url: '',
      listRole: [],
      listDepartment: [],
      valid: false,

      selectRule: [(v) => !!v || "Item is required"],

      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],

      phoneRules: [
        v => !!v || 'Phone is required',
        v => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(v) || 'Phone is invalid'
      ],
      addressRules: [
        v => !!v || 'Address is required',
      ],
    }
  },

  created() {
    getListRole().then(res=>{
      if(this.roleMe === 'admin'){
        this.listRole = res.data
      }else {
        this.listRole = res.data.filter(item=>{
          return item.name !== 'admin';
        })
      }

    }).catch(()=>{
      this.listRole = []
    })

    getListDepartment().then(res => {
      this.listDepartment = res.data
    }).catch(()=>{
      this.listDepartment = []
    })

    this.findUser();
  },

  components: {
    Layout
  },

  methods:{
    findUser(){
      findUser(this.$route.params.id).then(res=>{
        this.dataUser  = res.data;
        this.user.id = res.data.id;
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.phone = res.data?.profile?.phone;
        this.user.address = res.data?.profile?.address;
        this.user.description = res.data?.profile?.description;
        this.user.date_of_birth = res.data?.profile?.date_of_birth;
        this.user.department = res.data?.departments[0].id;
        this.user.role = res.data?.roles[0].id;
        this.url_avatar = IMG_URL+ res.data?.profile.avatar;
      }).catch(()=>{
        this.dataUser = []
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
        this.findUser()
        this.file = '';
        this.$toast.success(res.data.message);
      }).catch(error=>{
        this.$toast.error(error.response.data.message);
      })
    },

    handleSubmit(){
      this.dialogSubmit = true;
    },
    close(){
      this.dialogSubmit=false;
    },
    submit(){
      updateUser(this.user, this.user.id).then(res=>{
        this.$router.push({name:'list-user'},()=>{
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

    a(){
      console.log(this.user.role)
    }
  },

}
</script>