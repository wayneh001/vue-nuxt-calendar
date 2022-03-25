export default {
  methods: {
    today() {
      let now = new Date("2022-03-24 11:00:00");
      return now;
    },
    getDateStr(date) {
      let sy = date.getFullYear().toString();
      let sm = date.getMonth() + 1;
      let sd = date.getDate();
      sm = sm < 10 ? `0${sm}` : sm.toString();
      sd = sd < 10 ? `0${sd}` : sd.toString();
      let str = `${sy}-${sm}-${sd}`;
      return str;
    },
    getTimeStr(time) {
      let sh = time.getHours()
      let sm = time.getMinute()
      sh = sm < 10 ? `0${sm}` : sh.toString();
      sm = sd < 10 ? `0${sd}` : sm.toString();
      let str = `${sh}:${sm}`;
      return str;
    },
    numberized(item, s, l) {
      return parseInt(item.substr(s, l));
    },
  },
};
