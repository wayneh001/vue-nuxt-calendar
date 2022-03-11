<template>
  <div id="app">
    <CalendarView
      :events="meetings"
      :show-date="showDate"
      @show-date-change="setShowDate"
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
      meetings: this.meetingLists ? [...this.meetingLists] : [],
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
    setShowDate(d) {
      this.showDate = d;
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
