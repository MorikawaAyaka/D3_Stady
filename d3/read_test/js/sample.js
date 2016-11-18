
d3.csv("./list.csv", function(error, data) {
    console.log(data[0]);
    var text = "";

    for (var i = 0; i < data.length; i++) {
        text += data[i].label + "=" + data[i].value + "<br>";
    }
    d3.select("#result").html(text);
});
