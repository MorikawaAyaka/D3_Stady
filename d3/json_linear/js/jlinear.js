//var color = "blue";
var height = 200;

var svg = d3.select("#result").append("svg")
    .attr('width', 200)
    .attr('height', 200);
/*
//横方向の棒グラフ
    xScale = d3.scale.linear().domain([0,100]).range([0,200]);
    yScale = d3.scale.linear().domain([0,5]).range([0,100]);
*/
//縦方向の棒グラフ
//rangeの数字を変えるとグラフの幅が変わる
yScale = d3.scale.linear().domain([100,0]).range([200,0]);
xScale = d3.scale.linear().domain([0,5]).range([0,120]);

d3.json("./jlinear.json", function(error, data) {
  /*
  //横方向の棒グラフ
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', 0)
        .attr('y', function(d,i) { return yScale(i);})
        .attr('height', 18)
        .attr('width', function(d){ return xScale(d.value);})
        .attr('fill', 'blue');
*/
//縦方向の棒グラフ
//上方向から下方向へ
svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x",function(d,i){ return xScale(i);})
.attr("y",0)
.attr("height",function(d){ return yScale(d.value);})
.attr("width",18)
.attr('fill', 'red');
});
