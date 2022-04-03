<template>
  <div>
    <div class="show_more">
      <div class="show_more_btn">
        <button type="button">Show More</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.show_more {
  width: 100%;
  height: 30px;
  margin-top: 25px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;

  .show_more_btn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;

    button {
      margin: 0;
      padding: 10px 20px;
      border: 2px solid #111;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>