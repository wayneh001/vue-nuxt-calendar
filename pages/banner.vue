<template>
  <div class="vw-100 vh-100">
    <client-only>
      <carousel items="1" nav="false" dots="false">
        <CPlate :meeting="current" />
        <CPlate :meeting="upcoming" />
        <CDisplayTable :meetings="todayMeetings" />
      </carousel>
    </client-only>
  </div>
</template>
<script>
import meetingData from "@/contents/json/data.json";
import CPlate from "@/components/CPlate";
import CDisplayTable from "@/components/CDisplayTable";
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  asyncData({ params }) {
    return { meetingData };
  },
  data() {
    return {
      todayMeetings: [],
      current: {
        label: "目前會議",
        type: "current",
        status: false,
        data: {},
      },
      upcoming: {
        label: "下一會議",
        type: "upcoming",
        status: false,
        data: {},
      },
    };
  },
  mixins: [GeneralMathMixin],
  components: {
    CPlate,
    CDisplayTable,
  },
  layout: "layoutBanner",
  methods: {
    getTodayList(data) {
      let str = this.getDateStr(this.today());
      let list = [];
      data.forEach(function (item) {
        if (item.startDate === str) {
          list.push(item);
        }
      });
      if (list.length !== 0) {
        this.todayMeetings = [...list];
        this.sortList(this.today(), this.todayMeetings);
      }
    },
    sortList(time, list) {
      let finished = [];
      let current = {};
      let remain = [];
      list.forEach(function (item) {
        let sh = parseInt(item.startTime.substr(0, 2));
        let sm = parseInt(item.startTime.substr(3, 2));
        let eh = parseInt(item.endTime.substr(0, 2));
        let em = parseInt(item.endTime.substr(3, 2));
        if (
          time.getHours() > eh ||
          (time.getHours() === eh && time.getMinutes() > em)
        ) {
          finished.push(item);
        } else if (
          time.getHours() < sh ||
          (time.getHours() === sh && time.getMinutes() < sm)
        ) {
          remain.push(item);
        } else {
          current = { ...item };
        }
      });
      console.log(finished, current, remain);
      this.displayData(current, remain);
    },
    displayData(c, r) {
      if (Object.entries(c).length !== 0) {
        this.current.status = true;
        this.current.data = { ...c };
      }
      if (r.length !== 0) {
        this.upcoming.status = true;
        this.upcoming.data = { ...r[0] };
      }
      console.log(this.current.data, this.upcoming.data);
    },
  },
  // watch: {
  //   current: function (newValue) {
  //     this.getNext(newValue);
  //   },
  // },
  mounted() {
    this.getTodayList(this.meetingData);
  },
};
</script>
<style>
.owl-carousel .owl-nav,
.owl-carousel .owl-dots {
  display: none;
}
</style>
