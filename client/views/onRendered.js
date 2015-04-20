Template.lineChart.onRendered(function() {
    //Width and height
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.value);
        });

    var svg = d3.select("#lineChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Latidos por minuto");

    Tracker.autorun(function () {
        var dataset = Points.find({}, {sort: {date: -1}, limit: 20}).fetch();

        var paths = svg.selectAll("path.line")
            .data([dataset]);

        x.domain(d3.extent(dataset, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(dataset, function (d) {
            return d.value;
        }));

        //Update X axis
        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        //Update Y axis
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);

        paths
            .enter()
            .append("path")
            .attr("class", "line")
            .attr('d', line);

        paths
            .attr('d', line);

        paths
            .exit()
            .remove();
    });
});
