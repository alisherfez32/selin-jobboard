<template>
  <div>
    <header class="header" @scroll="scroll">
      <div class="container">
        <Logo class="logo" />
        <nav class="nav">
          <span @click="profileToggleMenu" class="nav_links" ref="profile">
            <span v-if="user" class="radius"><fa icon="user-circle" /></span>
            <p class="prft" v-show="profileMenu">
              {{ this.$store.state.firstName }}
            </p>
          </span>
          <div>
          <router-link
            class="nav_links text-black"
            :to="{ name: 'MySpace' }"
            v-if="user"
            >MySpace</router-link
          >
          <router-link
            class="nav_links text-black"
            :to="{ path: '/create-profile' }"
            v-if="!user"
            >MySpace</router-link
          >
          <router-link v-if="!user" class="nav_links text-black" :to="'/login'"
            >Login</router-link
          >
          </div>
        </nav>
      </div>
    </header>
    <!-- <navigation></navigation> -->
  </div>
</template>

<script>
// import Navigation from "./navigation.vue";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Logo from "../../assets/icons.vue";

export default {
  components: {
    // Navigation,
    Logo,
  },
  data() {
    return {
      profileMenu: null,
    };
  },
  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.$store.commit("updateUser", user);
    //   if (user) {
    //     console.log(this.$store.state.profileEmail);
    //     this.$store.dispatch("getCurrentUser");
    //   }
    // });
  },
  methods: {
    scroll() {
      document.style.backgroundColor = "red";
    },
    profileToggleMenu() {
      this.profileMenu = !this.profileMenu;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  // position: fixed;
  z-index: 1;
  display: flex;
  background-color: #fff;
  .container {
    width: 100%;
    margin: 0;
    .logo {
      cursor: pointer;
      position: absolute;
      margin-left: 50px;
      color: #c41919;
      @media (max-width: 900px) {
        margin-left: 20px;
      }
    }
    .nav {
      display: flex;
      margin-right: 80px;
      font-size: 32px;
      color: black;
      font-family: "Patua One";
      color: #fff;
      align-items: flex-end;
      float: right;
      @media (max-width: 900px) {
        font-size: 20px;
        margin-right: 20px;
      }

      .nav_links {
        padding-left: 10px;
        padding-bottom: 2px;
        display: inline-block;
        text-decoration: none;
        transition: grey 0.2s linear;
      }
    }
  }
}

.prf {
  color: red;
  display: flex;
}
.prft {
  color: green;
  display: inline;
}
.radius {
  border-radius: 50%;
  color: rgb(252, 15, 15);
  cursor: pointer;
}
</style>