<template>
  <div class="vw-100 vh-100">
    <client-only>
      <carousel items="1" nav="false" dots="false">
        <CPlate :meeting="current" />
        <CPlate :meeting="next" />
        <CDisplayTable :meetings="todayMeetings" />
      </carousel>
    </client-only>
  </div>
</template>
<script>
import data from "@/contents/json/data.json";
import CPlate from "@/components/CPlate";
import CDisplayTable from "@/components/CDisplayTable";
export default {
  asyncData({ params }) {
    return { data };
  },
  components: {
    CPlate,
    CDisplayTable,
  },
  layout: "layoutBanner",
  data() {
    return {
      current: {},
      next: {},
      todayMeetings: [],
    };
  },
  methods: {
    getTodayList() {
      let today = new Date();
      let sy = today.getFullYear().toString();
      let sm = today.getMonth() + 1;
      let sd = today.getDate();
      sm = sm < 10 ? `0${sm}` : sm.toString();
      sd = sd < 10 ? `0${sd}` : sd.toString();
      let str = `${sy}-${sm}-${sd}`;
      this.data.forEach(function (item) {
        if (item.startDate === str) {
            this.todayMeetings.push(item);
        }
      });
    },
  },
  computed: {
    now() {
      let now = new Date();
    },
  },
  watch: {},
  mounted() {
    this.today = this.data;
  },
};
</script>
<style>
.owl-carousel .owl-nav,
.owl-carousel .owl-dots {
  display: none;
}
</style>
