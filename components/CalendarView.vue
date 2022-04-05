<template>
  <div
    :class="[
      'cv-wrapper',
      'locale-' + languageCode(displayLocale),
      'locale-' + displayLocale,
      'y' + periodStart.getFullYear(),
      'm' + paddedMonth(periodStart),
      'periodCount-' + displayPeriodCount,
      {
        past: isPastMonth(periodStart),
        future: isFutureMonth(periodStart),
        noIntl: !supportsIntl,
      },
    ]"
  >
    <slot :header-props="headerProps" name="header">
      <calendar-view-header
        :header-props="headerProps"
        @input="onChangeDate"
        @switch="onChangePeriod"
        @search="onSearch"
      >
        <!-- <template slot="label">{{ periodLabel }}</template> -->
      </calendar-view-header>
    </slot>
    <div class="cv-header-days">
      <template v-for="(label, index) in weekdayNames">
        <slot :index="`${index}-dow`" :label="label" name="dayHeader">
          <div
            :key="`${index}-dow`"
            :class="'dow' + index"
            class="cv-header-day"
          >
            {{ label }}
          </div>
        </slot>
      </template>
    </div>
    <div id="weeks" class="cv-weeks">
      <div
        v-for="(weekStart, weekIndex) in weeksOfPeriod"
        :key="`${weekIndex}-week`"
        :class="[
          'cv-week',
          'week' + (weekIndex + 1),
          'ws' + isoYearMonthDay(weekStart),
        ]"
      >
        <div class="cv-weekdays">
          <div
            v-for="(day, dayIndex) in daysOfWeek(weekStart)"
            :key="`${dayIndex}-day`"
            :class="[
              'cv-day',
              'dow' + day.getDay(),
              'd' + isoYearMonthDay(day),
              'd' + isoMonthDay(day),
              'd' + paddedDay(day),
              'instance' + instanceOfMonth(day),
              {
                outsideOfMonth: !isSameMonth(day, defaultedShowDate),
                today: isSameDate(day, today()),
                past: isInPast(day),
                future: isInFuture(day),
                last: isLastDayOfMonth(day),
                lastInstance: isLastInstanceOfMonth(day),
              },
              ...((dateClasses && dateClasses[isoYearMonthDay(day)]) || null),
            ]"
            @click="onClickDay(day)"
          >
            <div class="cv-day-number">{{ day.getDate() }}</div>
            <slot :day="day" name="dayContent" />
          </div>
        </div>
        <template v-for="e in getWeekEvents(weekStart)">
          <slot :event="e" :weekStartDate="weekStart" name="event">
            <div
              :key="e.id"
              :class="e.classes"
              :title="e.title"
              :style="{
                top: getEventTop(e),
                height: getEventHeight(e),
                opacity: filterEvents(e),
              }"
              class="cv-event"
              @dragstart="onDragStart(e, $event)"
              @click.prevent="onClickEvent(e.originalEvent)"
              v-html="getEventTitle(e)"
            />
          </slot>
        </template>
      </div>
      <div class="cv-time" v-show="displayPeriodUom === 'week'">
        <div
          class="cv-time-block ps-1 d-flex align-items-end"
          v-for="n in 10"
          :key="n"
          :style="{ height: cell + 'px' }"
        >
          <div>{{ n + 7 }}:00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarMathMixin from "@/components/Methods/CalendarMathMixin";
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
import CalendarViewHeader from "@/components/CalendarViewHeader";
export default {
  name: "CalendarView",
  data() {
    return {
      displayPeriodUom: "month",
      displayPeriodCount: 1,
      monthNameFormat: "short",
      weekdayNameFormat: "short",
      showEventTimes: false,
      disablePast: false,
      disableFuture: false,
      startingDayOfWeek: 1,
      dateClasses: {},
      cell: 0,
      eventTop: "1.4em",
      eventContentHeight: "1.4em",
      eventBorderHeight: "2px",
      searchObj: {
        keywords: "",
        searchStart: "",
        searchEnd: "",
      },
    };
  },
  components: { CalendarViewHeader },
  mixins: [CalendarMathMixin, GeneralMathMixin],
  props: {
    showDate: { type: Date, default: () => undefined },
    locale: { type: String, default: () => undefined },
    events: [],
  },
  computed: {
    /*
		Props cannot default to computed/method returns, so create defaulted version of this
		property and use it rather than the bare prop (Vue Issue #6013).
		*/
    //語言在地化
    displayLocale() {
      return this.locale || this.getDefaultBrowserLocale();
    },

    /*
		ShowDate, but defaulted to today. Needed both for periodStart below and for the
		"outside of month" class.
		*/
    // 預設展示時間
    defaultedShowDate() {
      return this.showDate || this.today();
    },

    /*
		Given the showDate, defaulted to today, computes the beginning and end of the period
		that the date falls within.
		*/
    // 計算畫面時間起始點
    periodStart() {
      return this.beginningOfPeriod(
        this.defaultedShowDate,
        this.displayPeriodUom,
        this.startingDayOfWeek
      );
    },
    // 計算畫面時間結束點
    periodEnd() {
      return this.addDays(
        this.incrementPeriod(
          this.periodStart,
          this.displayPeriodUom,
          this.displayPeriodCount
        ),
        -1
      );
    },

    /*
		For month and year views, the first and last dates displayed in the grid may not
		be the same as the intended period, since the period may not start and stop evenly
		on the starting day of the week.
		*/
    // 展示畫面起始日
    displayFirstDate() {
      return this.beginningOfWeek(this.periodStart, this.startingDayOfWeek);
    },
    // 展示畫面結束數
    displayLastDate() {
      return this.endOfWeek(this.periodEnd, this.startingDayOfWeek);
    },

    /*
		Create an array of dates, where each date represents the beginning of a week that
		should be rendered in the view for the current period.
		*/
    // 計算週別數陣列數
    weeksOfPeriod() {
      // Returns an array of object representing the date of the beginning of each week
      // included in the view.
      const numWeeks = Math.floor(
        (this.dayDiff(this.displayFirstDate, this.displayLastDate) + 1) / 7
      );
      return Array(numWeeks)
        .fill()
        .map((_, i) => this.addDays(this.displayFirstDate, i * 7));
    },

    // Cache the names based on current locale and format settings
    // 展示月標籤名稱
    monthNames() {
      return this.getFormattedMonthNames(
        this.displayLocale,
        this.monthNameFormat
      );
    },
    // 展示週標籤名稱
    weekdayNames() {
      return this.getFormattedWeekdayNames(
        this.displayLocale,
        this.weekdayNameFormat,
        this.startingDayOfWeek
      );
    },

    // Ensure all event properties have suitable default
    // 格式化會議事件
    fixedEvents() {
      // console.log(this.events);
      return this.events.map(this.normalizeEvent);
    },

    // Creates the HTML to render the date range for the calendar header.
    // 計算週期標籤
    periodLabel() {
      return this.formattedPeriod(
        this.periodStart,
        this.periodEnd,
        this.displayPeriodUom,
        this.monthNames
      );
    },
    // 傳入 Headr 組件之數據
    headerProps() {
      return {
        // Dates for UI navigation
        previousYear: this.getIncrementedPeriod(-12),
        previousPeriod: this.getIncrementedPeriod(-1),
        nextPeriod: this.getIncrementedPeriod(1),
        nextYear: this.getIncrementedPeriod(12),
        currentPeriod: this.beginningOfPeriod(
          this.today(),
          this.displayPeriodUom,
          this.startingDayOfWeek
        ),
        // Dates for header display
        periodStart: this.periodStart,
        periodEnd: this.periodEnd,
        periodLabel: this.periodLabel,
        // Extra information that could be useful to a custom header
        displayLocale: this.displayLocale,
        displayFirstDate: this.displayFirstDate,
        displayLastDate: this.displayLastDate,
        monthNames: this.monthNames,
        fixedEvents: this.fixedEvents,
      };
    },
  },

  methods: {
    // ******************************
    // UI Events
    // ******************************
    // 日期點擊事件
    onClickDay(day) {
      if (this.disablePast && this.isInPast(day)) return;
      if (this.disableFuture && this.isInFuture(day)) return;
      this.$emit("click-date", day);
    },
    // 會議點擊事件
    onClickEvent(item) {
      if (
        item.classes !== "disabled" &&
        item.title.includes(this.searchObj.keywords)
      ) {
        this.$emit("clickEvent", item);
      }
    },
    // 當前日期變更
    onChangeDate(d) {
      this.$emit("show-date-change", d);
    },
    // 當前週期變更
    onChangePeriod(p) {
      this.displayPeriodUom = p;
      this.onChangeDate();
    },

    // ******************************
    // Date Periods
    // ******************************

    /*
		Returns a date for the current display date moved forward or backward by a given
		number of the current display units. Returns null if said move would result in a
		disallowed display period.
		*/
    // 計算因 Header 日期前後跳動操作後的新開始日與結束日
    getIncrementedPeriod(count) {
      const newStartDate = this.incrementPeriod(
        this.periodStart,
        this.displayPeriodUom,
        count
      );
      const newEndDate = this.incrementPeriod(
        newStartDate,
        this.displayPeriodUom,
        this.displayPeriodCount
      );
      if (this.disablePast && newEndDate <= this.today()) return null;
      if (this.disableFuture && newStartDate > this.today()) return null;
      return newStartDate;
    },

    // ******************************
    // Calendar Events
    // ******************************
    // 篩選與排序當前應展示的會議事件
    findAndSortEventsInWeek(weekStart) {
      // Return a list of events that INCLUDE any day of a week starting on a
      // particular day. Sorted so the events that start earlier are always
      // shown first.
      const events = this.fixedEvents
        .filter(
          (event) =>
            event.startDate < this.addDays(weekStart, 7) &&
            event.endDate >= weekStart,
          this
        )
        .sort((a, b) => {
          if (a.startDate < b.startDate) return -1;
          if (b.startDate < a.startDate) return 1;
          if (a.startTime < b.startTime) return -1;
          if (a.startTime < b.startTime) return 1;
          return;
        });
      // console.log(events);
      return events;
    },
    // 儲存 Header 傳來的關鍵字與搜尋時間
    onSearch(searchObj) {
      this.searchObj = searchObj;
      this.$store.commit("onSearch", searchObj);
      // console.log(this.$store.getters.searchObj);
    },
    //展示會議事件
    getWeekEvents(weekStart) {
      // Return a list of events that CONTAIN the week starting on a day.
      // Sorted so the events that start earlier are always shown first.
      const events = this.findAndSortEventsInWeek(weekStart);
      const results = [];
      const eventRows = [[], [], [], [], [], [], []];
      for (let i = 0; i < events.length; i++) {
        const ep = Object.assign({}, events[i], {
          classes: [...events[i].classes],
          eventRow: 0,
        });
        const continued = ep.startDate < weekStart;
        const startOffset = continued
          ? 0
          : this.dayDiff(weekStart, ep.startDate);
        const span = Math.min(
          7 - startOffset,
          this.dayDiff(this.addDays(weekStart, startOffset), ep.endDate) + 1
        );
        if (continued) ep.classes.push("continued");
        if (this.dayDiff(weekStart, ep.endDate) > 6)
          ep.classes.push("toBeContinued");
        if (ep.originalEvent.url) ep.classes.push("hasUrl");
        for (let d = 0; d < 7; d++) {
          if (d === startOffset) {
            let s = 0;
            while (eventRows[d][s]) s++;
            ep.eventRow = s;
            eventRows[d][s] = true;
          } else if (d < startOffset + span) {
            eventRows[d][ep.eventRow] = true;
          }
        }
        ep.classes.push(`offset${startOffset}`);
        ep.classes.push(`span${span}`);
        results.push(ep);
      }
      return results;
    },

    /*
		Creates the HTML to prefix the event title showing the event's start and/or
		end time. Midnight is not displayed.
		*/
    // 格式化跨日期事件 ( 未使用 )
    getFormattedTimeRange(e) {
      const startTime = e.startTime;
      let endTime = e.endTime;
      return (
        (startTime !== ""
          ? `<span class="startTime">${startTime}</span>`
          : "") +
        (endTime !== "" ? `<span class="endTime">${endTime}</span>` : "")
      );
    },
    // 取得會議事件標題
    getEventTitle(e) {
      if (this.displayPeriodUom === "week") return e.title;
      return this.getFormattedTimeRange(e) + " " + e.title;
    },
    // 取得會議事件起始高度點
    getEventTop(e) {
      // Compute the top position of the event based on its assigned row within the given week.
      const r = e.eventRow;
      const h = this.eventContentHeight;
      const b = this.eventBorderHeight;
      return this.displayPeriodUom === "month"
        ? `calc(${this.eventTop} + ${r}*${h} + ${r}*${b})`
        : `calc(${this.cell}*${this.timeDiff("08:00", e.startTime)}px)`;
    },
    // 取得外框高度
    getClientHeight() {
      if (process.client) {
        this.cell = document.getElementById("weeks").clientHeight / 10;
        // console.log(this.cell);
      }
    },
    // 計算會議時間差，並依據單元 ( cell ) 計算實際高度
    timeDiff(t1, t2) {
      let start = t1.split(":");
      let end = t2.split(":");
      let startTime = new Date(0, 0, 0, start[0], start[1], 0);
      let endTime = new Date(0, 0, 0, end[0], end[1], 0);
      return (endTime - startTime) / (60 * 60 * 1000);
    },
    // 取得會議事件高度
    getEventHeight(e) {
      return this.displayPeriodUom === "month"
        ? "1.4em"
        : `calc(${this.cell}*${this.timeDiff(e.startTime, e.endTime)}px)`;
    },
    // 依據關鍵字隱藏無關會議事件
    filterEvents(e) {
      if (this.searchObj.keywords === "") {
        return "100%";
      } else {
        if (e.title.includes(this.searchObj.keywords)) {
          if (
            this.searchObj.searchStart <= this.getDateStr(e.startDate) &&
            this.getDateStr(e.startDate) <= this.searchObj.searchEnd
          ) {
            return "100%";
          } else {
            return "0";
          }
        } else {
          return "0";
        }
      }
    },
  },
  mounted() {
    this.getClientHeight();
  },
};
</script>
<!--

