<template>
  <div class="container py-5">
    <div
      class="
        p-3
        mb-3
        d-flex
        justify-content-between
        align-items-center
        bg-light
      "
    >
      <!-- 標題 -->
      <h3 class="m-0">會議列表</h3>
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
    <div class="tools mb-3" @click.prevent="mineCheck($event)">
      <a href="" style="width: 50%"
        ><div
          id="mine"
          class="toggle px-5 py-2"
          :class="{ toggleActive: isMine }"
          name="upcoming"
        >
          我的會議
        </div></a
      >
      <a href="" style="width: 50%"
        ><div
          id="all"
          class="toggle px-5 py-2"
          :class="{ toggleActive: !isMine }"
          name="finished"
        >
          所有會議
        </div></a
      >
    </div>
    <div class="tools mb-3" @click.prevent="ongoingCheck($event)">
      <a href="" style="width: 50%"
        ><div
          id="upcoming"
          class="toggle px-5 py-2"
          :class="{ toggleActive: isOngoing }"
          name="upcoming"
        >
          待進行會議
        </div></a
      >
      <a href="" style="width: 50%"
        ><div
          id="finished"
          class="toggle px-5 py-2"
          :class="{ toggleActive: !isOngoing }"
          name="finished"
        >
          已結束會議
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
          :class="{ disabled: disabledTable(item) }"
          :style="{ display: filterEvents(item) }"
        >
          <td scope="row">{{ item.startDate }}</td>
          <td>{{ item.startTime }} ~ {{ item.endTime }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <a href="#" @click="onEdit(item)" :disabled="status === 'finished'"
              ><i class="fa fas fa-pencil me-2"></i
            ></a>
            <a
              href="#"
              @click="onDelete(item)"
              :disabled="status === 'finished'"
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
      isMine: true,
      isOngoing: true,
      belonging: "mine",
      status: "upcoming",
      tmpList: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  mixins: [GeneralMathMixin],
  props: {
    meetings: {
      type: Array,
      reuqire: false,
    },
    // searchObj: {
    //   type: Object,
    //   require: false,
    // },
  },
  components: { CPagination },
  methods: {
    // 會議列表依據我的、所有、已完成與未完成分類
    dataCategorized(list) {
      // this.meetingsSort(list);
      let filterList = [];
      if (this.belonging === "mine") {
        filterList = list.filter((item) => item.classes === "");
      } else {
        filterList = list;
      }
      let f = this.today();
      let upcoming = filterList.filter(function (item) {
        return (
          parseInt(item.startDate.substr(5, 2)) >= f.getMonth() + 1 &&
          parseInt(item.startDate.substr(8, 2)) >= f.getDate()
        );
      });
      let finished = filterList.filter((item) => !upcoming.includes(item));
      if (this.status === "upcoming") {
        this.countTotalPage(upcoming);
        return upcoming;
      } else {
        this.countTotalPage(finished);
        return finished;
      }
    },
    // 我的與所有標籤切換
    mineCheck: function (event) {
      this.belonging = event.target.id;
    },
    // 已完成與未完成標籤切換
    ongoingCheck: function (event) {
      this.status = event.target.id;
    },
    // 列表可操作與否分類
    disabledTable(item) {
      if (this.status === "finished" || item.classes !== "") {
        return true;
      }
    },
    // 依據關鍵字隱藏無關會議事件
    filterEvents(item) {
      let searchObj = this.$store.getters.searchObj;
      if (searchObj.keywords === undefined) {
        return "";
      } else {
        if (item.title.includes(searchObj.keywords)) {
          if (
            searchObj.searchStart <= item.startDate &&
            item.startDate <= searchObj.searchEnd
          ) {
            return "";
          } else {
            return "none";
          }
        } else {
          return "none";
        }
      }
    },
    // 計算總頁數
    countTotalPage(list) {
      this.totalPage = Math.ceil(list.length / 10);
    },
    // 當前頁碼頁面渲染
    pageRender(list) {
      let output = this.dataCategorized(list);
      return output.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    },
    // 編輯會議事件
    onEdit(item) {
      if (this.status === "upcoming") {
        this.$emit("open", item);
      }
    },
    // 刪除會議事件
    onDelete(item) {
      if (this.status === "upcoming") {
        let type = "delete";
        this.$emit("delete", item, type);
        this.meeting = item;
      }
    },
    // 新增會議事件
    onAdd() {
      this.$emit("open");
    },
    // 開啟完成刪除會議彈窗
    deleteMeeting() {
      // console.log("會議已刪除");
      this.$refs.deleteModal.hideModal();
    },
    // 頁碼切換處理
    pageChangeHandler(value) {
      this.currentPage = value;
    },
  },
  watch: {
    belonging: function () {
      this.isMine = !this.isMine;
    },
    status: function () {
      this.isOngoing = !this.isOngoing;
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
