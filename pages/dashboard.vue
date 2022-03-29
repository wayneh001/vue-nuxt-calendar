<template>
  <div>
    <div class="row mt-3">
      <div class="col-3 mx-0">
        <div class="shadow p-3 mb-5 bg-body rounded">
          <Control
            :meetingLists="meetingLists"
            @update="updateMeetingLists"
            ref="control"
          />
        </div>
      </div>
      <div class="col-9">
        <div class="shadow p-3 mb-5 bg-body rounded">
          <Calandar :meetingLists="meetingLists" @clickEvent="onClickEvent" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import meetingData from "@/content/json/data.json";
import Control from "@/container/Control";
import Calandar from "@/container/Calandar";
export default {
  asyncData({ params }) {
    return { meetingData };
  },
  components: {
    Control,
    Calandar,
  },
  data() {
    return {
      meetingLists: [],
      item: {},
    };
  },
  // 更新會議列表，後續 api 的串接點
  methods: {
    updateMeetingLists(meetings) {
      if (meetings !== undefined) {
        this.meetingLists = meetings;
      }
    },
    // 月曆組件的點擊事件
    onClickEvent(item) {
      this.$refs.control.openEdit(item);
    },
  },
  watch: {
    meetingLists: function () {
      console.log("Data Updated");
    },
  },
  mounted() {
    this.meetingLists = this.meetingData;
    // alert("公告：本月 14 日會議室電腦系統升級，當日不開放會議預約。");
  },
};
</script>
