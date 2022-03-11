<template>
  <div class="container pt-5 vh-100">
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
        <tr class="table-column" v-for="(item, index) in meetingsList" :key="index">
          <td scope="row">{{ item.date }}</td>
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
    <!-- 新增會議 -->
    <div class="button">
      <button class="btn btn-main w-100" type="button" @click.prevent="onAdd">
        新增會議
      </button>
    </div>
    <!-- <CDeleteModal
      ref="deleteModal"
      :item="tempMeeting"
      @delete-item="deleteMeeting"
    /> -->
  </div>
</template>
<script>
import CDeleteModal from "@/components/CDeleteModal";
export default {
  data() {
    return {
      meetingsList: this.meetings
      ? { ...this.meetings }
        : {
        },
    };
  },
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    }
  },
  components: { CDeleteModal },
  methods: {
    onEdit(item) {
      this.$emit("open", item);
    },
    onDelete(item) {

    },
    onAdd() {
      this.$emit("open");
    },
    deleteMeeting() {
      console.log("會議已刪除");
      this.$refs.deleteModal.hideModal();
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
