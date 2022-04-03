<template>
  <div class="div">
    <div class="footer">
      <h3>You can find us here:</h3>
      <div class="brand">
        <a
          href="https://mp.weixin.qq.com/s/SFM8pDYXFJLJXPe6iCxT8Q"
          class="soc_media"
          target="_blank"
          ><fa class="fa" :icon="['fab', 'weixin']"
        /></a>
        <a
          href="https://www.linkedin.com/in/dadakhon-abdulloev-400b9721b/"
          class="soc_media"
          target="_blank"
          ><fa class="fa" :icon="['fab', 'linkedin']"
        /></a>
        <a
          href="https:///t.me/abdulloev_abdullojon"
          class="soc_media"
          target="_blank"
          ><fa class="fa" :icon="['fab', 'telegram']"
        /></a>
        <a
          href="https://github.com/alisherfez32"
          class="soc_media"
          target="_blank"
          ><fa class="fa" :icon="['fab', 'github']"
        /></a>
      </div>
      <div class="fff">
        <h5>&copy;Copyright</h5>
        <h5>&reg;All the right served</h5>
      </div>
    </div>
    <div>
      <!-- <time-ago :date="launch" /> -->
    </div>
  </div>
</template>
<script>
// import timeAgo from "./timeAgo.vue";
export default {
  components: {
    // timeAgo,
  },
  data() {
    return {
      launch: new Date(2021, 11, 23),
    };
  },
};
</script>

<style lang="scss" scoped>
.div {
  width: 100%;
  max-height: 600px;
  margin: 0;
  display: flex;
  background-color: rgba(255, 246, 246, 0.9);
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .footer {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .brand {
      display: flex;

      .soc_media {
        align-items: center;
        height: 32px;
        width: 32px;
        margin: 10px;
        border-radius: 30%;

        .fa {
          width: 100%;
          height: 100%;
          color: #0300bd;

          &:hover {
            color: #8ce4ff;
            transition: 1s;
            transform: scale(1.3);
          }
        }

        &:hover {
          background: #000000;
          transition: 1s;
        }
      }
    }
    .fff {
      display: flex;
      margin-bottom: 0;
    }
  }
}
</style>