<template>
  <Layout>
    <div class="container">
      <v-app outlined>
        <v-card>
          <v-card-title>Thông tin chi tiết</v-card-title>
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
                <v-img :src="avatar"></v-img>
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
                      placeholder="Pick an avatar"
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
                      Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        depressed
                        @click="handleUpdateAvatar"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <v-card height="70%">
              <v-list class="pl-16">
                <v-list-item>
                  Họ tên:  <v-list-item-content class="pl-4">{{user.name }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Email: <v-list-item-content class="pl-4">{{user.email}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Chức vụ: <v-list-item-content class="pl-4">{{user?.roles[0]?.name}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Địa chỉ: <v-list-item-content class="pl-4">{{user?.profile?.address}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Số điện thoại: <v-list-item-content class="pl-4">{{user?.profile?.phone}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Ngày sinh: <v-list-item-content class="pl-4">{{user?.profile?.date_of_birth}}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  Phòng ban: <v-list-item-content class="pl-4">{{user?.departments[0]?.name}}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-app>
      <v-btn @click="a">click</v-btn>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";
import {findUser, updateAvatar} from "@/services/user.service";
import {IMG_URL} from "@/plugins/constants";

export default {
  data(){
    return{
      user:[],
      avatar:'',
      dialog:false,
      file:'',
      url:'',
    }
  },
  created() {
    this.findUser();
  },
  components:{
    Layout
  },

  methods:{
    findUser(){
      findUser(this.$route.params.id).then(res => {
        this.user = res.data
        this.avatar =IMG_URL + this.user.profile.avatar;
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
        this.url='';
        this.findUser();
        this.$toast.success(res.data.message);
      }).catch(error=>{
        this.$toast.error(error.response.data.message);
      })
    },

    a(){
      console.log(this.avatar);
    }
  }
}
</script>