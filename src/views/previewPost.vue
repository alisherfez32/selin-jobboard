<template>
  <div class="preview">
    <div class="container wrapper">
      <h2>{{ this.postDescription }}</h2>
      <img :src="postPhotoName" alt="" />
    </div>
    <div class="post-cont" v-html="postHTML"></div>
    <button @click.prevent="uploadPost">PubLish</button>
  </div>
</template>

<script>
export default {
  name: "Preview",
  data() {
    return {
      file: null,
      error: false,
      errorMsg: " ",
      loading: null,
      isActive: false,
      jobType: [
        "Face Recognition",
        "Acting",
        "Modeling",
        "LeaveStreaming",
        "Event&Fairs",
        "Commercials",
        "Deuying short videos",
        "Voice Recording",
        "Ear recognition",
      ],
    };
  },

  computed: {
    postDescription() {
      return this.$store.state.postDescription;
    },

    postPhotoName() {
      return this.$store.state.postPhotoFileUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  max-width: 1000px;
}
.container {
  padding: 60px 25px;
}
</style>