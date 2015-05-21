Template.lineChart.onRendered(function () {
  //this.autorun(function (comp) {
  //  if (!Points.find().count()) return;
  //myChart.push([{time: 5, y:5}]);
  //comp.stop();
  //});
  //var colCount = Points.find({},{reactive: false}).count();
  var first = true;
  Points.find().observeChanges({
    added: function (id, fields) {
      console.log('just added: ',fields.time);
      if (first) {
        var lineChartData = [
          {
            label: "Series 1",
            values: [fields]
          }];
        myChart = $('#myChart').epoch(
          {
            type: 'time.line',
            data: lineChartData,
            axes: ['left', 'bottom', 'right'],
            windowSize: 10,
            ticks: {time: 1, right: 5, left: 5},
            queueSize: 1,
            tickFormats: {
              bottom: function (d) {
                console.log('just postd: ', d);
                return d.getSeconds();
              }
            }
          });
        first = false;
      } else {
        myChart.push([fields]);
      }
    }
  })
});

