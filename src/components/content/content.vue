    <template>
  <div>
    <!--CONTENT-->
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
                <p class="p4">{{ post.postType }}</p>
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
            <p class="p2">{{ startDate }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content1" v-show="readMore" @click.self="seeMoreAct()">
      <div class="wrapper">
        <div class="wrap_tap">
          <div class="icon" @click="seeMoreAct()">
            <fa icon="times" class="fa" />
          </div>
          <div class="img_place">
            <img class="img_1_1" src="../../assets/logo.png" alt="df" />
          </div>

          <div class="job_type">
            <p class="p3"><fa icon="thumbtack" /></p>
            <p class="p4">{{ post.postType }}</p>
          </div>
          <div class="city_name">
            <p class="p5"><fa icon="building" /></p>
            <p class="p6">{{ post.postLocation }}</p>
          </div>

          <div class="cont_text">
            <p class="p7"><fa icon="file-alt" /> Job Description</p>
            <p class="p8">
              {{ post.postDescription }}
            </p>
          </div>
          <div class="dead_date">
            <p class="p1"><fa icon="hourglass-half" /> Start Date:</p>
            <p class="p2">{{ startDate }}</p>
          </div>
          <div class="dead_date">
            <p class="p1"><fa icon="hourglass-end" />End Date:</p>
            <p class="p2">{{ endDate }}</p>
          </div>
          <div class="cost_pay">
            <p class="p1"><fa icon="yen-sign" /> Payment:</p>
            <p class="p2">{{ post.postCost }}</p>
          </div>
          <div class="cost_pay">
            <p class="p1"><fa icon="clock" /> Duration:</p>
            <p class="p2">{{ post.postDuration }}</p>
          </div>
          <div class="apply">
            <router-link class="p" tag="a" :to="'/apply/'+ post.postID"
              >Interested.</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Content",
  props: ["post"],
  data() {
    return {
      readMore: false,
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    seeMoreAct() {
      this.readMore = !this.readMore;
    },
  },
  created() {
    let yourdate = this.post.startDate;
    this.startDate = moment(yourdate).format("MMMM Do YYYY");
    let date = this.post.endDate;
    this.endDate = moment(date).format("MMMM Do YYYY");
    console.log("ID", this.$props.post.postID);
  },
};
</script>
<style lang="scss" scoped>
.content {
  max-width: 400px;
  width: 400px;
  display: flex;
  margin: 10px;
  float: left;
  margin-top: 25px;
  margin-bottom: 10px;

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
      align-items: flex-start;
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
        align-items: flex-start;
        margin-bottom: 20px;
        position: inherit;
        .img_place {
          max-width: 100px;
          margin: 5px;
          display: flex;
          z-index: 1000000;
          position: sticky;
          .img_1_1 {
            width: 80px;
            z-index: 1000000;
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
            justify-content: flex-start;
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
  }
}
.content1 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 1px solid black;

  .wrapper {
    position: absolute;
    width: 65%;
    height: 75%;
    margin-top: 5px;

    @media (max-width: 900px) {
      width: 100%;
      height: 100%;
    }
    top: 50%;
    left: 50%;
    border: 1px solid grey;
    background-color: rgba(253, 253, 253, 0.7);
    transform: translate(-50%, -50%);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 1%;

    .img_place {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;

      .img_1_1 {
        width: 90px;
        height: 90px;
      }
    }
    .wrap_tap {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-left: 36px;
      @media (max-width: 90px) {
        margin-left: 15px;
      }
      margin-bottom: 10px;
      font-family: "Patua One";
      .icon {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 90%;
        height: 32px;
        cursor: pointer;

        .fa {
          width: 32px;
          height: 32px;
          &:hover {
            background-color: #98ec87;
            border: 2px solid black;
          }
        }
      }
      .job_type {
        display: flex;
        flex-direction: row;

        .p3 {
          margin-top: 23px;
          margin-right: 8px;
        }
        .p4 {
          color: #0c0000;
          font-weight: bold;
          font-size: 18px;
        }
      }
      .city_name {
        display: flex;
        flex-direction: row;

        .p5 {
          margin-right: 8px;
          margin-top: 17px;
        }
        .p6 {
          color: #080000;
          font-weight: bold;
          font-size: 16px;
        }
      }

      .cont_text {
        display: flex;
        flex-direction: column;

        .p7 {
          color: #fa0909;
          font-weight: bold;
          font-size: 16px;
        }
        .p8 {
          color: #0c0000;
          font-weight: 700;
        }
      }
      .dead_date {
        display: flex;
        flex-direction: column;
        .p1 {
          color: #fa0909;
          font-weight: bold;
          font-size: 16px;
        }
        .p2 {
          margin-top: -4px;
        }
      }
      .cost_pay {
        display: flex;
        flex-direction: column;

        .p1 {
          color: #fa0909;
          font-weight: bold;
          font-size: 16px;
        }
        .p2 {
          margin-top: -4px;
        }
      }
      .apply {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 32px;
        border: 1px solid green;
        background-color: #81fc81;
        border-radius: 7px;
        &:hover {
          background-color: #0af70a;
        }

        .p {
          text-decoration: none;
          font-size: 18px;
          color: #050505;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
