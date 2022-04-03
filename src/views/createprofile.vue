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
          <p class="p">You are creating your own personalized Profile.</p>
        </div>
      </div>
      <div class="container">
        <p class="p20">Full Name <fa icon="star-of-life" class="icon" /></p>
        <div class="input">
          <input type="text" placeholder="fullName" v-model="fullName" />
        </div>
        <!-- <div class="image">
          <label for="photo">Upload cover logo</label>
          <input
            type="file"
            ref="postLogo"
            id="photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.postPhotoUrl }"
          >
            Preview Photo
          </button>
          <span>File chosen: {{ this.$store.state.postPhotoName }}</span>
        </div> -->
        <!-- <div class="age">
          <p class="p21">Age <fa icon="star-of-life" class="icon" /></p>
          <input type="number" placeholder="your age" v-model="age" />
        </div>
        <div class="gender">
          <p class="p22">Gender</p>
          <div class="input1">
            <input
              value="male"
              type="radio"
              v-model="gender"
              id="male"
              name="gender"
            />
            <label for="male">Male</label>
            <br />
            <input
              value="female"
              type="radio"
              v-model="gender"
              id="female"
              name="gender"
            />
            <label for="female">Female</label>
          </div>
        </div>
        <div class="height">
          <p class="p23">Height <fa icon="star-of-life" class="icon" /></p>
          <input type="number" placeholder="your height." v-model="height" />
        </div>
        <div class="height">
          <p class="p23">Weight <fa icon="star-of-life" class="icon" /></p>
          <input type="number" placeholder="your weight." v-model="weight" />
        </div>
        <div class="city">
          <p class="p6">Current City <fa icon="star-of-life" class="icon" /></p>
          <p class="p7">ex. Hanghou</p>
          <input type="text" v-model="Location" />
        </div> -->

        <div class="job_type">
          <p class="p5">Homeland <fa icon="star-of-life" class="icon" /></p>
          <v-select
            v-model="country"
            class="style-chooser"
            :options="countries"
            placeholder="Pls Choose your Homeland *"
          ></v-select>
        </div>
        <!-- <div class="skin_tone">
          <p class="p5">Skin Tone <fa icon="star-of-life" class="icon" /></p>
          <v-select
            v-model="skintone"
            class="style-chooser"
            :options="skinTone"
            placeholder="Pls Choose *"
          ></v-select>
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
        </div> -->
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
        <div class="wechat">
          <p class="p13">Wechat ID<fa icon="star-of-life" class="icon" /></p>
          <input type="text" v-model="WechatId" />
        </div>
        <div class="heart">
          <p class="p14">Give yourself a heart.</p>
          <div @click="heart" class="Heyy">
            <fa icon="heart" class="heartt" v-if="isActive" />
            <fa icon="heart" class="hearttt" v-else />
          </div>
        </div>
        <!-- <div class="editor">
          <vue-editor
            :editorOptions="editorSettings"
            v-model="postHTML"
            useCustomImageHandler
          />
        </div> -->
        <div class="actions">
          <button @click.prevent="createProfile">Good to Go.</button>
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
import firebase from "firebase/compat/app";
import db from "../fierbase/firebaseinit.js";
import "vue-select/dist/vue-select.css";
import loading from "../components/loading.vue";
export default {
  components: { loading },
  data() {
    return {
      skinTone: [
        "White tone",
        "Dark white tone",
        "Brown tone",
        "Dork brown tone",
        "Black tone",
      ],
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
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
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
      errorMsg: "",
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
    async createProfile() {
      if (
        this.fullName !== "" &&
        this.age !== "" &&
        this.gender !== "" &&
        this.height !== "" &&
        this.weight !== "" &&
        this.Location !== "" &&
        this.country !== "" &&
        this.skintone !== "" &&
        this.language !== "" &&
        this.WechatId !== "" &&
        this.talent !== ""
      ) {
        this.loading = true;
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(
          `documents/profilePhoto/${this.$store.state.postPhotoName}` //gor Logo
        );
        docRef.put(this.file).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            //
            console.log(err);
          },
          async () => {
            const downloadUrl = await docRef.getDownloadURL();
            const timestamp = Date.now();
            const dataBase = db.collection("profile").doc();

            await dataBase.set({
              fullName: this.fullName,
              postID: dataBase.id,
              postLogo: downloadUrl,
              date: timestamp,
              profileID: this.profileId,
              age: this.age,
              gender: this.gender,
              height: this.height,
              weight: this.weight,
              Location: this.Location,
              country: this.country,
              skintone: this.skintone,
              language: this.language,
              WechatId: this.WechatId,
              talent: this.talent,
            });
            window.localStorage.setItem("show", false);
            await this.$router.push({ path: "/" });
          }
        );
        return;
      } else {
        this.loading = false;
        this.error = true;
        this.errorMsg = "Pls fill all fields";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    profileId() {
      return this.$store.state.profileId;
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
        return this.$store.state.Country;
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