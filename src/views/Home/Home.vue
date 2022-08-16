<template>
  <layout>
    <div>
      Day la trang chu
      <v-btn @click="getMe">clcik</v-btn>
    </div>
  </layout>
</template>

<script>
  import Layout from "@/layout/layout";
  export default {
    components: {
      Layout
    },
    methods:{
      getMe(){
        console.log(this.$store.state.auth.me)
      }
    }
  }
</script>