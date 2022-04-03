<template>
  <div class="flex justify-center m-4">
    <div class="flex flex-col sm:w-8/12 w-full">
      <p class="text-2xl text-center">My Space</p>
      <div class="flex flex-row mb-4">
        <div class="p-1 max-h-28 max-w-28">
          <img  class="max-h-28 max-w-28
             rounded-lg" src="../assets/images/face.png" alt="">
        </div>
        <p class="font-bold text-2xl pt-8">{{Info.firstName}} {{Info.lastName}}</p>
      </div>
      <div class="flex flex-col full-w mb-4 p-0"> 
        <div class="flex flex-row justify-between">
          <div class="flex flex-row">
            <fa class="w-8 h-7" icon="cloud" /> <img class="w-4 h-4" src="../assets/circle.png" alt="">
            <p class="font-pop font-bold text-xl ml-8">Posted Jobs</p>
          </div>
          <fa @click="showMoreJob" v-show="!showJob" class="w-8 h-8 cursor-pointer" icon="angle-down"/>
          <fa @click="showMoreJob" v-show="showJob" class="w-8 h-8 cursor-pointer" icon="angle-up"/>
        </div>
        <div class="full-w">
          <Content @apply="jobApply(job)" 
          v-show="showJob" :job="job" 
          v-for="job in postedJobs" :key="job.id"/>
        </div>
      </div>
      <hr>
      <div class="flex flex-col full-w mb-4 mt-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row">
            <fa class="w-8 h-7" icon="cloud" /> <img class="w-4 h-4" src="../assets/circle.png" alt="">
            <p class="font-pop font-bold text-xl ml-8">Applied Jobs</p>
          </div>
          <fa @click="showMoreJobApply" v-show="!showJobApply" class="w-8 h-8 cursor-pointer" icon="angle-down"/>
          <fa @click="showMoreJobApply" v-show="showJobApply" class="w-8 h-8 cursor-pointer" icon="angle-up"/>
        </div>
        <div>
          <Content @apply="jobApply(job)"
          v-show="showJobApply" :job="job" v-for="job in appliedJobs" :key="job.id"/>
        </div>
      </div>
      <hr>
      <div class="flex flex-col full-w mb-4 mt-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row">
            <fa class="w-8 h-7" icon="cloud" /> <img class="w-4 h-4" src="../assets/circle.png" alt="">
            <p class="font-pop font-bold text-xl ml-8">Starred Jobs</p>
          </div>
          <fa @click="showMoreJobStarred" v-show="showJobStarred" class="w-8 h-8 cursor-pointer" icon="angle-up"/>
          <fa @click="showMoreJobStarred" v-show="!showJobStarred" class="w-8 h-8 cursor-pointer" icon="angle-down"/>
        </div>
        <div>
          <Content @apply="jobApply(job)"
          v-show="showJobStarred" :job="job" v-for="job in starredJobs" :key="job.id"/>
        </div>
      </div>
      <div class="buttons">
        <button @click.prevent="signOut">Sign Out</button>
      </div>
      <!-- <div class="link">
        <fa icon="user" class="fa" />
        <router-link class="router" :to="{ path: 'edit-profile' }"
          >Edit Profile</router-link
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../fierbase/firebaseinit.js";
import Content from '../components/jobs-cont.vue'
import { mapGetters } from 'vuex'

//import loading from "../components/loading.vue";
//import { BModal, VBModal } from "bootstrap-vue";
export default {
  emits: ['apply'],
  components: {
    Content,
  },
  data() {
    return {
      loading: null,
      showJob: false,
      showJobApply: false,
      showJobStarred: false,
      profile: {},
    };
  },
  methods: {
    showMoreJob(){
      this.showJob = !this.showJob
    },
    showMoreJobApply(){
      this.showJobApply = !this.showJobApply
    },
    showMoreJobStarred(){
      this.showJobStarred = !this.showJobStarred
    },
    jobApply(item){
        this.$store.dispatch("jobApply", item)
        console.log("item",item);
        return this.$router.push({path: '/apply/'+ item.id})
    },
    signOut() {
      this.loading = true;
      firebase.auth().signOut();
      this.$router.push({ path: "/" });
    },
    updateProfile() {
      this.$router.push({ path: "/" });
    },
  },
  created() {
    db.collection("profile")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          let user = firebase.auth().currentUser;
          let uid = user.uid;
          let result = doc.data();
          let add = result;
          if (uid === add.profileID) {
            this.profile = result;
          } else {
            console.log("False algorythm");
          }
        });
      });
  },
  computed: {
    ...mapGetters({
      postedJobs: 'postedJobs',
      appliedJobs: 'appliedJobs',
      starredJobs: 'starredJobs',
    }),
    user() {
      return this.$store.state.user;
    },
    Info() {
      return this.$store.getters.profileInfo;
    },
    email: {
      get() {
        return this.$store.state.email;
      },
      set(payload) {
        return this.$store.commit("changeEmail", payload);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .wrapper {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #edf5f5;
    .img_place {
      .img_1_1 {
        margin-left: 25px;
        margin-top: 10px;
        border-radius: 20%;
        width: 200px;
        height: 175px;
        @media (max-width: 900px) {
          margin-left: 15px;
          width: 200px;
          height: 175px;
        }
      }
    }
    .text {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .p1 {
        font-family: "Patua One", cursive;
        font-size: 24px;
      }
      .p2 {
        font-family: "Patua One";
        margin-top: -10px;
      }
    }
  }
  .userReg {
    .input {
      margin: 8px;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    button {
      margin: 5px;
    }
  }
  .edition {
    display: flex;
    flex-direction: column;
    .age {
      .p21 {
        font-family: "Patua One";
        font-size: 20px;
      }
    }

    .height {
      .p23 {
        font-family: "Patua One";
        font-size: 20px;
      }
    }

    .job_type {
      display: flex;
      flex-direction: column;

      .p5 {
        font-family: "Patua One", cursive;
        font-size: 20px;
      }
    }

    .skin_tone {
      display: flex;
      flex-direction: column;
      .p5 {
        font-family: "Patua One", cursive;
        font-size: 20px;
      }
    }

    .talents {
      display: flex;
      flex-direction: column;

      .p5 {
        font-family: "Patua One";
        font-size: 20px;
      }
    }

    .languages {
      display: flex;
      flex-direction: column;
      .p8 {
        font-family: "Patua One", cursive;
        font-size: 20px;
      }
    }

    .city {
      display: flex;
      flex-direction: column;

      .p6 {
        font-family: "Patua One", cursive;
        font-size: 20px;
      }
    }
  }
  .link {
    margin-bottom: 20px;
    .router {
      text-decoration: none;
      font-size: 20px;
      font-weight: bold;
      font-family: "Patua One" cursive;
      color: rgb(0, 0, 0);
      &:hover {
        color: rgb(91, 156, 253);
      }
    }
  }
}
.p {
  font: 1em sans-serif;
}
button {
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
.fa {
  color: red;
  width: 20px;
  margin-right: 5px;
}
</style>