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
            whiskeyTotal++;
        } else {
            whiskeyBubbles[whiskeyData[i]["Country"]] = 1;
            whiskeyTotal++;
        }
    }
    
    console.log(whiskeyBubbles);
    
    // console.log(whiskeyTotal);
    
  // Below, we start to create the individual bubbles

  var bubble_map = new Datamap({
    element: document.getElementById("world-map"),
    geographyConfig: {
      popupOnHover: false,
      highlightOnHover: true
    },
    fills: {
      defaultFill: '#ff794d',
      BEL: 'red',
      CAN: 'purple',
      GBR: 'khaki',
      FIN: 'black',
      FRA: 'pink',
      IND: 'brown',
      IRL: 'green',
      JPN: 'orange',
      NLD: 'crimson',
      SCT: 'hotPink',
      ZAF: 'cyan',
      SWE: 'darkgreen',
      CHE: 'gold',
      TWN: 'indigo',
      AUS: 'lime',
      USA: 'blue',
      WLS: 'teal'
    }
  });
  
  // To calculate the radius, I've done a rule of three to help me scale them up 
  // because otherwise the bigger radius would make the chart impossible to read
  
  function calculateradius(countryTotal) {
    return countryTotal*100/whiskeyTotal;
  }
  
  bubble_map.bubbles([
    {
      name: 'Belgium',
      radius: calculateradius(whiskeyBubbles["Belgium"]),
      centered: 'BEL',
      bottles: whiskeyBubbles["Belgium"],
      country: 'BEL',
      fillKey: 'BEL',
    },{
      name: 'Canada',
      radius: calculateradius(whiskeyBubbles["Canada"]),
      centered: 'CAN',
      bottles: whiskeyBubbles["Canada"],
      country: 'CAN',
      fillKey: 'CAN',
    },{
      name: 'England',
      radius: calculateradius(whiskeyBubbles["England"]),
      // centered: 'GBR',
      bottles: whiskeyBubbles["England"],
      country: 'GBR',
      fillKey: 'GBR',
      latitude: 51.50,
      longitude: 0.12,
    },{
      name: 'Finland',
      radius: calculateradius(whiskeyBubbles["Finland"]),
      centered: 'FIN',
      bottles: whiskeyBubbles["Finland"],
      country: 'FIN',
      fillKey: 'FIN',
    },{
      name: 'France',
      radius: calculateradius(whiskeyBubbles["France"]),
      centered: 'FRA',
      bottles: whiskeyBubbles["France"],
      country: 'FRA',
      fillKey: 'FRA',
    },{
      name: 'India',
      radius: calculateradius(whiskeyBubbles["India"]),
      centered: 'IND',
      bottles: whiskeyBubbles["India"],
      country: 'IND',
      fillKey: 'IND',
    },{
      name: 'Ireland',
      radius: calculateradius(whiskeyBubbles["Ireland"]),
      centered: 'IRL',
      bottles: whiskeyBubbles["Ireland"],
      country: 'IRL',
      fillKey: 'IRL',
    },{
      name: 'Japan',
      radius: calculateradius(whiskeyBubbles["Japan"]),
      centered: 'JPN',
      bottles: whiskeyBubbles["Japan"],
      country: 'JPN',
      fillKey: 'JPN',
    },{
      name: 'Netherlands',
      radius: calculateradius(whiskeyBubbles["Netherlands"]),
      centered: 'NLD',
      bottles: whiskeyBubbles["Netherlands"],
      country: 'NLD',
      fillKey: 'NLD',
    },{
      name: 'Scotland',
      radius: calculateradius(whiskeyBubbles["Scotland"]),
      // centered: 'SCT',
      bottles: whiskeyBubbles["Scotland"],
      country: 'SCT',
      fillKey: 'SCT',
      latitude: 55.95,
      longitude: -3.18,
    },{
      name: 'South Africa',
      radius: calculateradius(whiskeyBubbles["South Africa"]),
      centered: 'ZAF',
      bottles: whiskeyBubbles["South Africa"],
      country: 'ZAF',
      fillKey: 'ZAF',
    },{
      name: 'Sweden',
      radius: calculateradius(whiskeyBubbles["Sweden"]),
      centered: 'SWE',
      bottles: whiskeyBubbles["Sweden"],
      country: 'SWE',
      fillKey: 'SWE',
    },{
      name: 'Switzerland',
      radius: calculateradius(whiskeyBubbles["Switzerland"]),
      centered: 'CHE',
      bottles: whiskeyBubbles["Switzerland"],
      country: 'CHE',
      fillKey: 'CHE',
    },{
      name: 'Taiwan',
      radius: calculateradius(whiskeyBubbles["Taiwan"]),
      centered: 'TWN',
      bottles: whiskeyBubbles["Taiwan"],
      country: 'TWN',
      fillKey: 'TWN',
    },{
      name: 'Australia (Tasmania)',
      radius: calculateradius(whiskeyBubbles["Tasmania"]),
      // centered: 'AUS',
      bottles: whiskeyBubbles["Tasmania"],
      country: 'AUS',
      fillKey: 'AUS',
      latitude: -41.45,
      longitude: 145.97,
    },{
      name: 'USA',
      radius: calculateradius(whiskeyBubbles["USA"]),
      centered: 'USA',
      bottles: whiskeyBubbles["USA"],
      country: 'USA',
      fillKey: 'USA',
    },{
      name: 'Wales',
      radius: calculateradius(whiskeyBubbles["Wales"]),
      // centered: 'WLS',
      bottles: whiskeyBubbles["Wales"],
      country: 'WLS',
      fillKey: 'WLS',
      latitude: 52.13,
      longitude: -3.78,
    }
  ], {
    popupTemplate: function(geo, data) {
      return '<div class="hoverinfo">Botles Reviewed: ' + data.bottles;
    }
  });
  
  // Now that the bubblechart is sorted, I'll work on the rest of the graphs

  var ndx = crossfilter(whiskeyData);
  
  // Because my numeric values are strings in whiskeyData, 
  // I need to turn them into numbers
  
  whiskeyData.forEach(function(d){
        d.MetaCritic = parseFloat(d.MetaCritic);
        d.STDEV = parseFloat(d.STDEV);
        d.Reviews = parseInt(d.Reviews);
    });
  
  // Below, a call to all the functions I'll need
  
  showPreferredFlavourProfiles(ndx);
  showMostDivisiveWhiskeys(ndx);
  showWhiskeyPriceRange(ndx);
  // showBestValueWhiskeys(ndx);
  
  dc.renderAll();

}

