<template>
  <div>
    <div v-if="!isEdit">
      <CTable :meetings="meetings" @open="openEdit" />
    </div>
    <div v-if="isEdit">
      <CForm :meeting="meeting" @close="closeEdit" />
    </div>
  </div>
</template>

<script>
import CTable from "@/components/CTable";
import CForm from "@/components/CForm";
export default {
  name: "Index",
  data() {
    return {
      isEdit: false,
      meeting: {},
      meetings: [
        {
          id: "1",
          title: "總務處月會",
          applicant: "申請人姓名",
          unit: "事務組",
          tel: "57311",
          email: "affairs@ncu.edu.tw",
          date: "2022-03-02",
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
          date: "2022-03-07",
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
          date: "2022-03-14",
          startTime: "09:00",
          endTime: "11:00",
          routine: "每週",
          routineEndDate: "2022-12-31",
          background: "",
        },
      ],
    };
  },
  components: {
    CTable,
    CForm,
  },
  methods: {
    openEdit(item) {
      this.meeting = item;
      console.log(this.meeting);
      this.isEdit = true;
    },
    closeEdit(item) {
      if (item != undefined) {
        this.meeting = item;
        let index = this.meetings.findIndex(function (meeting) {
          return meeting.id == item.id;
        });
        this.meetings[index] = item;
      }
      this.isEdit = false;
      console.log(this.meetings);
    },
  },
};
</script>
