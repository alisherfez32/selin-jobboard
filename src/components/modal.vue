<template>
  <div>
    <div class="modal">
      <div class="modal-content">
        <p><img src="../assets/sent.png" alt=""></p>
        <p class="p2">Application Sent</p>
        <p class="p1">Best of Luck</p>
        <div class="link">
          <a @click="showJob" href="#">see your job applications</a>
          <button @click="$emit('close')">Close</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showJob(){
      this.$router.push({ path: "/myspace"})
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #000000b3;
  overflow: none;
  position:fixed;
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    .p2 {
      text-align: center;
      font-family: "Patua One", cursive;
      font-size: 24px;
    }
    .p1 {
      text-align: center;
      font-family: "Patua One";
      font-size: 18px;
    }
    button {
      margin-top: 20px;
      width: 80px;
      background-color: #5465ff;
      border: 2px solid #5465ff;
      border-radius: 5px;
      color: #fff;
      font-family: "Patua One";
      font-size: 14px;
      cursor: pointer;
    }
    .link{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      a{
      color: red;
      text-decoration: underline;
      }
    }
  }
}
</style>