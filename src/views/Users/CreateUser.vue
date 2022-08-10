<template>
  <Layout>

    <v-app class="inspire container">
      <v-form v-model="valid">
        <v-container>
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


          <v-col cols="2">
            <v-file-input
                v-model="user.avatar"
            >
            </v-file-input>
            <v-img :src="url"></v-img>

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

          <v-btn type="submit" class="primary" @click.prevent="submit" >
            submit
          </v-btn>

        </v-container>
      </v-form>
    </v-app>
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";
import getListRole from "@/services/role";
import getListDepartment from "@/services/department";
import {createUser} from "@/services/user.service";

export default {
    data(){
      return {
        user:{
          firstName:'',
          lastName:'',
          phone:null,
          address:'',
          email:'',
          password:'',
          date_of_birth:'2001-11-03',
          description:'',
          role:'',
          department:'',
          avatar:''
        },
        url:'',
        listRole:[],
        listDepartment:[],

        valid:false,

        // nameRules: [
        //   v => !!v || 'Name is required',
        //   v => v.length <= 10 || 'Name must be less than 10 characters',
        // ],

        // emailRules: [
        //   v => !!v || 'E-mail is required',
        //   v => /.+@.+/.test(v) || 'E-mail must be valid',
        // ],
        // passwordRules:[
        //     v => !!v || 'Password is required',
        //     v => v.length >= 6 || 'Password must be more than 6 characters'
        // ],
        // phoneRules:[
        //     v => !!v || 'Phone is required',
        //     v => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(v) || 'Phone is invalid'
        // ],
        // addressRules:[
        //     v => !!v || 'Address is required',
        // ],

      }
    },

    created() {
      getListRole().then((response)=>{
        this.listRole =  response.data
      }).catch(()=>{
        this.listRole=[]
      })
      getListDepartment().then((response)=>{
        this.listDepartment = response.data;
      }).catch(()=>{
        this.listDepartment=[]
      })
    },

    components:{
      Layout,
    },

    methods:{
      logout() {
        localStorage.clear();
        this.$router.push('login');
      },

      submit(){
        createUser(this.user).then((response)=>{
          console.log(response.data);
          console.log("thanh cong")
        }).catch(()=>{
          console.log("that bai")
        })
      },
    },

  }
</script>