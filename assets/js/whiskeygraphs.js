// PENDING - invert dim (to country) to group (to whisky)
// andy's examples: https://github.com/Mormoran/twitter_django/blob/master/static/js/graph.js

queue()
    .defer(d3.csv, "assets/data/whiskey-insight.csv")
    .await(makeGraphs);


function makeGraphs(error, whiskeyData) {
    
    var ndx = crossfilter(whiskeyData);
    
    // var whiskeyDim = ndx.dimension(dc.pluck("Whisky"));
    
    var whiskeyDim = ndx.dimension(function (d) {
        return d["Whisky"];
    });
    
    // var whiskeyPerCountryGroup = whiskeyDim.group().reduceSum(dc.pluck("Country"));
    
    var whiskeyPerCountryGroup = whiskeyDim.group();
    
    var pieChart = dc.pieChart("#whiskey-per-country-chart");
    
    pieChart
        .height(400)
        // .slicesCap(4)
        .radius(150)
        .transitionDuration(1000)
        .dimension(whiskeyDim)
        .group(whiskeyPerCountryGroup);

    dc.renderAll();
}