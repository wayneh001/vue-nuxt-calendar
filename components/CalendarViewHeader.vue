<template>
  <div class="pt-5">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center w-100 bg-light"
    >
      <div class="tools">
        <input
          type="text"
          class="form-control w-50 me-2"
          placeholder="請輸入關鍵字"
          v-model="searchObj.keywords"
        />
        <button
          class="btn btn-secondary w-25 me-2"
          type="button"
          @click="reset"
        >
          清除
        </button>
        <button
          class="btn btn-main w-25 me-2"
          type="button"

        >
          搜尋
        </button>
        <button
          class="btn btn-main w-50"
          type="button"
          @click="onAdvanceSearch(searchObj)"
        >
          進階搜尋
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div
          :disabled="!headerProps.previousPeriod"
          class="tab bg-light"
          @click="onInput(headerProps.previousPeriod)"
        >
          <a href="#">
            <h5 class="m-0">&lt;</h5>
          </a>
        </div>
        <div class="tab bg-light">
          <div
            class="periodLabel d-flex justify-content-center align-items-center"
          >
            <span class="text-center">{{ headerProps.periodLabel }}</span
            ><input :type="status" class="label bg-light" v-model="newDate" />
          </div>
        </div>
        <div
          :disabled="!headerProps.nextPeriod"
          class="tab bg-light"
          @click="onInput(headerProps.nextPeriod)"
        >
          <a href="#"> <h5 class="m-0">&gt;</h5></a>
        </div>
      </div>

      <div class="tools" @click.prevent="onSwitchCheck($event)">
        <a href=""
          ><div
            id="month"
            class="toggle px-5 py-2"
            :class="{ toggleActive: isActive }"
            name="month"
          >
            月
          </div></a
        >
        <a href=""
          ><div
            id="week"
            class="toggle px-5 py-2"
            :class="{ toggleActive: !isActive }"
            name="week"
          >
            週
          </div></a
        >
      </div>
    </div>
    <CAdvanceSearchModal
      ref="Modal"
      :searchObj="searchObj"
      @search="search"
    ></CAdvanceSearchModal>
  </div>
</template>
<script>
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
import CalendarView from "@/components/CalendarView";
import CalendarViewHeader from "@/components/CalendarViewHeader";
import CAdvanceSearchModal from "~/components/CAdvanceSearchModal";
export default {
  name: "CalendarViewHeader",
  mixins: [GeneralMathMixin],
  components: { CalendarView, CalendarViewHeader, CAdvanceSearchModal },
  data() {
    return {
      isActive: true,
      status: "month",
      newDate: "",
      periodLabel: this.headerProps.periodLabel,
      searchObj: {
        keywords: "",
        searchStart: "",
        searchEnd: "",
      },
    };
  },
  props: {
    headerProps: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 輸入跳轉指定日期或週別
    onInput(d) {
      this.$emit("input", d);
    },
    // 月與週標籤切換
    onSwitchCheck: function (event) {
      this.status = event.target.id;
    },
    // 計算並顯示日期標籤
    calculatePeriodLabel(v) {
      let n = v.substr(-2, 2);
      return n;
    },
    // 取得週別數據
    getWeek(d) {
      let oneJan = new Date(d.getFullYear(), 0, 1); // first date of year.
      let numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
      let w = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
      // console.log(w);
      return w;
    },
    // 清除搜尋框
    reset() {
      this.searchObj.keywords = "";
      this.search(this.searchObj);
    },
    // 搜尋事件
    search(searchObj) {
      this.$emit("search", searchObj);
    },
    // 進階搜尋
    onAdvanceSearch(searchObj) {
      this.$refs.Modal.showModal(searchObj);
    },
  },
  watch: {
    status: function (newValue) {
      this.isActive = !this.isActive;
      this.$emit("switch", newValue);
    },
    newDate: function (newValue) {
      console.log(newValue);
      let y = this.numberized(newValue, 0, 4);
      let m = 1;
      let w = 1;
      let d = this.headerProps.currentPeriod.getDate();
      let date = new Date();
      if (this.status === "month") {
        m = this.calculatePeriodLabel(newValue) - 1;
        date = new Date(y, m);
      } else {
        w = this.calculatePeriodLabel(newValue);
        let diff = w - this.getWeek(this.headerProps.currentPeriod);
        m = this.headerProps.currentPeriod.getMonth();
        date = new Date(y, m, d + diff * 7);
      }
      console.log(date);
      this.onInput(date);
    },
  },

  mounted() {
    this.searchObj.searchStart = this.headerProps.periodStart;
    this.searchObj.searchEnd = this.headerProps.periodEnd;
    // console.log(this.searchObj);
  },

  updated() {
    // console.log(this.headerProps.currentPeriod, this.headerProps.currentPeriod.getDate());
  },
};
</script>
<style>
.periodLabel {
  position: relative;
  height: 2rem;
  width: 350px;
}
.periodLabel span {
  width: inherit;
  position: absolute;
  pointer-events: none;
  left: 0;
  z-index: 1;
  font-size: calc(1.275rem + 0.3vw);
  color: #000;
}
.periodLabel input {
  position: absolute;
  right: 0;
  border: none;
}

.label::-webkit-datetime-edit {
  outline: none;
}

.label::-webkit-datetime-edit-fields-wrapper {
  opacity: 0;
  width: 0;
}

.label::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

.label:focus-visible {
  outline: none;
}
</style>
