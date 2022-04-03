
<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
  <router-view />
</template>

<script>
//import DarkMode from "./components/dark.vue";

export default {
  name: "App",
  components: {},
  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.$store.commit("updateUser", user);
    //   if (user) {
    //     this.$store.dispatch("getCurrentUser");
    //     console.log(this.$store.state.profileEmail);
    //   }
    // });
    this.$store.dispatch("getPost");
  },
};
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
