<template>
  <div class="pt-5">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center w-100 bg-light"
    >
      <div class="tools">
        <input
          type="text"
          class="form-control me-2"
          placeholder="請輸入關鍵字"
          v-model="keywords"
        />
        <button class="btn btn-secondary me-2" type="button" style="width: 6rem;" @click="reset">清除</button>
        <button class="btn btn-main" type="button" style="width: 6rem;" @click="search(keywords)">搜尋</button>
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
            <span class="text-start">{{ headerProps.periodLabel }}</span
            ><input :type="status" class="label bg-light" v-model="newData" />
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
  </div>
</template>
<script>
import CalendarView from "@/components/CalendarView";
import CalendarViewHeader from "@/components/CalendarViewHeader";
export default {
  name: "CalendarViewHeader",
  components: { CalendarView, CalendarViewHeader },
  data() {
    return {
      isActive: true,
      status: "month",
      newData: "",
      periodLabel: this.headerProps.periodLabel,
      keywords: "",
    };
  },
  props: {
    headerProps: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onInput(d) {
      this.$emit("input", d);
    },
    onSwitchCheck: function (event) {
      this.status = event.target.id;
    },
    calculatePeriodLabel(v) {
      let n = v.substr(-2, 2);
      return n;
    },
    getWeek(d) {
      let oneJan = new Date(d.getFullYear(), 0, 1); // first date of year.
      let numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
      let w = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
      // console.log(w);
      return w;
    },
    reset() {
      this.keywords = "";
      this.search(this.keywords);
    },
    search(k) {
      this.$emit("search", k)
    }
  },
  watch: {
    status: function (newValue) {
      this.isActive = !this.isActive;
      this.$emit("switch", newValue);
    },
    newData: function (newValue) {
      let y = this.headerProps.currentPeriod.getFullYear();
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
        console.log(diff);
        m = this.headerProps.currentPeriod.getMonth();
        date = new Date(y, m, d + diff * 7);
      }
      console.log(date);
      this.onInput(date);
    },
  },

  mounted() {
    // console.log(this.headerProps.currentPeriod);
  },

  updated() {
    // console.log(this.headerProps.currentPeriod, this.headerProps.currentPeriod.getDate());
  },
};
</script>
<style>

</style>
