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
            v-model="meeting.title"
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
        v-model="meeting.applicant"
      />
      <!-- 單位 -->
      <CInput
        className="mb-3"
        label="單位"
        type="text"
        placeholder="請輸入單位名稱"
        v-model="meeting.unit"
      />
      <!-- 電話與信箱 -->
      <div class="row mb-3">
        <div class="col-6">
          <CInput
            label="聯絡電話"
            type="text"
            placeholder="請輸入聯絡電話"
            v-model="meeting.tel"
          />
        </div>
        <div class="col-6">
          <CInput
            label="電子信箱"
            type="text"
            placeholder="請輸入電子信箱"
            v-model="meeting.email"
          />
        </div>
      </div>
      <!-- 日期 -->
      <CInput className="mb-3" label="日期" type="date" v-model="meeting.date" />
      <!-- 時間 -->
      <div class="row mb-3">
        <label class="form-label">時間</label>
        <div class="col-6">
          <CSelect
            label="請選擇開始時間"
            v-model="meeting.startTime"
          />
        </div>
        <div class="col-6">
          <CSelect
            label="請選擇結束時間"
            v-model="meeting.startTime"
          />
        </div>
      </div>
      <div class="mb-3"></div>
      <!-- 例行會議 -->
      <div class="mb-3">
        <label class="form-label">例行會議</label>
        <div class="d-flex justify-content-between bg-light p-2">
          <div class="form-check form-check-inline" v-for="(item, index) in routine" :key="index">
            <input
              class="form-check-input"
              type="radio"
              v-model="meeting.routine"
              :value="item"
            />
            <label class="form-check-label" for="inlineRadio1"
              >{{ item }}</label
            >
          </div>
        </div>
      </div>
      <CInput className="mb-3" label="例行會議結束日期" type="date" v-model="meeting.date" />
      <!-- 底圖 -->
      <div class="mb-3">
        <label class="form-label">底圖</label>
        <button
          class="btn btn-main w-100"
          type="button"
          @click.prevent="onChangeBG"
        >
          底圖
        </button>
      </div>
      <!-- 取消與儲存 -->
      <div class="row mb-3">
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
          <button class="btn btn-main w-100" type="button">儲存</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import CInput from '~/components/CInput'
import CSelect from '~/components/CSelect'
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
        startTime: "請選擇開始時間",
        endTime: "2",
        routine: "非例行會議",
        routineEndDate: "2022-03-25",
        background: "",
      },
      titleEdit: false,
      routine: ['非例行會議', '每日', '每週', '每月'],
    };
  },
  component: { CInput, CSelect },
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
      this.$router.push("/control");
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
