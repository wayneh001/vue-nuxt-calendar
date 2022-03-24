<template>
  <div class="container py-5">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center bg-light"
    >
      <!-- 標題 -->
      <h3 class="m-0">我的會議</h3>
      <nuxt-link class="d-flex justify-content-end nav-link" to="/"
        >登出</nuxt-link
      >
    </div>
    <!-- 公告 -->
    <div class="notice p-3 mb-3">
      <h5>公告</h5>
      <p>本月 14 日會議室電腦系統升級，當日不開放會議預約。</p>
    </div>
    <!-- 切換標籤 -->
    <div class="tools mb-3" @click.prevent="onSwitchCheck($event)">
      <a href="" style="width: 50%"
        ><div
          id="finished"
          class="toggle px-5 py-2"
          :class="{ toggleActive: !isActive }"
          name="finished"
        >
          已結束會議
        </div></a
      >
      <a href="" style="width: 50%"
        ><div
          id="upcoming"
          class="toggle px-5 py-2"
          :class="{ toggleActive: isActive }"
          name="upcoming"
        >
          待進行會議
        </div></a
      >
    </div>
    <!-- 列表 -->
    <table class="table mb-3">
      <thead>
        <tr class="bg-main">
          <th scope="col">日期</th>
          <th scope="col">時間</th>
          <th scope="col">會議名稱</th>
          <th scope="col" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-column"
          v-for="(item, index) in pageRender(this.meetings)"
          :key="index"
          :class="{ disabled: status === 'finished' }"
        >
          <td scope="row">{{ item.startDate }}</td>
          <td>{{ item.startTime }} ~ {{ item.endTime }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <a href="#" @click="onEdit(item)" :disabled="status === 'finished'"
              ><i class="fa fas fa-pencil me-2"></i
            ></a>
            <a href="#" @click="onDelete(item)" :disabled="status === 'finished'"
              ><i class="fa fas fa-trash-can"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <CPagination
      :total-page="totalPage"
      :current-page="currentPage"
      @page-change="pageChangeHandler"
    />
    <!-- 新增會議 -->
    <div class="button">
      <button class="btn btn-main w-100" type="button" @click.prevent="onAdd">
        新增會議
      </button>
    </div>
  </div>
</template>
<script>
import CPagination from "@/components/CPagination";
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  data() {
    return {
      isActive: true,
      status: "upcoming",
      currentPage: 1,
      // editable1: true,
    };
  },
  mixins: [GeneralMathMixin],
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    },
  },
  components: { CPagination },
  methods: {
    dataCategorized(list) {
      let today = new Date();
      let upcoming = list.filter(function (item) {
        return (
          parseInt(item.startDate.substr(5, 2)) > today.getMonth() + 1 ||
          parseInt(item.startDate.substr(8, 2)) >= today.getDate()
        );
      });
      let finished = list.filter((item) => !upcoming.includes(item));
      if (this.status === "upcoming") {
        return upcoming;
      } else {
        return finished;
      }
    },
    onSwitchCheck: function (event) {
      this.status = event.target.id;
    },
    pageRender(list) {
      let output = this.dataCategorized(list);
      return output.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    },
    onEdit(item) {
      if (this.status === "upcoming") {
        this.$emit("open", item);
      }
    },
    onDelete(item) {
      if (this.status === "upcoming") {
        this.$emit("delete", item);
        this.meeting = item;
      }
    },
    onAdd() {
      this.$emit("open");
    },
    deleteMeeting() {
      console.log("會議已刪除");
      this.$refs.deleteModal.hideModal();
    },
    pageChangeHandler(value) {
      this.currentPage = value;
    },
  },
  watch: {
    status: function () {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    totalPage() {
      // console.log(Math.ceil(this.meetings.length / 10));
      return Math.ceil(this.meetings.length / 10);
    },
  },
};
</script>
<style scoped>
.table-column:hover {
  background-color: #e1e3fb;
}
.notice {
  background-color: #e1e3fb;
}
.custom-tooltip {
  width: 18rem;
  right: 12rem;
  z-index: 1000;
  pointer-events: none;
}
.disabled,
.disabled:hover {
  /* background-color: #ddd; */
  color: #999;
}

.disabled a {
  cursor: none;
}

.disabled .fa-trash-can,
.disabled .fa-pencil {
  color: #999;
}
</style>
