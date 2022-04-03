
<template>
  <loading v-show="loading" />
  <div>
    <div class="createPost">
      <div class="wrapper">
        <div class="img_place">
          <img class="img_1_1" v-if="url" :src="url" alt="Upload Your Logo" />
        </div>
        <div class="text">
          <p class="p1">Post a Job "-"</p>
          <p class="p2">Hi. welcome back!</p>
        </div>
      </div>
      <div class="container pb-10">
        <div class="wechat">
          <p class="p13">Job Title</p>
          <input v-model="title" class="border-red-700" type="text">
        </div>
        <div class="job_type">
          <p class="p5">Job Type <fa icon="star-of-life" class="icon" /></p>
          <v-select
            v-model="jopType"
            class="style-chooser"
            :options="jobType"
            placeholder="Pls Choose a Job type"
          ></v-select>
        </div>
        <div class="job_type">
          <p class="p5">Job categories <fa icon="star-of-life" class="icon" /></p>
          <v-select
            v-model="jobCat"
            class="style-chooser"
            :options="type"
            placeholder="Pls Choose a Job type"
          ></v-select>
        </div>
        <div class="city">
          <p class="p6">Location <fa icon="star-of-life" class="icon" /></p>
          <p class="p7">ex. Hanghou</p>
          <input type="text" v-model="jobLoc" />
        </div>
        <div class="descript">
          <p class="p4">
            Job Description 
          </p>
          <textarea
            cols="20"
            rows="5"
            v-model="jobDec"
            placeholder="Describe about your company and/or the position:)"
          ></textarea>
        </div>
        <div class="descript">
          <p class="p4">
            Qualification
          </p>
          <textarea
            cols="20"
            rows="5"
            v-model="jobQual"
            placeholder="Describe the skills you’re looking for."
          ></textarea>
        </div>
        <div class="date">
          <p class="p8">Hire as Company</p>
          <div class="flex flex-row">
            <reader  @url="getUrl"/>
            <div class="flex flex-col ml-8">
              <p>company name</p>
              <input  v-model="name" type="text">
            </div>
          </div>
        </div>
        <div class="cost">
          <p class="p11">Payment</p>
          <input type="text" v-model="cost" />
        </div>
        <div class="wechat">
          <p class="p13">Phone Number</p>
          <input type="number" v-model="number" />
        </div>
        <div class="cost">
          <p class="p11">How many you want to Hire?</p>
          <input type="number" class="w-3" v-model="postHire" />
        </div>
        <div class="date">
          <p class="p8">Deadline</p>
          <input type="date" v-model="date">
        </div>
        <div class="heart">
          <p class="p14">Give yourself a heart.</p>
          <div @click="heart" class="Heyy">
            <fa icon="heart" class="heartt" v-if="isActive" />
            <fa icon="heart" class="hearttt" v-else />
          </div>
        </div>
        <div class="actions">
          <button @click.prevent="uploadPost">PubLish</button>
          <button @click="previewPost">Preview</button>
        </div>
        <images v-show="false" image-src=""></images>
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
// import firebase from "firebase/compat/app";
// import db from "../fierbase/firebaseinit.js";
import "vue-select/dist/vue-select.css";
import loading from "../components/loading.vue";
import images from "../components/image_input.vue";
import Airtable from 'airtable'
import reader from '../components/reader.vue'
export default {
  components: { loading, images, reader },
  emits: ['url'],
  data() {
    return {
      title: '',
      postType: '',
      postCat: '',
      jobLoc: '',
      jobDec: '',
      jobQual: '',
      name: '',
      cost: '',
      number: '',
      postHire: '',
      date: '',
      file: null,
      error: false,
      errorMsg: " ",
      loading: null,
      isActive: false,
      item: {},
      url: "",
      jobType: [
        'Full Time', 'Part Time', 'Freelance', 'Project Work', 'Intership', 'Volunteer'
      ],
      type: [
        'Legal & Immigration', 'Customer Service', 'Audio & Music', 'Accounting & Banking', 'Admissions & Schooling', 'Media'
      ]
    };
  },
  methods: {
    heart() {
      this.isActive = !this.isActive;
    },
    makeItem(){
       this.item = {
        cost: this.cost,
        name: this.name,
        cp: this.name,
        loc: this.jobLoc,
        type: this.postType,
        cat: this.jobCat,
        date: this.date,
        qual: this.jobQual,
        dec: this.jobDec,
        img: [
          {url: this.$store.state.url}
        ]
      }
      this.url = this.item.img[0].url
    },
    async previewPost() {
      await this.makeItem()
      this.$store.dispatch("jobApply", this.item)
      if(this.item.name && this.item.date){
          return this.$router.push({path: '/apply/'+ `preview-${this.item.name}`})
      } else{
        window.alert("Please at least add Your Company name and Date to preview")
      }
    },
    async uploadPost() {
      if (
        this.cost !== "" &&
        this.loc !== ""
      ) {
          await this.makeItem()
          this.$store.dispatch("postedJobs", this.item)
            if(this.$route.path === "/"){
              await this.$router.push({path: "/myspace"})
              // window.location.reload();
            } else {
              await this.$router.push({ path: "/" });
            }
          
        return;
      }
      this.loading = false;
      this.error = true;
      this.errorMsg = "Pls fill all fields";
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
    // Here Stays for Vue Select
  },
  created() {
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";

.createPost {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #edf5f5;

    .text {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .p1 {
        font-size: 24px;
      }
      .p2 {
        margin-top: -10px;
      }
    }
  }

  .container {
    width: 60%;
    @media (max-width: 900px) {
      width: 96%;
      margin-left: 15px;
    }
    margin-left: 25px;

    .img_place {
      .img_1_1 {
        margin-left: 25px;
        @media (max-width: 900px) {
          margin-left: 15px;
          width: 200px;
          height: 175px;
        }
      }
    }
    .descript {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 10px;
      .p4 {
        font-size: 24px;
      }
      .p3 {
        margin-top: -6px;
        color: rgb(53, 53, 54);
      }
      textarea {
        outline: none;
        font-size: 18px;
        overflow: auto;
        -moz-appearance: none;
        resize: none;
        display: flex;
        &:hover{border: 1px solid #435ba8;}
      }
    }
    .job_type {
      display: flex;
      flex-direction: column;
            margin-bottom: 10px;

      .p5 {
        font-size: 20px;
      }
    }
    .city {
      display: flex;
      flex-direction: column;
      width: 100%;
            margin-bottom: 10px;

      .p6 {
        font-size: 20px;
      }
      .p7 {
        margin-top: -4px;
        color: #1f1111;
      }
    }
    .date1 {
      display: flex;
      flex-direction: row;
      width: 100%;
            margin-bottom: 10px;

      .p8 {
        font-size: 20px;
      }
      input {
        border-top: none;
        border-right: none;
        border-left: none;
        width: 150px;
      }
    }
    .date {
      display: flex;
      flex-direction: column;
      width: 100%;
            margin-bottom: 10px;

      .p8 {
        font-size: 20px;
      }
      input {
        border-top: none;
        border-right: none;
        border-left: none;
        width: 150px;
      }
    }
    .duration {
      display: flex;
      flex-direction: column;
      width: 100%;
            margin-bottom: 10px;

      .p9 {
        font-size: 20px;
      }
      .p10 {
        margin-top: -4px;
        color: #1f1111;
      }
    }
    .cost {
      display: flex;
      flex-direction: column;
      width: 100%;
            margin-bottom: 10px;

      .p11 {
        font-size: 20px;
      }
      input {
        border-top: none;
        border-right: none;
        border-left: none;
        width: 44px;
      }
    }
    .wechat {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 10px;

      .p13 {
        font-size: 20px;
      }
      input {
        border-top: none;
        border-right: none;
        border-left: none;
      }
    }
    .heart {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 20px;
      .p14 {
        font-size: 20px;
      }
      .Heyy {
        display: flex;
        margin-left: 50px;
        cursor: pointer;
        width: 60px;
        height: 35px;
        border: 2px solid #dadadb;

        .heartt {
          width: 100%;
          height: 100%;
          color: red;
        }
        .hearttt {
          width: 100%;
          height: 100%;
          color: #dfd3d3;
        }
      }
    }
    .actions {
      display: flex;
      flex-direction: row;

      button {
        width: 80px;
        margin-right: 60px;
        background-color: #5465ff;
        border: 2px solid #5465ff;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      .router {
        width: 80px;
        text-align: center;
        text-decoration: none;
        margin-right: 60px;
        background-color: #5465ff;
        border: 2px solid #5465ff;
        border-radius: 5px;
        color: #fff;
        font-family: "Patua One";
      }
    }
  }
}
.style-chooser {
  width: 300px;
  height: 26px;
}
.invisible {
  color: red;
  opacity: 0 !important;
}
.loader {
  text-align: center;
  color: #bbbbbb;
}
.icon {
  color: red;
  width: 10px;
  margin-left: 5px;
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
