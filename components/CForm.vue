<template>
  <div class="container pt-5 vh-100">
    <form>
      <!-- 標題 -->
      <div
        class="mb-3 d-flex justify-content-between align-items-center bg-light"
      >
        <h3 class="m-0">
          <input
            type="text"
            class="form-control form-control-title bg-light"
            placeholder="請輸入單位"
            v-model="editedMeeting.title"
            ref="titleFoucs"
            :readonly="!titleEdit"
            @keyup.enter="doneTitleEdit"
          />
        </h3>
        <a href="#" @click="onTitleEdit()"
          ><i class="fa fas fa-pencil me-2"></i
        ></a>
      </div>
      <!-- 申請人 -->
      <CInput
        className="mb-3"
        label="申請人"
        type="text"
        placeholder="請輸入申請人姓名"
        v-model="editedMeeting.applicant"
      />
      <!-- 單位 -->
      <CInput
        className="mb-3"
        label="單位"
        type="text"
        placeholder="請輸入單位名稱"
        v-model="editedMeeting.unit"
      />
      <!-- 電話與信箱 -->
      <div class="row mb-3">
        <div class="col-6">
          <CInput
            label="聯絡電話"
            type="text"
            placeholder="請輸入聯絡電話"
            v-model="editedMeeting.tel"
          />
        </div>
        <div class="col-6">
          <CInput
            label="電子信箱"
            type="text"
            placeholder="請輸入電子信箱"
            v-model="editedMeeting.email"
          />
        </div>
      </div>
      <!-- 日期 -->
      <CInput
        className="mb-3"
        label="日期"
        type="date"
        v-model="editedMeeting.date"
      />
      <!-- 時間 -->
      <div class="row mb-3">
        <label class="form-label">時間</label>
        <div class="col-5">
          <select class="form-select" v-model="editedMeeting.startTime">
            <option selected value="">請選擇開始時間</option>
            <option v-for="(item, index) in time" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="col-2 text-center">~</div>
        <div class="col-5">
          <select class="form-select" v-model="editedMeeting.endTime">
            <option selected value="">請選擇結束時間</option>
            <option v-for="(item, index) in time" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-3"></div>
      <!-- 例行會議 -->
      <div class="mb-3">
        <label class="form-label">例行會議</label>
        <div class="d-flex justify-content-between bg-light p-2">
          <div
            class="form-check form-check-inline"
            v-for="(item, index) in routine"
            :key="index"
          >
            <input
              :id="item"
              class="form-check-input"
              name="item"
              type="radio"
              v-model="editedMeeting.routine"
              :value="item"
            />
            <label class="form-check-label" :for="item">{{ item }}</label>
          </div>
        </div>
      </div>
      <CInput
        className="mb-3"
        label="例行會議結束日期"
        type="date"
        :disabled="editedMeeting.routine === '非例行會議'"
        v-model="editedMeeting.date"
      />
      <!-- 底圖 -->
      <div class="mb-5">
        <label class="form-label">底圖</label>
        <button
          class="btn btn-main w-100"
          type="button"
          @click.prevent="onChangeBG"
        >
          底圖
        </button>
      </div>
      <!-- 儲存與取消 -->
      <div class="button row mb-3">
        <div class="col-6">
          <button
            class="btn btn-light w-100"
            type="button"
            @click.prevent="onCancel"
          >
            取消
          </button>
        </div>
        <div class="col-6">
          <button
            class="btn btn-main w-100"
            type="button"
            @click.prevent="onSave(editedMeeting)"
          >
            儲存
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import CInput from "~/components/CInput";
export default {
  data() {
    return {
      editedMeeting: this.meeting
        ? { ...this.meeting }
        : {
            title: "",
            applicant: "",
            unit: "",
            tel: "",
            email: "",
            date: "",
            startTime: "",
            endTime: "",
            routine: "非例行會議",
            routineEndDate: "",
            background: "",
          },
      titleEdit: false,
      time: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ],
      routine: ["非例行會議", "每日", "每週", "每月"],
    };
  },
  props: {
    meeting: {
      type: Object,
      require: false,
    },
  },
  component: { CInput },
  methods: {
    onTitleEdit() {
      this.titleEdit = true;
      this.$refs.titleFoucs.focus();
    },
    doneTitleEdit() {
      this.titleEdit = false;
      this.$refs.titleFoucs.blur();
    },
    onChangeBG() {
      console.log("yes");
    },
    onCancel() {
      this.$emit("close");
    },
    onSave(item) {
      console.log(item.routine);
      this.$emit("close", item);
    },
  },
};
</script>
<style scoped>
.notice {
  background-color: #e1e3fb;
}

.form-control-title {
  font-size: calc(1.275rem + 0.3vw);
  border-width: 0;
  color: #000;
}

.form-control-title:read-only {
  border-color: none;
  box-shadow: none;
  color: #6c757d;
}
</style>
