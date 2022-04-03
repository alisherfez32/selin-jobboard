<template>
  <loading v-show="loading" />
  <div class="form-wrap">
    <!-- <loading /> -->
    <p class="login-register">
      Already have an account?`
      <router-link class="router-link" :to="'/login'"
        >Back to Login</router-link
      >
    </p>
    <h2>Reset Password</h2>
    <p>Forgot your Password? Enter Your email & reset it!</p>
    <div class="inputs">
      <div class="input">
        <fa icon="envelope" class="fa" />
        <input type="text" placeholder="email" v-model="email" />
      </div>
    </div>
    <button class="button" @click.prevent="resetPassword">Reset</button>
  </div>
  <modal
    v-if="modalActive"
    :modalMessage="modalMessage"
    @close-modal="closeModel"
  />
</template>

<script>
import modal from "../components/modal.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import loading from "../components/loading.vue";
export default {
  name: "forgotPassword",
  components: {
    modal,
    loading,
  },
  data() {
    return {
      email: "",
      loading: null,
      modalActive: false,
      modalMessage: "",
    };
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive an email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModel() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .login-register {
    font-family: "Patua One";
    font-size: 20px;
  }

  h2 {
    font-family: "Patua One";
    font-size: 20px;
    color: #5f3030;
  }
  p {
    font-family: "Patua One";
    color: #5f3030;
  }

  .inputs {
    width: 100%;
    display: flex;
    flex-direction: column;

    .input {
      margin: 10px;

      .fa {
        color: #030377;
        margin-right: 5px;
      }
    }
  }
  .button {
    margin-left: 130px;
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