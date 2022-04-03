<template>
  <div>
    <!-- SEARCH PLACE -->
    <div class="search_box">
      <div class="search_place">
        <fa class="search_loop" icon="search" />
        <input
          @change="$emit('search', filteredList)"
          v-model="search"
          type="text"
          placeholder="I`m searching for..."
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.post.filter((post) => {
        return post.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>