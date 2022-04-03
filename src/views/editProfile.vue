<template>
  <div>
    <loading v-show="loading" />
    <div class="createPost">
      <div class="wrapper">
        <div class="img_place">
          <img class="img_1_1" src="../assets/logoo.png" alt="df" />
        </div>
        <div class="text">
          <p class="p1">My Personal Profile</p>
          <p class="p2">Hi. welcome back!</p>
          <p class="p">You are editing your own personalized Profile.</p>
        </div>
      </div>
      <div class="container">
        <p class="p20">Full Name <fa icon="star-of-life" class="icon" /></p>
        <div class="input">
          <input type="text" placeholder="fullName" v-model="fullName" />
        </div>
        <div class="age">
          <p class="p21">Age <fa icon="star-of-life" class="icon" /></p>
          <input type="text" placeholder="your age" v-model="age" />
        </div>
        <div class="height">
          <p class="p23">Height <fa icon="star-of-life" class="icon" /></p>
          <input type="text" placeholder="your height." v-model="height" />
        </div>
        <div class="height">
          <p class="p23">Weight <fa icon="star-of-life" class="icon" /></p>
          <input type="text" placeholder="your weight." v-model="weight" />
        </div>
        <div class="city">
          <p class="p6">Current City <fa icon="star-of-life" class="icon" /></p>
          <p class="p7">ex. Hanghou</p>
          <input type="text" v-model="Location" />
        </div>
        <div class="talents">
          <p class="p5">Talents <fa icon="star-of-life" class="icon" /></p>
          <p class="p6">Pick a lot...</p>
          <v-select
            multiple
            v-model="talent"
            class="style-chooser"
            :options="talents"
            placeholder="Pls Choose some... *"
          ></v-select>
        </div>
        <div class="languages">
          <p class="p8">Languages <fa icon="star-of-life" class="icon" /></p>
          <p class="p6">hmm I am fluent at...</p>
          <v-select
            multiple
            v-model="language"
            class="style-chooser"
            :options="languages"
            placeholder="Pls Choose some... *"
          ></v-select>
        </div>
        <div class="city">
          <p class="p9">Portfolio <fa icon="star-of-life" class="icon" /></p>
          <p class="p7">Upload your profile</p>
          <input
            type="file"
            ref="postLogo"
            id="photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
        </div>
        <div class="actions">
          <button @click.prevent="updateProfile">Save Changes</button>
        </div>
        <div :class="{ invisible: !error }" class="errMsg">
          <p>
            Error: <span>{{ errorMsg }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/compat/auth";
import "firebase/compat/storage";
import "vue-select/dist/vue-select.css";
import loading from "../components/loading.vue";
import firebase from "firebase/compat/app";
import db from "../fierbase/firebaseinit.js";

export default {
  components: { loading },
  data() {
    return {
      talents: [
        "Face Recog.",
        "Acting",
        "Modeling",
        "LvStream",
        "Event&Fair",
        "Commercial",
        "Short videos",
        "Voice Rec.",
        "Ear rec.",
      ],
      languages: [
        "Mandarin Chinese",
        "Tajik",
        "Spanish",
        "English",
        "Hindi/Urdu",
        "Arabic",
        "Bengali",
        "Portuguese",
        "Russian",
        "Japanese",
        "German",
        "Javanese",
        "Punjabi",
        "Wu",
        "French",
        "Telugu",
        "Vietnamese",
        "Marathi",
        "Korean",
        "Tamil",
        "Italian",
        "Turkish",
        "Cantonese/Yue",
      ],
      loading: null,
      file: null,
      error: false,
      errorMsg: " ",
      isActive: false,
    };
  },
  methods: {
    heart() {
      this.isActive = !this.isActive;
    },
    fileChange() {
      this.file = this.$refs.postLogo.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileUrl", URL.createObjectURL(this.file));
    },
    async updateProfile() {
      if (
        this.fullName !== "" &&
        this.age !== "" &&
        this.height !== "" &&
        this.weight !== "" &&
        this.Location !== "" &&
        this.skintone !== "" &&
        this.language !== "" &&
        this.talent !== ""
      ) {
        this.loading = true;
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(
          `documents/profilePhoto/${this.$store.state.postPhotoName}` //gor Logo
        );
        docRef.put(this.file).on(
          "state_changed",
          (err) => {
            //
            console.log(err);
          },
          async () => {
            const downloadUrl = await docRef.getDownloadURL();
            const timestamp = Date.now();
            let user = firebase.auth().currentUser.uid;
            const dataBase = db
              .collection("profile")
              .where("uid", "==", user)
              .get();
            dataBase.forEach((doc) => {
              doc.ref.update({
                fullName: this.fullName,
                postLogo: downloadUrl,
                date: timestamp,
                age: this.age,
                height: this.height,
                weight: this.weight,
                Location: this.Location,
                language: this.language,
                talent: this.talent,
              });
            });

            // await dataBase.update({
            //   fullName: this.fullName,
            //   postLogo: downloadUrl,
            //   date: timestamp,
            //   age: this.age,
            //   height: this.height,
            //   weight: this.weight,
            //   Location: this.Location,
            //   language: this.language,
            //   talent: this.talent,
            // });
            await this.$router.push({ path: "/myspace" });
          }
        );
        return;
      }
      this.loading = false;
      this.error = true;
      this.errorMsg = "Pls fill all fields";
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    fullName: {
      get() {
        return this.$store.state.fullName;
      },
      set(payload) {
        this.$store.commit("changeFullName", payload);
      },
    },
    age: {
      get() {
        return this.$store.state.age;
      },
      set(payload) {
        this.$store.commit("changeAge", payload);
      },
    },
    gender: {
      get() {
        return this.$store.state.gender;
      },
      set(payload) {
        this.$store.commit("changeGender", payload);
      },
    },
    height: {
      get() {
        return this.$store.state.height;
      },
      set(payload) {
        this.$store.commit("changeHeight", payload);
      },
    },
    weight: {
      get() {
        return this.$store.state.weight;
      },
      set(payload) {
        this.$store.commit("changeWeight", payload);
      },
    },
    Location: {
      get() {
        return this.$store.state.Location;
      },
      set(payload) {
        this.$store.commit("changeLocation", payload);
      },
    },
    country: {
      get() {
        return this.$store.state.country;
      },
      set(payload) {
        this.$store.commit("changeCountry", payload);
      },
    },
    skintone: {
      get() {
        return this.$store.state.skintone;
      },
      set(payload) {
        this.$store.commit("changeSkintone", payload);
      },
    },
    language: {
      get() {
        return this.$store.state.language;
      },
      set(payload) {
        this.$store.commit("changeLanguage", payload);
      },
    },
    talent: {
      get() {
        return this.$store.state.talent;
      },
      set(payload) {
        this.$store.commit("changeTalent", payload);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";
@import "../styles/style.scss";
</style>
