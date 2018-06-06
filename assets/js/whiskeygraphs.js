$(document).ready(function() {
    // console.log( "ready!" );

queue()
    .defer(d3.csv, "assets/data/whiskey-insight.csv")
    .await(getCountryData);

// var element = document.getElementById("world-map");
// console.log(element);

// var countries = new Set();

var whiskeyBubbles = new Object();

function getCountryData(error, whiskeyData) {
    for (i = 0; i < whiskeyData.length; i++) {
      
        // console.log(whiskeyData[i]["Country"]);
        
        if (whiskeyData[i]["Country"] in whiskeyBubbles) {
            whiskeyBubbles[whiskeyData[i]["Country"]]++
        } else {
            whiskeyBubbles[whiskeyData[i]["Country"]] = 1;
        }
        // countries.add(whiskeyData[i]["Country"]);
    }
    
    console.log(whiskeyBubbles);
    
    // countries = Array.from(countries);
    // console.log(countries);
    
    // for (i = 0; i < countries.length; i++) {
    //     console.log(countries[i]);
    // }
}

var bubble_map = new Datamap({
  element: document.getElementById("world-map"),
  geographyConfig: {
    popupOnHover: false,
    highlightOnHover: true
  },
  fills: {
    defaultFill: '#ff794d',
    BEL: 'yellow',
    CNC: 'purple',
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
    AUT: 'lime',
    USA: 'blue'
  }
});

bubble_map.bubbles([
  {
    name: '',
    radius: 10,
    centered: 'BEL',
    country: 'BEL',
    yeild: 0,
    fillKey: 'BEL',
    // date: '1954-03-01'
  },{
    name: '',
    radius: 10,
    centered: 'CNC',
    country: 'CNC',
    yeild: 0,
    fillKey: 'CNC',
    // date: '1954-03-01'
  },{
    name: '',
    radius: 10,
    centered: 'GBR',
    country: 'GBR',
    yeild: 0,
    fillKey: 'GBR',
    // date: '1954-03-01'
  },{
    name: 'Not a bomb, but centered on Brazil',
    radius: 23,
    centered: 'BRA',
    country: 'USA',
    yeild: 0,
    fillKey: 'USA',
    date: '1954-03-01'
  },{
    name: 'Tsar Bomba',
    radius: 70,
    yeild: 50000,
    country: 'USSR',
    fillKey: 'RUS',
    significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
    date: '1961-10-31',
    latitude: 73.482,
    longitude: 54.5854
  }
], {
  popupTemplate: function(geo, data) {
    return '<div class="hoverinfo">Botles Reviewed:' + data.yeild + '';
// Exploded on ' + data.date + ' by the '  + data.country + ''
  }
});



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