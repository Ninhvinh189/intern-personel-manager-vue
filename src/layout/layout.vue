<template>
  <v-app>
    <v-navigation-drawer
        width="250"
        class="blue-grey darken-4"
        dark
        persistent
        :mini-variant="checkTransNav"
        fixed
        app
    >
      <v-card class="transparent mt-4">
        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-action v-if="!checkTransNav">
              <v-avatar>
                <v-list-item-avatar>
                  <v-img
                      max-height="70"
                      max-width="70"
                      src="https://vuetify-material-dashboard.vuetifyjs.com/img/vmd.a39402e6.svg"
                      style="background-position: center center;"
                  >
                  </v-img>
                </v-list-item-avatar>
              </v-avatar>
            </v-list-item-action>

            <v-list-item v-if="!checkTransNav">
              <v-list-item-title>
                <h2>KIAI</h2>
              </v-list-item-title>
            </v-list-item>

          </v-list-item>
        </v-list>
      </v-card>

      <v-divider></v-divider>

      <router-link to="/" class="text-decoration-none">
        <v-card class="transparent">
          <v-list class="blue-grey darken-4">
            <v-list-item>
              <v-list-item-icon>
                <fa icon="fa-home"></fa>
              </v-list-item-icon>

              <v-list-item>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </v-list-item>
          </v-list>
        </v-card>
      </router-link>


      <v-divider></v-divider>

      <!--      Users-->
      <v-card class="transparent">
        <v-list>
          <v-list-group
              :value="false"
              prepend-icon="mdi-account-circle"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>Nhân viên</v-list-item-title>
              </v-list-item>
            </template>

            <!--            Add new user-->
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <router-link style="text-decoration: none; color: #FFFF;" to="/danh-sach-nhan-vien">
                  <fa icon="fa-list"></fa>
                  </router-link>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link style="text-decoration: none; color: #FFFF" to="/danh-sach-nhan-vien">Danh sách nhân viên</router-link>
                </v-list-item-title>
              </v-list-item>

              <v-list-item v-show = "roleMe==='admin'">
                <v-list-item-icon>
                  <router-link to="/them-moi-nhan-vien">
                    <fa icon="fa-user-plus"></fa>
                  </router-link>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link style="text-decoration: none; color: #FFFF" to="/them-moi-nhan-vien">Thêm nhân viên</router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>

          </v-list-group>
        </v-list>
      </v-card>

      <v-divider></v-divider>

      <!--      Department-->

      <v-card class="transparent">
        <v-list>
          <v-list-group
              :value="false"
              prepend-icon="mdi-account-multiple"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>Phòng ban</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <fa icon="fa-list"></fa>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link to="/danh-sach-phong-ban" style="text-decoration: none; color: #FFFF">
                    Danh sách phòng ban
                  </router-link>
                </v-list-item-title>
              </v-list-item>

            </v-list-item-group>

          </v-list-group>
        </v-list>
      </v-card>

      <v-divider></v-divider>

      <v-card class="transparent">
        <v-list>
          <v-list-group
              :value="false"
              prepend-icon="mdi-animation"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>Chức vụ</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <fa icon="fa-list"></fa>
                </v-list-item-icon>
                <v-list-item-title>
                  <router-link to="/danh-sach-chuc-vu" style="text-decoration: none; color: #FFFF">
                    Danh sách chức vụ
                  </router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </v-card>

    </v-navigation-drawer>

    <v-app-bar app style="height: 70px;">

      <v-col cols="7">
        <div class="d-flex align-center">

          <v-app-bar-nav-icon>
            <v-btn icon @click.stop="checkTransNav = !checkTransNav">
              <v-icon v-html="checkTransNav ? 'mdi-format-list-bulleted' : 'mdi-tune-vertical' "></v-icon>
            </v-btn>
          </v-app-bar-nav-icon>

          <div class="pl-4">Trang chủ</div>
        </div>
      </v-col>

      <v-col cols="3">
        <div class="d-flex" style="align-items: center;">
          <v-text-field placeholder="Tìm kiếm..." class="mr-5 pt-4"></v-text-field>
          <v-btn>
            <fa icon="magnifying-glass"></fa>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="2" class="d-flex justify-space-around align-center">

        <v-btn>
          <v-badge color="red" inline overlap>
            <span slot="badge">2</span>
          </v-badge>
          <fa icon="bell"></fa>
        </v-btn>
        <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
                icon
                x-large
                v-on="on"
            >
              <v-avatar
                  size="48"
              >
                <v-img :src="avatar"></v-img>
              </v-avatar>

            </v-btn>
          </template>

          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar
                >
                  <v-img :src="avatar"></v-img>
                </v-avatar>
                <h3 class="pt-3">{{ user.name}}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    color="black"
                >
                  <router-link to="/thong-tin-ban-than" style="text-decoration: none; color:black">Thông tin bản thân</router-link>
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                >
                  <router-link to="/cap-nhat-thong-tin-ban-than" style="text-decoration: none; color:black">Chính sửa thông tin</router-link>
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    @click="handleLogout"
                >
                  Đăng xuất
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>

        </v-menu>


      </v-col>
    </v-app-bar>

    <v-main style="background-color: #EEEEEE">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer app>

    </v-footer>
  </v-app>

</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: 'Home',

  data() {
    return {
      avatar: '',
      user:[],
      checkTransNav: false,
      right: true,
      rightDrawer: false,
      drawer:false,
      roleMe:localStorage.getItem('roleMe')
    }
  },
  created() {
    AuthService.getMe().then(res=>{
      this.user = res.data
    }).catch(()=>{
      this.user = [];
    })
  },

  updated() {
    this.avatar = localStorage.getItem('avatar');
  },

  methods:{

    handleLogout()
    {
      localStorage.clear();
      this.$router.push('login');
    }
  }


}
</script>

<style lang="scss" scoped>
.container-right {
  .search {
    border-bottom: 1px solid purple;
  }
}

.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

</style>