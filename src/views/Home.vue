<template>
  <div>
    <Header />
    <div class="flex full-w justify-center items-center h-20 p-0">
      <p class="m-auto cursor-pointer font-mono font-bold text-2xl focus:outline-none focus:ring focus:ring-violet-300"
      :class="{active: isActive}"
      @click="Current('ContentA')">Jobs</p>
      <p class="m-auto cursor-pointer font-mono font-bold text-2xl focus:outline-none focus:ring focus:ring-violet-300"
      :class="{active: isActive1}"
      @click="Current('ContentB')">Hire</p>
      <!-- <p class="m-auto cursor-pointer font-mono font-bold text-2xl focus:outline-none focus:ring focus:ring-violet-300"
        :class="{active: isActive}"
      v-for="item in navs" :key="item.id" @click="Current(item.value)">{{item.name}}</p> -->
    </div>
    <div class="md:container md:mx-auto mt-2 mb-10">
        <component :is="current" class="transition-all"
        :job='item.fields' v-for='item in compItems' :key="item.id" @apply="jobApply(item)"></component>
    </div>
    <div class="dadakhon text-center transition-all transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <div>
            <input type="text" class="h-14 w-85 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything...">
            <fa @click="seeMore" v-if="!yes" class="fa transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" icon="angle-up" />
            <fa @click="seeMore" v-else class="fa transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" icon="angle-down" />
            </div>
            <div v-if="yes">   
            <h2>By Type</h2>
            <div class="flex flex-row p-1 m-1">
                <div class="flex flex-col p-1 m-1 text-center"
                v-for='i in types' :key='i.id'>
                    <p>{{i.sign}}</p>
                    <p>{{i.name}}</p>
                </div>
            </div>
            <h1>By Categories</h1>
            <div class="flex text-center">
                <div class="bg-sky-600 hover:bg-sky-700 border-yellow-400 rounded-md p-2 m-1 cursor-pointer"
                    v-for='i in categories' :key='i.id'>
                    <h2>{{i.name}}</h2>
                </div>
            </div>
            <div class="flex text-center">
                <div class="bg-sky-600 hover:bg-sky-700 border-yellow-400 rounded-md p-2 m-1 cursor-pointer"
                    v-for='i in categories2' :key='i.id'>
                    <p>{{i.name}}</p>
                </div>
            </div>
            </div>
        </div>
    <div class="show_more">
      <!-- <Paginate 
      v-model='page'
        :per-page='5'
        :records="20"
        @paginate="pageChangeHandler"
      /> -->
      <div class="show_more_btn">
        <button v-if="isActive" type="button" @click="uploadPost1">
          Show More
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script> 
import ContentA from '../components/jobs-cont.vue'
import ContentB from './postjob.vue'
import Header from "../components/header/nav-jobs.vue";
import Footer from "../components/footer/footer.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../fierbase/firebaseinit.js";

export default {
  name: "App",
  emits: ['apply'],
  components: {
    ContentA,
    ContentB,
    Header,
    Footer,
  },
  data() {
    return {
      search: "",
      load: false,
      yes: false,
      user: this.$store.state.user,
      current: 'ContentA',
      showJob: true,
      showPost: false,
      isActive: true,
      isActive1: false,
      limit: 1,
      navs: [
        {id: 1, name: 'Jobs', value: 'ContentA'},
        {id: 2, name: 'Hire', value: 'ContentB'}
      ],
        categories:[
            {name: 'Accouting & Finance'},
            {name: 'Design'},
            {name: 'Logistics'},
            {name: 'Quick Jobs'},
        ],
        categories2:[
            {name: 'Engineering'},
            {name: 'customer Services'},
            {name: 'Media & Creative'},
            {name: 'IT Development'},
        ],
        types: [
            {sign: '⏲️', name: 'Full time'},
            {sign: '⏳', name: 'Part time'},
            {sign: '🆓', name: 'Freelance'},
            {sign: '⚡', name: 'Quick Jobs'},
        ]
    };
  },
  async beforeCreate() {
     if (this.$store.getters['postJobAdd'].length === 0) {
      await this.$store.dispatch('getJob')
    }
    console.log("Home item", this.items);

  },
  computed: {
    items() {
      return this.$store.getters["postJobAdd"]
    },
    compItems() {
        return this.current==="ContentB" ? this.items.slice(0, this.limit) : this.items
    }
  },
  methods: {
    uploadPost() {
      this.$router.push({ path: "/jobs" })
    },
    jobApply(item){
      this.$store.dispatch("jobApply", item.fields)
      return this.$router.push({path: '/apply/'+ item.id})
    },
    Current(item){
      if(item === 'ContentA'){
        this.isActive = true
        this.isActive1 = false
      } else {
        this.isActive = false
        this.isActive1 = true
      }
      return this.current= item
      
    },
    showJobA(){
      this.showJob= !this.showJob
    },
    seeMore() {
          this.yes = !this.yes
        },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
        console.log(this.$store.state.email);
      }
    });
    if (!this.user) {
      return window.localStorage.removeItem("show");
    }
    db.collection("profile")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          let user = firebase.auth().currentUser;
          let uid = user.uid;
          let result = doc.data();
          let add = result;
          if (uid === add.profileID) {
            window.localStorage.setItem("show", false);
          } else {
            console.log("False algorythm");
          }
        });
      });
  },

};
</script>

<style lang="scss" scoped>
.active{
  text-decoration: underline rgb(250, 0, 0);
}
.search_box {
  width: 100%;
  height: 35px;
  justify-content: center;
  display: flex;
  align-items: center;

  .search_place {
    width: 80%;
    height: 100%;
    display: flex;
    transform: translate3d(-50%, 50%);
    background: #fff;
    border: 3px solid grey;
    border-radius: 15px;
    margin: 0;
    padding: 0;
    .search_loop {
      color: blue;
      float: left;
      margin-left: 5px;
      width: 20px;
      height: 100%;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
    }
    input {
      width: 100%;
      border: none;
      background: none;
      outline: none;
      padding: 0;
      font-size: 16px;
      transition: 0.4s;
    }
  }
}
.show_more {
  width: 100%;
  height: 30px;
  margin-top: 25px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;

  .show_more_btn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;

    button {
      margin: 0;
      padding: 10px 20px;
      border: 2px solid #111;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

.fa{ 
    height: 44px;
    width: 44px;
}
</style>
