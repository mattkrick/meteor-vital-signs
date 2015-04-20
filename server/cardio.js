Meteor.setInterval(function() {
    Points.insert({
        date: new Date(),
        value:Math.floor(Math.random() * 60)+40
    });
},1000);
