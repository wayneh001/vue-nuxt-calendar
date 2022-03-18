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
import Data from '@/static/data.json';
import Control from "@/container/Control";
import Calandar from "@/container/Calandar";
export default {
  components: {
    Control,
    Calandar,
  },
  asyncData ({ params }) {
    return { Data }
  },
  data() {
    return {
      meetingLists: [
        {
          id: "552973",
          title: "總務處月會",
          applicant: "申請人姓名",
          unit: "事務組",
          tel: "57311",
          email: "affairs@ncu.edu.tw",
          startDate: "2022-03-02",
          endDate: "2022-03-02",
          startTime: "14:00",
          endTime: "16:00",
          routine: "每月",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "",
        },
        {
          id: "356813",
          title: "事務組週會",
          applicant: "申請人姓名",
          unit: "事務組",
          email: "affairs@ncu.edu.tw",
          startDate: "2022-03-07",
          endDate: "2022-03-07",
          startTime: "09:00",
          endTime: "10:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "",
        },
        {
          id: "251636",
          title: "事務組週會",
          applicant: "申請人姓名",
          unit: "事務組",
          email: "affairs@ncu.edu.tw",
          startDate: "2022-03-14",
          endDate: "2022-03-14",
          startTime: "09:00",
          endTime: "10:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "",
        },
        {
          id: "201763",
          title: "文書組週會",
          applicant: "申請人姓名",
          unit: "文書組",
          email: "document@ncu.edu.tw",
          startDate: "2022-03-14",
          endDate: "2022-03-14",
          startTime: "13:00",
          endTime: "14:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "disabled",
        },
        {
          id: "573487",
          title: "採購組週會",
          applicant: "申請人姓名",
          unit: "採購組",
          email: "purchase@ncu.edu.tw",
          startDate: "2022-03-14",
          endDate: "2022-03-14",
          startTime: "15:00",
          endTime: "16:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "disabled",
        },
        {
          id: "796893",
          title: "營繕組週會",
          applicant: "申請人姓名",
          unit: "營繕組",
          email: "construct@ncu.edu.tw",
          startDate: "2022-03-15",
          endDate: "2022-03-15",
          startTime: "09:00",
          endTime: "10:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "disabled",
        },
        {
          id: "281584",
          title: "出納組週會",
          applicant: "申請人姓名",
          unit: "出納組",
          email: "cashier@ncu.edu.tw",
          startDate: "2022-03-15",
          endDate: "2022-03-15",
          startTime: "13:00",
          endTime: "14:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background:
            "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          classes: "disabled",
        },
      ],
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
};
</script>
