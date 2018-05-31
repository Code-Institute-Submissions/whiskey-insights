queue()
    .defer(d3.csv, "assets/data/whiskey-analysis.csv")
    .await(makewhiskeygraphs);

function makewhiskeygraphs(whiskeyData){
    
    console.log(typeof(whiskeyData));
    
    for (i = 0; i < whiskeyData.length; i++) { 
        console.log(whiskeyData[i]);
    }
    
    var ndx = crossfilter(whiskeyData);
    
    // parse data HERE
    
    var whiskey_dim = ndx.dimension(dc.pluck("Whisky"));
    var whiskey_per_country = whiskey_dim.group().reduceSum(dc.pluck("country"));
    
    // dc.piechart("#whiskey-per-country-chart")
    //     .height(300)
    //     .radius(250)
    //     .transitionDuration(1000)
    //     .dimension(whiskey_dim)
    //     .group(whiskey_per_country);
        
    // dc.renderAll();
}