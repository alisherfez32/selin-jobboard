
<template>
  <div>
    <div class="content" @click="seeMoreAct()">
      <div class="cont_arr">
        <div class="cont_app">
          <div class="wrapper">
            <div class="img_place">
              <img class="img_1_1" src="../../assets/logo.png" alt="df" />
            </div>
            <div class="wrapper_1">
              <div class="job_type">
                <p class="p3"><fa icon="thumbtack" /></p>
                <p class="p4">Job Type fuck pff the csss!</p>
              </div>
              <div class="city_name">
                <p class="p5"><fa icon="building" /></p>
                <p class="p6">{{ post.postLocation }}</p>
              </div>
            </div>
          </div>
          <div class="wrap_less">
            <div class="cont_text">
              <p>
                {{ post.postDescription }}
              </p>
            </div>
          </div>
          <div class="dead_date">
            <p class="p1">Start Date:</p>
            <p class="p2">{{ post.postDate }}</p>
          </div>
        </div>
        <!-- <see-more :showmore="blogContent" v-show="readMore"></see-more> -->
        <div class="show_money">
          <div class="dead_date">
            <p class="p1">End Date:</p>
            <p class="p2">{{ post.postDate }}</p>
          </div>
          <div class="cost_pay">
            <p class="p1">Payment:</p>
            <p class="p2">{{ post.postCost }}</p>
          </div>
          <div class="cost_pay">
            <p class="p1">Duration:</p>
            <p class="p2">{{ post.postDuration }}</p>
          </div>
          <div class="apply">
            <router-link class="p" tag="a" :to="'/apply'">Apply</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 400px;
  display: flex;
  margin-top: 25px;
  margin-bottom: 10px;
  margin-left: 10px;
  justify-content: space-between;
  float: left;
  position: static;

  .cont_arr {
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    border: 1px solid rgb(207, 201, 201);
    box-shadow: 1px;
    border-radius: 15px;
    background-color: #fff;

    .cont_app {
      display: flex;
      flex-direction: column;
      align-items: start;
      flex-wrap: wrap;
      width: 100%;
      max-height: 270px;
      height: 225px;
      margin-left: 5px;
      overflow: hidden;

      .wrapper {
        width: 100%;
        max-height: 45px;
        display: flex;
        flex-direction: row;
        align-items: start;
        margin-bottom: 20px;

        .img_place {
          max-width: 100px;
          display: block;
          margin: 5px;

          .img_1_1 {
            width: 80px;
          }
        }
        .wrapper_1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          max-height: 40px;
          padding: 8px;

          .job_type {
            display: flex;
            width: 100%;
            height: 20px;
            margin: 5px;
            margin-bottom: 15px;
            justify-content: start;
            align-items: center;

            .p3 {
              margin-left: 0;
              font-size: 18px;
              margin-top: 25px;
            }

            .p4 {
              font-size: 18px;
              color: rgb(27, 2, 2);
              font-weight: bold;
              padding: 1px 10px;
            }
          }
          .city_name {
            display: flex;
            width: 100%;
            align-items: center;
            width: 30px;
            height: 20px;

            .p5 {
              font-size: 18px;
              margin-left: 3px;
            }

            .p6 {
              font-size: 18px;
              font-weight: bold;
              padding: 1px 10px;
              color: rgb(14, 1, 1);
            }
          }
        }
      }
      .wrap_less {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-bottom: 0;
        margin-top: 0;

        .cont_text {
          display: flex;
          font-size: 15px;
          width: 90%;
          @media (max-width: 900px) {
            font-size: 14px;
          }

          p {
            padding: 0px;
          }
        }
      }

      .dead_date {
        display: flex;
        margin: 0;
        padding: 0px;
        width: 100%;
        align-items: center;
        margin-left: 10px;

        .p1 {
          padding: 2px;
          font-weight: bold;
          margin-right: 30px;
        }

        .p2 {
          font-weight: bold;
          color: green;
        }
      }
    }

    .show_money {
      display: flex;
      flex-direction: column;
      margin: 15px;
      padding: 0;
      position: relative;

      .dead_date {
        display: flex;
        padding: 0;
        height: 36px;
        align-items: center;

        p {
          padding: 2px;
          font-weight: bold;
        }

        .p2 {
          color: green;
        }
      }

      .cost_pay {
        display: flex;

        padding: 0;
        margin: 0;

        p {
          padding: 2px;
          font-weight: bold;
        }

        .p2 {
          color: green;
        }
      }

      .apply {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid grey;
        border-radius: 10px;
        margin-bottom: 10px;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 30px;

        .p {
          padding: 2px;
          position: relative;
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          color: rgb(31, 226, 13);
        }
      }
    }
  }
}
</style>