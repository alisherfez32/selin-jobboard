<template>
  <div class="spinners">
    <swapping-squares-spinner
      class="circle1"
      :animation-duration="1000"
      :size="65"
      color="#ff1d5e"
    />
    <circles-to-rhombuses-spinner
      class="circle"
      :animation-duration="1200"
      :circles-num="3"
      :circle-size="15"
      color="#ff1d5e"
    />
    <p>The process ir going...</p>
    <p>Wait please...</p>
  </div>
</template>

<script>
import { SwappingSquaresSpinner } from "epic-spinners";
import { CirclesToRhombusesSpinner } from "epic-spinners";
export default {
  name: "Loading",
  components: {
    SwappingSquaresSpinner,
    CirclesToRhombusesSpinner,
  },
  methods: {
    loading() {
      return this.$store.state.postLoaded;
    },
  },
};
</script>

<style lang="scss" scoped>
.spinners {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);

  .circle1 {
    margin-bottom: 10px;
    width: 100px;
    height: 50px;
    color: rgb(0, 0, 20);
    cursor: progress;
  }
  .circle {
    margin-top: 10px;
    width: 100px;
    height: 50px;
    color: rgb(0, 0, 20);
  }
}
</style>