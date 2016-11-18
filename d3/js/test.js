d3.csv("./list.csv", function(error, data) {
  var dataSet = [];

  for (var i = 0; i < data.length; i++) {

    dataSet.push(data[i].value);

  }
    var w = 500;
    var h = 200;
    var padding = 20;

    var xScale = d3.scale.linear()
    .domain([0,50])
    .range([padding,w - padding])
    .nice();

    var svg = d3.select("body").append("svg").attr({
        width: w,
        height: h
    });

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top");

    svg.append("g")
    .attr({
      class: "axis",
      transform: "translate(0,180)"
    })
    .call(xAxis);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
      x: padding,
      y: function(d,i) {return i *25; },
      width: function(d) {return xScale(d) - padding; },
      height: 20,
      fill: "red"
    });
  });
