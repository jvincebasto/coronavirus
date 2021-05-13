<script>
export default {
  methods: {
    date() {
      const newDate = new Date();
      const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const dayArr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      const year = newDate.getFullYear();
      const month = monthArr[newDate.getMonth()];
      const date = newDate.getDate();
      const day = dayArr[newDate.getDay()];

      return {
        year,
        month,
        date,
        day
      };
    },
    numberFormat(num) {
      let newNum = "";
      const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const numFormat = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09"
      ];

      for (let cur of numArr) {
        if (num === cur) {
          newNum = numFormat[cur];
          break;
        } else {
          newNum = num;
        }
      }
      return newNum;
    },
    time() {
      let daytime = "";
      const newDate = new Date();
      const hourFormat = [
        12,
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        10,
        11,
        12,
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        10,
        11
      ];

      const hour = hourFormat[newDate.getHours()];
      const minute = this.numberFormat(newDate.getMinutes());
      const second = this.numberFormat(newDate.getSeconds());

      if (newDate.getHours() < 12) {
        daytime = "AM";
      } else {
        daytime = "PM";
      }

      return {
        hour,
        minute,
        second,
        daytime
      };
    },
    stringDates() {
      const dateObj = this.date();
      const timeObj = this.time();

      const dateString = `${dateObj.month} ${dateObj.date}, ${dateObj.year}`;
      const timeString = `${dateObj.day}, ${timeObj.hour}:${timeObj.minute}:${timeObj.second} ${timeObj.daytime} `;

      return {
        dateString,
        timeString
      };
    },
    clock(date, time) {
      let strDateObj = this.stringDates();

      date.innerHTML = strDateObj.dateString;
      time.innerHTML = strDateObj.timeString;

      // console.log(strDateObj.dateString,strDateObj.timeString);
    },
    startClock(date, time) {
      const newClock = this.clock;

      newClock(date, time);
      setInterval(function() {
        newClock(date, time);
      }, 1000);
    }
  }
};
</script>
