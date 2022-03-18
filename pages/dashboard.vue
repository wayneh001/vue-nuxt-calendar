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
import data from "@/contents/json/data.json";
import Control from "@/container/Control";
import Calandar from "@/container/Calandar";
export default {
  asyncData({ params }) {
    return { data };
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
  methods: {
    updateMeetingLists(meetings) {
      if (meetings !== undefined) {
        this.meetingLists = meetings;
      }
    },
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
    this.meetingLists = this.data;
  },
};
</script>