// function removeEmptyBins(source_group) {
//   return {
//     all:function () {
//       console.log("Sanity check");
//       return source_group.all().filter(function(d) {
//         return d.value !== "n/a";
//       });
//     }
//   };
// }
  
function showPreferredFlavourProfiles(ndx) {
  
  // Planning to add color to my bars - START
  // var whiskeyColors = d3.scale.ordinal()
  //   .domain(["A", "B", ])
  //   .range(["pink", "blue"]);
  
  // Planning to add color to my bars - END
  
  var flavourProfileDim = ndx.dimension(dc.pluck("Cluster"));
  // var filtered_dim = removeEmptyBins(flavourProfileDim);
  var averageRatingByCluster = flavourProfileDim.group().reduce(
    function (p, v) {
      p.count++;
      p.total += v.MetaCritic;
      return p;
    },
    function (p, v) {
      p.count--;
      if (p.count == 0) {
        p.total = 0;
      } else {
        p.total -= v.MetaCritic;
      }
      return p;
    },
    function () {
      return {count: 0, total: 0};
    }
  );
  
  
  // PENDING - There is a bar at the start that shows data for whiskeys 
  // with an empty "Cluster" sell. I want to make my code ignore those samples.
  // PENDING - Add colour to the bars
  // PENDING - Add information on what does each cluster mean
  
  // var minRating = 0;
  // var maxRating = 10;
  

  dc.barChart("#preferred-flavour-profile")
    .width(850)
    .height(350)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(flavourProfileDim)
    .group(averageRatingByCluster)
    .valueAccessor(function (d) {
      
        var valueAverage = d.value.total / d.value.count;
      
        if (d.value.count == 0) {
            return 0;
        } else {
            return valueAverage.toFixed(2);
        }
    })
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Different Clusters (Sets of Flavour Profiles)")
    .yAxisLabel("Ratings from 0 to 10 Points")
    .yAxis().ticks(4);
}
  

