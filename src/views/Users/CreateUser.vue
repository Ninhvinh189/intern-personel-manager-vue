<template>
  <Layout>
    <v-app class="inspire container">

      <v-btn @click="logout">
        click
      </v-btn>

      <v-form v-model="valid" ref="form">
        <v-container style="max-width: 900px">

          <v-col cols="2">
            <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                @change="handleFileUpload($event)"
            >
            </v-file-input>

            <v-img :src="url"></v-img>
          </v-col>

          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.firstName"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.lastName"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--          Email , password-->
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--          Address/ phone-->
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.phone"
                  :rules="phoneRules"
                  label="Phone"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="user.address"
                  :rules="addressRules"
                  label="Address"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

<!--          <v-col md="8">-->
<!--            <v-menu-->
<!--                ref="menu"-->
<!--                v-model="menu"-->
<!--                :close-on-content-click="false"-->
<!--                :return-value.sync="user.date_of_birth"-->
<!--                transition="scale-transition"-->
<!--                offset-y-->
<!--                min-width="auto"-->
<!--            >-->
<!--              <template v-slot:activator="{ on, attrs }">-->
<!--                <v-text-field-->
<!--                    v-model="user.date_of_birth"-->
<!--                    label="Ngày sinh"-->
<!--                    prepend-icon="mdi-calendar"-->
<!--                    readonly-->
<!--                    v-bind="attrs"-->
<!--                    v-on="on"-->
<!--                ></v-text-field>-->
<!--              </template>-->
<!--              <v-date-picker-->
<!--                  v-model="user.date_of_birth"-->
<!--                  no-title-->
<!--                  scrollable-->
<!--              >-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn-->
<!--                    text-->
<!--                    color="primary"-->
<!--                    @click="menu = false"-->
<!--                >-->
<!--                  Cancel-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                    text-->
<!--                    color="primary"-->
<!--                    @click="$refs.menu.save(user.date_of_birth)"-->
<!--                >-->
<!--                  OK-->
<!--                </v-btn>-->
<!--              </v-date-picker>-->
<!--            </v-menu>-->
<!--          </v-col>-->

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
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
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
                  label="Department"
                  :rules="selectRule"
                  v-model="user.department"
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                sm="5"
            >
              <v-select
                  :items="this.listRole"
                  item-text="name"
                  item-value="id"
                  label="Role"
                  :rules="selectRule"
                  v-model="user.role"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="11">
              <v-textarea
                  solo
                  label="Description"
                  v-model="user.description"

              ></v-textarea>
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
import {getListRole} from "@/services/role";
import {getListDepartment} from "@/services/department";
import {createUser} from "@/services/user.service";

export default {
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      dialogSubmit:false,
      activePicker: null,
      user: {
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
        avatar: []
      },
      file: '',
      url: '',
      listRole: [],
      listDepartment: [],
      valid: false,
      messages: [],

      selectRule: [(v) => !!v || "Không được bỏ trống !"],

      nameRules: [
        v => !!v || 'Tên người dùng chưa được nhập !',
        v => v.length <= 10 || 'Cần nhỏ hơn 10 ký tự !',
      ],

      emailRules: [
        v => !!v || 'E-mail phải bắt buộc !',
        v =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail chưa hợp lệ !',
      ],
      passwordRules: [
        v => !!v || 'Mật khẩu chưa được nhập !',
        v => v.length >= 6 || 'Mật khẩu phải lớn hơn 6 kí tự !'
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
    getListRole().then((response) => {
      this.listRole = response.data
    }).catch(() => {
      this.listRole = []
    })
    getListDepartment().then((response) => {
      this.listDepartment = response.data;
    }).catch(() => {
      this.listDepartment = []
    })
  },

  components: {
    Layout
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.dialogSubmit = true;
      }
    },

    logout() {
      console.log(this.listRole)
    },

    handleFileUpload(event) {
      this.file = event;
      if (this.file) {
        this.url = URL.createObjectURL(this.file);
        URL.revokeObjectURL(this.file); // free memory
      } else {
        this.url = null
      }
    },

    handleSubmit() {
      this.validate();
    },

    close(){
      this.dialogSubmit = false;
    },

    submit() {
      let form = new FormData();
      this.dialogSubmit = false;
      for (const key in this.user) {
        form.append(key, this.user[key]);
      }
      form.append('avatar', this.file);
      createUser(form).then((response) => {
        this.$router.push('/danh-sach-nhan-vien', () => {
          this.$toast.success(response.data.message);
        })
      }).catch(err => {
        if (err.response.status === 500){
          this.$toast.error(err.response.data.message);
        }
        let errs = err.response.data.errors;
        for (let item in errs){
          this.$toast.warning(errs[item][0]);
        }
      })
    },

    save (date) {
      this.$refs.menu.save(date)
    },

  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

}
</script>