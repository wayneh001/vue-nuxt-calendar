<template>
  <div>
    <div v-if="!isEdit">
      <CTable :meetings="meetings" @open="openEdit" @delete="showDeleteModal" />
    </div>
    <div v-if="isEdit">
      <CForm :meetings="meetings" :meeting="meeting" @close="closeEdit" />
    </div>
    <CDeleteModal @confirm="onDelete" ref="deleteModal" />
  </div>
</template>

<script>
import CTable from "@/components/CTable";
import CForm from "@/components/CForm";
import CDeleteModal from "@/components/CDeleteModal";
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  name: "Index",
  mixins: [GeneralMathMixin],
  data() {
    return {
      isEdit: false,
      isActive: true,
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
    // 開啟編輯
    openEdit(item) {
      this.meeting = item;
      this.isEdit = true;
    },
    // 結束編輯
    closeEdit(item) {
      if (item != undefined) {
        this.meeting = item;
        item.id === "" ? this.onCreate(item) : this.onUpdate(item);
      }
      this.isEdit = false;
    },
    // 開啟刪除彈窗
    showDeleteModal(item) {
      this.$refs.deleteModal.showModal(item);
    },
    // 更新會議
    onUpdate(item) {
      if (item.routine === "非例行會議") {
        let index = this.meetings.findIndex(function (meeting) {
          return meeting.id == item.id;
        });
        this.meetings[index] = { ...item };
        this.updateMeetings(this.meetings);
      } else {
        this.onCreateRoutine(item);
      }
    },
    // 創造會議
    onCreate(item) {
      item.id = this.getRandomID(this.idPool);
      this.meetings.push(item);
      if (item.routine === "非例行會議") {
        this.updateMeetings(this.meetings);
      } else {
        this.onCreateRoutine(item);
      }
    },
    // 創造例行會議
    onCreateRoutine(item) {
      let array = [];
      let startDate = new Date(item.startDate);
      let endDate = new Date(item.routineEndDate);
      let dd = this.getDiff(startDate, endDate, 1);
      let wd = Math.floor(this.getDiff(startDate, endDate, 7));
      let md = Math.floor(this.getDiff(startDate, endDate, 28));
      switch (item.routine) {
        case "每月":
          for (let m = 1; m <= md; m++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(startDate, 28);
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
        case "每週":
          array.push(item);
          for (let w = 1; w <= wd; w++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(startDate, 7);
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
        case "每日":
          array.push(item);
          for (let d = 1; d <= dd; d++) {
            let itemCopy = { ...item };
            itemCopy.id = this.getRandomID(array);
            itemCopy.startDate = this.routineFormatted(startDate, 1);
            itemCopy.endDate = itemCopy.startDate;
            array.push(itemCopy);
          }
          break;
      }
      this.meetings = this.meetings.concat(array);
      this.updateMeetings(this.meetings);
    },
    // 計算例行會議，依據 Radio 所選，分別加上 28 天 ( 每月 )、7 ( 每週 ) 天與 1 天 ( 每日 )，在每月的計算下，如加上 28 天後未進入下一月份，則再加上 7 天
    routineFormatted(date, d) {
      if (d === 28) {
        let month = date.getMonth();
        date.setDate(date.getDate() + d);
        if (date.getMonth() === month) {
          date.setDate(date.getDate() + 7);
        }
      } else {
        date.setDate(date.getDate() + d);
      }
      return this.getDateStr(date);
    },
    // 取得日期差
    getDiff(d1, d2, delta) {
      return (d2.getTime() - d1.getTime()) / 1000 / 3600 / 24 / delta;
    },
    // 刪除會議
    onDelete(item, routine) {
      if (item != undefined) {
        this.meeting = item;
        if (routine === "單次會議") {
          this.meetings = this.meetings.filter(function (meeting) {
            return meeting.id !== item.id;
          });
        } else {
          this.meetings = this.meetings.filter(function (meeting) {
            return meeting.title !== item.title;
          });
        }
        this.updateMeetings(this.meetings);
      }
    },
    // 上傳會議列表
    updateMeetings(item) {
      if (item.length > 1) {
        this.meetingsSort(item);
      }
      this.$emit("update", item);
    },
    // 取得 ID 庫
    getIDPool() {
      let ids = [];
      this.meetings.forEach(function (item) {
        ids.push(item.id);
      });
      this.idPool = [...ids];
    },
    // 取得隨機 ID
    getRandomID(pool) {
      let id;
      do {
        id = Math.floor(Math.random() * 1000000).toString();
      } while (pool.includes(id));
      return id;
    },
  },
  computed: {},
  watch: {
    meetingLists: function (newValue) {
      this.meetings = [...newValue];
      this.getIDPool(this.idPool);
    },
  },
  mounted() {
    this.getIDPool();
    // let date = new Date(2022,1,0)
    // console.log(date.getDate());
  },
};
</script>
