<template>
  <div class="div">
    <loading v-show="loading" />
    <h1>Apply for a Job!</h1>
    <label for="exampleFormControlInput1" class="form-label"
      >Your phone number || WechatId<fa icon="star-of-life" class="icon" />
    </label>
    {{jobApply}}
    <input
      type="number"
      v-model="number"
      class="form-control"
      id="exampleFormControlInput1"
    />
    <label for="exampleFormControlTextarea1" class="form-label"
      >Give your feedbacks, pls!
    </label>
    <textarea
      v-model="feedback"
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3"
    ></textarea>
    <button class="btn btn-primary" @click.prevent="Apply">Apply</button>
    <div :class="{ invisible: !error }" class="errMsg">
      <p>
        Error: <span>{{ errorMsg }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import loading from "../components/loading.vue";

export default {
  components: { loading },
  data() {
    return {
      loading: null,
      error: false,
      feedback: "",
      errorMsg: "",
      number: "",
    };
  },
  mounted() {
    let data = this.$route.params.item;
    console.log("data is", data);
  },
  methods: {
    async Apply() {
      if (this.number !== "") {
        this.loading = true;

        await this.$router.push({ path: "/" });
      } else {
        this.error = !this.error;
        this.errorMsg = "Pls put your phone number to apply!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
  computed: {
    jobApply(){
      return this.$store.getters.jobApply
    }
  }
};
</script>

<style lang="scss" scoped>
.div {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.icon {
  color: red;
  width: 10px;
  margin-left: 5px;
}
.invisible {
  color: red;
  opacity: 0 !important;
}
.errMsg {
  color: red;
  font-family: "Helvetica Neue";
}
input[type="text"],
[type="number"] {
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
textarea {
  outline: none;
  font-size: 18px;
  width: 300px;
  height: 150px;
  overflow: auto;
  -moz-appearance: none;
  resize: none;
  display: flex;
  border: 2px solid #435ba8;
}
button {
  height: 32px;
  width: 80px;
  margin-left: 100px;
  margin-top: 10px;
  background-color: #5465ff;
  border: 2px solid #5465ff;
  border-radius: 5px;
  color: #fff;
  font-family: "Patua One";
  font-size: 14px;
  cursor: pointer;
}
label {
  margin: 10px;
  font-size: 16px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>