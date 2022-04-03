<template>
  <div>
    <loading v-show="loading" />
    <div class="form_wrap">
      <form class="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link text-red-500" :to="'/login'">Login</router-link>
        </p>
        <h2>Create your Profile</h2>
        <div class="inputs">
          <div class="input">
            <fa icon="user-plus" class="fa" />
            <input type="text" placeholder="first name" v-model="firstName" />
            <!-- <email class="icon" /> -->
          </div>
          <div class="input">
            <fa icon="user" class="fa" />
            <input type="text" placeholder="last name" v-model="lastName" />
            <!-- <email class="icon" /> -->
          </div>
          <div class="input">
            <fa icon="envelope" class="fa" />
            <input type="email" placeholder="email" v-model="email" />
          </div>
          <div class="input">
            <fa icon="lock" class="fa" />
            <input type="password" placeholder="password" v-model="password" />
            <!-- <password class="icon" /> -->
          </div>
          <button @click.prevent="register" class="button">Sign Up</button>
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </form>
    </div>
  </div>
</template>
    
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../fierbase/firebaseinit.js";
import loading from "../components/loading.vue";

export default {
  name: "register",
  components: { loading },
  data() {
    return {
      loading: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      try {
        if (
          this.email !== "" &&
          this.password !== "" &&
          this.firstName !== "" &&
          this.lastName !== ""
        ) {
          this.error = false;
          this.errorMsg = "";
          this.loading = true;
          const firebaseAuth = firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          const result = createUser;
          const dataBase = db.collection("users").doc(result.user.uid);

          await dataBase.set({
            id: firebaseAuth.currentUser.uid,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          });

          this.$router.push({ name: "Home" });
          return;
        }
        this.loading = false;
        this.error = true;
        this.errorMsg = "Pls fill out all the fields! Thanks!";
        return;
      } catch (e) {
        console.log("Что за Пост ошибка? Не получаеться?" + e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form_wrap {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  @media (max-width: 900px) {
    margin-left: 10px;
  }
  .register {
    width: 95%;
    display: flex;
    flex-direction: column;

    .login-register {
      width: 100%;
      font-family: "Patua One";
    }
    h2 {
      font-family: "Patua One";
      font-size: 20px;
    }
    .inputs {
      width: 100%;
      display: flex;
      flex-direction: column;

      .input {
        margin: 8px;

        .fa {
          color: #030377;
          margin-right: 5px;
        }
      }
      .button {
        margin-left: 130px;
      }
    }
  }
}

button {
  width: 80px;
  background-color: #5465ff;
  border: 2px solid #5465ff;
  border-radius: 5px;
  color: #fff;
  font-family: "Patua One";
  font-size: 14px;
  cursor: pointer;
}
input {
  width: 300px;
  height: 26px;
  border: 2px solid #c9ccda;
  outline: none;
  &:focus {
    border: 2px solid #3652cc;
  }

  &:hover {
    border: 2px solid #3652cc;
  }
}
</style>