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
    <!-- 列表 -->
    <table class="table table-striped mb-3">
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
        >
          <td scope="row">{{ item.startDate }}</td>
          <td>{{ item.startTime }} ~ {{ item.endTime }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <a href="#" @click="onEdit(item)"
              ><i class="fa fas fa-pencil me-2"></i
            ></a>
            <a href="#" @click="onDelete(item)"
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
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    },
  },
  components: { CPagination },
  methods: {
    pageRender(list) {
      return list.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },
    onEdit(item) {
      this.$emit("open", item);
    },
    onDelete(item) {
      this.meeting = item;
      this.$emit("delete", item);
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
  computed: {
    totalPage() {
      console.log(Math.ceil(this.meetings.length / 10));
      return Math.ceil(this.meetings.length / 10);
    },
  },
};
</script>
<style scoped>
.notice {
  background-color: #e1e3fb;
}
.btn-main {
  background-color: #686ce5;
  color: #fff;
}
</style>
