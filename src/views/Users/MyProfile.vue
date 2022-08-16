<template>
  <Layout>
    <div class="container">
      <v-app outlined>
        <v-card>
          <v-card-title>Thong tin ban than</v-card-title>
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
<!--                <v-img src="https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png"></v-img>-->
              </v-avatar>
            </v-col>

            <v-card height="70%">
              <v-list class="pl-5">
                <v-list-item>
                  Họ tên:  <v-list-item-content class="pl-4">{{user.name }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Email: <v-list-item-content class="pl-4">{{user.email}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Chuc vu: <v-list-item-content class="pl-4">{{user?.roles[0]?.name}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Dia chi: <v-list-item-content class="pl-4">{{user.profile.address}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  So dien thoai: <v-list-item-content class="pl-4">0{{user.profile.phone}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Ngay sinh: <v-list-item-content class="pl-4">{{user.profile.date_of_birth}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  phong ban: <v-list-item-content class="pl-4">{{user?.departments[0]?.name}}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-btn @click="a">click</v-btn>
      </v-app>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";
import AuthService from "@/services/auth.service";
import {IMG_URL} from "@/plugins/constants";

export default {
  data(){
    return{
      user:[],
      url_avatar:''
    }
  },
  created() {
    AuthService.getMe().then(res => {
      this.user = res.data
      this.url_avatar = IMG_URL+this.user.profile.avatar
    })
  },
  components:{
    Layout
  },
  methods:{
   a(){
     console.log(this.url_avatar);
   }
  }
}
</script>