The CSS below represents only the CSS required for proper rendering (positioning, etc.) and
minimalist default borders and colors. Special-day colors, holiday emoji, event colors,
and decorations like border-radius should be part of a theme. Styles related to the default
header are in the CalendarViewHeader component.

-->
<style>
/* Position/Flex */

/* Make the calendar flex vertically */
.cv-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 90vh;
  min-height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}

.cv-wrapper,
.cv-wrapper div {
  box-sizing: border-box;
  line-height: 1em;
  font-size: 1em;
}

.cv-header-days {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  flex-flow: row nowrap;
  border-width: 0 0 0 1px;
  height: 3rem;
  background-color: #686ce5;
  color: #fff;
}

.cv-header-day {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-width: 1px 1px 0 0;
}

/* The calendar grid should take up the remaining vertical space */
.cv-weeks {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  flex-flow: column nowrap;
  border-width: 0 0 1px 1px;

  /* Allow grid to scroll if there are too may weeks to fit in the view */
  overflow-y: auto;
  -ms-overflow-style: none;
}

.outsideOfMonth {
  background-color: #f8f9fa;
}

/* Use flex basis of 0 on week row so all weeks will be same height regardless of content */
.cv-week {
  display: flex;
  /* Shorthand flex: 1 1 0 not supported by IE11 */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  flex-flow: row nowrap;
  min-height: 8rem;
  border-width: 0;

  /* Allow week events to scroll if they are too tall */
  position: relative;
  overflow-y: auto;
  -ms-overflow-style: none;
}