// WORK IN PROGRESS - heatMap to show most divisive samples - START
  
  
  // // Trying to get the data from STDEV to show when console.log - START
  // //  Copied the formula to get whiskeyBubbles because when trying to work on the
  // // heat map, I don't seem to be able to access the "STDEV" nor the "Whisky"
  // // columns
  
  // var whiskeyDeviation = new Object();

  // var whiskeyTest = 0;

  // function getDeviationData(error, whiskeyData) {
  //   for (i = 0; i < whiskeyData.length; i++) {
  //     if (whiskeyData[i]["STDEV"] in whiskeyDeviation) {
  //         whiskeyDeviation[whiskeyData[i]["STDEV"]]++
  //         whiskeyTest++;
  //     } else {
  //         whiskeyDeviation[whiskeyData[i]["STDEV"]] = 1;
  //         whiskeyTest++;
  //     }
  //   }
  // }
  
  // console.log(whiskeyDeviation[1]["STDEV"]);
  // // Trying to get the data from STDEV to show when console.log - END
 

  function showMostDivisiveWhiskeys(ndx) {
    
    var divisiveWhiskeysDim = ndx.dimension(dc.pluck("STDEV"));
    var divisiveWhiskeysGroup = divisiveWhiskeysDim.group().reduceSum(
      dc.pluck("Whisky"));
    
    // Time to draw or chart - a Heat Map highlighting the top 100 most
    // divisive whiskeys from the sample
    
    dc.heatMap("#most-divisive-whiskeys")
    .width(40 * 20 + 80)
    .height(40 * 5 + 40)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(divisiveWhiskeysDim)
    .group(divisiveWhiskeysGroup)
    .keyAccessor(function(d) { return +d.key[0]; })
    .valueAccessor(function(d) { return +d.key[1]; })
    .colorAccessor(function(d) { return +d.value; })
    .title(function(d) {
        return  "Whiskey's Name: "+ "\n" +
                "Sandard Deviation: ";})
    .colors(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
    .calculateColorDomain();

  }
  
  // WORK IN PROGRESS - heatMap to show most divisive samples - END
  
  
  // Now we'll try to find the best rated whiskeys in the different price groups
  // We'll start with a selector
  
  function showWhiskeyPriceRange(ndx) {
    var priceDim = ndx.dimension(dc.pluck("Cost"));
    var priceSelect = priceDim.group();

    dc.selectMenu("#best-value-whiskeys")
        .dimension(priceDim)
        .group(priceSelect);
  }
  
  // Now, we'll folow by creating tables that will show when selecting the 
  // different price ranges - START
  
//   function showBestValueWhiskeys(ndx){
//     var whiskeyPriceDim = ndx.dimension(dc.pluck("Cost"));
//     var bestRatedPerPrice = whiskeyPriceDim.group.reduce(
//       function (p, v) {
//         ++p.number;
//         p.total += +v.Speed;
//         p.avg = Math.round(p.total / p.number);
//         return p;
//       },
//       function (p, v) {
//         --p.number;
//         p.total -= +v.Speed;
//         p.avg = (p.number == 0) ? 0 : Math.round(p.total / p.number);
//         return p;
//       },
//       function (p, v) {
//         return {number: 0, total: 0, avg: 0};
//       });
//   rank = function (p) { return "rank" };
   
// chart
//   .width(768)
//   .height(480)
//   .dimension(groupedDimension)
//   .group(rank)
//   .columns([function (d) { return d.key },
//             function (d) { return d.value.number },
//             function (d) { return d.value.avg }])
//   .sortBy(function (d) { return d.value.avg })
//   .order(d3.descending)
//   chart.render();
//   } 
    
});