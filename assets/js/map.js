// queue()
//     .defer(d3.csv, "assets/data/whiskey-insight.csv")
//     .defer(d3.json, "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
//     .await(makeGraphs);

// function makeGraphs(error, countriesJson, worldJson) {
    
//     var ndx = crossfilter(countriesJson);
//     show_map_of_world(ndx, worldJson);
    
//     dc.renderAll()
// }

// function show_map_of_world(ndx, worldJson) {
//     var countryDim = ndx.dimension(dc.pluck('country'));
//     var group = countryDim.group().reduceSum(dc.pluck('amount'));
//     var projection = d3.geo.mercator()
//         .center([0, 40])
//         .scale(100)
//         .rotate([-12, 0]);
//     dc.geoChoroplethChart("#whiskey-per-country-bubble-chart")
//         .width(1000)
//         .height(500)
//         .dimension(countryDim)
//         .group(group)
//         .colors(["#ff794d", "#8c8c8c"])
//         // .colorDomain([500, 50000])
//         .overlayGeoJson(worldJson["features"], "state", function(d) {
//             return d.id;
//         })
//         .projection(projection)
//         .title(function(p) {
//             console.log(p);
//             return "Country: " + p["key"];
//         });
// }