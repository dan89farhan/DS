const BarkleyServer = require("./BarkleyServer");
const randomIntFromInterval = require("./Library/RandomNumber");
const TIME_ZONE_HOUR = 5,
  TIME_ZONE_MINUTE = 30;

const allTime = [];

class BarkleyClient {
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
    // new Date();
    console.log(this.time);
  }

  getTime() {
    return this.time;
  }
}

const clients = [new BarkleyClient(), new BarkleyClient(), new BarkleyClient()];

const server = new BarkleyServer();
let index = 0;
for (; index < clients.length; index++) {
  allTime.push(clients[index].getTime());
}
allTime.push(server.getTime());
const averageTime = server.getAverageTime(allTime);
// console.log("avarageTime ", averageTime);
// for (index = 0; index < allTime.length; index++) {
//     let timeDifference = server.difference(averageTime, allTime[index])
//     console.log('timeDifference ', index, timeDifference);

// }
