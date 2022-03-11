<template>
  <div class="row mt-3">
    <div class="col-3 mx-0">
      <div class="shadow p-3 mb-5 bg-body rounded">
        <Control :meetingLists="meetingLists" @update="updateMeetingLists" />
      </div>
    </div>
    <div class="col-9">
      <div class="shadow p-3 mb-5 bg-body rounded">
        <Calandar :meetingLists="meetingLists" />
      </div>
    </div>
  </div>
</template>
<script>
import Control from "@/container/Control";
import Calandar from "@/container/Calandar";
export default {
  components: {
    Control, Calandar,
  },
  data() {
    return {
      meetingLists: [
        {
          id: "1",
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
          background: "",
        },
        {
          id: "2  ",
          title: "事務組週會",
          applicant: "申請人姓名",
          unit: "事務組",
          email: "affairs@ncu.edu.tw",
          startDate: "2022-03-07",
          endDate: "2022-03-07",
          startTime: "09:00",
          endTime: "11:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background: "",
        },
        {
          id: "3",
          title: "事務組週會",
          applicant: "申請人姓名",
          unit: "事務組",
          email: "affairs@ncu.edu.tw",
          startDate: "2022-03-14",
          endDate: "2022-03-14",
          startTime: "09:00",
          endTime: "11:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background: "",
        },
      ],
    };
  },
  methods: {
    updateMeetingLists(meetings) {
      if (meetings != undefined) {
        this.meetingLists = meetings;
      }
    }
  },
  watch: {
    meetingLists: function() {
      console.log('Data Updated')
    }
  }
};
</script>
