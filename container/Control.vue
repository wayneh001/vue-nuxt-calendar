<template>
  <div>
    <div v-if="!isEdit">
      <CTable :meetings="meetings" @open="openEdit" @delete="showDeleteModal" />
    </div>
    <div v-if="isEdit">
      <CForm :meeting="meeting" @close="closeEdit" />
    </div>
    <CDeleteModal @confirm="onDelete" ref="deleteModal" />
  </div>
</template>

<script>
import CTable from "@/components/CTable";
import CForm from "@/components/CForm";
import CDeleteModal from "@/components/CDeleteModal";
export default {
  name: "Index",
  data() {
    return {
      isEdit: false,
      meetings: this.meetingLists ? [...this.meetingLists] : [],
      meeting: {},
      idPool: [],
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
    CDeleteModal,
  },
  methods: {
    openEdit(item) {
      this.meeting = item;
      this.isEdit = true;
    },
    closeEdit(item) {
      if (item != undefined) {
        this.meeting = item;
        item.id === "" ? this.onCreate(item) : this.onUpdate(item);
      }
      this.isEdit = false;
    },
    showDeleteModal(item) {
      this.$refs.deleteModal.showModal(item);
    },
    onUpdate(item) {
      if (item.routine === "非例行會議") {
        let index = this.meetings.findIndex(function (meeting) {
          return meeting.id == item.id;
        });
        this.meetings[index] = { ...item };
        this.updateMeetings();
      } else {
        this.onCreateRoutine(item);
      }
    },
    onCreate(item) {
      if (item.routine === "非例行會議") {
        item.id = this.getRandomID(this.idPool);
        this.meetings.push(item);
        this.updateMeetings();
      } else {
        this.onCreateRoutine(item);
      }
    },
    onCreateRoutine(item) {
      let array = [];
      let startDate = new Date(item.startDate);
      let baseDate = new Date(startDate);
      let endDate = new Date(item.routineEndDate);
      let dd = this.getDiff(startDate, endDate, 1);
      let wd = Math.floor(this.getDiff(startDate, endDate, 7));
      let md = Math.floor(this.getDiff(startDate, endDate, 30));
      switch (item.routine) {
        case "每月":
          for (let m = 1; m < md; m++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(
              startDate,
              baseDate,
              1,
              0
            );
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
        case "每週":
          for (let w = 1; w < wd; w++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(
              startDate,
              baseDate,
              0,
              7
            );
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
        case "每日":
          for (let d = 1; d < dd; d++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(
              startDate,
              baseDate,
              0,
              1
            );
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
      }
      this.meetings = this.meetings.concat(array);
      this.updateMeetings(this.meetings);
    },
    routineFormatted(date, baseDate, m, d) {
      if (m === 0) {
        date.setDate(date.getDate() + d);
      } else {
        let tempDate = new Date(date.setMonth(date.getMonth() + m));
        tempDate.setDate(1);
        let diff = baseDate.getDay() - tempDate.getDay();
        if (diff >= 0) {
          date.setDate(baseDate.getDate() + diff - 1);
        } else {
          date.setDate(baseDate.getDate() + diff + 6);
        }
      }
      let sy = date.getFullYear().toString();
      let sm = date.getMonth() + 1;
      let sd = date.getDate();
      sm = sm < 10 ? `0${sm}` : sm.toString();
      sd = sd < 10 ? `0${sd}` : sd.toString();
      return `${sy}-${sm}-${sd}`;
    },
    getDiff(d1, d2, delta) {
      return (d2.getTime() - d1.getTime()) / 1000 / 3600 / 24 / delta;
    },
    onDelete(item) {
      if (item != undefined) {
        this.meeting = item;
        this.meetings = this.meetings.filter(function (meeting) {
          return meeting.id != item.id;
        });
        this.updateMeetings();
      }
    },
    updateMeetings(item) {
      this.$emit("update", item);
    },
    getIDPool() {
      let a = [];
      this.meetings.forEach(function (item) {
        a.push(item.id);
      });
      this.idPool = [...a];
    },
    getRandomID(pool) {
      let id;
      do {
        id = Math.floor(Math.random() * 1000000).toString();
      } while (pool.includes(id));
      return id;
    },
  },
  watch: {
    meetingLists: function (newValue) {
      this.meetings = [...newValue];
      this.getIDPool(this.idPool);
      // console.log(newValue);
    },
  },
  mounted() {
    this.getIDPool();
    // let date1 = new Date(this.meetings[0].startDate);
    // let date2 = new Date(this.meetings[0].routineEndDate);
    // date1.setDate(25+2);
    // console.log(date1, date2.getDay());
  },
};
</script>
