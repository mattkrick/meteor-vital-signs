//Meteor.setInterval(function() {
//  Cardio.insert({
//    time: new Date(),
//    y:Math.floor(Math.random() * 60)+40
//  });
//},1000);

//Meteor.methods({
//  'startNet': function (port) {
//    var net = Meteor.npmRequire('net');
//    net.createServer(function (socket) {
//      console.log("connected");
//
//      socket.on('data', function (data) {
//        var myData = getValues(data);
//        console.log(myData);
//      });
//    }).listen(port);
//  }
//});
