<template>
  <div id="app">
    <v-app app>
      <div class="container d-flex justify-center align-center">

        <v-card
            width="300"
            height="500"
        >
          <div style="padding: 10px">
            <v-text-field
                v-model="user.email"
                label="Email"
            >
            </v-text-field>
            <v-text-field
                v-model="user.password"
                label="Password"
            >
            </v-text-field>
            <v-btn @click="handleLogin"
                color="primary"
                width="100%"
            >Login</v-btn>
          </div>
        </v-card>
      </div>
    </v-app>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        user:{
          email:'admin@gmail.com',
          password:'111111'
        }
      }
    },
    methods:{
      handleLogin(){
        if (this.user.email && this.user.password)
        {
          this.$store.dispatch('auth/login',this.user)
              .then(()=>{
                this.$router.push('/');
              })
              .catch((error)=>{
                return error;
              });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>