.cv-weekdays {
  display: flex;

  /* Shorthand flex: 1 1 0 not supported by IE11 */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  flex-flow: row nowrap;

  /* Days of the week go left to right even if user's language is RTL (#138) */
  direction: ltr;
  position: relative;
  overflow-y: auto;
}

.cv-day {
  display: flex;
  /* Shorthand flex: 1 1 0 not supported by IE11 */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  position: relative; /* Fallback for IE11, which doesn't support sticky */
  position: sticky; /* When week's events are scrolled, keep the day content fixed */
  top: 0;
  border-width: 1px 1px 0 0;
}

.cv-day-number {
  position: absolute;
  left: 0;
}

.cv-event {
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  background-color: #e1e3fb;
  border-width: 1px;
  cursor: pointer;
}

.cv-event:hover {
  background-color: #686ce5;
  color: #fff;
}

/* Colors */

.cv-header-days,
.cv-header-day,
.cv-weeks,
.cv-week,
.cv-day,
.cv-event {
  border-style: solid;
  border-color: #ddd;
}

/* Event Times */
.cv-event .endTime::before {
  content: "-";
}

/* Internal Metrics */
.cv-header-day,
.cv-day-number,
.cv-event {
  padding: 0.2em;
}

/* Allows emoji icons or labels (such as holidays) to be added more easily to specific dates by having the margin set already. */
.cv-day-number::before {
  margin-right: 0.5em;
}

