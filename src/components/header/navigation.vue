<template>
  <div>
    <div class="intro">
      <div class="container1">
        <div class="intro_inner">
          <h2 class="intro_title">Welcome to Selin</h2>
        </div>
        <!-- <div class="intro_nav">
          <nav class="nav1">
            <router-link class="nav_links1" :to="{ path: '/jobs' }"
              >Jobs</router-link
            >
            <router-link
              class="nav_links1"
              :to="{ name: 'CreateProfile' }"
              v-if="!click"
              >Create Profile</router-link
            >
            <router-link
              class="nav_links1"
              :to="{ name: 'change' }"
              v-else-if="user"
              >Edit Profile</router-link
            >
          </nav>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/compat/auth";
import "firebase/compat/storage";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/compat/app";
//import db from "../../fierbase/firebaseinit.js";

export default {
  data() {
    return {
      click: false,
    };
  },
  methods: {
    getCreateProfile() {},
  },
  created() {
    let value = localStorage.getItem("show");
    let dad = JSON.parse(value);
    if (dad === false) {
      return (this.click = !this.click);
    } else {
      console.log("Fuck Off!");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="css" scoped>
.intro {
  width: 100%;
  height: 20vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #fff;
  background-size: cover;
}

.intro .container1 {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.intro .container1 .intro_inner {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.intro .container1 .intro_inner .intro_title {
  font-size: 32px;
  font-weight: 500;
  line-height: 1;
  font-family: "Patua One";
}

.intro .container1 .intro_nav {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.intro .container1 .intro_nav .nav1 {
  margin: 0;
  font-size: 16px;
  font-family: "Patua One";
}

.nav_links1 {
  text-decoration: none;
  position: relative;
  display: inline-block;
  -webkit-transition: grey 0.2s linear;
  transition: grey 0.2s linear;
  cursor: pointer;
}
</style>