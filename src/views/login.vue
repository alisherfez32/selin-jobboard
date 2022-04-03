<template>
  <div>
    <loading v-show="loading" />
    <div class="form_wrap">
      <p class="login-register">
        Dont have an account?
        <router-link class="router-link text-red-500" :to="'/register'"
          >Register</router-link
        >
      </p>
      <h2>login to Selin</h2>

      <div class="inputs">
        <div class="input">
          <fa icon="envelope" class="fa" />
          <input type="text" placeholder="email" v-model="email" />
        </div>
        <div class="input">
          <fa icon="lock" class="fa" />
          <input type="password" placeholder="password" v-model="password" />
           <password class="icon" /> 
         </div>
      </div> 
      <div class="error" v-show="error">{{ this.errorMsg }}</div>
      <button @click.prevent="signIn">Sign In</button>
      <router-link class="forgot-password" :to="'/forgot-password'"
        >Forgot Your passsword?
      </router-link>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import loading from "../components/loading.vue";
export default {
  name: "Login",
  components: { loading },
  data() {
    return {
      loading: null,
      smsSent: false,
      confirmResult: null,
      confirm: null,
      otpnum: null,
      recaptchaVerifier: null,
      recaptchaWidgetId: null,
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  mounted() {
  },
  methods: {
    async signIn() {
      this.loading = true;
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Home" });
          this.error = false;
          this.errorMsg = "";
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang ='scss' scoped>
.form_wrap {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  @media (max-width: 900px) {
    margin-left: 10px;
  }
  .login-register {
    font-family: "Patua One";
    font-size: 20px;
  }
  h2 {
    font-family: "Patua One";
    font-size: 20px;
    color: #3a2020;
  }
  .inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    .input {
      margin: 10px;
      justify-content: center;
      .fa {
        color: #030377;
        margin-right: 5px;
      }
    }
    .button {
      margin-left: 130px;
    }
  }
  .forgot-password {
    margin-top: 10px;
    text-decoration: none;
    color: red;
    font-size: 16px;
    font-family: "Patua One";
    transition: 0.5s ease all;
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