<template>
  <div>
    <CForm :meeting="meeting" />
  </div>
</template>
<script>
import CForm from "@/components/CForm";
export default {
  data() {
    return {
      meeting: {
        title: "總務處月會",
        applicant: "申請人",
        unit: "事務組",
        tel: "57311",
        email: "affairs@ncu.edu.tw",
        date: "2022-03-02",
        startTime: "14:00",
        endTime: "16:00",
        routine: "非例行會議",
        routineEndDate: "",
        background: "",
      },
    };
  },
  components: {
    CForm,
  },
};
</script>
