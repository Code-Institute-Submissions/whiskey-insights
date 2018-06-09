$(document).ready(function() {
    // console.log( "ready!" );

queue()
    .defer(d3.csv, "assets/data/whiskey-insight.csv")
    .await(getCountryData);
    
// We create a variable with an object (whiskeyBubbles) to determine the number of bottles per country,
// and a variable with a number (whiskeyTotal), to calculate the total of bottles reviewd

var whiskeyBubbles = new Object();

var whiskeyTotal = 0;

function getCountryData(error, whiskeyData) {
    for (i = 0; i < whiskeyData.length; i++) {
      
        // console.log(whiskeyData[i]["Country"]);
        
        if (whiskeyData[i]["Country"] in whiskeyBubbles) {
            whiskeyBubbles[whiskeyData[i]["Country"]]++
            whiskeyTotal++
        } else {
            whiskeyBubbles[whiskeyData[i]["Country"]] = 1;
            whiskeyTotal++
        }
    }
    
    console.log(whiskeyBubbles);
    
    console.log(whiskeyTotal);
    
  // Below, we start to create the individual bubbles

var bubble_map = new Datamap({
  element: document.getElementById("world-map"),
  geographyConfig: {
    popupOnHover: false,
    highlightOnHover: true
  },
  fills: {
    defaultFill: '#ff794d',
    BEL: 'yellow',
    CAN: 'purple',
    GBR: 'red',
    FIN: 'black',
    FRA: 'pink',
    IND: 'brown',
    IRL: 'green',
    JPN: 'orange',
    NLD: 'crimson',
    ZAF: 'cyan',
    SWE: 'darkgreen',
    CHE: 'gold',
    TWN: 'indigo',
    AUS: 'lime',
    USA: 'blue'
  }
});

// To calculate the radious, I've done a rule of three to help me scale them up 
// because otherwise the bigger radious would make the chart impossible to read

function calculateRadious(countryTotal) {
  return countryTotal*100/whiskeyTotal;
}

bubble_map.bubbles([
  {
    name: 'Belgium',
    radius: calculateRadious(whiskeyBubbles["Belgium"]),
    centered: 'BEL',
    country: 'BEL',
    yeild: 0,
    fillKey: 'BEL',
    // latitude: 50.8503,
    // longitude: 4.3517
  },{
    name: 'Canada',
    radius: calculateRadious(whiskeyBubbles["Canada"]),
    centered: 'CAN',
    country: 'CAN',
    yeild: 0,
    fillKey: 'CAN',
    // latitude: 43.6532,
    // longitude: 79.3832
  },{
    name: 'England',
    radius: calculateRadious(whiskeyBubbles["England"]),
    centered: 'GBR',
    country: 'GBR',
    yeild: 0,
    fillKey: 'GBR',
    // latitude: 55.9533,
    // longitude: 3.1883
  },{
    name: 'Finland',
    radius: calculateRadious(whiskeyBubbles["Finland"]),
    centered: 'FIN',
    country: 'FIN',
    yeild: 0,
    fillKey: 'FIN',
    // latitude: 61.9241,
    // longitude: 25.7482 
  },{
    name: 'France',
    radius: calculateRadious(whiskeyBubbles["France"]),
    centered: 'FRA',
    yeild: 50000,
    country: 'FRA',
    fillKey: 'FRA',
    // latitude: 48.8566,
    // longitude: 2.3522
  },{
    name: 'India',
    radius: calculateRadious(whiskeyBubbles["India"]),
    centered: 'IND',
    yeild: 50000,
    country: 'IND',
    fillKey: 'IND',
    // latitude: 20.5937,
    // longitude: 78.9629
  },{
    name: 'Ireland',
    radius: calculateRadious(whiskeyBubbles["Ireland"]),
    centered: 'IRL',
    yeild: 50000,
    country: 'IRL',
    fillKey: 'IRL',
    // latitude: 53.1424,
    // longitude: 7.6921
  },{
    name: 'Japan',
    radius: calculateRadious(whiskeyBubbles["Japan"]),
    centered: 'JPN',
    yeild: 50000,
    country: 'JPN',
    fillKey: 'JPN',
    // latitude: 36.2048,
    // longitude: 138.2529
  },{
    name: 'Netherlands',
    radius: calculateRadious(whiskeyBubbles["Netherlands"]),
    centered: 'NLD',
    yeild: 50000,
    country: 'NLD',
    fillKey: 'NLD',
    // latitude: 52.1326,
    // longitude: 5.2913
  },{
    name: 'Scotland',
    radius: calculateRadious(whiskeyBubbles["Scotland"]),
    centered: 'GBR',
    country: 'GBR',
    yeild: 0,
    fillKey: 'GBR',
    // latitude: 55.9533,
    // longitude: 3.1883
  },{
    name: 'South Africa',
    radius: calculateRadious(whiskeyBubbles["South Africa"]),
    centered: 'ZAF',
    yeild: 50000,
    country: 'ZAF',
    fillKey: 'ZAF',
    // latitude: 30.5595,
    // longitude: 22.9375
  },{
    name: 'Sweden',
    radius: calculateRadious(whiskeyBubbles["Sweden"]),
    centered: 'SWE',
    yeild: 50000,
    country: 'SWE',
    fillKey: 'SWE',
    // latitude: 60.1282,
    // longitude: 18.6435
  },{
    name: 'Switzerland',
    radius: calculateRadious(whiskeyBubbles["Switzerland"]),
    centered: 'CHE',
    yeild: 50000,
    country: 'CHE',
    fillKey: 'CHE',
    // latitude: 46.818,
    // longitude: 8.2275
  },{
    name: 'Taiwan',
    radius: calculateRadious(whiskeyBubbles["Taiwan"]),
    centered: 'TWN',
    yeild: 50000,
    country: 'TWN',
    fillKey: 'TWN',
    // latitude: 23.6978,
    // longitude: 20.9605
  },{
    name: 'Australia (Tasmania)',
    radius: calculateRadious(whiskeyBubbles["Tasmania"])*20,
    centered: 'AUS',
    yeild: 50000,
    country: 'AUS',
    fillKey: 'AUS',
    // latitude: 41.4545,
    // longitude: 145.9707
  },{
    name: 'USA',
    radius: calculateRadious(whiskeyBubbles["USA"]),
    centered: 'USA',
    yeild: 50000,
    country: 'USA',
    fillKey: 'USA',
    // latitude: 41.8781,
    // longitude: 87.6298
  },{
    name: 'Wales',
    radius: calculateRadious(whiskeyBubbles["Wales"]),
    centered: 'GBR',
    yeild: 50000,
    country: 'GBR',
    fillKey: 'GBR',
    // latitude: 52.1307,
    // longitude: 3.7837
  }
], {
  popupTemplate: function(geo, data) {
    return '<div class="hoverinfo">Botles Reviewed:' + data.yeild + '';
// Exploded on ' + data.date + ' by the '  + data.country + ''
  }
});

}


// PENDING - Pass the radius into our chart (create five different sizes according to the value on whiskeyBubbles per country)
// PENDING - Get the coordinates right
// PENDING - Get the content for the hover tag to say how many bottles reviewd per country



// function makeGraphs(error, whiskeyData) {
    
//     var ndx = crossfilter(whiskeyData);

    
//     whiskey_per_country(ndx, whiskeyData);
    
//     dc.renderAll()
// }



// // Pie chart below

// function whiskey_per_country(ndx) {
//     var countryDim = ndx.dimension(function (d) {
//         return d["Country"];
//     });
//      var whiskeyPerCountryGroup = countryDim.group();

//     var pieChart = dc.pieChart("#whiskey-per-country-bubble-chart-overlay");

//     pieChart
//         .height(400)
//         // .slicesCap(4)
//         .radius(150)
//         .transitionDuration(1000)
//         .dimension(countryDim)
//         .group(whiskeyPerCountryGroup);

//     dc.renderAll();
// }



// Document ready closing bracket
});