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
                <h2>Vinh</h2>
              </v-list-item-title>
            </v-list-item>

          </v-list-item>
        </v-list>
      </v-card>

      <v-divider></v-divider>

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

              <v-list-item>
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

              <v-list-item>
                <v-list-item-icon>
                  <fa icon="fa-solid fa-circle-plus"/>
                </v-list-item-icon>
                <v-list-item-title>Thêm phòng ban</v-list-item-title>
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
                <v-list-item-title> Danh sách chức vụ</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <fa icon="fa-plus"></fa>
                </v-list-item-icon>
                <v-list-item-title>Thêm chức vụ</v-list-item-title>
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

          <div class="pl-4">Dashboard</div>
        </div>
      </v-col>

      <v-col cols="3">
        <div class="d-flex" style="align-items: center;">
          <v-text-field placeholder="Search..." class="mr-5 pt-4"></v-text-field>
          <v-btn>
            <fa icon="magnifying-glass"></fa>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="2" class="d-flex justify-space-around">

        <v-btn>
          <v-badge color="red" inline overlap>
            <span slot="badge">2</span>
          </v-badge>
          <fa icon="bell"></fa>
        </v-btn>

        <!--        <template>-->
        <!--          <v-btn-->
        <!--              @click.stop="rightDrawer=!rightDrawer"-->
        <!--          >-->
        <!--            <v-badge color="red" >-->
        <!--              <span slot="badge">2</span>-->
        <!--            </v-badge>-->
        <!--            <fa icon="bell"></fa>-->
        <!--          </v-btn>-->

        <!--          <v-alert-->
        <!--              :value="rightDrawer"-->
        <!--              color="pink"-->
        <!--              dark-->
        <!--              border="top"-->
        <!--              icon="mdi-home"-->
        <!--              transition="scale-transition"-->
        <!--          >-->
        <!--            2 unread notifications-->
        <!--          </v-alert>-->
        <!--          -->
        <!--        </template>-->

        <!--        <v-btn icon @click.stop="rightDrawer = !rightDrawer">-->
        <!--          <v-badge color="red" overlap>-->
        <!--            <span slot="badge">2</span>-->
        <!--            <fa icon="bell"></fa>-->
        <!--          </v-badge>-->
        <!--        </v-btn>-->

        <v-toolbar bottom v-show="rightDrawer">
          <span>2 unread notifications</span>
        </v-toolbar>

        <v-btn>
          <fa icon="user"></fa>
        </v-btn>
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

export default {
  name: 'Home',

  data() {
    return {
      checkTransNav: false,
      right: true,
      rightDrawer: false,
      drawer:false,
    }
  },
  methods:{

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