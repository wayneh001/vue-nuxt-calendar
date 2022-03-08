<template>
  <div class="pt-5 vh-100">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center w-100 bg-light"
    >
      <div class="tabs disbaled">
        <a href="#">
          <input type="text" class="form-control" placeholder="請輸入關鍵字"
        /></a>
      </div>
      <div class="title fs-1">
        <i class="fa fa-chevron-left"></i>
        <span class="mx-3">Mar 21 - Mar 27</span>
        <i class="fa fa-chevron-right"></i>
      </div>
      <div class="tabs">
        <a href="#"><div class="tab">週</div></a>
        <a href="#"><div class="tab">月</div></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      calendar: {
        view: "",
        month: "",
        date: "",
      },
      meeting: {
        uid: "",
        date: "",
        startTime: "09:00",
        endTime: "11:00",
        title: "",
        applicant: "",
        unit: "",
        contact: "",
        email: "",
        routine: "none",
        routineEndTime: "",
        background: "",
      },
      allMeetings: [],
      tempMeetings: [],
    };
  },
  methods: {
    renderCalendar() {},
    renderMeeting() {},
  },
};
</script>
<style scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 30px;
}

.tabs a {
  text-decoration: none;
  color: #3e4044;
}

.tabs a:hover {
  color: #fff;
}

.tabs a:active {
  color: #fff;
}

.tabs a:hover .tab {
  background-color: #686ce5;
  color: #fff;
}

.tabs a:active .tab {
  background-color: #686ce5;
  color: #fff;
}
</style>
