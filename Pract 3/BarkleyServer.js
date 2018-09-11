const randomIntFromInterval = require("./Library/RandomNumber");
const TIME_ZONE_HOUR = 5,
  TIME_ZONE_MINUTE = 30;
class BarkleyServer {
  constructor() {
    let hour = randomIntFromInterval(0, 23);
    let minute = randomIntFromInterval(0, 59);
    // console.log('server hour and minute ',hour, minute)
    this.time = new Date(
      1999,
      11,
      30,
      hour ,
      minute
    );
    this.threshold = new Date(
      1999,
      11,
      30,
      21,
      0 
    );
    console.log("Server time ", this.time);
    
  }

  getTime() {
    return this.time;
  }
  msToTime(duration) {
    // console.log('duration ',duration);
    
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
      let time = this.msToTime(Math.abs(allTime[index] - allTime[length - 1]));
      let { hours } = time;
      
      hours = Math.abs(parseInt(hours));

      console.log(time, hours);
      if (this.threshold.getHours() - hours >= 0) {
        totalHours += allTime[index].getHours();
        totalMinutes += allTime[index].getMinutes();
        // console.log(totalHours, totalMinutes);
        
      } else {
        length--;
      }
      // {

      //   console.log("difference ", allTime[index] - allTime[length - 1]);
      // }
    }
    // console.log('actual ', totalHours, totalMinutes);
    
    totalHours = totalHours/length;
    totalMinutes = totalMinutes/length;
    // console.log('average ', totalHours, totalMinutes);

    // return this.msToTime(allTime[0] - allTime[1]);
    return new Date(
      1999,
      11,
      30,
      totalHours ,
      totalMinutes
    );
  }

  addTime(allTime = [], averageTime){
    let averageHour = averageTime.getHours();
      let averageMinute = averageTime.getMinutes();
      
    for (let index = 0; index < allTime.length; index++) {
      let hour = allTime[index].getHours();
      let minute = allTime[index].getMinutes();
      allTime[index] = new Date(
        1999,
        11,
        30,
        hour+averageHour,
        minute+averageMinute
      );
    }

    return allTime;

  }
}

module.exports = BarkleyServer;
