//var RealTimeData = function(layers) {
//  this.layers = layers;
//  this.timestamp = ((new Date()).getTime() / 1000)|0;
//};
//
//RealTimeData.prototype.rand = function() {
//  return parseInt(Math.random() * 100) + 50;
//};
//
//RealTimeData.prototype.history = function(entries) {
//  if (typeof(entries) != 'number' || !entries) {
//    entries = 60;
//  }
//
//  var history = [];
//  for (var k = 0; k < this.layers; k++) {
//    history.push({ values: [] });
//  }
//
//  for (var i = 0; i < entries; i++) {
//    for (var j = 0; j < this.layers; j++) {
//      history[j].values.push({time: this.timestamp, y: this.rand()});
//    }
//    this.timestamp++;
//  }
//
//  return history;
//};
//
//RealTimeData.prototype.next = function() {
//  var entry = [];
//  for (var i = 0; i < this.layers; i++) {
//    entry.push({ time: this.timestamp, y: this.rand() });
//  }
//  this.timestamp++;
//  return entry;
//};
//
////window.RealTimeData = RealTimeData;
//
//meteor
//Meteor.setInterval(function() {
//  Points.insert({
//    time: new Date(),
//    y:Math.floor(Math.random() * 60)+40
//  });
//},1000);

Meteor.methods({
  'startNet': function (port) {
    var net = Meteor.npmRequire('net');
    net.createServer(function (socket) {
      console.log("connected");

      socket.on('data', function (data) {
        var myData = getValues(data);
        console.log(myData);
      });
    }).listen(8124);
  }
});

function getValues(data){
  var myData={
    temperature: 0,
    pressure: 0,
    flowRate: 0,
    etCO2: 0,
    inspiredCO2: 0,
    breathePerMinute: 0,
    reserved: 0,
    CO2curve: []
  };
  var temp=0;
  for(var index=0; index<data.length; index++){
    if((data[index]&0x80)==128){
      temp=(data[index+1]&0x7F)+((data[index]&0x03)<<8)+((data[index]&0x04)<<7);

      switch((data[index]&0x78)>>3){
        case 1:
          myData.temperature=temp;
          break;
        case 2:
          myData.pressure=temp;
          break;
        case 12:
          myData.flowRate=temp;
          break;
        case 0:
          myData.etCO2=temp;
          break;
        case 13:
          myData.inspiredCO2=temp;
          break;
        case 6:
          myData.breathePerMinute=temp;
          break;
        case 9:
          myData.reserved=temp;
          break;
        case 5:
          myData.CO2curve.push(temp);
          break;
      }
    }
  }
  return myData;
}
