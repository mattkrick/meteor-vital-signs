//Template.cardioGraph.onRendered(function () {
//  //console.log('rendered');
//  //this.autorun(function (comp) {
//  //  if (!Cardio.find().count()) return;
//  //myChart.push([{time: 5, y:5}]);
//  //comp.stop();
//  //});
//  //var colCount = Cardio.find({},{reactive: false}).count();
//  function makeFakeData() {
//    var tmpArr = new Array(50);
//    for (var i = 0; i < 50; i++) {
//      tmpArr[i] = i;
//    }
//    return {
//      CO2curve: tmpArr,
//      time: new Date()
//    };
//  }
//
//  var first = true;
//  Cardio.find({}, {fields: {CO2curve: 1, time: 1}}).observeChanges({
//    added: function (id, fields) {
//      //preallocate reasoning: https://gamealchemist.wordpress.com/2013/05/01/lets-get-those-javascript-arrays-to-work-fast/
//      var unpackedArr = new Array(50);
//      //console.log(fields);
//      var startTime = fields.time - 2040;
//      for (var i = 0; i < 50; i++) {
//        unpackedArr[i] = {
//          time: startTime += 40,
//          y: fields.CO2curve[i]
//        };
//      }
//      //console.log(unpackedArr);
//      if (first) {
//        var lineChartData = [
//          {
//            label: "Cardiografo",
//            values: unpackedArr
//          }];
//        myChart = $('#myChart').epoch(
//          {
//            type: 'time.line',
//            data: lineChartData,
//            axes: ['left', 'bottom', 'right'],
//            windowSize: 100,
//            ticks: {time: 10, right: 5, left: 5},
//            queueSize: 50,
//            historySize: 50,
//            tickFormats: {
//              bottom: function (d) {
//                //window.d = d;
//                //console.log('just postd: ', d);
//                return new Date(d).getSeconds();
//              }
//            }
//          });
//        first = false;
//      } else {
//        console.log(unpackedArr);
//        for (i = 0; i < 50; i++) {
//          //setTimeout(function () {
//          //  function blah(i) {
//          //    return function () {
//                myChart.push([unpackedArr[i]]);
//              //}
//            //}
//          //}, 40)
//        }
//        console.log(myChart);
//      }
//    }
//  })
//});
//
//

//Template.vitalSigns.onRendered(function () {
//  var n = 160,
//    duration = 40,
//    now = new Date(Date.now() - duration),
//    count = 0,
//    data = d3.range(n).map(function () {
//      return 0;
//    });
//
//  var margin = {top: 6, right: 0, bottom: 20, left: 40},
//    width = 800,
//    height = 200;
//
//  var x = d3.time.scale()
//    .domain([now - (n - 2) * duration, now - duration])
//    .range([0, width]);
//
//  var y = d3.scale.linear()
//    .range([height, 0]);
//
//  var line = d3.svg.line()
//    .interpolate("basis")
//    .x(function (d, i) {
//      return x(now - (n - 1 - i) * duration);
//    })
//    .y(function (d, i) {
//      return y(d);
//    });
//
//  var svg = d3.select("#myChart").append("p").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .style("margin-left", -margin.left + "px")
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//  svg.append("defs").append("clipPath")
//    .attr("id", "clip")
//    .append("rect")
//    .attr("width", width)
//    .attr("height", height);
//
//  var axis = svg.append("g")
//    .attr("class", "x axis")
//    .attr("transform", "translate(0," + height + ")")
//    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));
//
//  var path = svg.append("g")
//    .attr("clip-path", "url(#clip)")
//    .append("path")
//    .datum(data)
//    .attr("class", "line");
//
//  //var transition = d3.select({}).transition()
//  //  .duration(duration)
//  //  .ease("linear");
//
//  Cardio.find({}, {fields: {CO2curve: 1, time: 1}}).observeChanges({
//    added: function (id, fields) {
//      //preallocate reasoning: https://gamealchemist.wordpress.com/2013/05/01/lets-get-those-javascript-arrays-to-work-fast/
//      var i = 0;
//      function tick() {
//        if (i > fields.CO2curve.length) return;
//        console.log(i);
//        now = new Date();
//        data.push(fields.CO2curve[i++]);
//        x.domain([now - (n - 2) * duration, now - duration]);
//        y.domain([0, d3.max(data)]);
//
//        axis.transition()
//          .duration(duration)
//          .ease('linear')
//          .call(x.axis)
//
//        // redraw the line
//        svg.select(".line")
//          .attr('transform', null)
//          //.attr("d", line) //?
//          .transition()
//          .duration(duration)
//          .ease('linear')
//          .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
//          .each('end', tick)
//        // pop the old data point off the front
//        data.shift();
//      }
//      tick();
//    }
//  });
//})
//;
//
//
