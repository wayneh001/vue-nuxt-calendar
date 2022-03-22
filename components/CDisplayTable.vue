<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 background"
  >
    <div class="blur w-75 h-75"></div>
    <div class="d-flex align-items-center plate shadow w-75 h-75">
      <!-- <div
        class="fs-custom-1 fw-bolder text-main"
        v-if="!meetings.length === 0"
      >
        今日無預定會議
      </div> -->
      <div class="m-5 p-5 w-100">
        <label class="fs-custom-2 fw-bolder">當日會議列表</label>
        <div class="tableDiv">
          <div class="block mb-2 p-3 w-100" v-for="i in 5" :key="i">
            <div class="row d-flex align-items-center">
              <div class="col-4">
                <div class="fs-custom-4 fw-bolder text-main">08:00 ~ 10:00</div>
                <div class="fs-custom-4 fw-bolder text-main">總務處–事務組</div>
              </div>
              <div class="col-8">
                <div class="fs-custom-2 fw-bolder text-main">校園餐廳改善會議</div>
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
export default {
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    },
  },
  methods: {
    getBGImage() {
      return "";
    },
  },
};
</script>
<style>
.background {
  /* background-color: brown; */
  background-image: url("@/assets/image/Preview.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
.blur {
  position: absolute;
  filter: blur(6rem);
}
.plate {
  background: hsla(0, 0%, 100%, 0.75);
}

.block {
  background-color: #e1e3fb;
  /* border: 1px solid #666; */
}

.fs-custom-1 {
  font-size: calc(4rem + 1.5vw) !important;
}

.fs-custom-2 {
  font-size: calc(2rem + 0.9vw) !important;
}

.fs-custom-4 {
  font-size: calc(1.8rem + 0.3vw) !important;
}
</style>
