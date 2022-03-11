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
      meetings: this.meetingLists ? [...this.meetingLists] : [],
    };
  },
  props: {
    meetingLists: {
      type: Array,
      reuqire: false,
    },
  },
  components: {
    CTable,
    CForm,
  },
  methods: {
    openEdit(item) {
      this.meeting = item;
      this.isEdit = true;
    },
    closeEdit(item) {
      if (item != undefined) {
        this.meeting = item;
        let index = this.meetings.findIndex(function (meeting) {
          return meeting.id == item.id;
        });
        this.meetings[index] = item;
        this.$emit("update", this.meetings);
      }
      this.isEdit = false;
    },
  },
  watch: {
    meetingLists: function (newValue) {
      console.log(newValue);
      this.meetings = [...newValue];
      console.log(this.meetings);
    },
  },
};
</script>