.cv-event.offset0 {
  left: 0;
}

.cv-event.offset1 {
  left: calc((100% / 7));
}

.cv-event.offset2 {
  left: calc((200% / 7));
}

.cv-event.offset3 {
  left: calc((300% / 7));
}

.cv-event.offset4 {
  left: calc((400% / 7));
}

.cv-event.offset5 {
  left: calc((500% / 7));
}

.cv-event.offset6 {
  left: calc((600% / 7));
}

/* Metrics for events spanning dates */

.cv-event.span1 {
  width: calc((100% / 7) - 0.05em);
}

.cv-event.span2 {
  width: calc((200% / 7) - 0.05em);
}

.cv-event.span3 {
  width: calc((300% / 7) - 0.05em);
  text-align: center;
}

.cv-event.span4 {
  width: calc((400% / 7) - 0.05em);
  text-align: center;
}

.cv-event.span5 {
  width: calc((500% / 7) - 0.05em);
  text-align: center;
}

.cv-event.span6 {
  width: calc((600% / 7) - 0.05em);
  text-align: center;
}

.cv-event.span7 {
  width: calc((700% / 7) - 0.05em);
  text-align: center;
}

.cv-event.disabled {
  background-color: #ddd;
  color: #999;
  cursor: auto;
}

/* Hide scrollbars for the grid and the week */
.cv-weeks::-webkit-scrollbar,
.cv-week::-webkit-scrollbar {
  width: 0; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}

.cv-time {
  position: absolute;
  pointer-events: none;
  width: calc(100% * 9 / 12 - 3.5rem - 1px);
}

.cv-time-block {
  vertical-align: bottom;
  color: #000;
  border-bottom: 0.5px dashed #000;
  opacity: 50%;
}
</style>
