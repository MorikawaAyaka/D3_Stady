var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 300;
var height = 200; 
var bwidth = 30;　//棒グラフの幅

var svg = d3.select("#result").append("svg")　//div内にsvg要素を追加
    .attr('width', 360)
    .attr('height', 250);
    
//jsonデータの読み込み
d3.json("./jlinear.json", function(error, data) {
	
		var x = d3.scale.ordinal()
        .domain(data.map(function (d) { 
	          return d.name; }))
        .rangeRoundPoints([0, width], 1);

    var y = d3.scale.linear() //linear = 線形
        .domain([0, d3.max(data, function(d) {　//入力データの範囲をデータの最大値を利用
            return d.value;                      //表示上のサイズ
        })])
        .range([height, 0]);                       //実際の出力サイズ

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
            
    //x軸の表示        
    var xAxis = d3.svg.axis()
    		.scale(x)
        .orient('bottom');
        
    //y軸の表示
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left'); //目盛をグラフのどこに表示するか

    svg.append('g')
        .attr({
	        class: 'x axis',
          transform: "translate("+ margin.left + "," + height + ")"  //目盛がきれないようにmargin.leftずらしている
          })
        .call(xAxis);
			
    svg.append("g")
        .attr({
           class: "y axis",
           transform: "translate(" + margin.left + ",0)" //transform内の値を変更することで
        })                                        　　　　//目盛の位置を変更できる
        .call(yAxis);
        
    //縦方向の棒グラフ
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect") //rect要素の追加
        .attr("x", function(d) {
            return x(d.name) + margin.left - bwidth/2;　//棒の位置を決める(margin.left-bwidth/2で調整)
        })																							//軸をmargin.left分だけずらしているため
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("height", function(d) {
            return height - y(d.value);　	
        })
        .attr("width", bwidth)
        .attr('fill', 'red');



});
