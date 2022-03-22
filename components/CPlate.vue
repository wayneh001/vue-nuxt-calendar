<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 background"
  >
    <div class="blur w-75 h-75"></div>
    <div class="d-flex align-items-center plate shadow w-75 h-75">
      <div class="fs-custom-1 fw-bolder text-main" v-if="!ongoing">
        目前無會議進行中
      </div>
      <div class="m-5 p-5" v-if="ongoing">
        <div class="titleDiv mb-5">
          <label class="fs-custom-2 fw-bolder">{{ label }}</label>
          <label class="fs-custom-2 fw-bolder ms-5" v-if="next"
            >@16:00 ~ 17:00</label
          >
          <div class="fs-custom-1 fw-bolder text-main">校園餐廳改善會議</div>
        </div>
        <div class="contentDiv">
          <div class="row">
            <div class="col-12 mb-3">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">單位</div>
                <div class="fs-custom-2 fw-bolder">總務處–事務組</div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">聯絡人</div>
                <div class="fs-custom-2 fw-bolder">聯絡人姓名</div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">聯絡電話</div>
                <div class="fs-custom-2 fw-bolder">57311</div>
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
  data() {
    return {
      label: "目前會議",
      ongoing: true,
      next: true,
    };
  },
  props: {
    meeting: {
      type: Object,
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
