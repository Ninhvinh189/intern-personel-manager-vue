<template>
  <Layout>
    <v-app class="inspire container">

      <v-btn @click="logout">
        click
      </v-btn>

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

          <v-col md="8">
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
                ></v-text-field>
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

          <v-col cols="2">
            <label>File
              <input type="file" @change="handleFileUpload( $event )"/>
            </label>
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

          <v-btn type="submit" class="primary" @click.prevent="submit">
            submit
          </v-btn>

        </v-container>
      </v-form>
    </v-app>
  </Layout>
</template>

<script>
import Layout from "@/layout/layout";

export default {

  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
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
  components: {
    Layout
  }
}
</script>