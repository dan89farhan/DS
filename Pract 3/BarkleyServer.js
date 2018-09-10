const randomIntFromInterval = require("./Library/RandomNumber");
const TIME_ZONE_HOUR = 5,
  TIME_ZONE_MINUTE = 30;
class BarkleyServer {
  constructor() {
    let hour = randomIntFromInterval(0, 23);
    let minute = randomIntFromInterval(0, 59);
    this.time = new Date(
      1999,
      11,
      30,
      hour + TIME_ZONE_HOUR,
      minute + TIME_ZONE_MINUTE
    );
    this.threshold = new Date(
      1999,
      11,
      30,
      21 + TIME_ZONE_HOUR,
      0 + TIME_ZONE_MINUTE
    );
  }

  getTime() {
    return this.time;
  }
  msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    return { hours, minutes, seconds, milliseconds };
  }

  getAverageTime(allTime = []) {
    let length = allTime.length;
    let totalHours = 0,
      totalMinutes = 0;
    for (let index = 0; index < allTime.length; index++) {
      let time = this.msToTime(allTime[index] - allTime[length - 1]);
      const { hours } = time;
      // console.log(time, hours);
      hours = Math.abs(hours);

      if (this.threshold.getHours() - hours >= 0) {
        totalHours = totalHours + allTime[index].getHours();
        totalMinutes += allTime[index].getMinutes();
        allTime.push;
      } else {
        length--;
      }
      // {

      //   console.log("difference ", allTime[index] - allTime[length - 1]);
      // }
    }
    return this.msToTime(allTime[0] - allTime[1]);
  }
}

module.exports = BarkleyServer;
