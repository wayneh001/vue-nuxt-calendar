<template>
  <div id="app">
    <CalendarView
      :events="this.meetingLists"
      :show-date="showDate"
      @show-date-change="setShowDate"
      @clickEvent="onClickEvent"
      class="theme-default holiday-us-traditional holiday-us-official"
    />
  </div>
</template>
<script>
import CalendarView from "@/components/CalendarView";
export default {
  name: "Calandar",
  data() {
    return {
      showDate: new Date(),
    };
  },
  components: {
    CalendarView,
  },
  props: {
    meetingLists: {
      type: Array,
      reuqire: false,
    },
  },
  methods: {
    // 設定顯示日期
    setShowDate(d) {
      this.showDate = d;
    },
    // 點擊事件
    onClickEvent(item) {
      this.$emit("clickEvent", item);
    },
  },
  updated() {
    // console.log('Calandar updated!!!');
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
