var list = {	// 長野県塩尻市の世帯数(2010年)
	"name": "長野県",
	"children": [
		{
			"name": "塩尻市",
			"children": [
				{ "name": "大　門", "households": 4042 },
				{ "name": "塩尻東", "households": 2599 },
				{ "name": "片　丘", "households": 1257 },
				{ "name": "高　出", "households": 3081 },
				{ "name": "広　丘", "households": 5452 },
				{ "name": "吉　田", "households": 4081 },
				{ "name": "洗　馬", "households": 1590 },
				{ "name": "宗　賀", "households": 2022 },
				{ "name": "北小野", "households": 706 },
				{ "name": "楢　川", "households": 1016 }
			]
		}
	]
};
var svgWidth = 480;	// SVG領域の横幅
var svgHeight = 480;	// SVG領域の縦幅
var diameter = 420;	// 一番大きい円のサイズ
var color = ["none", "#ffa0a0", "#a0a0ff", "orange", "#ffe090", "#a0ff90", "cyan", "#ccc", "#ff8080", "#c0ffc0", "#4090ff"];
var svg = d3.select("#myGraph").append("svg")
	.attr("width", svgWidth).attr("height", svgHeight)
var bubble = d3.layout.pack()
	.size([diameter, diameter])	// 表示サイズを指定
var grp = svg.selectAll("g")	// グループを対象にする
	.data(bubble.nodes(classes(list)))	// データを読み込む
	.enter()
	.append("g")
	.attr("transform", function(d) { 	// 円のX,Y座標を設定
		return "translate(" + d.x + "," + d.y + ")";
	})
grp.append("circle")	// 円を生成する
	.attr("r", function(d){	// 円を指定した半径にする
		return d.r;
	})
	.attr("fill", function(d,i){	// 塗りの色を指定
		return color[i];
	})
grp.append("text")	// 文字を生成する
	.attr("font-size", "9pt")	// 文字のサイズを指定する
	.attr("fill", "black")	// 文字の塗りの色を指定する
	.style("text-anchor", "middle")	// 円の座標の中央から表示するようにする
	.text(function(d) { return d.className; } )	// データの中のclassNameが地区名なので、それを出力
// 階層化されたJSONデータをフラット化する (D3.js本家のを少し変更して利用)
function classes(root) {
	var classes = [];
	function recurse(name, node) {
		if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
			else classes.push({packageName: name, className: node.name, value: node.households});
	}
	recurse(null, root);
	return {children: classes};
}
