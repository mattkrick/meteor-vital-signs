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
Meteor.setInterval(function() {
  Points.insert({
    time: new Date(),
    y:Math.floor(Math.random() * 60)+40
  });
},1000);

Meteor.methods({
  'startNet': function (port) {
    var net = Meteor.npmRequire('net');
    net.createServer(function (socket) {
      console.log("connected");

      socket.on('data', function (data) {
        console.log(data.toString());
      });
    }).listen(8124);
  }
});
