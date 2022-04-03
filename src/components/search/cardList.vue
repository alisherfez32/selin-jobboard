<template>
  <div></div>
</template>

<script>
import firebase from "firebase";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const products = reactive([]);
    onMounted(async () => {
      try {
        const productsSnap = await firebase
          .firestore()
          .collection("postJob")
          .get();
        productsSnap.forEach((doc) => {
          products.puch(doc.data());
        });
      } catch (e) {
        console.log("Error Loading jobs");
      }
    });
    return { products };
  },
};
</script>

<style lang="scss" scoped>
</style>