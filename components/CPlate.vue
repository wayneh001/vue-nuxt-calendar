<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 background"
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
          <label class="fs-custom-2 fw-bolder">{{ this.meeting.label }}</label>
          <label
            class="fs-custom-2 fw-bolder ms-5"
            v-if="this.meeting.type === 'upcoming'"
            >@{{ this.meeting.data.startTime }}~ {{ this.meeting.data.endTime }}</label
          >
          <div class="fs-custom-1 fw-bolder text-main">
            {{ this.meeting.data.title }}
          </div>
        </div>
        <div class="contentDiv">
          <div class="row">
            <div class="col-12 mb-3">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">單位</div>
                <div class="fs-custom-2 fw-bolder">{{ this.meeting.data.unit }}</div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">聯絡人</div>
                <div class="fs-custom-2 fw-bolder">
                  {{ this.meeting.data.applicant }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <div class="fs-custom-4 fw-bolder text-secondary">聯絡電話</div>
                <div class="fs-custom-2 fw-bolder">{{ this.meeting.data.tel }}</div>
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
      return "";
    },
  },
};
</script>
<style>
.background {
  /* background-color: brown; */
  background-image: url("@/assets/image/BG06.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
