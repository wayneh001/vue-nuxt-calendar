export default {
  methods: {
    // 返回今日
    today() {
      let now = new Date("2022-03-24 11:00:00");
      return now;
    },
    // 將字串日期格式化為物件日期
    formatDate(str) {
      let date = new Date(str);
      return date;
    },
    // 將物件日期格式化為字串日期
    getDateStr(date) {
      let sy = date.getFullYear().toString();
      let sm = date.getMonth() + 1;
      let sd = date.getDate();
      sm = sm < 10 ? `0${sm}` : sm.toString();
      sd = sd < 10 ? `0${sd}` : sd.toString();
      let str = `${sy}-${sm}-${sd}`;
      return str;
    },
    // 將物件時間格式化為字串時間
    getTimeStr(time) {
      let sh = time.getHours();
      let sm = time.getMinute();
      sh = sm < 10 ? `0${sm}` : sh.toString();
      sm = sd < 10 ? `0${sd}` : sm.toString();
      let str = `${sh}:${sm}`;
      return str;
    },
    // 將字串時間格式化為數字
    numberized(item, s, l) {
      return parseInt(item.substr(s, l));
    },
    // 會議先依據日期再依據開始排序
    meetingsSort(item) {
      item.sort(function (a, b) {
        let asd = a.startDate;
        let bsd = b.startDate;
        if (asd == bsd) {
          return a.startTime > b.startTime ? 1 : -1;
        } else {
          return a.startDate > b.startDate ? 1 : -1;
        }
      });
    },
  },
};
