<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 background"
    :style="{ background: getBGImage() }"
  >
    <div class="blur w-75 h-75"></div>
    <div
      class="d-flex justify-content-center align-items-center plate shadow w-75 h-75"
    >
      <div
        class="fs-custom-1 fw-bolder text-main text-center"
        v-if="!this.meeting.status"
      >
        無{{ this.meeting.label }}
      </div>
      <div class="m-5 p-5" v-if="this.meeting.status">
        <div class="titleDiv mb-5">
          <i class="fa fas fa-calendar-day fs-custom-2 me-2"></i>
          <label class="fs-custom-2 fw-bolder">{{ this.meeting.label }}</label>
          <label
            class="fs-custom-2 fw-bolder ms-5"
            v-if="this.meeting.type === 'upcoming'"
            >@{{ this.meeting.data.startTime }}~
            {{ this.meeting.data.endTime }}</label
          >
          <div class="fs-custom-1 fw-bolder text-main">
            {{ this.meeting.data.title }}
          </div>
        </div>
        <div class="contentDiv">
          <div class="row">
            <div class="col-12 mb-3">
              <div>
                <i class="fa fas fa-user-group me-2 fs-custom-4 text-secondary"></i>
                <label class="fs-custom-4 fw-bolder text-secondary">單位</label>
                <div class="fs-custom-2 fw-bolder">
                  {{ this.meeting.data.unit }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <i class="fa fas fa-user me-2 fs-custom-4 text-secondary"></i>
                <label class="fs-custom-4 fw-bolder text-secondary">聯絡人</label>
                <div class="fs-custom-2 fw-bolder">
                  {{ this.meeting.data.applicant }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <i class="fa fas fa-phone me-2 fs-custom-4 text-secondary"></i>
                <label class="fs-custom-4 fw-bolder text-secondary">聯絡電話</label>
                <div class="fs-custom-2 fw-bolder">
                  {{ this.meeting.data.tel }}
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
export default {
  props: {
    meeting: {
      type: Object,
      reuqire: true,
    },
  },
  methods: {
    getBGImage() {
      if (this.meeting.status && this.meeting.data.background !== "") {
        let src = this.meeting.data.background;
        return (
          "center no-repeat fixed url(" +
          require(`@/static/image/${src}.jpg`) +
          ")"
        );
      } else {
        return (
          "center no-repeat fixed url(" +
          require("@/static/image/BG01.jpg") +
          ")"
        );
      }
    },
  },
};
</script>
<style>
.background {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
