<template>
  <div>
    <!-- create a form that will not submit to a server but will prevent submit and
    use the upload function as a handle-->
     <div class="flex flex-row">
             <div class="shrink-0">
               <img v-if="results && results.secure_url"
               class="h-16 w-16 object-cover rounded-full"
               :src="results.secure_url"
                alt="Choose your Logo" />
             </div>
      <input class="ml-2 sm:w-40 w-20 mr-2"
        type="file"
        accept="image/png, image/jpeg"
        @change="handleFileChange($event)"
      />
    <!-- display errors if not successful -->
    <section>
      <ul v-if="errors.length > 0">
        <li v-for="(error,index) in errors" :key="index">{{error}}</li>
      </ul>
    </section>
     </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CloudinaryUpload",
  props: ["name"],
  components: {
  },
  data() {
    return {
      results: null,
      errors: [],
      file: null,
      filesSelected: 0,
      cloudName: "selinjobs",
      progress: 0,
      showProgress: false,
      fileContents: null,
      formData: null
    };
  },
  methods: {
    // function to handle file info obtained from local
    // file system and set the file state
    handleFileChange(event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
      this.upload()
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.cloudName);
      this.formData.append("file", this.fileContents);
    },
    // function to handle form submit
     upload() {
      console.log("upload", this.file.name);
      let reader = new FileReader();
      // attach listener to be called when data from file
      reader.addEventListener(
        "load",
        async function() {
          this.fileContents = reader.result;
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
          };
          //show progress bar at beginning of post
          await axios(requestObj)
            .then(response => {
              this.results = response.data;
              this.$store.dispatch("getUrl", this.results.secure_url)
            })
            .catch(error => {
              this.errors.push(error);
              console.log(this.error);
            })
        }.bind(this),
        false
      );
      // call for file read if there is a file
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    }
  }
};
</script>
