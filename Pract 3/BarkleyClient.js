const BarkleyServer = require("./BarkleyServer");
const randomIntFromInterval = require("./Library/RandomNumber");
const TIME_ZONE_HOUR = 5,
  TIME_ZONE_MINUTE = 30;

let allTime = [];

class BarkleyClient {
  constructor() {
    let hour = randomIntFromInterval(0, 23);
    let minute = randomIntFromInterval(0, 59);
    this.time = new Date(
      1999,
      11,
      30,
      hour ,
      minute 
    );
    // new Date();
    console.log('client time ', this.time);
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
console.log("avarageTime ", averageTime);

allTime = server.addTime(allTime, averageTime);

console.log(allTime);


