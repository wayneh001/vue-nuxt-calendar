<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 background"
  >
    <div class="blur w-75 h-75"></div>
    <div
      class="d-flex justify-content-center align-items-center plate shadow w-75 h-75"
    >
      <div
        class="fs-custom-1 fw-bolder text-main"
        v-if="this.meetings.length === 0"
      >
        今日無預定會議
      </div>
      <div class="m-5 p-5 w-100" v-if="this.meetings.length !== 0">
        <i class="fa fas fa-calendar-day fs-custom-2 me-2"></i>
        <label class="fs-custom-2 fw-bolder">今日會議列表</label>
        <div class="tableDiv">
          <div
            class="block mb-2 p-3 w-100"
            v-for="item in this.meetings"
            :key="item.id"
            :class="'block' + getBlockStyle(item)"
          >
            <div class="row d-flex align-items-center">
              <div class="col-4">
                <div class="fs-custom-4 fw-bolder">
                  {{ item.startTime }} ~ {{ item.endTime }}
                </div>
                <div class="fs-custom-4 fw-bolder">{{ item.unit }}</div>
              </div>
              <div class="col-8">
                <div class="fs-custom-2 fw-bolder">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<
<script>
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    },
  },
  mixins: [GeneralMathMixin],
  methods: {
    getBlockStyle(item) {
      let sh = this.numberized(item.startTime, 0, 2);
      let sm = this.numberized(item.startTime, 3, 2);
      let eh = this.numberized(item.endTime, 0, 2);
      let em = this.numberized(item.endTime, 3, 2);
      if (
        this.today().getHours() > eh ||
        (this.today().getHours() === eh && this.today().getMinutes() > em)
      ) {
        return "-finished";
      } else if (
        this.today().getHours() < sh ||
        (this.today().getHours() === sh && this.today().getMinutes() < sm)
      ) {
        return "";
      } else {
        return "-ongoing";
      }
    },
  },
};
</script>
<style>
.background {
  background-image: url("@/static/image/BG06.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.block {
  background-color: #e1e3fb;
  color: #686ce5;
  /* border: 1px solid #666; */
}
.block-ongoing {
  background-color: #686ce5;
  color: #fff;
}
.block-finished {
  background-color: #ddd;
  color: #999;
}
</style>
