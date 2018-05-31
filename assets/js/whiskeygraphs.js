queue()
    .defer(d3.csv, "assets/data/whiskey-insight.csv")
    .await(makeGraphs);


function makeGraphs(error, salaryData) {
    
    $.each(salaryData, function(key, value){
        console.log(key, value);
    });
}