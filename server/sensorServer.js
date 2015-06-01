"use strict";

Meteor.startup(function () {
  startNetServer();
});

var startNetServer = function() {
  var net = Meteor.npmRequire('net');
  //var createServerSync = Meteor.wrapAsync(net.createServer, net);

  net.createServer(Meteor.bindEnvironment(function (socket) {
    console.log("connected");
    socket.on('data', Meteor.bindEnvironment( function (data) {
      //var myData = getValues(data);
      var myData = makeFakeData();
      Cardio.insert(myData);
      console.log(data.toString());
    }));
  })).listen(8124);
};

function getValues(data) {
  var myData = {
    time: new Date(),
    temperature: 0,
    pressure: 0,
    flowRate: 0,
    etCO2: 0,
    inspiredCO2: 0,
    breathePerMinute: 0,
    reserved: 0,
    CO2curve: [] //50 every 2 seconds
  };

  var dataPoint = 0;
  for (var index = 0; index < data.length; index++) {
    if ((data[index] & 0x80) == 128) {
      dataPoint = (data[index + 1] & 0x7F) + ((data[index] & 0x03) << 8) + ((data[index] & 0x04) << 7);

      switch ((data[index] & 0x78) >> 3) {
        case 1:
          myData.dataPointerature = dataPoint;
          break;
        case 2:
          myData.pressure = dataPoint;
          break;
        case 12:
          myData.flowRate = dataPoint;
          break;
        case 0:
          myData.etCO2 = dataPoint;
          break;
        case 13:
          myData.inspiredCO2 = dataPoint;
          break;
        case 6:
          myData.breathePerMinute = dataPoint;
          break;
        case 9:
          myData.reserved = dataPoint;
          break;
        case 5:
          myData.CO2curve.push(dataPoint);
          break;
      }
    }
  }
  return myData;
}

function makeFakeData() {
  var myData = {
    time: new Date(),
    temperature: 0,
    pressure: 0,
    flowRate: 0,
    etCO2: 0,
    inspiredCO2: 0,
    breathePerMinute: 0,
    reserved: 0,
    CO2curve: [] //50 every 2 seconds
  };
  for (var i = 0; i < 50; i++) {
    myData.CO2curve.push(Math.floor(Math.random() * 60 + 60));
  }
  return myData;
}
