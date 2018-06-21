// PENDING - Get the legendText in the piechart to render correctly
// PENDING - Fix pagination 
// Pending - Make charts responsive

$(document).ready(function() {
      // console.log( "ready!" );
  
  queue()
      .defer(d3.csv, "assets/data/whiskey-insight.csv")
      .await(makeGraphs);

  function makeGraphs(error, whiskeyData) {
  
    var ndx = crossfilter(whiskeyData);
    
    // Because my numeric values are strings in whiskeyData, 
    // I need to turn them into numbers
    
    whiskeyData.forEach(function(d){
          d.MetaCritic = parseFloat(d.MetaCritic);
          d.STDEV = parseFloat(d.STDEV);
          d.Reviews = parseInt(d.Reviews);
      });
    
    // Below, a call to all the functions I'll need
    
    showCountrySelector(ndx);
    showResetButton(ndx);
    showPreferredFlavourProfiles(ndx);
    showMostDivisiveWhiskeys(ndx);
    showWhiskeysPerPriceRange(ndx);
    showBestValueWhiskeys(ndx);
    
    dc.renderAll();
  
  }
  
  function showCountrySelector(ndx) {
    var countryDim = ndx.dimension(dc.pluck("Country"));
    var countrySelect = countryDim.group();

    dc.selectMenu("#country-selector")
        .dimension(countryDim)
        .group(countrySelect);
  }
  
  function showResetButton(ndx) {
    $("#reset-button").on("click", function() {
          dc.filterAll();
          dc.redrawAll();
          $(".paging-btn").each(function() {
            console.log($(this));
            $(this).attr("disabled", false)
          });
    });
  }
    
  function showPreferredFlavourProfiles(ndx) {
    
    var flavourProfileDim = ndx.dimension(function(d) {
      if (d["Cluster"] !== "n/a") {
        return d["Cluster"];
      } 
    });
    
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
    
    // var minRating = 0;
    // var maxRating = 10;
    
  
    dc.barChart("#preferred-flavour-profile")
      .width(350)
      .height(300)
      // .margins({top: 10, right: 50, bottom: 30, left: 50})
      .clipPadding(200)
      .colorAccessor(function (d) {
        return d.key;
      })
      .ordinalColors(["#ff6600", "#cc5200", "#993d00", "#cc6600", "#ff8000", "#ff9933", "#ffb366", "#ff3300", "#b32400", "#ccff66", "#ccff33", "#cccc00", "#cc9900", "#996600"])
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
      // .title(function (d) {
      //     return " has a Cluster of " + d.key[0];
      // })
      .transitionDuration(500)
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .xAxisLabel("Different Clusters (Sets of Flavour Profiles)")
      .yAxisLabel("Ratings from 0 to 10 Points")
      .yAxis().ticks(4);
  
    // Get the modal
    var modal = document.getElementById('clustersModal');
    // Get the button that opens the modal
    var btn = document.getElementById("clustersBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
  }
  
  // Now, I'll write a pie chart to show the amount of samples 
  // per different price ranges
    
  function showWhiskeysPerPriceRange(ndx) {
      // Define our vars for dimension and group
      
      var priceRangeDim = ndx.dimension(function(d) {
        if (d["Cost"] !== "n/a") {
          return d["Cost"];
        }
      });
      var priceRangeGroup = priceRangeDim.group();
      
      // Render our pie chart
      
      dc.pieChart("#best-value-whiskeys-piechart")
        .width(300)
        .height(400)
        .radius(100)
        .transitionDuration(500)
        .minAngleForLabel(0.2)
        .dimension(priceRangeDim)
        .group(priceRangeGroup)
        .legend(dc.legend().x(20).y(0)
        .legendText(function(d) {
          if (d["name"] == "$") {
            return "$ for whiskies <$30 CAD";
          } else if (d["name"] == "$$") {
            return "$$ for whiskies between $30~$50 CAD";
          } else if (d["name"] == "$$$") {
            return "$$$ for whiskies between $50-$70 CAD";
          } else if (d["name"] == "$$$$") {
            return "$$$$ for whiskies between $70~$125 CAD";
          } else if (d["name"] == "$$$$$") {
            return "$$$$$ for whiskies between $125~$300 CAD";
          } else if (d["name"] == "$$$$$$") {
            return "$$$$$$ refers to all whiskies >$300 CAD";
          }
        }
        ));
    }
  
  function showMostDivisiveWhiskeys(ndx) {
    
    // This chart will highlight whiskeys that made reviewers disagree, this 
    // doesn't mean their better or worse, but they are probably more divisive
    // among whiskey lovers!
  
    // While all the whiskeys are high in STDEV because we're working with the 
    // Top 25 out a large sample, I wanted to give some color to the scatter plot 
    // and highlight the very highest 
    
    var stdevColors = d3.scale.linear()
      .domain([0.5,1.25,2.5])
      .range(["green", "yellow", "red"]);
      
    // Below the (now commented) method used to calculate the Top 25 highest STDEV
    
    // var topStdev = stdevDim.top(25);
    // console.log(topStdev
    
    // After finding that out, I created a variable that only considers those whiskeys with
    // a stdev of at least 0.91, which was the lowest score among the top 25 
    
    var stdevDim = ndx.dimension(function(d) {
      // if (d["STDEV"] >= 0.91) {
      //   return [d["STDEV"], d["MetaCritic"], d["Whisky"]]; 
      // }
      if (d["STDEV"] !== "n/a") {
        return [+d["STDEV"], +d["MetaCritic"], d["Whisky"]]; 
      }
    });
    
    var mostDivisiveGroup = stdevDim.group();
    
    // var minStdev = 0.85;
    var minStdev = 0;
    var maxStdev = 5;
  
  // Render chart
    dc.scatterPlot("#most-divisive-whiskeys")
      .width(900)
      .height(300)
      .transitionDuration(500)
      // .mouseZoomable(true)
      .x(d3.scale.linear().domain([minStdev, maxStdev]))
      .brushOn(true)
      .symbolSize(4)
      .clipPadding(10)
      .yAxisLabel("Rating")
      .xAxisLabel("Standard Deviation")
      .title(function (d) {
          return d.key[2] + " has a STDEV of " + d.key[0] + " and a rating of " + d.key[1];
      })
      .colorAccessor(function (d) {
        return d.key[0];
      })
      .colors(stdevColors)
      .elasticX(true)
      .dimension(stdevDim)
      .group(mostDivisiveGroup)
      .margins({top: 10, right: 50, bottom: 75, left: 75});
  }

  // Now, we'll folow by creating tables that will show when selecting the 
  // different price ranges - START
    
  function showBestValueWhiskeys(ndx) {
    
    var ofs = 0;
    var pageSize = 15;
    
    // var totalPages = ndx.groupAll().reduce(
    //   function (p, v) {
    //           ++p.count;
    //           p.total += v.MetaCritic;
    //           p.average = p.total / p.count;
    //           return p;
    //       },
    //       function (p, v) {
    //           --p.count;
    //           if(p.count == 0) {
    //                 p.total = 0;
    //                 p.average = 0;
    //             } else {
    //               p.total -= v.MetaCritic;
    //               p.average = p.total / p.count;
    //             }
    //           return p;
    //       },
    //       function () { return {count:0,total:0,average:0}; }
    // );

    // I need a value that tells "Next" and "Last" not to go until the end if
    // the filters give a lower number of samples to render in the table or if 
    // I've moved from ofs 1 in my pagination
    // var remainingTotalPages = totalPages - (pageSize-ofs);
    
    // Define dimensions and groups for dataTable - START
    var whiskeyRatingDim = ndx.dimension(function(d) {
      if (["MetaCritic"] !== "n/a") {
        return +d["MetaCritic"];
      }
    });
    
    var whiskeyRatingGroup = function(d) {
      if (d["MetaCritic"] !== d["MetaCritic"]) {
        return +d["MetaCritic"]; 
      }
    };
    // Define dimensions and groups for dataTable - END
    
    var filteredTotal = ndx.groupAll();
      dc.numberDisplay("#whiskey-count-size")
          .formatNumber(d3.format("d"))
          .valueAccessor(function (d) {
              return (+d);
          })
          .group(filteredTotal);
          
    //     // Trying to get the pagination to update when changing the filters - START
    // $("#country-selector").on("click", function() {
    //       $(".paging-btn").each(function() {
    //         $(this).attr("disabled", false)
    //       });
    // });
    // // Trying to get the pagination to update when changing the filters - END
    
    
    // Define display() function
    function display() {
      d3.select("#first").attr("disabled", ofs <= 0 ? "true" : null);
      d3.select("#previous").attr("disabled", ofs <= 0 ? "true" : null);
      d3.select("#next").attr("disabled", ofs + pageSize >= filteredTotal.value() ? "true" : null);
      d3.select("#last").attr("disabled", ofs + pageSize >= filteredTotal.value() ? "true" : null);
    }

    // Define update() function
    function update() {
      dataTable.beginSlice(ofs);
      dataTable.endSlice(ofs+pageSize);
      console.log(ofs + 1, ofs + pageSize);
      $("#whiskey-count-begin").html(ofs + 1);
      $("#whiskey-count-end").html(ofs + pageSize);
      display();
    }
    
    // jquery events for the buttons - START
    
    $("#first").on("click", function(){
      ofs = 0;
      update();
      dataTable.redraw();
    });
    
    $("#previous").on("click", function(){
      ofs -= pageSize;
      update();
      dataTable.redraw();
    });
    
    $("#next").on("click", function(){
      ofs += pageSize;
      update();
      dataTable.redraw();
    });
    
    $("#last").on("click", function(){
      ofs = filteredTotal.value() - pageSize;
      update();
      dataTable.redraw();
    });
     
    // jquery events for the buttons - END
  
    // Render our data table
    
    var dataTable = dc.dataTable("#value-table")
    
    dataTable
      .width(800)
      .height(270)
      .dimension(whiskeyRatingDim)
      .group(whiskeyRatingGroup)
      .columns([
        function (d) { return +d["MetaCritic"] },
        function (d) { return d["Whisky"] },
        function (d) { return d["Cost"] }])
      .size(Infinity)
      .order(d3.descending);
      
    update();
    dataTable.render();
    
    // Disable Effects update when changing the filters - START
    $("#first, #previous, #next, #last, #country-selector, #showPreferredFlavourProfiles, #showMostDivisiveWhiskeys, #showWhiskeysPerPriceRange").on("click", function() {
      if (( ofs <= 0 ) && ( (ofs + pageSize) >= filteredTotal.value() )) {
        $("#first").attr("disabled", true);
        $("#previous").attr("disabled", true);
        $("#next").attr("disabled", true);
        $("#last").attr("disabled", true);
      } else if ( ofs <= 0 ) {
        $("#first").attr("disabled", true);
        $("#previous").attr("disabled", true);
        $("#next").attr("disabled", false);
        $("#last").attr("disabled", false);
      } else if ( (ofs + pageSize) >= filteredTotal.value() ) {
        $("#first").attr("disabled", false);
        $("#previous").attr("disabled", false);
        $("#next").attr("disabled", true);
        $("#last").attr("disabled", true);
      }
      else {
        $(".paging-btn").each(function() {
          $(this).attr("disabled", false)
        });
      }
    });
    // Disable Effects update when changing the filters - END
    
    // Each time you select a new filter, the dataTable and pagination should go back to starting position - START
    $("#country-selector, #showPreferredFlavourProfiles, #showMostDivisiveWhiskeys, #showWhiskeysPerPriceRange").on("click", function() {
      dataTable.beginSlice(ofs);
      dataTable.endSlice(ofs+pageSize);
      $("#whiskey-count-begin").html(ofs + 1);
      $("#whiskey-count-end").html(ofs + pageSize);
      // display();
    });
    // Each time you select a new filter, the dataTable and pagination should go back to starting position - END
  }
});