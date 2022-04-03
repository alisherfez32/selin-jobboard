<template>
<Navjob />
<div class="flex justify-center items-center">
  <div class="flex flex-col max-w-3xl ">
    <p class="flex full-w mb-2"><fa @click="back" class="fa" icon="chevron-left"/></p>
  <div class="flex full-w flex-row container">
    <div class="p-1 max-h-32 max-w-32 cursor-pointer">
      <img class="max-h-32 max-w-32
          rounded-lg" :src="job.img[0].url" alt="">
    </div>
    <div class="flex flex-1"><p class="mt-auto mb-8 font-pop font-bold text-xl">{{job.cp}}</p></div>
    <div class="flex flex-1 sm:flex-0"><p class="font-pop font-bold text-red-500">{{for_date}}</p></div>
  </div>
  <div class="flex flex-row mb-2">
    <div class="ml-2">
      <p class="font-pop font-bold text-2xl">{{job.name}}</p>
      <p class="font-pop text-lg">{{job.loc}}</p>
    </div>
    <div class="flex flex-1">
      <p class="ml-36">⭐</p>
    </div>
  </div>
  <p class="full-w flex justify-around font-pop text-lg">apply before 10th March 2022</p>
  <div class="ml-2">
    <p class="font-pop text-lg">⏲️ Full time</p>
    <p class="font-pop text-lg">{{job.cost}} per month</p>
  </div>
  <hr class="mt-2">
  <div class="ml-4 mr-4 mt-4">
    <p class="font-pop font-bold text-2xl">Job Description</p>
    <p v-if="Preview" class="font-pop text-lg">{{job.dec}}</p>
    <p v-else class="font-pop text-lg">{{job.dec}}</p>
  </div>
  <hr class="mt-2">
  <div class="ml-4 mr-4 mt-4">
    <p class="font-pop font-bold text-2xl">Job Qualification</p>
    <p v-if="Preview" class="font-pop text-lg">{{job.qual}}</p>
    <p v-else class="font-pop text-lg">{{job.qual}}</p>
  </div>
  <div class="fixed bg-green-500 w-32 h-9 
  bottom-2 right-4
  rounded-lg text-center ">
    <button v-if="!isPreview"
    class="text-center font-pop font-bold text-2xl"
    @click.once="Apply">✈️ Apply</button>
    <button v-else
    class="text-center font-pop font-bold text-2xl"
    @click.once="uploadPost">✈️ Publish</button>
  </div>
  </div>
</div> 
<Modal v-show="modal" @close="showModel"/>
<Footer />
</template>

<script>
import loading from "../components/loading.vue";
import Navjob from '../components/header/nav-jobs.vue'
import Footer from "../components/footer/footer.vue";
import Modal from "../components/modal.vue"
import moment from 'moment';

export default {
  components: { Navjob, Footer, Modal },
  emits: ['close'],
  data() {
    return {
      loading: null,
      modal: false,
      for_date: "",
      isPreview: false,
    };
  },
  async created() {
  },
  methods: {
    back(){
      if(!this.isPreview){
        this.$router.go(-1)
      }
      
    },
    Apply(){
      if(this.user){
        this.showModel()
        this.$store.dispatch("appliedJobs", this.job)
      } else{
        return this.$router.push({path: "/login"})
      }
    },
    async uploadPost(){
      await this.$store.dispatch("postedJobs", this.job)
      this.$router.push({path: "/myspace"})
    },
    showModel(){
      this.modal = !this.modal;
    }
  },
  created() {
    let has = this.$route.params.id
    let had = `preview-${this.job.name}`
    if(has === had){
     this.isPreview = true;
    }
    console.log(this.isPreview)
  },
  mounted() {
      let date = this.job.date
      this.for_date = moment(date).startOf('day').fromNow()
  },
  computed: {
    job(){
      return this.$store.getters.jobApply
    },
    user(){
      return this.$store.state.user
    },
  }
};
</script>

<style lang="scss" scoped>
.fa{
    height: 44px;
    width: 44px;
}
</style>