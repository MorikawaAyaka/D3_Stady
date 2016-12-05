var xMargin = 50;

var svg = d3.select("#result").append("svg")
    .attr('width', 300)
    .attr('height', 200);

d3.json("./jlinear.json", function(error, data) {

    //縦の棒グラフ
    scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {
            return d.value
        })])
        .range([200, 0]);

    //縦方向の棒グラフ
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * 30 + xMargin;
        })
        .attr("y", function(d) {
            return scale(d.value)
        })
        .attr("height", function(d) {
            return 200 - scale(d.value);
        })
        .attr("width", 20)
        .attr('fill', 'red');

    /*
    //横の棒グラフ
    scale = d3.scale.linear()
        .domain([0,d3.max(data,function(d){ return d.value})])
        .range([0,200]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr('x', 0)
            .attr('y', function(d,i) { return i * 30})
            .attr('height', 20)
            .attr('width', function(d){ return scale(d.value);})
            .attr('fill', 'blue');
            */

});
