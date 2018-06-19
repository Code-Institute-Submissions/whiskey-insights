$(document).ready(function() {
      // console.log( "ready!" );
  
  queue()
      .defer(d3.csv, "assets/data/whiskey-insight.csv")
      .await(makeBubbleMapGraph);

    function makeBubbleMapGraph(error, whiskeyData) {
    
        // We create a variable with an object (whiskeyBubbles) to determine the 
        // number of bottles per country, and a variable with a number 
        // (whiskeyTotal), to calculate the total of bottles reviewd
        
        var whiskeyBubbles = new Object();
      
        var whiskeyTotal = 0;
        
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
          
        // Below, we start to create the individual bubbles
      
        var bubble_map = new Datamap({
          element: document.getElementById("world-map"),
          geographyConfig: {
            popupOnHover: false,
            highlightOnHover: true
          },
          fills: {
            defaultFill: "#ff794d",
            BEL: "red",
            CAN: "purple",
            GBR: "khaki",
            FIN: "black",
            FRA: "pink",
            IND: "brown",
            IRL: "green",
            JPN: "orange",
            NLD: "crimson",
            SCT: "hotPink",
            ZAF: "cyan",
            SWE: "orange",
            CHE: "gold",
            TWN: "indigo",
            AUS: "lime",
            USA: "blue",
            WLS: "teal"
          }
        });
        
        // To calculate the radius, I've done a rule of three to help me scale 
        // them up because otherwise the bigger radius would make the chart 
        // impossible to read. Then I've edited the sizes so they are legible
        
        // function calculateradius(countryTotal) {
        //   return countryTotal*100/whiskeyTotal;
        // }
        
        function calculateradius(countryTotal) {
          if ( countryTotal < 10 ) {
            return (countryTotal*100/whiskeyTotal) * 6;
          } else if ((countryTotal > 10) && (countryTotal < 36 )) {
            return (countryTotal*100/whiskeyTotal) * 5;
          } else if ((countryTotal > 36) && (countryTotal < 50 )) {
            return (countryTotal*100/whiskeyTotal) * 4;
          } else if ((countryTotal > 50 ) && (countryTotal < 100 )) {
            return (countryTotal*100/whiskeyTotal) * 3;
          } else if ((countryTotal > 100 ) && (countryTotal < 250 )) {
            return (countryTotal*100/whiskeyTotal) * 2;
          } else {
            return (countryTotal*100/whiskeyTotal);
          }
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
            name: 'Scotland',
            radius: calculateradius(whiskeyBubbles["Scotland"]),
            // centered: 'SCT',
            bottles: whiskeyBubbles["Scotland"],
            country: 'SCT',
            fillKey: 'SCT',
            latitude: 55.95,
            longitude: -3.18,
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
            return '<div class="hoverinfo">Botles Reviewed: ' + data.bottles + ' from ' + data.name;
          }
        });
    }
});