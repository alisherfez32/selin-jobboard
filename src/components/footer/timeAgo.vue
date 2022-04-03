<template>
  <div>
    <div class="time">
      <div class="div1">
        <fa icon="moon" class="moon" />
        <fa icon="moon" class="moon" />
        <fa icon="moon" class="moon" />
      </div>
      <h2>We started:</h2>
      <div>
        <span
          >{{ days }} days {{ hours }} hours {{ minutes }} minutes
          {{ seconds }} seconds</span
        >
      </div>
      <h2>ago!</h2>
      <div class="div1">
        <fa icon="sun" class="sun" />
        <fa icon="sun" class="sun" />
        <fa icon="sun" class="sun" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    date: require,
  },
  data() {
    return {
      interval: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervals: {
        second: 1000,
        minute: 1000 * 60,
        hour: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24,
      },
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateDiffs();
    }, 1000);

    this.updateDiffs();
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    updateDiffs() {
      //let`s figure out our diffs

      let diff = Math.abs(Date.now() - this.date.getTime());
      this.days = Math.floor(diff / this.intervals.day);
      diff -= this.days * this.intervals.day;
      this.hours = Math.floor(diff / this.intervals.hour);
      diff -= this.hours * this.intervals.hour;
      this.minutes = Math.floor(diff / this.intervals.minute);
      diff -= this.minutes * this.intervals.minute;
      this.seconds = Math.floor(diff / this.intervals.second);
    },
  },
};
</script>
<style lang="scss" scoped>
.time {
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 0;
  div {
    span {
      font-family: "Patua One";
      font-size: 15pt;
    }
  }
  .div1 {
    display: flex;
    flex-direction: row;
    .moon {
      margin-top: 10px;
      width: 50px;
      height: 25px;
      color: rgb(58, 35, 35);
    }
    .sun {
      color: rgb(236, 236, 0);
      width: 50px;
      height: 30px;
    }
  }
  h2 {
    color: rgb(241, 15, 15);
    font-family: "Patua One";
  }
}
</style>